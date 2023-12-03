import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {params}: {params: {menuItemId: string}}
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    const { 
      name,
      imageUrl,
      categoryId,
      description,
      basePrice,
      size
    } = await req.json()    
    
     const menuItem = await db.menuItem.update({
        where: {
          id: params.menuItemId
        },
        data: {
          name,
          imageUrl,
          categoryId,
          description,
          basePrice,
          size
        }
      });
    

    return NextResponse.json(menuItem)
  } catch(error) {
    console.log("[MENU_ITEM_ID_PATCH]", error);
      
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { menuItemId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

     const menuItem = await db.menuItem.deleteMany({
      where: {
        id: params.menuItemId
      }
     })
    

    return NextResponse.json(menuItem)
  } catch(error) {
    console.log("[MENU_ITEM_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}

