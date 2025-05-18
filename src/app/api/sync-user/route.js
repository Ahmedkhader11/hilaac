// src/app/api/sync-user/route.js
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import db from "@/utils/db";
import User from "@/modals/User";

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    await db();

    // Fetch user from Clerk
    let clerkUser;
    try {
      clerkUser = await clerkClient.users.getUser(userId);
    } catch (error) {
      if (
        error.status === 404 ||
        error?.errors?.[0]?.code === "user_not_found"
      ) {
        return NextResponse.json(
          { message: "User not found in Clerk" },
          { status: 404 }
        );
      }
      console.error("Clerk API error:", error);
      return NextResponse.json(
        { message: "Failed to fetch user from Clerk" },
        { status: 500 }
      );
    }

    // Upsert into MongoDB
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: clerkUser.id },
      {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses?.[0]?.emailAddress || "",
        name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
        role: clerkUser.publicMetadata?.role || "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(
      { message: "User upserted successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error upserting user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
