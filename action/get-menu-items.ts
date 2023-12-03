import { db } from "@/lib/db"
import { MenuItem } from "@prisma/client"

interface getMenuItemsProps {
  name?: string
  categoryId: string
}
export const getMenuItems = async ({
  categoryId,
  name
}: getMenuItemsProps
): Promise<MenuItem[]>  => {
  try {
    const menuItems = await db.menuItem.findMany({
      where: {
        categoryId, 
        name: {
          contains: name
        }
      }
    })

    return menuItems
  } catch (error) {
    console.log("[GET_MENU_ITEMS]", error);
    return [];
  }
}