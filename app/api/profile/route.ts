import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
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
      email,
      phone,
      streetAddress,
      postalCode,
      city,
      country 
    } = await req.json()    

    let profile;

    const existingProfile = await db.profile.findUnique({
      where: {
        userId,
      },
    });

    if (existingProfile) {
      profile = await db.profile.update({
        where: {
          userId,
        },
        data: {
          name,
          imageUrl,
          email,
          phone,
          streetAddress,
          postalCode,
          city,
          country
        },
      });
    } else {
      profile = await db.profile.create({
        data: {
          userId,
          name,
          imageUrl,
          email,
          phone,
          streetAddress,
          postalCode,
          city,
          country
        }
      });
    }

    return NextResponse.json(profile)
  } catch(error) {
    console.log("[Profile_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}