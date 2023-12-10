import { db } from "@/lib/db";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import FormCheckout from "./_components/billing-details/form-details";
import YourOrder from "./_components/your-order";
import BillingDetails from "./_components/billing-details";

const CheckoutPage = async () => {
  const {userId} = auth()
  if (!userId) {
    return redirectToSignIn()
  }
  const profile = await db.profile.findUnique({
    where: {
      userId: userId
    }
  })
  if (!profile) {
    return redirectToSignIn()
  }

  const orders = await db.order.findMany({
    where: {
      profileId: profile.id
    }
  })

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
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-xl text-primary">
        Checkout Details
      </h1>

      <div className="grid grid-cols-5 gap-8">
        
        <div className=" col-span-3 p-4">
          <BillingDetails profile={profile} />
        </div>

        <div className=" col-span-2 border p-4">
          <YourOrder orders={ordersWithMenuItems}/>
        </div>

      </div>
      
    </div>
   );
}
 
export default CheckoutPage;