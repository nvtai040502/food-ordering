"use client"
import { Category, MenuItem } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import EditCategory from "@/app/(setting)/category/_component/edit-category";
import DeleteCategory from "@/app/(setting)/category/_component/delete-category";
import MenuItemRendering from "./menu-item-render";
import { CategoryWithMenuItems } from "@/type";
interface CategoryRenderingProps {
  categories: CategoryWithMenuItems[]
  category: Category
  menuItems: MenuItem[]
  index: number
}
const CategoryRendering = ({
  categories,
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

            <MenuItemRendering 
              categories={categories}
              category={category} 
              menuItems={menuItems} 
            />
        
        </div>
      )}
    </Draggable>
   );
}
 
export default CategoryRendering;