import { Button } from "../../ui/button";
import Link from "next/link";
import { UserButton, auth } from "@clerk/nextjs";
import { ModeToggle } from "../../mode-toggle";
import { getOrdersWithMenuItems } from "@/action/get-orders";
import { OrderWithMenuItems } from "@/type";
import { ModeMobile } from "./mode-mobile";


const NavbarSettingMode = async () => {
  const { userId } = auth()
  let ordersWithMenuItems:OrderWithMenuItems[] = []
  if (userId) {
    ordersWithMenuItems = await getOrdersWithMenuItems()
  }
  return ( 
    <div className="flex w-full justify-between items-center">
      
      <div className="hidden md:flex gap-8 items-center">
        
        <h1 className="hidden md:flex uppercase text-primary">
          Food&nbsp; 
          <span>ordering
          </span>
        </h1>

        <div className="flex gap-2">
          <Link href="/setting/profile">
            <Button variant="ghost"> Profile </Button>
          </Link>
          <Link href="/setting/menu">
            <Button variant="ghost"> Menu </Button>
          </Link>  
        </div>
      
      </div>

      <div className="md:hidden">
        <ModeMobile />
      </div>

      
        
    <div className="flex gap-2 items-center">
        
      <Link href="/">
        <Button variant="ghost">
          Exit
        </Button>
      </Link>

      <ModeToggle />
      <UserButton afterSignOutUrl="/" />
        
    </div>
          
           

    </div>
   );
}
 
export default NavbarSettingMode;