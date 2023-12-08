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

    const existingProfile = await db.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!existingProfile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { updateSizes } = await req.json();

    // Validate if the received payload has the expected structure
    if (!Array.isArray(updateSizes)) {
      return new NextResponse("Invalid Data", { status: 400 });
    }

    // Update categories based on the received payload
    for (const size of updateSizes) {
      await db.size.update({
        where: { id: size.id },
        data: { order: size.order }
      });
    }

    return new NextResponse("Sizes Updated", { status: 200 });
  } catch (error) {
    console.error("[SIZES_REORDER_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
