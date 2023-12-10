"use client"
import { ShoppingCart } from "lucide-react";
import { Button } from "../../../ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../../ui/hover-card";
import { OrderWithMenuItems } from "@/type";
import OrderCard from "./order-card";
import { useEffect, useState } from "react";
import getTotalPrice from "@/action/get-total-price";
import { formatPrice } from "@/lib/fortmat-price";
import Link from "next/link";

interface CartHoverProps {
  orders: OrderWithMenuItems[];
}

const CartHover = ({ orders }: CartHoverProps) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const newTotalPrice = await getTotalPrice({ orders });
        setTotalPrice(newTotalPrice);
      } catch (error) {
        console.error("Error fetching updated order amounts:", error);
      } 
    };

    fetchOrderData();
  }, [orders]);

  return ( 
    <HoverCard openDelay={50} closeDelay={50}>
      <HoverCardTrigger asChild>
        <Link href="/cart">
          <Button variant="outline" size="sm"> <ShoppingCart /> </Button>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="flex flex-col gap-4 w-80">
        {orders.length > 0 ? (
          <>
            {orders.map((order) => (
              <div key={order.id}>
                {order.menuItem && (
                  <OrderCard menuItem={order.menuItem} order={order} />
                )}
              </div>
            ))}
            <p className="text-center border-b border-t font-medium p-2">
              Subtotal: {formatPrice(totalPrice)}
            </p>
            <Link href="/cart">
              <Button className="w-full">View Cart</Button>
            </Link>
            <Link href="/checkout">
              <Button className="w-full">Payment</Button>
            </Link>
          </>
        ) : (
          <p className=" text-center">No products in the cart.</p>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};
 
export default CartHover;
