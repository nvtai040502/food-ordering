import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRightCircle } from "lucide-react";

const Header = () => {
  return ( 
    <div className="grid grid-cols-2">

      <div className=" flex flex-col gap-6">
        
        <h1 className="text-4xl font-semibold">
          Everything<br />
          is better<br />
          with a&nbsp;
          <span className="text-primary">
            Pizza
          </span>
        </h1>

        <p className=" text-sm">
          Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life
        </p>

        <div className="flex gap-x-6">
          <Button className="uppercase gap-2">
            <p>Order Now</p>
             <ArrowRightCircle />
          </Button>
          <Button variant="outline" className=" border-0 gap-2 font-semibold">
            <p>Learn More</p>
             <ArrowRightCircle />
          </Button>
        </div>

      </div>

      <div className="relative hidden md:block">
        <Image src="/pizza.png" alt="pizza" layout={"fill"} objectFit={"contain"}/>
      </div>

    </div>
   );
}
 
export default Header;