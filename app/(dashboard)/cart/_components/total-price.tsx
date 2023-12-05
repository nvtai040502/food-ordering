"use client"
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/fotmat-price";
import { OrderWithMenuItems } from "@/type";
import { MenuItem, Order } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

interface TotalPriceProps {
  orders: OrderWithMenuItems[];
}

const TotalPrice = ({ orders }: TotalPriceProps) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const shipping = 14
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const updatedOrders = await Promise.all(
          orders.map(async (order) => {
            const response = await axios.get(`/api/menu/menu-items/${order.menuItem?.id}/orders/${order.id}`);
            const { amount: updatedAmount } = response.data;
            return { ...order, amount: updatedAmount }; 
          })
        );

        const newTotalPrice = updatedOrders.reduce((total, updatedOrder) => {
          const orderAmount = updatedOrder.amount;
          const menuItemPrice = updatedOrder.menuItem?.basePrice || 0;
          return total + orderAmount * menuItemPrice;
        }, 0);

        setTotalPrice(newTotalPrice); 
      } catch (error) {
        console.error("Error fetching updated order amounts:", error);
      }
    };

    fetchOrderData(); 
  }, [orders]);

  return (
    <div className="flex flex-col gap-4 justify-center ">
      <h1 className=" text-xl border-b-4">
        Cart Total
      </h1>

      <div className="flex justify-between items-center border-b">
        <h2>
          Subtotal
        </h2>
        <p>
          {formatPrice(totalPrice)}
        </p>
      </div>

      <div className="flex justify-between items-center border-b">
        <h2>
          Shipping
        </h2>
        <p>
          {formatPrice(shipping)}
        </p>
      </div>

      <div className="flex justify-between items-center border-b-4">
        <h2>
          Total
        </h2>
        <p>
          {formatPrice(shipping + totalPrice)}
        </p>
      </div>

      <Button size="lg">
        <h2 className="text-xl">
        PROCEED TO CHECKOUT
        </h2>
      </Button>

    </div>
  )
};

export default TotalPrice;
