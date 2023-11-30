"use client"

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Category } from "@prisma/client";
const CreateMenuItem = ({categories}: {categories: Category[]}) => {
  const { onOpen } = useModal()
  return ( 
    <div>
      <Button 
        onClick={() => onOpen("createMenuItem", {categories})}
        size="sm"
        variant="ghost"  
        className='w-full'
      >
        New Menu Item
      </Button>
    </div>
   );
}
 
export default CreateMenuItem;