import { db } from "@/lib/db";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import OrdersRendering from "./_components/orders-rendering";
import TotalPrice from "./_components/total-price";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const CartPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }
  
  const profile = await db.profile.findUnique({
    where: {
      userId: userId
    }
  });

  if (!profile) {
    return redirectToSignIn();
  }

  const orders = await db.order.findMany({
    where: {
      profileId: profile.id
    }
  });

  const ordersWithMenuItems = await Promise.all(
    orders.map(async (order) => {
      const menuItem = await db.menuItem.findUnique({
        where: {
          id: order.menuItemId
        }
      });
      return { ...order, menuItem };
    })
  );
  
  return ( 
    <div>
      <h1 className="text-primary text-2xl font-medium text-center mb-8">
        Shopping Cart
      </h1>

      <div className="md:grid-cols-5 grid gap-4">
        <div className="md:col-span-3 p-4 border">
          <OrdersRendering orders={ordersWithMenuItems} />
        </div>
        <div className="md:col-span-2 p-4 border">
          <TotalPrice orders={ordersWithMenuItems} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
