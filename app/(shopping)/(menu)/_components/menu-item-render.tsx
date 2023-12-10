"use client"
import LoadingPage from "@/components/loading/loading-page";
import NoImageRendering from "@/components/no-image-render";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { formatPrice } from "@/lib/fortmat-price";
import { MenuItem } from "@prisma/client";
import axios from "axios";
import { BookmarkPlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MenuItemRenderingProps {
  menuItem: MenuItem;
}

const MenuItemRendering = ({ menuItem }: MenuItemRenderingProps) => {
  const router = useRouter();
  const { toast } = useToast()
  const addToCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.stopPropagation(); // Prevents the click event from propagating to the parent div
      await axios.post(`/api/menu/menu-items/${menuItem.id}/orders`, {amount: 1});
      toast({title: "Add to cart success"})
      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: `Error: ${error}`
    })

      console.log("[Add_to_Cart_Error]", error);
    }
  };

  const [isLoading, setIsLoading] = useState(false)
  const onClick = () => {
      setIsLoading(true)
      try {
        router.push(`/menu-item/${menuItem.id}`);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    };

  if (isLoading) {
    return <LoadingPage />
  }
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
      <div className="flex flex-col gap-2 whitespace-normal truncate">
        <h2 className="text-lg font-bold text-center truncate">
          {menuItem.name}
        </h2>

        <div className="flex justify-between items-center">
          <div>
            {formatPrice(menuItem.basePrice || 0)}
          </div>
          <Button variant="outline" onClick={addToCart}>
            <BookmarkPlus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemRendering;
