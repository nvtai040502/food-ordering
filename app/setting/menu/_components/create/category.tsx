"use client"
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";


const CreateCategory = () => {
  const { onOpen } = useModal()
  return ( 
    <Button 
      onClick={() => {onOpen("createCategory")}}
      variant="outline"
      className="w-full border-none"
    >
      
      New Category
    </Button>
   );
}
 
export default CreateCategory;