import { OrderWithMenuItems } from "@/type";
import axios from "axios";

interface getTotalPriceProps{
  orders: OrderWithMenuItems[]
}
const getTotalPrice = async ({
  orders
}: getTotalPriceProps
) => {
  const updatedOrders = await Promise.all(
    orders.map(async (order) => {
      const response = await axios.get(`/api/menu/menu-items/${order.menuItem?.id}/orders/${order.id}`);
      const { amount: updatedAmount } = response.data;
      return { ...order, amount: updatedAmount }; 
    })
  );

  const totalPrice = updatedOrders.reduce((total, updatedOrder) => {
    const orderAmount = updatedOrder.amount || 0; // Added null check
    const menuItemPrice = updatedOrder.menuItem?.basePrice || 0;
    return total + orderAmount * menuItemPrice;
  }, 0);

  return totalPrice
}
 
export default getTotalPrice;