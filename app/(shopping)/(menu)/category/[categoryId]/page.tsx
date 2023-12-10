import { db } from "@/lib/db";
import CategoryRendering from "../../_components/category_render";
import { redirect } from "next/navigation";
import SearchComponent from "@/components/search";
import GoBack from "@/components/go-back";

interface CategoryIdMenuPageProps{
  params: {
    categoryId: string
  }
  searchParams: {
    name: string
  }
}
const CategoryIdMenuPage = async ({
  params,
  searchParams
}: CategoryIdMenuPageProps
) => {

  const category = await db.category.findUnique({
    where: {
      id: params.categoryId
    }, include: {
      menuItems: {
        orderBy: {
          order: "asc"
        }
      }
    }
  })

  if (!category) {
    return redirect("/")
  }

  return ( 
    <div>
      <div className="flex justify-between items-center">
        <GoBack 
          href="/"
          title="Back to home page"
        />
        <SearchComponent placeholder="Search for menu item" />
      </div>
    <div>
      <CategoryRendering category={category} searchParams={searchParams}/>
    </div>
    </div>
   );
}
 
export default CategoryIdMenuPage;