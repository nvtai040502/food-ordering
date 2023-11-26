"use client"
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const user = useUser()
  
  return ( 
    <div className=" flex justify-between items-center">
      
      <div className="flex gap-8 items-center">
        
        <h1 className="uppercase text-red-500">
          Food ordering
        </h1>

        <div className="flex gap-2">
          <Button variant="ghost"> Hone </Button>
          <Button variant="ghost"> Menu </Button>
          <Button variant="ghost"> About </Button>
          <Button variant="ghost"> Contact </Button>
        </div>
      
      </div>

      <div className="flex gap-2">
        {user.isSignedIn ? (
            <div className="flex items-center">
              {/* If login */}
              <UserButton afterSignOutUrl="/"/>
            </div>
          ) : (
            <div>
              {/* If not login yet */}
              <Link href="/sign-in">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="secondary">Register</Button>
              </Link>
            </div>
          )}
          <ModeToggle />
          <Button variant="ghost"> <ShoppingCart /> </Button>
      </div>

    </div>
   );
}
 
export default Navbar;