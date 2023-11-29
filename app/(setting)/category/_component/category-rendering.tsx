"use client"
import { Button } from '@/components/ui/button';
import { Category } from "@prisma/client";
import { useModal } from '@/hooks/use-modal-store';


const CategoryRendering = ({category}: {category: Category}) => {
  const {onOpen } = useModal()
  return ( 
    <div className=" bg-background border">
      <div className='flex justify-between items-center p-4'>
        <div className='font-medium'>
          {category.name}
        </div>
        <div className=' flex justify-center items-center gap-4'>
          <Button size="sm" variant="ghost" onClick={() => onOpen("editCategory", {category})}>Edit</Button>
          <Button size="sm" variant="ghost" onClick={() => onOpen("deleteCategory", {category})}>Delete</Button>
        </div>
      </div>

      

    </div>
   );
}
 
export default CategoryRendering;