import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request
  ) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { updateCategories } = await req.json();

    // Validate if the received payload has the expected structure
    if (!Array.isArray(updateCategories)) {
      return new NextResponse("Invalid Data", { status: 400 });
    }

    // Update categories based on the received payload
    for (const category of updateCategories) {
      await db.category.update({
        where: { id: category.id },
        data: { order: category.order }
      });
    }

    return new NextResponse("Categories Updated", { status: 200 });
  } catch (error) {
    console.error("[CATEGORY_REORDER_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
