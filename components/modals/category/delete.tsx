import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import { useRouter } from "next/navigation";


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
        title: `Something went wrong.`,
        description: `Error: ${error}`
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
          Are you sure, you want to delete category "{data.category?.name}."
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