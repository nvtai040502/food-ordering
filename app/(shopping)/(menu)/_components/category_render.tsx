import { CategoryWithMenuItems } from "@/type";
import MenuItemRendering from "./menu-item-render";
import { getMenuItems } from "@/action/get-menu-items";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

  const menuItems = await getMenuItems({
    categoryId: category.id,
    ...searchParams
  })

  return ( 
      <div className="flex flex-col gap-4">
        <Link href={`/category/${category.id}`}>
          <Button variant="link" className="w-full">
            <h1 className="text-primary text-2xl text-center">
              {category.name}
            </h1>
          </Button>
        </Link>
        
        <div className="grid gap-4 grid-cols-4">
          {menuItems.map((meuItem) => (
            <div key={meuItem.id}>
              <MenuItemRendering menuItem={meuItem} />
            </div>
          ))}
        </div>
        {menuItems.length === 0 && (
        <div className="text-center">
          No menu items found
        </div>
      )}

      </div>
   );
}
 
export default CategoryRendering;