"use client"
import { Category, MenuItem } from "@prisma/client";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import MenuItemRendering from "./menu-item-render";
import { CategoryWithMenuItems } from "@/type";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import Link from "next/link";

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
  
  const { onOpen } = useModal()

  return ( 
    <Draggable 
      draggableId={category.id}
      index={index}
    >
      {(provided) => (
        <div 
          {...provided.draggableProps}
          ref={provided.innerRef}
          className=" border-4 p-4 flex flex-col gap-4">
          
          <div className='flex flex-col justify-center items-center'>
            <Link href={`/setting/menu/categories/${category.id}`}>
              <Button variant="link">
                <div 
                  {...provided.dragHandleProps}
                  className='font-medium text-2xl text-primary'>
                  {category.name}
                </div>
              </Button>
            </Link>
            <div className=' flex justify-center items-center gap-4'>
              <Button size="sm" variant="ghost" onClick={() => onOpen("editCategory", {category})}>Edit</Button>
              <Button size="sm" variant="ghost" onClick={() => onOpen("deleteCategory", {category})}>Delete</Button>
            </div>
          </div>
            
            <Droppable 
              direction="horizontal"
              droppableId={category.id} 
              type="menuItem" 
            >
              {(provided) => (
                <ScrollArea>
                  <div 
                    {...provided.droppableProps} 
                    ref={provided.innerRef}
                    className="flex gap-4 p-8"
                  >
                    {menuItems.map((menuItem, index) => (
                      <MenuItemRendering 
                        key={menuItem.id}
                        categories={categories}
                        menuItem={menuItem} 
                        index={index}
                      />
                    ))} 

                    {provided.placeholder}
                  </div>
                  <ScrollBar orientation="horizontal"  className=" h-4"/>
                </ScrollArea>
              )}
            </Droppable>

        </div>
      )}
    </Draggable>
   );
}
 
export default CategoryRendering;