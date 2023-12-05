import { MenuItem } from "@prisma/client";
import axios from "axios";


interface AddToCartProps {
  menuItem: MenuItem
}
const AddToCart = ({
  menuItem
}: AddToCartProps
) => {
  try {
    axios.post(`/api/menu/menu-items/${menuItem.id}/orders`)
  } catch(error) {
    console.log("[Add_to_Cart_Error]", error)
  }
}

export default AddToCart