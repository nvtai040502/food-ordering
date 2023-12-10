"use client"
import NoImageRendering from "@/components/no-image-render";
import { useModal } from "@/hooks/use-modal-store";
import { CategoryWithMenuItems } from "@/type";
import {  Draggable, Droppable } from "@hello-pangea/dnd";
import { Category, MenuItem } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MenuItemRenderingProps {
  categories: CategoryWithMenuItems[]
  menuItem: MenuItem
  index: number
}

const MenuItemRendering = ({
  categories,
  menuItem,
  index
}: MenuItemRenderingProps) => {

  const router = useRouter()
  const onClick = () => {
    router.push(`/setting/menu/menu-items/${menuItem.id}`)
  }

  return (
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
          onClick={onClick} 
          className="group hover:bg-slate-200/90 dark:hover:bg-slate-600 hover:shadow-sm border rounded-lg p-4 flex flex-col gap-4 w-[180px]"
        >
          <div
            className="relative aspect-video"
          >
            {menuItem.imageUrl ? (
              <Image src={menuItem.imageUrl} layout="fill" objectFit="contain" alt={menuItem.name} />
            ) : (
              <NoImageRendering />
            )
            }
            </div>
            
          <div
            className="flex flex-col items-center justify-center gap-2 whitespace-normal truncate"
            >
            <h2 className="text-lg font-bold">{menuItem.name} </h2>
            
          </div>
        </div>
      )}
    </Draggable>
    
    
  );
};

export default MenuItemRendering;
