import Image from "next/image";
import { Button } from "./ui/button";

const MenuCard = () => {
  return ( 
    <div className="group hover:bg-slate-200/90 dark:hover:bg-slate-600 hover:shadow-sm transition overflow-hidden border rounded-lg p-4 flex flex-col gap-4">
      
      <div className="relative aspect-video">
        <Image src="/pizza.png" layout="fill" objectFit="contain" alt="pizza"/>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">

        <h2 className="text-lg font-bold">Pizza</h2>
        
        <p className="text-sm">
          description
        </p>

        <Button>
          Add to cart $price  
        </Button>  
      
      </div>

    </div>
   );
}
 
export default MenuCard;