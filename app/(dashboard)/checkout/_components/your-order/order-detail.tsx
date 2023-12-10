import { formatPrice } from "@/lib/fortmat-price";
import { MenuItem, Order } from "@prisma/client";

interface OrderDetailProps {
  order: Order
  menuItem: MenuItem
}
const OrderDetail = ({
  order,
  menuItem
}: OrderDetailProps
) => {
  const subtotal = order.amount * menuItem.basePrice

  return ( 
    <div className=" flex justify-between">
      <p>
        {menuItem.name} x {order.amount}
      </p>
      <p>
        {formatPrice(subtotal)}
      </p>
    </div>
   );
}
 
export default OrderDetail;