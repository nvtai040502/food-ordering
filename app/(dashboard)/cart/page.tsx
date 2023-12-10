import OrdersRendering from "./_components/orders-rendering";
import TotalPrice from "./_components/total-price";
import { getOrdersWithMenuItems } from "@/action/get-orders";


const CartPage = async () => {
  const ordersWithMenuItems = await getOrdersWithMenuItems()
  
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
