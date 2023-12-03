
import { db } from "@/lib/db";
import CreateMenuItem from "./_components/create-menu-item";
import MenuItemCard from "./_components/card";


const MenuItemsPage = async () => {
  const menuItems = await db.menuItem.findMany()
  const categories = await db.category.findMany()
  return ( 
      <div>
          <CreateMenuItem categories={categories} />
          <div className="grid grid-cols-4 gap-4">
            {menuItems.map((menuItem) => (
              <div key={menuItem.id}>
                <MenuItemCard 
                  menuItem= {menuItem}
                  categories = {categories}
                />
              </div>
            ))}
          </div>
      </div>
   );
}
 
export default MenuItemsPage;