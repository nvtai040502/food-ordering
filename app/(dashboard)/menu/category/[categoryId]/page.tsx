import { db } from "@/lib/db";
import CategoryRendering from "../../_components/category_render";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SearchComponent from "@/components/search";
import BackToMenuPage from "../../_components/go-back";
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
    return redirect("/menu")
  }

  return ( 
    <div>
      <div className="flex justify-between items-center">
        <BackToMenuPage />
        
        <SearchComponent placeholder="Search for menu item" />
      </div>
    <div>
      <CategoryRendering category={category} searchParams={searchParams}/>
    </div>
    </div>
   );
}
 
export default CategoryIdMenuPage;