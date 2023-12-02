import { db } from "@/lib/db";
import CategoryRendering from "./_components/category_render";

const MenuPage = async () => {
  const categories = await db.category.findMany({
    include: {
      menuItems: {
        orderBy: {
          order: "asc"
        }
      }
    }, orderBy: {
      order: "asc"
    }
  })
  return ( 
    <div className="flex flex-col gap-8">
      {categories.map((category) => (
        category.menuItems.length > 0 && (
          <div key={category.id}>
            <CategoryRendering category={category} />
          </div>
        )
      ))}
    </div>
   );
}
 
export default MenuPage;