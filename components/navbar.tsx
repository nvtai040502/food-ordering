"use client"
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import { ModeMobile } from "./mode-mobile";


const Navbar = () => {
  const user = useUser()
  
  return ( 
    <div className=" flex justify-between items-center">
      
      <div className="hidden md:flex gap-8 items-center">
        
        <h1 className="hidden md:flex uppercase text-primary">
          Food&nbsp; 
          <span>ordering
          </span>
        </h1>

        <div className="flex gap-2">
          <Button variant="ghost"> Hone </Button>
          <Button variant="ghost"> Menu </Button>
          <Button variant="ghost"> About </Button>
          <Button variant="ghost"> Contact </Button>
        </div>
      
      </div>

      <div className="md:hidden flex">
        <ModeMobile />
      </div>

      <div className="flex gap-2">
        {user.isSignedIn ? (
            <div className="flex items-center">
              {/* If login */}
              <Link href="/profile">
                <Button variant="ghost">
                  Hello, {user.user.firstName}
                </Button>
              </Link>
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
            </div>
          )}
          <ModeToggle />
          <Button variant="ghost"> <ShoppingCart /> </Button>
      </div>

    </div>
   );
}
 
export default Navbar;