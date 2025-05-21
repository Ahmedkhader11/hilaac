import Room from "@/models/roomSchema";
import Booking from "@/models/Bookings";
import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await db();

    // Fetch all rooms efficiently using lean()
    const rooms = await Room.find({}).lean();

    // Transform room data & check booked status
    const updatedRooms = await Promise.all(
      rooms.map(async ({ __v, ...room }) => {
        const isBooked = await Booking.findOne({
          room: room._id,
          startDate: { $lte: new Date() },
          endDate: { $gte: new Date() },
        });

        return {
          id: room._id.toString(), // Convert MongoDB ObjectID to string
          booked: !!isBooked, // Boolean flag for booked status
          ...room,
        };
      })
    );

    return new NextResponse(JSON.stringify(updatedRooms), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
