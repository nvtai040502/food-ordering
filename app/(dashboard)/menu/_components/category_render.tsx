import { CategoryWithMenuItems } from "@/type";
import MenuItemRendering from "./menu-item-render";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoryRenderingProps {
  category: CategoryWithMenuItems
}
const CategoryRendering = ({
  category
  
}: CategoryRenderingProps
) => {
  return ( 
    <div className="flex flex-col gap-4">
      <h1 className="text-primary text-2xl flex justify-center items-center">
        {category.name}
      </h1>
      
      <div className="grid gap-4 grid-cols-4">
        {category.menuItems.map((meuItem) => (
          <div key={meuItem.id}>
            <MenuItemRendering menuItem={meuItem} />
          </div>
        ))}
      </div>

    </div>
   );
}
 
export default CategoryRendering;