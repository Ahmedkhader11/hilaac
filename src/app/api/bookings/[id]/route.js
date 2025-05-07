// import { db } from "@/utils/db";
// import Booking from "@/modal/bookings";

// export default async function handler(req, res) {
//   const { id } = await req.query; // Get the room ID from the request
//   await db(); // Connect to your database

//   if (req.method === "GET") {
//     try {
//       // Fetch bookings for the specific room from the database
//       const bookings = await Booking.find({ roomId: id });
//       res.status(200).json(bookings);
//     } catch (err) {
//       res.status(500).json({ error: "Failed to fetch bookings" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }
