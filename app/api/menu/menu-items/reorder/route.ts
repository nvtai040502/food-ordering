import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request
) {
  try {
    // Check authentication
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Destructure sourceCategory and destCategory from request body
    const { sourceCategory, destCategory } = await req.json();

    // Update sourceCategory's menu items
    if (!Array.isArray(sourceCategory.menuItems)) {
      return new NextResponse("Invalid Data", { status: 400 });
    }

    // Update order of menu items in sourceCategory
    for (const menuItem of sourceCategory.menuItems) {
      await db.menuItem.update({
        where: { id: menuItem.id },
        data: { order: menuItem.order }
      });
    }

    // If destCategory exists, update its menu items
    if (destCategory) {
      if (!Array.isArray(destCategory.menuItems)) {
        return new NextResponse("Invalid Data", { status: 400 });
      }

      // Update order of menu items in destCategory
      for (const menuItem of destCategory.menuItems) {
        await db.menuItem.update({
          where: { id: menuItem.id },
          data: { order: menuItem.order }
        });
      }
    }

    // Return success message if all updates are done
    return new NextResponse("Categories Updated", { status: 200 });
  } catch (error) {
    // Handle errors and log them
    console.error("[CATEGORY_REORDER_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
