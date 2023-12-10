
import GoBack from "@/components/go-back";
import NoImageRendering from "@/components/no-image";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/fortmat-price";
import Image from "next/image";
import { redirect } from "next/navigation";
import AddToCart from "./_components/add-to-cart";
import { Separator } from "@/components/ui/separator";
import RelatedFood from "./_components/related-food";
import { Preview } from "@/components/preview";

interface MenuItemIdPageProps{
  params: {menuItemId: string}
}
const MenuItemIdPage = async ({
  params
}: MenuItemIdPageProps
) => {
  const menuItem = await db.menuItem.findUnique({
    where: {
      id: params.menuItemId
    }
  })
  if (!menuItem) {
    return redirect("/menu")
  }

  let category = null

  if (menuItem.categoryId) {
    category = await db.category.findUnique({
      where: {
        id: menuItem.categoryId
      }
    })
  } 

  return ( 
    <div className="flex flex-col gap-8">
        <GoBack
          href="/menu"
          title="Back to menu page"
        />

        <div className="grid grid-cols-2 gap-8">
          <div className=" relative aspect-video">
            {menuItem.imageUrl ? (
              <Image src={menuItem.imageUrl} alt={menuItem.name} layout="fill" objectFit="contain"/>
            ): (
              <NoImageRendering />
            )}
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className=" text-xl font-medium">
                {menuItem.name}
              </h1>
              
              <h2 className="text-xl">
                {formatPrice(menuItem.basePrice || 0)}
              </h2>

              <Separator />
            </div>
            
            <div className="flex justify-between items-center">
              <p>
                size
              </p>
              <div>
                {}
              </div>
            </div>

            <div>
              <AddToCart menuItem={menuItem}/>
            </div>
            <Separator />
          </div>

        </div>

        <Separator />
        <div className="flex flex-col gap-4">
          <p>Description</p>
          <div>
            <Preview value={menuItem.description || ""} />
          </div>
        </div>

        {category && (
        <>
          <Separator />
          <div>
            <RelatedFood category={category} />
          </div>
        </>
      )}
        
    </div>
   );
}
 
export default MenuItemIdPage;