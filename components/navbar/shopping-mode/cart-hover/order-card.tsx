import Loading from "@/components/loading";
import NoImageRendering from "@/components/no-image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { formatPrice } from "@/lib/fortmat-price";
import { MenuItem, Order } from "@prisma/client";
import axios from "axios";
import { XCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface OrderCardProps {
  order: Order
  menuItem: MenuItem
}
const OrderCard = ({
  order,
  menuItem
}: OrderCardProps
) => {
  const { toast } = useToast()
  const router = useRouter()

  const [isDelete, SetIsDelete] = useState(false)
  const onDelete = async () => {
    SetIsDelete(true)
    try {
      await axios.delete(`/api/menu/menu-items/${menuItem.id}/orders/${order.id}`)
      toast({
        title: "Delete Order Success",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: `Something went wrong`,
        description: `Error: ${error}`
      });
    } finally {
      SetIsDelete(false)
    }
  } 
  return ( 
    <div className="relative">
      {isDelete && (
        <Loading />
      )}
      <div className="flex items-center gap-4 justify-between">
        <div className="relative aspect-video h-20 w-20">
          {menuItem?.imageUrl ? (
            <Image src={menuItem.imageUrl} alt={menuItem.name} layout="fill" objectFit="contain" />
          ): (
            <NoImageRendering />
          )}
        </div>
        
        <div className="whitespace-normal truncate text-center">
          <p className="truncate">
            {menuItem?.name}
          </p>
          
          <p>
            {order.amount} x {formatPrice((menuItem.basePrice || 0) * order.amount)}  
          </p>  

        </div>

        <Button variant="outline" size="sm" onClick={onDelete}> <XCircle className="h-4 w-4"/> </Button>
      </div>
    </div>
   );
}
 
export default OrderCard;