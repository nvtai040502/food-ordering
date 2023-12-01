"use client"
import NoImageRendering from "@/components/no-image";
import { useModal } from "@/hooks/use-modal-store";
import { CategoryWithMenuItems } from "@/type";
import {  Draggable, Droppable } from "@hello-pangea/dnd";
import { Category, MenuItem } from "@prisma/client";
import Image from "next/image";

interface MenuItemRenderingProps {
  categories: CategoryWithMenuItems[]
  category: Category
  menuItems: MenuItem[]
}

const MenuItemRendering = ({
  categories,
  category,
  menuItems,
}: MenuItemRenderingProps) => {
  const { onOpen } = useModal();

  return (
    
      <Droppable droppableId={category.id} type="card" direction="horizontal">
        {(provided) => (
          <div 
          {...provided.droppableProps} 
          ref={provided.innerRef}
          className="grid lg:grid-cols-4 grid-cols-2 sm:grid-cols-3 gap-4">
          {menuItems.map((menuItem, index) => (
            
          <Draggable
            draggableId={menuItem.id}
            index={index}
          >
            {(provided) => (
              <div 
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                role="button"
                onClick={() => {onOpen("editMenuItem", { categories, menuItem })}} 
                className="group hover:bg-slate-200/90 dark:hover:bg-slate-600 hover:shadow-sm transition overflow-hidden border rounded-lg p-4 flex flex-col gap-4"
              >
                
                <div
                  

                  className="relative aspect-video"
                >
                  {menuItem.imageUrl ? (
                    <Image src={menuItem.imageUrl} layout="fill" objectFit="contain" alt={`Image ${menuItem.name}`} />
                  ) : (
                    <NoImageRendering />
                  )
                  } 
                  </div>
                  
                <div
                  className="flex flex-col items-center justify-center gap-2"
                  >
                  <h2 className="text-lg font-bold">{menuItem.name}</h2>
                  <p className="text-sm">{menuItem.description}</p>  
                  
                </div>
              </div>
            )}
          </Draggable>
          ))} 

          {provided.placeholder}

        </div>
        )}
      </Droppable>
    
  );
};

export default MenuItemRendering;
