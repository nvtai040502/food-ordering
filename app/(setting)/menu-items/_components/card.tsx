"use client"
import NoImageRendering from "@/components/no-image";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Category, MenuItem } from "@prisma/client";
import Image from "next/image";

interface MenuItemCardProps {
  menuItem: MenuItem
  categories: Category[];
}

const MenuItemCard = ({
  menuItem,
  categories,
}: MenuItemCardProps) => {
  const { onOpen } = useModal();

  return ( 
    <div onClick={() => onOpen("createOrEditMenuItem", "edit", { categories, menuItem })} className="group hover:bg-slate-200/90 dark:hover:bg-slate-600 hover:shadow-sm transition overflow-hidden border rounded-lg p-4 flex flex-col gap-4">
      <div className="relative aspect-video">
        {menuItem.imageUrl ? (
          <Image src={menuItem.imageUrl} layout="fill" objectFit="contain" alt={`Image ${menuItem.name}`} />
        ) : (
          <NoImageRendering />
        )
        } 
        </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-lg font-bold">{menuItem.name}</h2>
        <p className="text-sm">{menuItem.description}</p>  
      </div>

      
    </div>
  );
};

export default MenuItemCard;
