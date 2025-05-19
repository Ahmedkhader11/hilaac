"use client";
import { useEffect, useState } from "react";
import BookingActionButtons from "./BookingActionButtons";

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/admin/bookings");
        const data = await response.json();
        setBookings(data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading bookings...</p>;
  }

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
