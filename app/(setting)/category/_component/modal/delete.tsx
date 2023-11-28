import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod"


const DeleteCategoryModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "deleteCategory";
  const { toast } = useToast()
  
  const router = useRouter()

  const onSubmit = async () => {
    try {
      await axios.delete(`/api/category/${data.category?.id}`)
      
      toast({
        title: "Delete Category Success",
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
        <DialogTitle>
          Delete Category
        </DialogTitle>
        <DialogDescription>
          Are you sure, you want to delete category "{data.category?.name}"
        </DialogDescription>
        <DialogFooter>
          <Button onClick={onSubmit} variant="destructive">
            Delete
          </Button>
        </DialogFooter>
        
      </DialogContent>
    </Dialog>
   );
}
 
export default DeleteCategoryModal;