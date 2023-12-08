"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import { useRouter } from "next/navigation";


const DeleteSizeModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  

  const isModalOpen = isOpen && type === "deleteSize";
  const { toast } = useToast()
  
  const router = useRouter()
  const onSubmit = async () => {
    try {
      await axios.delete(`/api/menu/menu-items/${data.menuItem?.id}/sizes/${data.size?.id}`)
      
      toast({
        title: "Delete Size Success",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: `Something went wrong`,
        description: `Error: ${error}`
      });
    } finally {
      onClose()
    } 
  }

  return ( 
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this size.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
        
      </AlertDialogContent>
    </AlertDialog>
   );
}
 
export default DeleteSizeModal;