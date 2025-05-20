// app/api/bookings/route.js

import db from "@/utils/db";
import Booking from "@/models/Bookings";
import Room from "@/models/roomSchema";
import User from "@/models/User"; // Correctly imported
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await db();

    const body = await req.json();
    const {
      userId,
      roomId,
      name,
      email,
      phone,
      startDate,
      endDate,
      guests,
      paymentMethod,
    } = body;

    // Validate required fields
    if (
      !userId ||
      !roomId ||
      !name ||
      !email ||
      !phone ||
      !startDate ||
      !endDate ||
      !guests ||
      !paymentMethod
    ) {
      return new NextResponse(
        JSON.stringify({ error: "All required fields must be provided" }),
        { status: 400 }
      );
    }

    // Lookup room by custom 'id' field
    const room = await Room.findOne({ id: roomId });
    if (!room) {
      return new NextResponse(JSON.stringify({ error: "Room not found" }), {
        status: 404,
      });
    }

    // Check if the room is already booked during the requested period
    const isBooked = await Booking.findOne({
      room: room._id, // Use MongoDB _id of the room
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) },
        },
      ],
    });

    if (isBooked) {
      return new NextResponse(
        JSON.stringify({
          error:
            "Room is already booked for the selected dates. Please choose another room.",
        }),
        { status: 409 }
      );
    }

    // --- FIX: Define totalPrice before using it ---
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Calculate total days

    // Ensure 'room.price' exists in your Room schema. If not, this will still be undefined.
    // Assuming room.price is a number.
    const totalPrice = room.price * diffDays;
    // --- END FIX ---

    // Create and save the new booking
    const newBooking = new Booking({
      userId: userId,
      room: room._id,
      name,
      email,
      phone,
      startDate: start, // Use the Date objects created above
      endDate: end, // Use the Date objects created above
      guests: Number(guests), // Convert guests to Number
      paymentMethod,
      price: totalPrice, // Now totalPrice is defined
      status: "Pending", // Set a default status for the booking
    });

    await newBooking.save(); // Booking should now save successfully

    // --- IMPORTANT: Increment bookingCount for the user ---
    await User.findOneAndUpdate(
      { clerkId: userId },
      { $inc: { bookingCount: 1 } },
      { new: true, upsert: true }
    );
    // --- End of IMPORTANT addition ---

    return new NextResponse(
      JSON.stringify({
        bookingId: newBooking._id,
        message: "Booking successful",
        booking: newBooking,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking API Error:", error); // This error log will now show the 'totalPrice is not defined' if that was the issue
    return new NextResponse(
      JSON.stringify({ error: "Booking failed: " + error.message }),
      { status: 500 }
    );
  }
}

// GET request to list all bookings (this remains unchanged, fetches ALL bookings)
export async function GET() {
  try {
    await db();
    const bookings = await Booking.find({}).lean();

    const updatedBookings = bookings.map(({ _id, __v, ...booking }) => ({
      id: _id.toString(),
      booked: true,
      ...booking,
    }));

    return new NextResponse(JSON.stringify(updatedBookings), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
