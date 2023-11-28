"use client"
import { db } from "@/lib/db";
import FormImageSetup from "./form-image";
import FormTextSetup from "./form-text";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";

const CreateOrEditMenuItemModal = () => {
  
  const {isOpen, onClose, type, data} = useModal()
  const isModalOpen = isOpen && type === "createOrEditMenuItem"
  return ( 
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-screen-md">
        <DialogTitle className="flex justify-center text-primary">
          Menu Item
        </DialogTitle>


          
        <FormTextSetup categories={data.categories} menuItem={data.menuItem}/>
          
      </DialogContent>
    </Dialog>
   );
}
 
export default CreateOrEditMenuItemModal;