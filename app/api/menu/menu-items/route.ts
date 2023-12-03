import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
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
    
     const menuItem = await db.menuItem.create({
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
    console.log("[MENU_ITEM_POST]", error);
      
    return new NextResponse("Internal Error", { status: 500 })
  }
}

