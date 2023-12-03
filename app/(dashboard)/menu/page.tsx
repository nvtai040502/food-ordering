import { db } from "@/lib/db";
import CategoryRendering from "./_components/category_render";
import SearchComponet from "@/components/search";

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
    <div className=" flex flex-col gap-8">
      <div className=" flex justify-between items-center">
        <h1 className="text-2xl text-primary font-medium">
          Menu Page
        </h1>
        <SearchComponet />
      </div>
      <div className="flex flex-col gap-8">
        {categories.map((category) => (
          category.menuItems.length > 0 && (
            <div key={category.id}>
              <CategoryRendering category={category} />
            </div>
          )
        ))}
      </div>
    </div>
   );
}
 
export default MenuPage;