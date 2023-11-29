import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import FormSetup from "./form-setup";






const EditCategoryModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "editCategory";
  

  return ( 
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>
          Category Name
        </DialogTitle>

        <FormSetup category={data.category}/>
      </DialogContent>
    </Dialog>
   );
}
 
export default EditCategoryModal;