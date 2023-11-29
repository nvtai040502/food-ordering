"use client"

import { Category, MenuItem } from "@prisma/client";
import FormImageSetup from "./form-image";
import FormTextSetup from "./form-text";

interface FormMenuItemSetupProps {
  categories?: Category[]
  menuItem?: MenuItem
}
const FormMenuItemSetup = ({
  categories,
  menuItem
}: FormMenuItemSetupProps
) => {
  return (
    
    <div className="grid grid-cols-3 w-full gap-2">

      <div className="col-span-1 flex justify-center">
        <FormImageSetup menuItem={menuItem}/>
      </div>
      
      <div className="col-span-2">
        <FormTextSetup categories={categories} menuItem={menuItem}   />
      </div>
    </div> 
   );
}
 
export default FormMenuItemSetup;