import db from "@/utils/db";
import Booking from "@/modals/Bookings";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
  try {
    await db();
    const { id } = await params; // 'id' is the user.id passed in the URL

    // Query Bookings collection using the userId field
    const bookings = await Booking.find({ userId: id }).lean();

    if (!bookings || bookings.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "No bookings found for this user" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new NextResponse(JSON.stringify(bookings), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return new NextResponse(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
