import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { menuItemId: string, orderId: string } }
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
    });

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const order = await db.order.findFirst({
      where: {
        id: params.orderId,
        menuItemId: params.menuItemId,
        profileId: profile.id
      }
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    return NextResponse.json({ amount: order.amount });
  } catch (error) {
    console.log("[ORDER_ID_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {params}: {params: {menuItemId: string, orderId: string}}
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
      amount
    } = await req.json()    
    
     const order = await db.order.update({
      where: {
        id: params.orderId,
        menuItemId: params.menuItemId,
        profileId: profile.id
      }, 
      data: {
        amount
      }
     })
    

    return NextResponse.json(order)
  } catch(error) {
    console.log("[ORDER_ID_PATCH]", error);
      
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  {params}: {params: {menuItemId: string, orderId: string}}
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
    
     const order = await db.order.deleteMany({
      where: {
        id: params.orderId,
        menuItemId: params.menuItemId,
        profileId: profile.id
      }
     })
    

    return NextResponse.json(order)
  } catch(error) {
    console.log("[ORDER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}

