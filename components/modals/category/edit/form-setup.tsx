"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name category must be at least 2 characters"
  }),
})



 const FormSetup = ({category}: {category?: Category}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name,
    }
  })

  const { onClose } = useModal()
  const {isSubmitting}  = form.formState
  const router = useRouter()
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/menu/categories/${category?.id}`, values)
      
      toast({
        title: "Change Name Category Success",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong",
      });
    } finally {
      onClose()
    } 
  }
  return ( 
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                
                <FormControl>
                  <Input
                  placeholder="Enter category name" 
                  {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
          
        <Button disabled={isSubmitting}>Save</Button>
      </form>
    </Form>
   );
 }
  
 export default FormSetup;