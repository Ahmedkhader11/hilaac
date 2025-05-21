"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function RoomDetails() {
  const { user } = useUser();
  const { id } = useParams();
  const router = useRouter();
  const [room, setRoom] = useState(null);
  const [bookingData, setBookingData] = useState({
    userId: user?.id || "",
    name: "",
    email: "",
    phone: "",
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    guests: "",
    paymentMethod: "",
    price: 0,
  });

  // Define updatePrice() BEFORE useEffect()
  const updatePrice = (start, end) => {
    if (!room?.price) return; // Ensure room has a price before calculating
    const timeDiff = Math.abs(end - start);
    let nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    if (nights < 1) nights = 1; // Prevent 0-day bookings
    setBookingData((prev) => ({
      ...prev,
      startDate: start,
      endDate: end,
      price: room.price * nights, // Update price dynamically
    }));
  };

  useEffect(() => {
    if (!id) return;

    if (user) {
      setBookingData((prev) => ({
        ...prev,
        userId: user.id,
        name: user.fullName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
      }));
    }

    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        if (!res.ok)
          throw new Error(
            `Failed to fetch room details (Status: ${res.status})`
          );
        const data = await res.json();
        setRoom(data);

        // Ensure price is updated when room loads
        // Use the default startDate and endDate from bookingData's initial state
        updatePrice(bookingData.startDate, bookingData.endDate);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchRoom();
  }, [id, user, bookingData.startDate, bookingData.endDate]); // Added bookingData dates to dependencies

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const bookingPayload = {
        userId: user.id,
        roomId: id,
        ...bookingData,
        price: bookingData.price,
        startDate: bookingData.startDate.toISOString(),
        endDate: bookingData.endDate.toISOString(),
        // Ensure guests is a number if your backend expects it
        guests: Number(bookingData.guests),
      };

      console.log("Booking Payload:", bookingPayload);

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
      alert(`Booking failed: ${err.message || "Unknown error"}`); // User-friendly error
    }
  };

  if (!room)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading room details...</p>
        </div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      {" "}
      {/* Adjusted padding for responsiveness */}
      <button
        onClick={() => router.back()}
        className="mb-6 px-5 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 font-semibold cursor-pointer text-white tracking-wide transition-colors duration-200 ease-in-out shadow-md"
      >
        ← Back to Rooms
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 dark:text-black">
        {" "}
        {/* Responsive grid layout */}
        {/* Room Details Section */}
        <div>
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-64 sm:h-80 object-cover rounded-xl shadow-lg" // Larger images on larger screens, rounded corners
          />
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-6 text-indigo-700 leading-tight">
            {room.name}
          </h1>
          <p className="text-gray-700 mt-3 text-lg leading-relaxed">
            {room.description}
          </p>
          <div className="mt-6 p-5 bg-indigo-50 rounded-lg shadow-sm">
            <p className="text-2xl font-bold text-indigo-800">
              {room.price}/night
            </p>
            <p className="mt-2 text-gray-700 text-lg">
              Capacity: {room.maxGuests} guests
            </p>
          </div>
        </div>
        {/* Booking Form */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200">
          {" "}
          {/* Enhanced styling */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-indigo-700">
            Book This Room
          </h2>
          <p className="text-xl sm:text-2xl font-extrabold pb-5 text-green-700">
            Total Price: $
            {bookingData.price ? bookingData.price.toFixed(2) : "0.00"}
          </p>
          <form onSubmit={handleBooking} className="space-y-4 sm:space-y-5">
            {" "}
            {/* Increased vertical spacing */}
            <input
              type="text"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
              value={bookingData.name}
              placeholder="Enter your name"
              onChange={(e) =>
                setBookingData({ ...bookingData, name: e.target.value })
              }
            />
            <input
              type="email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
              value={bookingData.email}
              placeholder="Enter your email"
              onChange={(e) =>
                setBookingData({ ...bookingData, email: e.target.value })
              }
            />
            <input
              type="tel"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
              value={bookingData.phone}
              placeholder="Enter your phone number"
              onChange={(e) =>
                setBookingData({ ...bookingData, phone: e.target.value })
              }
            />
            <input
              type="date"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
              value={bookingData.startDate.toISOString().split("T")[0]}
              min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
              onChange={(e) =>
                updatePrice(new Date(e.target.value), bookingData.endDate)
              }
            />
            <input
              type="date"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
              value={bookingData.endDate.toISOString().split("T")[0]}
              min={bookingData.startDate.toISOString().split("T")[0]} // Ensure end date is not before start date
              onChange={(e) =>
                updatePrice(bookingData.startDate, new Date(e.target.value))
              }
            />
            <input
              type="number" // Changed to number for guests
              min="1" // Minimum 1 guest
              max={room.maxGuests} // Max guests from room data
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
              value={bookingData.guests || ""}
              placeholder="Enter number of guests"
              onChange={(e) =>
                setBookingData({ ...bookingData, guests: e.target.value })
              }
            />
            <select
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
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
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
