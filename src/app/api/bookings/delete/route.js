// src/app/api/bookings/delete/route.js
import db from "@/utils/db";
import Booking from "@/modals/Bookings";
import { revalidatePath } from "next/cache";

export async function DELETE(request) {
  try {
    const formData = await request.formData();
    const bookingId = formData.get("bookingId");
    if (!bookingId) {
      return new Response(
        JSON.stringify({ message: "Booking ID is required" }),
        {
          status: 400,
        }
      );
    }

    await db();

    await Booking.findByIdAndDelete(bookingId);

    // Revalidate the bookings page so that the listing updates.
    revalidatePath("/admin/bookings");

    return new Response(
      JSON.stringify({ message: "Booking deleted successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete booking:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
