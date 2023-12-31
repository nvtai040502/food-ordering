import { Button } from "../../ui/button";
import Link from "next/link";
import { UserButton, auth } from "@clerk/nextjs";
import { ModeToggle } from "../../mode-toggle";
import { ModeMobile } from "./mode-mobile";
import { getOrdersWithMenuItems } from "@/action/get-orders";
import { OrderWithMenuItems } from "@/type";
import CartHover from "./cart-hover";


const NavbarShoppingMode = async () => {
  const { userId } = auth()
  let ordersWithMenuItems:OrderWithMenuItems[] = []
  if (userId) {
    ordersWithMenuItems = await getOrdersWithMenuItems()
  }
  return ( 
    <div className=" flex w-full justify-between items-center">
      
      <div className="hidden md:flex gap-8 items-center">
        
        <h1 className="hidden md:flex uppercase text-primary">
          Food&nbsp; 
          <span>ordering
          </span>
        </h1>

        <div className="flex gap-2">
          <Link href="/">
            <Button variant="ghost"> Hone </Button>
          </Link>
          
        </div>
      
      </div>

      <div className="md:hidden">
        <ModeMobile />
      </div>

      
        {userId ? (
          // If Login
          <div className="flex gap-2 items-center">
              
            <Link href="/setting/profile">
              <Button variant="ghost">
                Setting Mode
              </Button>
            </Link>

            <ModeToggle />
            <UserButton afterSignOutUrl="/" />
            <CartHover orders={ordersWithMenuItems}/>


          </div>
            
          ) : (
            <div className=" flex gap-2 ">
              {/* If not login yet */}
              <Link href="/sign-in">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="secondary">Register</Button>
              </Link>
              <ModeToggle />
            </div>
          )}
           

    </div>
   );
}
 
export default NavbarShoppingMode;