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


const formScheme = z.object({
  imageUrl: z.string().min(2, {
    message: "ImageUrl must be at least 2 characters"
  })
})

const FormImageSetup = ({imageUrl}:{imageUrl:string | undefined}) => {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      imageUrl: ""
    }
  })
  
  const {isSubmitting, isValid}  = form.formState
  const [isEditting, setIsEditting] = useState(false)
  const onClose = () => {setIsEditting(false)}
  const onClick = () => {setIsEditting(true)}
  const { toast } = useToast()
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    try{
      await axios.patch(`/api/profile`, values)
      toast({
        title: "Updated Image Profile Success",
      })
      router.refresh();
    } catch (error) {
      toast({
        title: "Something Went Wrong `${error}`",
      })
    } finally {
      setIsEditting(false)
    }
  }
  return ( 
    <div className='w-full flex flex-col gap-2'>
        { isEditting ? (

          <Button onClick={onClose} variant="ghost" disabled={isSubmitting}>

          <X className='h-4 w-4 mr-2'/>
          Cancel
        </Button>
        ):
        (
          <Button onClick={onClick} variant="ghost">

            <Pencil className='h-4 w-4 mr-2'/>
            Edit
          </Button>

        )}

        { !isEditting ? (
          imageUrl && (
            <div className="relative">
              <Image
                height={200}
                width={200}
                src={imageUrl}
                alt="Upload"
              />
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
                      endpoint="profileImage"
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