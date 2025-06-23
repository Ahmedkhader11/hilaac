import db from "@/utils/db";
import Booking from "@/models/Bookings";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
  try {
    await db();
    const { id } = await params; // 'id' is the bookingId passed in the URL

    // Find the booking by its _id and populate the room details
    const booking = await Booking.findOne({ userId: id })
      .populate("room")
      .lean();

    if (!booking) {
      return new NextResponse(JSON.stringify({ error: "Booking not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Add room details to the response
    return new NextResponse(
      JSON.stringify({
        ...booking,
        id: booking._id.toString(),
        roomName: booking.room?.name || "",
        roomDescription: booking.room?.description || "",
        roomPrice: booking.room?.price || "",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching booking:", error);
    return new NextResponse(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
