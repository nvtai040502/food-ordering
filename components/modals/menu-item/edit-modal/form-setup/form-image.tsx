"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, X } from 'lucide-react';
import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { FileUpload } from '@/components/file-upload';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MenuItem } from '@prisma/client';
import { useModal } from '@/hooks/use-modal-store';


const formScheme = z.object({
  imageUrl: z.string().min(2, {
    message: "ImageUrl must be at least 2 characters"
  })
})

interface FormImageSetupProps {
  menuItem?: MenuItem
}

const FormImageSetup = ({
  menuItem,
}:FormImageSetupProps
) => {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      imageUrl: ""
    }
  })
  const {isSubmitting, isValid}  = form.formState
  const [isEditting, setIsEditting] = useState(false)

  const { toast } = useToast()
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    try{
      await axios.patch(`/api/menu-items/${menuItem?.id}`, values)
      toast({
        title: "Updated Image Menu Item Success",
      })
      router.refresh();
    } catch (error) {
      toast({
        title: `Something Went Wrong ${error}`,
      })
    } finally {
      setIsEditting(false)
    }
  }
  return ( 
    <div className='w-full flex flex-col gap-2 items-center'>
        { isEditting ? (

          <Button onClick={() => {setIsEditting(false)}} variant="ghost" disabled={isSubmitting} className='w-full'>

          <X className='h-4 w-4 mr-2'/>
          Cancel
        </Button>
        ):
        (
          <Button onClick={() => {setIsEditting(true)}} variant="ghost" className='w-full'>

            <Pencil className='h-4 w-4 mr-2'/>
            Edit
          </Button>

        )}

        { !isEditting ? (
          menuItem?.imageUrl ? (
            <div className="relative">
              <Image
                height={200}
                width={200}
                src={menuItem?.imageUrl}
                alt="Upload"
              />
            </div>
          ) : (
            <div>
              No Image
            </div>
          )
        ): (

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="border w-full space-y-4">
            <FormField 

              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>

                  <FormControl>
                    <FileUpload
                      endpoint="uploadImage"
                      value={field.value}
                      onChange={field.onChange} 
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={!isValid || isSubmitting}>Save</Button>
          </form>
        </Form>
)}
    </div>
   );
}

export default FormImageSetup