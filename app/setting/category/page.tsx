import { db } from "@/lib/db";
import CategoryRendering from "./_component/category-rendering";

const CategoryPage  = async () => {
  const categories = await db.category.findMany()
  return (
    <div className="flex flex-col gap-8"> 
      Create
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryRendering category={category} />
          </div>
        ))}
      </div>

    </div>
   );
}
 
export default CategoryPage ;