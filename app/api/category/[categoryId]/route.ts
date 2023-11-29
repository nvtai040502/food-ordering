import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { 
      name
    } = await req.json()    

     const category = await db.category.update({
      where: {
        id: params.categoryId
      },
      data: {
        name,
      }
    });
    

    return NextResponse.json(category)
  } catch(error) {
    console.log("[CATEGORY_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // First, Dissociate all menu items associated with the category
    await db.menuItem.updateMany({
      where: {
        categoryId: params.categoryId,
      },
      data: {
        categoryId: null,
      },
    });

    // Then, delete the category itself
    const deletedCategory = await db.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(deletedCategory);
  } catch(error) {
    console.log("[CATEGORY_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}