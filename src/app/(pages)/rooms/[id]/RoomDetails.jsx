"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function RoomDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [room, setRoom] = useState(null);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: new Date(),
    endDate: new Date(),
    guests: "",
    paymentMethod: "",
  });

  useEffect(() => {
    if (!id) return;

    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        if (!res.ok)
          throw new Error(
            `Failed to fetch room details (Status: ${res.status})`
          );
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchRoom();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const bookingPayload = {
        roomId: id,
        ...bookingData,
        startDate: bookingData.startDate.toISOString(),
        endDate: bookingData.endDate.toISOString(),
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Booking failed");
      }

      router.push(`/bookings/success?bookingId=${result.bookingId}`);
    } catch (err) {
      console.error("Booking error:", err);
    }
  };

  if (!room) return null;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 font-bold cursor-pointer text-white tracking-widest"
      >
        ← Back to Rooms
      </button>
      <div className="grid md:grid-cols-2 gap-8 dark:text-black">
        <div>
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h1 className="text-3xl font-bold mt-4 text-indigo-600">
            {room.name}
          </h1>
          <p className="text-gray-600 mt-2">{room.description}</p>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-xl font-semibold">{room.price}/night</p>
            <p className="mt-2">Capacity: {room.maxGuests} guests</p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Book This Room</h2>
          <form onSubmit={handleBooking} className="space-y-4">
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={bookingData.name}
              placeholder="Enter your name"
              onChange={(e) =>
                setBookingData({ ...bookingData, name: e.target.value })
              }
            />
            <input
              type="email"
              required
              className="w-full p-2 border rounded"
              value={bookingData.email}
              placeholder="Enter your email"
              onChange={(e) =>
                setBookingData({ ...bookingData, email: e.target.value })
              }
            />
            <input
              type="tel"
              required
              className="w-full p-2 border rounded"
              value={bookingData.phone}
              placeholder="Enter your phone number"
              onChange={(e) =>
                setBookingData({ ...bookingData, phone: e.target.value })
              }
            />
            <input
              type="date"
              required
              className="w-full p-2 border rounded"
              value={bookingData.startDate.toISOString().split("T")[0]}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  startDate: new Date(e.target.value),
                })
              }
            />
            <input
              type="date"
              required
              className="w-full p-2 border rounded"
              value={bookingData.endDate.toISOString().split("T")[0]}
              min={bookingData.startDate.toISOString().split("T")[0]}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  endDate: new Date(e.target.value),
                })
              }
            />
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={bookingData.guests || ""}
              placeholder="Enter number of guests"
              onChange={(e) =>
                setBookingData({ ...bookingData, guests: e.target.value })
              }
            />
            <select
              required
              className="w-full p-2 border rounded"
              value={bookingData.paymentMethod}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  paymentMethod: e.target.value,
                })
              }
            >
              <option value="">Select Payment Method</option>
              <option value="Zaad">Zaad</option>
              <option value="E-dahap">E-dahap</option>
              <option value="Soltelco">Soltelco</option>
            </select>
            <button
              type="submit"
              className="w-full bg-indigo-600 rounded hover:bg-indigo-700 text-white py-2 px-4 cursor-pointer transition-colors"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
