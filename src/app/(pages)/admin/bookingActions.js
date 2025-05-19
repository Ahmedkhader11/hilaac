"use server";

import db from "@/utils/db";
import Booking from "@/modals/Bookings";
import { revalidatePath } from "next/cache";

export async function updateBookingStatus(formData) {
  const bookingId = formData.get("bookingId");
  const status = formData.get("status");

  if (!bookingId || !status) {
    throw new Error("Booking ID and status are required");
  }

  await db();

  try {
    await Booking.findByIdAndUpdate(
      bookingId,
      { status, updatedAt: new Date() },
      { new: true }
    );
    revalidatePath("/admin/bookings");
  } catch (error) {
    throw new Error("Failed to update booking status: " + error.message);
  }
}
