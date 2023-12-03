import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import { useRouter } from "next/navigation";


const DeleteMenuItemModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "deleteMenuItem";
  const { toast } = useToast()
  
  const router = useRouter()

  const onSubmit = async () => {
    try {
      await axios.delete(`/api/menu/menu-items/${data.menuItem?.id}`)
      
      toast({
        title: "Delete Menu Item Success",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: `Something went wrong ${error}`,
      });
    } finally {
      onClose()
    } 
  }

  return ( 
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>
          Delete Menu Item
        </DialogTitle>
        <DialogDescription>
          Are you sure, you want to delete Menu Item "{data.menuItem?.name}"
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
 
export default DeleteMenuItemModal;