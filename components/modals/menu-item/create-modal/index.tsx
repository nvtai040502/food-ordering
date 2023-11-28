"use client"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import FormMenuItemSetup from "./form-setup";

const CreateMenuItemModal = () => {
  
  const {isOpen, onClose, type, data} = useModal()
  const isModalOpen = isOpen && type === "createMenuItem"
  return ( 
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-screen-md">
        <DialogTitle className="flex justify-center text-primary">
          Menu Item {data.categories?.length}
        </DialogTitle>

        <FormMenuItemSetup categories={data.categories}/>
          
      </DialogContent>
    </Dialog>
   );
}
 
export default CreateMenuItemModal;