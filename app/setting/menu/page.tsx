import { db } from "@/lib/db";
import CreateCategory from "../category/_component/create-category";
import CreateMenuItem from "../menu-items/_components/create-menu-item";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CategoryWithMenuItems } from "@/type";
import AllFoodRendering from "./_components/rendering";
import SearchComponent from "@/components/search";
import { getCategories } from "@/action/get-categories";

interface MenuSettingPageProps {
  searchParams: {
    name: string
  }
}
const MenuSettingPage  = async ({
  searchParams  
}: MenuSettingPageProps
) => {
  
  const categories = await getCategories({
    ...searchParams
  })

  return (

    <div className="flex flex-col gap-4"> 

      <div className="flex justify-center items-center">
        <h1 className=" font-medium text-4xl text-primary">
          Menu Setting
        </h1>

      </div>
      <div className="flex justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Create</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
          <CreateCategory />
          <CreateMenuItem categories={categories} />
          </DropdownMenuContent>
        </DropdownMenu>

        <SearchComponent placeholder="Search for category" />
      </div>
  
      <AllFoodRendering categories={categories}/>

    </div>
   );
}
 
export default MenuSettingPage ;