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

    // --- 5. Update User's bookingCount (using the more accurate logic) ---
    try {
      // First, try to find the existing user
      let user = await User.findOne({ clerkId: userId });

      if (!user) {
        // User doesn't exist, create new user with bookingCount = 1
        user = new User({
          clerkId: userId,
          email: email,
          name: name,
          bookingCount: 1,
        });
        await user.save();
      } else {
        // User exists, update bookingCount only if it's not already set to 1 or more
        if (!user.bookingCount || user.bookingCount < 1) {
          user.bookingCount = 1;
          await user.save();
        } else {
          console.warn(
            `Booking created for user ${userId}, but bookingCount was already ${user.bookingCount}.`
          );
        }
      }
    } catch (userError) {
      console.error("Error updating user booking count:", userError);
      // Don't fail the booking if user update fails
      // The booking was already created successfully
    }
    return new NextResponse(
      JSON.stringify({
        bookingId: newBooking._id,
        message: "Booking successful",
        booking: {
          bookingId: newBooking._id,
          roomName: room.name, // or room.title
          roomPrice: room.price,
          roomDescription: room.description,
          startDate: newBooking.startDate,
          endDate: newBooking.endDate,
          guests: newBooking.guests,
          paymentMethod: newBooking.paymentMethod,
          totalPrice: newBooking.price,
        },
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
    const bookings = await Booking.find({}).populate("room").lean();

    const updatedBookings = bookings.map(({ _id, __v, room, ...booking }) => ({
      id: _id.toString(),
      booked: true,
      ...booking,
      roomName: room?.name || "",
      roomDescription: room?.description || "",
      roomPrice: room?.price || "",
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
