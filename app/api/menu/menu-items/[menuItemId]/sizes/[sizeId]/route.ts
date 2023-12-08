import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PATCH(
  req: Request,
  {params}: {params: {menuItemId: string, sizeId: string}}
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile = await db.profile.findUnique({
      where: {
        userId: userId
      }
    })

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { 
      name,
      price
    } = await req.json()    
    
     const size = await db.size.update({
      where: {
        id: params.sizeId,
        menuItemId: params.menuItemId,
      }, 
      data: {
        name,
        price
      }
     })
    

    return NextResponse.json(size)
  } catch(error) {
    console.log("[SIZE_ID_PATCH]", error);
      
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  {params}: {params: {menuItemId: string, sizeId: string}}
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile = await db.profile.findUnique({
      where: {
        userId: userId
      }
    })

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
     const size = await db.size.deleteMany({
      where: {
        id: params.sizeId,
        menuItemId: params.menuItemId,
      }
     })
    

    return NextResponse.json(size)
  } catch(error) {
    console.log("[SIZE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}

