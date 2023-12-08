import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import FormMenuItemSetup from "../_components/form-setup";

interface MenuItemIdSettingPageProps {
  params: { menuItemId: string }
}
const MenuItemIdSettingPage = async ({
  params
}: MenuItemIdSettingPageProps
) => {
  const menuItem = await db.menuItem.findUnique({
    where: {
      id: params.menuItemId
    }
  })

  if (!menuItem) {
    return redirect("/setting/menu")
  }

  return ( 
    <div className="flex flex-col gap-8">
      
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium">
          Menu Item Setup
        </h1>
        <div className="text-sm">
          Complete all fields 
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="grid md:grid-cols-2 gap-16 grid-cols-1 w-full ">
          
          <div className="flex flex-col gap-y-6">
            
            <FormMenuItemSetup menuItem={menuItem} formType="name" />
            <FormMenuItemSetup menuItem={menuItem} formType="description" />
            <FormMenuItemSetup menuItem={menuItem} formType="image" />
            <FormMenuItemSetup menuItem={menuItem} formType="category" />
          </div>

        
          <div className="flex flex-col gap-y-6">

            <FormMenuItemSetup menuItem={menuItem} formType="sizes" />
            <FormMenuItemSetup menuItem={menuItem} formType="basePrice" />

          </div>

        </div>
      </div>
    </div>
   );
}
 
export default MenuItemIdSettingPage;