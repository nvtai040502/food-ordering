import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import FormSetup from "./form-setup";






const EditSizeModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "editSize";
  
  return ( 
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle className="text-center">
          {data.size?.name}
        </DialogTitle>

        <FormSetup size={data.size} menuItem={data.menuItem}/>
      </DialogContent>
    </Dialog>
   );
}
 
export default EditSizeModal;