import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import db from "@/utils/db";
import User from "@/modals/User";

export async function POST(request) {
  try {
    // Get Clerk authentication headers
    const headersList = request.headers;
    const clerkAuthHeader = headersList.get("Authorization"); // Extract Bearer Token

    if (!clerkAuthHeader || !clerkAuthHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Missing or invalid Clerk token" },
        { status: 401 }
      );
    }

    const userToken = clerkAuthHeader.replace("Bearer ", "");

    // Validate token and extract user details
    let userId;
    try {
      const clerkAuthData = await clerkClient.verifyToken(userToken);
      userId = clerkAuthData.sub; // `sub` contains the authenticated user ID
    } catch (error) {
      console.error("Clerk Token Verification Failed:", error);
      return NextResponse.json(
        { message: "Invalid Clerk token" },
        { status: 401 }
      );
    }

    await db();

    // Fetch user from Clerk
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

    // Upsert user into MongoDB
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
      { message: "User synced successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
