import Room from "@/modal/roomSchema";
import Booking from "@/modal/bookings";
import db from "@/utils/db";

export async function GET() {
  try {
    await db();

    // Fetch all rooms efficiently using lean()
    const rooms = await Room.find({}).lean();

    // Transform room data & check booked status
    const updatedRooms = await Promise.all(
      rooms.map(async ({ _id, __v, ...room }) => {
        const isBooked = await Booking.findOne({
          room: _id,
          startDate: { $lte: new Date() },
          endDate: { $gte: new Date() },
        });

        return {
          id: _id.toString(), // Convert MongoDB ObjectID to string
          booked: !!isBooked, // Boolean flag for booked status
          ...room,
        };
      })
    );

    return new Response(JSON.stringify(updatedRooms), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
