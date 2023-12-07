"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { MenuItem } from "@prisma/client";
import axios from "axios";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AddToCartProps{
  menuItem: MenuItem
}
const AddToCart = ({
  menuItem
}: AddToCartProps
) => {
  const router = useRouter()
  const {toast} = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const addToCart = async (quantity: number) => {
    setIsLoading(true)
    try {
      await axios.post(`/api/menu/menu-items/${menuItem.id}/orders`, {amount: quantity});
      toast({title: "Add to cart success"})
      router.refresh()
    } catch (error) {
      console.log("[Add_to_Cart_Error]", error);
    } finally {
      setIsLoading(false)
    }
  };

  const [quantity, setQuantity] = useState(1)
  const onPlus = () => {
    setQuantity(quantity + 1)
  }

  const onMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setQuantity(value);
    }
  };

  return ( 
    <div className="flex justify-between gap-8">
      <div className="flex gap-2 items-center">
        
        <Button onClick={onMinus} size="sm" variant="secondary"><Minus className="h-4 w-4"/></Button>
        <Input
          className="text-center"
          value={quantity.toString()}
          type="number"
          onChange={handleInputChange}
        />
        <Button onClick={onPlus} size="sm" variant="secondary"><Plus className="h-4 w-4"/></Button>
      </div>
      <div className=" w-full">
        <Button 
          className="w-full" 
          size="lg" 
          onClick={() => addToCart(quantity)}
          disabled={isLoading}
        >
            Add To Cart
        </Button>
      </div>
    </div>
   );
}
 
export default AddToCart;