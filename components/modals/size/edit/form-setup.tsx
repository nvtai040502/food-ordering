"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, MenuItem, Size } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod"

const formSchema = z.object({
  name: z.string(),
  price: z.coerce.number()
})

interface FormSetupProps {
  menuItem?: MenuItem
  size?: Size
}

 const FormSetup = ({
  size,
  menuItem
}: FormSetupProps
) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: size?.name,
      price: size?.price
    }
  })

  const { onClose } = useModal()
  const {isSubmitting}  = form.formState
  const router = useRouter()
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/menu/menu-items/${menuItem?.id}/sizes/${size?.id}`, values)
      toast({
        title: "Change Name Size Success",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: `Error: ${error}`
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
            
            <Button disabled={isSubmitting}>Change</Button>
          </form>
        </Form>
   );
 }
  
 export default FormSetup;