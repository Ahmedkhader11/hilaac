import db from "@/utils/db";
import User from "@/models/User";
import Booking from "@/models/Bookings";
import Room from "@/models/roomSchema";
import { NextResponse } from "next/server";

export async function GET(request) {
  await db();

  // Parse query params for filtering
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  // Build date filter
  let dateFilter = {};
  if (start) dateFilter.$gte = new Date(start);
  if (end) {
    const endDate = new Date(end);
    endDate.setDate(endDate.getDate() + 1); // include the end date
    dateFilter.$lt = endDate;
  }
  const bookingQuery = Object.keys(dateFilter).length
    ? { createdAt: dateFilter }
    : {};

  // Total users (not filtered by date)
  const totalUsers = await User.countDocuments();

  // Total bookings (filtered)
  const totalBookings = await Booking.countDocuments(bookingQuery);

  // Bookings per month (filtered)
  const bookingsPerMonth = await Booking.aggregate([
    { $match: bookingQuery },
    {
      $group: {
        _id: { $substr: ["$createdAt", 0, 7] }, // "YYYY-MM"
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Most popular rooms (filtered)
  const popularRoomsAgg = await Booking.aggregate([
    { $match: bookingQuery },
    { $group: { _id: "$room", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);
  // Populate room names
  const popularRooms = await Promise.all(
    popularRoomsAgg.map(async (item) => {
      const room = await Room.findById(item._id).lean();
      return {
        _id: room?.name || "Unknown Room",
        count: item.count,
      };
    })
  );

  // Revenue (filtered)
  const totalRevenueAgg = await Booking.aggregate([
    { $match: bookingQuery },
    { $group: { _id: null, revenue: { $sum: "$price" } } },
  ]);
  const totalRevenue = totalRevenueAgg[0]?.revenue || 0;

  // Active users (filtered, last 30 days within filter)
  let activeUsers = [];
  if (Object.keys(dateFilter).length) {
    activeUsers = await Booking.distinct("userId", bookingQuery);
  } else {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    activeUsers = await Booking.distinct("userId", {
      createdAt: { $gte: thirtyDaysAgo },
    });
  }

  // Recent bookings (filtered)
  const recentBookings = await Booking.find(bookingQuery)
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("room")
    .lean();

  return new NextResponse(
    JSON.stringify({
      totalUsers,
      totalBookings,
      bookingsPerMonth,
      popularRooms,
      totalRevenue,
      activeUsersCount: activeUsers.length,
      recentBookings: recentBookings.map((b) => ({
        _id: b._id,
        room: { name: b.room?.name || "Unknown" },
        userId: b.userId,
        createdAt: b.createdAt,
      })),
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
