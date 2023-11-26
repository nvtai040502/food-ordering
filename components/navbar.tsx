"use client"
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const user = useUser()
  
  return ( 
    <div className="w-full max-w-4xl  p-4 ">
      <div className=" flex justify-between items-center">
        
        <div className="flex gap-8 items-center">
          
          <h1>
            Food ordering
          </h1>

          <div className="flex gap-2">
            <Button variant="ghost"> Hone </Button>
            <Button variant="ghost"> Hone </Button>
            <Button variant="ghost"> Hone </Button>
            <Button variant="ghost"> Hone </Button>
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
                  <Button variant="outline">Register</Button>
                </Link>
              </div>
            )}
          
            <Button variant="ghost"> <ShoppingCart /> </Button>
        </div>

      </div>
    </div>
   );
}
 
export default Navbar;