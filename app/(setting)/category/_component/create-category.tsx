"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const formScheme = z.object({
  name: z.string().min(2, {
    message: "Name category must be at least 2 characters"
  }),
})


const CreateCategory = () => {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: ""
    }
  })

  const {isSubmitting}  = form.formState
  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    try {
      await axios.post(`/api/category`, values)
      toast({
        title: " Success",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong",
      });
    } 
  }


  return ( 
    <div className=''>
      
        Name Category

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full gap-4">
            <div className='w-full'>
            <FormField 
              disabled={isSubmitting}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  
                  <FormControl>
                    <Input 
                    placeholder="Enter title for your chapter" 
                    {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <Button disabled={isSubmitting}>Create</Button>
          </form>
        </Form>
        
    </div>
   );
}
 
export default CreateCategory