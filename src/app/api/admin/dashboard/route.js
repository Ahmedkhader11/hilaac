import db from "@/utils/db";
import Booking from "@/modals/Bookings";
import User from "@/modals/User";

export default async function handler(_req, res) {
  await db();

  const bookingsCount = await Booking.countDocuments({});
  const usersCount = await User.countDocuments({});

  res.status(200).json({ usersCount, bookingsCount });
}
