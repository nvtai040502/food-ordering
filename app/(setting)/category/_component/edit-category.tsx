"use client"

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Category } from "@prisma/client";

const EditCategory = ({
  category
}: {category: Category}
) => {
  const {onOpen } = useModal()
  return ( 
    <div>
      <Button size="sm" variant="ghost" onClick={() => onOpen("editCategory", {category})}>Edit</Button>
    </div>
   );
}
 
export default EditCategory;