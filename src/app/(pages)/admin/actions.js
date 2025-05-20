"use server";
import { clerkClient } from "@clerk/nextjs/server";
import db from "@/utils/db";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export async function setRole(formData) {
  try {
    const userId = formData.get("id");
    const role = formData.get("role");

    if (!userId || !role) {
      return { error: "User ID and role are required" };
    }

    const allowedRoles = ["admin", "user"];
    if (!allowedRoles.includes(role)) {
      return { error: "Invalid role specified" };
    }

    // Update Clerk metadata
    const clerk = await clerkClient();
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: { role },
    });

    // Update MongoDB
    await db();
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userId },
      { role, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    // Convert to plain object
    const userObject = updatedUser.toObject({
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    });

    // Revalidate the page where the role update is relevant
    revalidatePath("/admin");

    return {
      success: true,
      message: "Role updated successfully",
      user: userObject,
    };
  } catch (error) {
    console.error("Set role error:", error);
    return { error: error.message || "Failed to update role" };
  }
}

// Remove helper function - use clerkClient directly
export async function removeRole(formData) {
  try {
    const userId = formData.get("id");
    if (!userId) {
      return { error: "User ID is required" };
    }
    const clerk = await clerkClient();
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: { role: null }, // Sets the role property to null in Clerk
    });

    await db();
    await User.findOneAndUpdate(
      { clerkId: userId },
      { role: "user", updatedAt: new Date() }, // Updates the role in your database
      { new: true }
    );

    revalidatePath("/admin"); // Revalidate the /admin route to refresh the user list

    return { success: true, message: "Role removed successfully" };
  } catch (error) {
    console.error("Error removing role:", error);
    return { error: error.message || "Failed to remove role" };
  }
}

// Delelting user
export async function deleteUser(formData) {
  const id = formData.get("id");

  if (!id) {
    console.error("Error deleting user: User ID missing.");
    return { error: "User ID is required." };
  }

  try {
    const clerk = await clerkClient();
    await clerk.users.deleteUser(id);

    await db();
    await User.findOneAndDelete({ clerkId: id });

    revalidatePath("/admin");
    return { success: true, message: `User ${id} deleted successfully.` };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: error.message || "Failed to delete user." };
  }
}
