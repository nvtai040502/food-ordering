import { Category, MenuItem } from "@prisma/client";
import FormDescription from "./form-description";
import FormImage from "./form-image";
import FormCategory from "./form-category";
import { db } from "@/lib/db";
import FormName from "./form-name";
import FormBasePrice from "./form-baseprice";
import FormSizes from "./form-sizes";


interface FormMenuItemSetupProps {
  menuItem: MenuItem
  formType: "name" | "description" | "category" | "image" | "basePrice" | "sizes"
}
const FormMenuItemSetup = async ({
  menuItem, 
  formType,
}:FormMenuItemSetupProps
  ) => {
    
  const category = await db.category.findUnique({
    where: {
      id: menuItem.categoryId
    }
  })

  if (!category) {
    return null
  }

  const categories = await db.category.findMany()

  const sizes = await db.size.findMany({
    where: {
      menuItemId: menuItem.id
    }, orderBy: {
      order: "asc"
    }
  })

  return ( 
    <div className='border rounded-md p-4'>
      {formType === "name" && <FormName menuItem={menuItem}/>}
      {formType === "description" && <FormDescription menuItem={menuItem} />}
      {formType === "image" && <FormImage menuItem={menuItem} />}
      {formType === "category" && <FormCategory menuItem={menuItem} category={category} categories={categories}/>}
      {formType === "basePrice" && <FormBasePrice menuItem={menuItem} />}
      {formType === "sizes" && <FormSizes menuItem={menuItem} sizes={sizes}/>}
    </div>
   );
}
 
export default FormMenuItemSetup;