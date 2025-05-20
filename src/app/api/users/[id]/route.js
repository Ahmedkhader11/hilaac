import User from "@/models/User";
import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
  try {
    await db();

    const { id } = await params;
    if (!id) {
      return new NextResponse(JSON.stringify({ error: "User ID missing" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Query using clerkId
    const user = await User.findOne({ clerkId: id }).lean();

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API Error:", error); // ✅ Log for debugging
    return new NextResponse(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
