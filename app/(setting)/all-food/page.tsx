import { db } from "@/lib/db";
import CreateCategory from "../category/_component/create-category";
import CreateMenuItem from "../menu-items/_components/create-menu-item";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CategoryWithMenuItems } from "@/type";
import AllFoodRendering from "./_components/rendering";


const CategoryPage  = async () => {
  const categories: CategoryWithMenuItems[] = await db.category.findMany({
    include: {
      menuItems: {
        orderBy:{
          updatedAt: "desc"
        }
      }
    },
    orderBy: {
      updatedAt: "desc"
    }

  })
  return (

    <div className="flex flex-col gap-4"> 

      <div className="flex justify-center items-center">
        <h1 className=" font-medium text-4xl text-primary">
          All Food
        </h1>

      </div>
      <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Create</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
         <CreateCategory />
         <CreateMenuItem categories={categories} />
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
  
      <AllFoodRendering categories={categories}/>

    </div>
   );
}
 
export default CategoryPage ;