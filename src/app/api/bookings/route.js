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

    // Validate required fields /Basic validation
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

    // --- 2. Check for existing active booking for the user ---
    const existingActiveBooking = await Booking.findOne({
      userId: userId,
      endDate: { $gte: new Date() }, // Booking ends in the future or today
    });

    if (existingActiveBooking) {
      return NextResponse.json(
        {
          error:
            "You already have an active booking. Only one active booking is allowed per user.",
        },
        { status: 409 } // 409 Conflict status
      );
    }

    // Lookup room and ensure price exists
    const room = await Room.findById(roomId);
    if (!room || !room.price || typeof room.price !== "number") {
      return new NextResponse(
        JSON.stringify({
          error: "Room not found or its price is not properly set.",
        }),
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

    // --- 5. Atomically Update User's bookingCount ---
    // This finds the user and sets bookingCount to 1 ONLY if it's currently 0.
    // If it's already 1, this operation does nothing for bookingCount, preventing it from exceeding 1.
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userId, bookingCount: { $lt: 1 } }, // Condition: userId and bookingCount < 1
      { $set: { bookingCount: 1 } }, // Action: Set bookingCount to 1
      { new: true, upsert: true } // Options: Return updated doc, create if not exists (upsert for user setup)
    );

    if (!updatedUser) {
      console.warn(
        `Booking created for user ${userId}, but bookingCount was already 1 or user not found with current settings.`
      );
      // You might add logic here to inform the client or take other actions
      // if `updatedUser` is null and you strictly enforce only one booking total.
    }

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

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return NextResponse.json({ error: messages.join(", ") }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Booking failed: " + error.message },
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
