import { Separator } from "@/components/ui/separator";
import { OrderWithMenuItems } from "@/type";
import OrderDetail from "./order-detail";
import { formatPrice } from "@/lib/fortmat-price";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface YourOrderProps {
  orders: OrderWithMenuItems[]
}
const YourOrder = ({
  orders
}: YourOrderProps
) => {
  const subtotal = orders.reduce((total, order) => {
    const orderAmount = order.amount || 0; 
    const menuItemPrice = order.menuItem?.basePrice || 0;
    return total + orderAmount * menuItemPrice;
  }, 0);

  const shipping = 12
  return ( 
    <div className="flex flex-col gap-2">
      
      <h1>
        Your Order
      </h1>

      <div className=" flex justify-between">
        <h2>Product</h2>
        <h2>Subtotal</h2>
      </div>

      <Separator className="border-2"/>

      <div>
        {orders.map((order) => (
          <div key={order.id} className="border-b py-4">
            <OrderDetail order={order} menuItem={order.menuItem!}/>
          </div>
        ))}

        <div className="flex justify-between border-b py-4"> 
          <p>Subtotal</p>
          <p>{formatPrice(subtotal)}</p>
        </div>
        
        <div className="flex justify-between border-b py-4"> 
          <p>Shipping</p>
          <p>{formatPrice(shipping)}</p>
        </div>

        <div className="flex justify-between border-b-4 py-4"> 
          <p>Total</p>
          <p>{formatPrice(shipping + subtotal)}</p>
        </div>
      </div>

      <Link href="/order-complete" className="py-2">
          <Button size="lg" className="w-full">
            <h2 className=" text-base">Payment on delivery</h2>
          </Button>
        </Link>

    </div>
   );
}
 
export default YourOrder;