"use client"
import { Category, MenuItem } from "@prisma/client";
import EditCategory from './edit-category';
import DeleteCategory from './delete-category';
import { db } from "@/lib/db";
import MenuItemCard from "../../menu-items/_components/card";

import TestA from "../../menu-items/_components/test";
import { DragDropContext, Draggable } from "@hello-pangea/dnd";
interface CategoryRenderingProps {
  category: Category
  menuItems: MenuItem[]
  index: number
}
const CategoryRendering = ({
  category,
  menuItems,
  index
}: CategoryRenderingProps
) => {
  
  return ( 
    <Draggable draggableId={category.id} index={index}>
      {(provided) => (
        <div 
          {...provided.draggableProps}
          ref={provided.innerRef}
          className=" border-4 p-4 flex flex-col gap-4">
          
          <div className='flex flex-col justify-center items-center'>
            <div 
              {...provided.dragHandleProps}
              className='font-medium text-2xl text-primary'>
              {category.name}
            </div>
            <div className=' flex justify-center items-center gap-4'>
              <EditCategory category={category}/>
              <DeleteCategory category={category} />
            </div>
          </div>
            <TestA category={category} menuItems={menuItems} index={index} />
        </div>
      )}
    </Draggable>
   );
}
 
export default CategoryRendering;