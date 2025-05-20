import db from "@/utils/db";
import Booking from "@/models/Bookings";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const bookingId = formData.get("bookingId");
    const status = formData.get("status");

    if (!bookingId || !status) {
      return new Response(
        JSON.stringify({ message: "Booking ID and status are required" }),
        { status: 400 }
      );
    }

    await db();

    await Booking.findByIdAndUpdate(
      bookingId,
      { status, updatedAt: new Date() },
      { new: true }
    );

    revalidatePath("/admin/bookings");

    return new Response(JSON.stringify({ message: "Updated successfully." }), {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to update booking:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
