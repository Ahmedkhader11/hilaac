import db from "@/utils/db";
import Booking from "@/modal/bookings";
import Room from "@/modal/roomSchema";

export async function POST(req) {
  try {
    await db();

    const body = await req.json();
    const {
      roomId,
      name,
      email,
      phone,
      startDate,
      endDate,
      guests,
      paymentMethod,
    } = body;

    if (
      !roomId ||
      !name ||
      !email ||
      !phone ||
      !startDate ||
      !endDate ||
      !guests ||
      !paymentMethod
    ) {
      return new Response(
        JSON.stringify({ error: "All required fields must be provided" }),
        { status: 400 }
      );
    }

    const room = await Room.findOne({ id: roomId });
    if (!room) {
      return new Response(JSON.stringify({ error: "Room not found" }), {
        status: 404,
      });
    }

    // Check if room is already booked during the requested period
    const isBooked = await Booking.findOne({
      room: room._id,
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) },
        },
      ],
    });

    if (isBooked) {
      return new Response(
        JSON.stringify({
          error:
            "Room is already booked for the selected dates. Please choose another room.",
        }),
        { status: 409 }
      );
    }

    // Create and save the new booking
    const newBooking = new Booking({
      room: room._id,
      name,
      email,
      phone,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      guests: String(guests),
      paymentMethod,
    });

    await newBooking.save();

    return new Response(
      JSON.stringify({
        bookingId: newBooking._id,
        message: "Booking successful",
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Booking failed: " + error.message }),
      { status: 500 }
    );
  }
}
