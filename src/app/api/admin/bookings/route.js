import db from "@/utils/db";
import Booking from "@/modals/Bookings";

export async function GET() {
  try {
    await db();
    const bookings = await Booking.find({}).lean();

    return Response.json({ bookings });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
