"use client"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import FormMenuItemSetup from "./form-setup";

const EditMenuItemModal = () => {
  
  const {isOpen, onClose, type, data} = useModal()
  const isModalOpen = isOpen && type === "editMenuItem"
  return ( 
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-screen-md">
        <DialogTitle className="flex justify-center text-primary">
          Menu Item
        </DialogTitle>
          
        <FormMenuItemSetup categories={data.categories} menuItem={data.menuItem}/>
          
      </DialogContent>
    </Dialog>
   );
}
 
export default EditMenuItemModal;