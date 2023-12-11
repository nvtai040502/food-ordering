"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, PlusCircleIcon, X } from 'lucide-react';
import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { MenuItem, Size } from '@prisma/client';
import { useToast } from '@/components/ui/use-toast';
import { SizesList } from './sizes-list';

const formScheme = z.object({
  name: z.string(),
  price: z.coerce.number()
})

interface FormSizesProps {
  menuItem: MenuItem,
  sizes: Size[]
}

const FormSizes = ({menuItem, sizes}: FormSizesProps) => {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: "",
      price: 0
    }
  })

  const {isSubmitting}  = form.formState
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    try {
      await axios.post(`/api/menu/menu-items/${menuItem.id}/sizes`, values)
      toast({
        title: "Create Size Success",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: `Error: ${error}`
      })
    } finally {
      setIsCreating(false)
    }
  }

  return ( 
    <div className='flex gap-2 flex-col'>
        <div className='flex justify-between items-center font-medium'>
            Sizes
          
          { isCreating ? (
          
          <Button onClick={() => {setIsCreating(false)}} variant="outline" size="sm" disabled={isSubmitting}>
            
          <X className='h-4 w-4 mr-2'/>
          Cancel
        </Button>
        ):
        (
          <Button onClick={() => {setIsCreating(true)}} variant="outline" size="sm">
            
            <PlusCircleIcon className='h-4 w-4 mr-2'/>
            Add
          </Button>
          
        )}
        </div>
        
        { !isCreating ? (
          <div className=''>
            <SizesList
              menuItem={menuItem}
              sizes={sizes || []}
            />
          </div>
        ): (
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            <FormField 
              disabled={isSubmitting}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name </FormLabel>
                  <FormControl>
                    <Input 
                    placeholder="Enter name" 
                    {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              disabled={isSubmitting}
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Price </FormLabel>
                  <FormControl>
                    <Input 
                    type='number'
                    placeholder="Enter price" 
                    {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button variant="outline" disabled={isSubmitting}>Add</Button>
          </form>
        </Form>
)}
        
    </div>
   );
}
 
export default FormSizes