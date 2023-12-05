import { OrderWithMenuItems } from "@/type";
import OrderCard from "./order-card";

interface OrdersRenderingProps {
  orders: OrderWithMenuItems[];
}

const OrdersRendering = ({ orders }: OrdersRenderingProps) => {
  return (
    <div className="">
      <div className=" text-xl flex justify-between items-center border-b-4">
        <div>Product</div>
        <div className="flex gap-8 items-center justify-between">
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        {orders.map((order) => (
          <div key={order.id}>
            {order.menuItem && (
              <OrderCard menuItem={order.menuItem} order={order} />
            )}
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersRendering;
