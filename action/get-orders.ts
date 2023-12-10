import { db } from "@/lib/db"
import { OrderWithMenuItems } from "@/type";
import { auth, redirectToSignIn } from "@clerk/nextjs"
import { MenuItem } from "@prisma/client"


export const getOrdersWithMenuItems = async (): Promise<OrderWithMenuItems[]>  => {
  try {
    const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }
  
  const profile = await db.profile.findUnique({
    where: {
      userId: userId
    }
  });

  if (!profile) {
    return redirectToSignIn();
  }

  const orders = await db.order.findMany({
    where: {
      profileId: profile.id
    }, orderBy: {
      updatedAt: "desc"
    }
  });

  const ordersWithMenuItems = await Promise.all(
    orders.map(async (order) => {
      const menuItem = await db.menuItem.findUnique({
        where: {
          id: order.menuItemId
        }
      });
      return { ...order, menuItem };
    })
  );

    return ordersWithMenuItems
  } catch (error) {
    console.log("[GET_ORDERS]", error);
    return [];
  }
}