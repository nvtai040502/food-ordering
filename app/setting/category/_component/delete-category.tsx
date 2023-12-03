"use client"

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Category } from "@prisma/client";

const DeleteCategory = ({
  category
}: {category: Category}
) => {
  const {onOpen } = useModal()
  return ( 
    <div>
      <Button 
        onClick={() => onOpen("deleteCategory", {category})}
        size="sm" 
        variant="ghost" 
        >
          Delete
      </Button>
    </div>
   );
}
 
export default DeleteCategory;