import { db } from "@/lib/db";
import { Category, MenuItem } from "@prisma/client";
import MenuItemRendering from "../../../_components/menu-item-render";


interface RelatedFoodProps {
  category: Category;
}

const RelatedFood = async ({ category }: RelatedFoodProps) => {
  const menuItems: MenuItem[] = await db.menuItem.findMany({
    where: {
      categoryId: category.id,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <h1>Related Food</h1>
      <div className="grid grid-cols-5 gap-4">
        {menuItems.map((menuItem) => (
          <div key={menuItem.id}>
            <MenuItemRendering menuItem={menuItem} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedFood;
