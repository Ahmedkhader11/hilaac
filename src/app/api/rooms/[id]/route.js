import Room from "@/modals/roomSchema";
import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
  try {
    await db();
    const { id } = await params;

    const room = await Room.findOne({ id });

    if (!room) {
      return new NextResponse(JSON.stringify({ error: "Room not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse(JSON.stringify(room), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
