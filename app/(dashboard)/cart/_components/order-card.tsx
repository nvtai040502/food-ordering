"use client"
import NoImageRendering from "@/components/no-image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useModal } from "@/hooks/use-modal-store";
import { formatPrice } from "@/lib/fortmat-price";
import { MenuItem, Order } from "@prisma/client";
import axios from "axios";
import { Minus, Plus, Trash, XCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface OrderCardProps {
  menuItem: MenuItem
  order: Order
}
const OrderCard = ({
  menuItem,
  order
}: OrderCardProps
) => {
  const {toast} = useToast()
  const router = useRouter()

  const [amount, setAmount] = useState(order.amount); // Initialize 'amount' with order amount
  const onPlus = () => {
    try {
      const updatedAmount = amount + 1;
      axios.patch(`/api/menu/menu-items/${menuItem.id}/orders/${order.id}`, { amount: updatedAmount })
      setAmount(updatedAmount); // Update 'amount' in the state
      router.refresh()
    } catch(error) {
      handleOrderError(error);
    }
  }

  const onMinus = () => {
    if (amount > 1) {
      try {
        const updatedAmount = amount - 1;
        axios.patch(`/api/menu/menu-items/${menuItem.id}/orders/${order.id}`, { amount: updatedAmount });
        setAmount(updatedAmount); // Update 'amount' in the state
        router.refresh()
      } catch (error) {
        handleOrderError(error);
      }
    } else {
      toast({
        title: "Minimum quantity reached",
        description: "Quantity cannot be less than 1",
      });
    }
  };

  const handleOrderError = (error: unknown) => {
    toast({
      title: 'Something went wrong',
      description: `Error: ${error}`,
    });
  };
  
  const { onOpen } = useModal()

  return ( 

    <div className="flex items-center gap-4 justify-between border-b">

      <div className="flex items-center w-2/4 gap-4">
        <Button variant="ghost" size="icon" onClick={() => {onOpen("deleteOrder", {menuItem, order})}}>
          <XCircle />
        </Button>
        
        <div className="relative aspect-video h-32 w-32">
          {menuItem.imageUrl ? (
            <Image src={menuItem.imageUrl} alt={menuItem.name} layout="fill" objectFit="contain" />
          ): (
            <NoImageRendering />
          )}
        </div>
        
        <h2 className="text-xl font-medium">
          {menuItem.name}
        </h2>
      </div>

      
    
      <div className="flex gap-6 items-center justify-between">
        <div className=" font-medium">
          {formatPrice(menuItem.basePrice || 0)}
        </div>
        <div className=" flex items-center">
          <Button variant="ghost" onClick={onMinus}>
            <Minus />
          </Button>
          {amount}
          <Button variant="ghost" onClick={onPlus}>
            <Plus />
          </Button>
        </div>
        <div className=" font-medium">
          {formatPrice(menuItem.basePrice || 0 * amount)}
        </div>
      </div>

      

    </div>
   );
}
 
export default OrderCard;