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

    const {
      price, 
      name
    } = await req.json()

    const size = await db.size.create({
      data: {
        menuItemId: params.menuItemId,
        name,
        price
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
