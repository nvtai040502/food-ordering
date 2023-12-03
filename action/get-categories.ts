import { db } from "@/lib/db"
import { CategoryWithMenuItems } from "@/type"

type getCategoriesProps = {
  name?: string
}
export const getCategories = async ({
  name
}: getCategoriesProps
): Promise<CategoryWithMenuItems[]> => {
  try {
    const categories = await db.category.findMany({
      where: {
        name: {
          contains: name
        }
      },
      include: {
        menuItems: {
          orderBy: {
            order: "asc"
          }
        }
      }, orderBy: {
        order: "asc"
      }
    })

    return categories
  } catch (error) {
    console.log("[GET_CATEGORIES]", error);
    return [];
  }
}