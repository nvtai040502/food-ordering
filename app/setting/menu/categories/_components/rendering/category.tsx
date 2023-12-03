import { CategoryWithMenuItems } from "@/type";
import { getMenuItems } from "@/action/get-menu-items";
import MenuItemRendering from "./menu-item";
import { db } from "@/lib/db";

interface CategoryRenderingProps {
  category: CategoryWithMenuItems
  searchParams?: {
    name: string
  }
}
const CategoryRendering = async ({
  category,
  searchParams,
  
}: CategoryRenderingProps
) => {

  const categories = await db.category.findMany()

  const menuItems = await getMenuItems({
    categoryId: category.id,
    ...searchParams
  })

  return ( 
      <div className="flex flex-col gap-8">
        <h1 className="text-primary text-2xl text-center">
          {category.name}
        </h1>
        
        <div className="grid gap-4 grid-cols-4">
          {menuItems.map((menuItem) => (
            <MenuItemRendering 
              key={menuItem.id}
              categories={categories} 
              menuItem={menuItem} 
            />
          ))}
        </div>
        {menuItems.length === 0 && (
        <div className="text-center">
          No menu item found
        </div>
      )}

      </div>
   );
}
 
export default CategoryRendering;