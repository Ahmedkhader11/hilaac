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

    // Lookup room and ensure price exists
    const room = await Room.findOne({ id: roomId });
    if (!room || !room.price || typeof room.price !== "number") {
      return new NextResponse(
        JSON.stringify({ error: "Room price is not properly set" }),
        { status: 400 }
      );
    }

    // Compute total price
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end - start);
    let diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    if (diffDays < 1) diffDays = 1; // Ensure minimum 1-day booking

    const totalPrice = room.price * diffDays;

    console.log("DEBUG: Calculated totalPrice:", totalPrice);
    console.log("DEBUG: Type of totalPrice:", typeof totalPrice);
    console.log("DEBUG: Is totalPrice NaN?", isNaN(totalPrice)); //

    // Create and save the booking with price included
    const newBooking = new Booking({
      userId,
      room: room._id,
      name,
      email,
      phone,
      startDate: start,
      endDate: end,
      guests: Number(guests),
      paymentMethod,
      price: Number(totalPrice),
    });

    await newBooking.save();

    // Increment booking count for the user
    await User.findOneAndUpdate(
      { clerkId: userId },
      { $inc: { bookingCount: 1 } },
      { new: true, upsert: true }
    );

    return new NextResponse(
      JSON.stringify({
        bookingId: newBooking._id,
        message: "Booking successful",
        booking: newBooking,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking API Error:", error);
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
