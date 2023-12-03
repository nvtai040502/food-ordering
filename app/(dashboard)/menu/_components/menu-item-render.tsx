"use client"
import NoImageRendering from "@/components/no-image";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/fotmat-price";
import { MenuItem } from "@prisma/client";
import { BookmarkPlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MenuItemRenderingProps {
  menuItem: MenuItem;
}

const MenuItemRendering = ({ menuItem }: MenuItemRenderingProps) => {
  const router = useRouter();

  const onClick = () => {
      try {
        router.push(`/menu/menu-item/${menuItem.id}`);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div
      role="button"
      className="group hover:bg-slate-200/90 dark:hover:bg-slate-600 hover:shadow-sm border rounded-lg p-4 flex flex-col gap-4 w-[200px]"
      onClick={onClick}
    >
      <div className="relative aspect-video">
        {menuItem.imageUrl ? (
          <Image src={menuItem.imageUrl} layout="fill" objectFit="contain" alt={menuItem.name} />
        ) : (
          <NoImageRendering />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-center">
          {menuItem.name}
        </h2>

        <div className="flex justify-between items-center">
          <div>
            {formatPrice(menuItem.basePrice)}
          </div>
          <Button variant="outline">
            <BookmarkPlus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemRendering;
