import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { menuItemId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingProfile = await db.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!existingProfile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let order;

    const existingOrder = await db.order.findFirst({
      where: {
        menuItemId: params.menuItemId,
        profileId: existingProfile.id,
      },
    });

    if (!existingOrder) {
      order = await db.order.create({
        data: {
          profileId: existingProfile.id,
          menuItemId: params.menuItemId,
        },
      });
    } else {
      const { amount } = await req.json()
      order = await db.order.update({
        where: {
          id: existingOrder.id,
        },
        data: {
          amount: existingOrder.amount + amount, 
        },
      });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
