import { Category } from "@prisma/client";
import EditCategory from './edit-category';
import DeleteCategory from './delete-category';
import { db } from "@/lib/db";
import MenuItemCard from "../../menu-items/_components/card";


const CategoryRendering = async ({category}: {category: Category}) => {
  const categories = await db.category.findMany()
  const menuItems = await db.menuItem.findMany({
    where: {
      categoryId: category.id
    }
  })
  return ( 
    <div className=" border-4 p-4 flex flex-col gap-4">
      
      <div className='flex flex-col justify-center items-center'>
        <div className='font-medium text-2xl text-primary'>
          {category.name}
        </div>
        <div className=' flex justify-center items-center gap-4'>
          <EditCategory category={category}/>
          <DeleteCategory category={category} />
        </div>
      </div>

      
      <div className="grid lg:grid-cols-4 grid-cols-2 sm:grid-cols-3 gap-4">
            {menuItems.map((menuItem) => (
              <div key={menuItem.id}>
                <MenuItemCard 
                  menuItem= {menuItem}
                  categories = {categories}
                />
              </div>
            ))}
          </div>
      

    </div>
   );
}
 
export default CategoryRendering;