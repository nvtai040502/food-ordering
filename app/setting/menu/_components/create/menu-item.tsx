"use client"
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Category } from "@prisma/client";


const CreateMenuItem = ({categories}: {categories: Category[]}) => {
  const { onOpen } = useModal()
  return ( 
    <Button 
      onClick={() => {onOpen("createMenuItem", {categories})}}
      variant="outline"
      className="w-full border-none"  
    >
      New MenuItem
    </Button>
   );
}
 
export default CreateMenuItem;