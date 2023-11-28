import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod"



const formScheme = z.object({
  name: z.string().min(2, {
    message: "Name category must be at least 2 characters"
  })
})


const EditCategoryNameModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: ""
    }
  })

  const isModalOpen = isOpen && type === "editCategoryName";
  const { toast } = useToast()
  const {isSubmitting}  = form.formState
  const router = useRouter()

  const onEditSubmit = async (values: z.infer<typeof formScheme>) => {
    try {
      await axios.patch(`/api/category/${data.category?.id}`, values)
      
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
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle className="">
          Category Name {data.category?.name}
        </DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onEditSubmit)} className="space-y-4">
            <div>
              <FormField
                disabled={isSubmitting}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    
                    <FormControl>
                      <Input 
                      className='bg-secondary'
                      placeholder="Enter category name" 
                      {...field} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isSubmitting}>Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
   );
}
 
export default EditCategoryNameModal;