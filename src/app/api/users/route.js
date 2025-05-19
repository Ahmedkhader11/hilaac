import { NextResponse } from "next/server";
import { createClerkClient } from "@clerk/clerk-sdk-node";
import db from "@/utils/db";
import User from "@/modals/User";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Incoming request:", body);
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    await db();

    // Fetch user from Clerk with improved error handling
    let clerkUser;
    try {
      clerkUser = await clerkClient.users.getUser(userId);
    } catch (error) {
      if (error.status === 404) {
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
