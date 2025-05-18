import { clerkClient } from "@clerk/nextjs/server";
import db from "@/utils/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    const { userId, role } = await req.json();

    if (!userId || !role) {
      return Response.json(
        { error: "User ID and role are required" },
        { status: 400 }
      );
    }

    // Update Clerk metadata
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role },
    });

    // Update MongoDB
    await db();
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userId },
      { role, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    return Response.json(
      {
        message: "Role updated successfully",
        user: {
          id: updatedUser._id.toString(),
          role: updatedUser.role,
          updatedAt: updatedUser.updatedAt.toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Set role error:", error);
    return Response.json({ error: "Failed to update role" }, { status: 500 });
  }
}
