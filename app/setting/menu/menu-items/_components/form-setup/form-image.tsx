"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, X } from 'lucide-react';
import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { MenuItem } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FileUpload } from '@/components/file-upload';
import Image from 'next/image';
import NoImageRendering from '@/components/no-image-render';

const formScheme = z.object({
  imageUrl: z.string()
})

const FormImage = ({menuItem}: {menuItem: MenuItem}) => {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      imageUrl: menuItem.imageUrl || undefined
    }
  })
 
  const { toast } = useToast()
  const router = useRouter()
  const {isSubmitting}  = form.formState
  const [isEditting, setIsEditting] = useState(false)
  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    try {
      await axios.patch(`/api/menu/menu-items/${menuItem.id}`, values)
      toast({
        title: "Update Image Success",
      })
      router.refresh()
    } catch(error) {
      toast({
        title: "Something went wrong",
        description: `Error: ${error}`
      })
    } finally {
      setIsEditting(false)
    }
  }
  
  return ( 
    <div className='flex gap-2 flex-col'>
      
        <div className='flex justify-between items-center font-medium'>
          Image
          { isEditting ? (
          
          <Button onClick={() => {setIsEditting(false)}} variant="outline" size="sm" disabled={isSubmitting}>
            
          <X className='h-4 w-4 mr-2'/>
          Cancel
        </Button>
        ):
        (
          <Button onClick={() => {setIsEditting(true)}} variant="outline" size="sm">
            
            <Pencil className='h-4 w-4 mr-2'/>
            Edit
          </Button>
          
        )}
        </div>
        
        { !isEditting ? (
          
          menuItem.imageUrl ? (
            <div className='relative aspect-video'>
              <Image src={menuItem.imageUrl} alt={menuItem.name} layout="fill" objectFit='contain' />
            </div>
          ) : (
            <div className='relative aspect-video'>
              <NoImageRendering />
            </div>
          )
        
        ) : (
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField 
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>

                  <FormControl>
                    <FileUpload
                      endpoint= "uploadImage"
                      value={field.value}
                      onChange={field.onChange} 
                    />
                  </FormControl>
                
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button variant="outline" disabled={isSubmitting}>Save</Button>
          </form>
        </Form>
)}
        
    </div>
   );
}
 
export default FormImage