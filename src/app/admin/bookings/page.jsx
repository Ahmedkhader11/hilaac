import db from "@/utils/db";
import Booking from "@/modals/Bookings";
import BookingActionButtons from "./BookingActionButtons"; // Import the client component

export default async function BookingsAdmin() {
  await db();
  let bookings = await Booking.find({}).lean();

  bookings = bookings.map((booking) => ({
    ...booking,
    _id: booking._id.toString(),
    room: booking.room ? booking.room.toString() : null,
    startDate: booking.startDate
      ? new Date(booking.startDate).toISOString()
      : null,
    endDate: booking.endDate ? new Date(booking.endDate).toISOString() : null,
    createdAt: booking.createdAt
      ? new Date(booking.createdAt).toISOString()
      : null,
    updatedAt: booking.updatedAt
      ? new Date(booking.updatedAt).toISOString()
      : null,
  }));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Booking Management
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-4 py-2">Booking ID</th>
              <th className="px-4 py-2">Cus.Name</th>
              <th className="px-4 py-2">Room</th>
              <th className="px-4 py-2">Dates</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={booking._id}
                className={`${
                  index % 2 === 0
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                <td className="border px-4 py-2 text-sm">{booking._id}</td>
                <td className="border px-4 py-2 text-sm">{booking.name}</td>
                <td className="border px-4 py-2 text-sm">{booking.room}</td>
                <td className="border px-4 py-2 text-sm">
                  {new Date(booking.startDate).toLocaleDateString()} -{" "}
                  {new Date(booking.endDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 text-sm">
                  <BookingActionButtons bookingId={booking._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
