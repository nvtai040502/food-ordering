import { db } from "@/lib/db";
import CategoryRendering from "./_components/category_render";
import SearchComponent from "@/components/search";
import { getCategories } from "@/action/get-categories";

interface MenuPageProps {
  searchParams: {
    name: string;
  }
};

const MenuPage = async ({
  searchParams
}: MenuPageProps
) => {
  const categories = await getCategories({
    ...searchParams
  })

  return ( 
    <div className=" flex flex-col gap-8">
      <div className=" flex justify-between items-center">
        <h1 className="text-2xl text-primary font-medium">
          Menu Page
        </h1>
        <SearchComponent placeholder="Search for category" />
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
      {categories.length === 0 && (
        <div className="text-center">
          No category found
        </div>
      )}
    </div>
   );
}
 
export default MenuPage;