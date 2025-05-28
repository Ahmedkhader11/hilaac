"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function RoomDetails({ room: initialRoomData }) {
  const { user } = useUser();
  const router = useRouter();

  const [room, setRoom] = useState(initialRoomData);
  const [bookingData, setBookingData] = useState(() => {
    const initialStartDate = new Date();
    const initialEndDate = new Date(
      new Date().setDate(initialStartDate.getDate() + 1)
    );
    return {
      userId: user?.id || "",
      name: user?.fullName || "",
      email: user?.emailAddresses[0]?.emailAddress || "",
      phone: "",
      startDate: initialStartDate,
      endDate: initialEndDate,
      guests: "",
      paymentMethod: "",
      price: 0,
    };
  });

  const updatePrice = (start, end) => {
    if (!room?.price) {
      setBookingData((prev) => ({
        ...prev,
        price: 0,
        startDate: start,
        endDate: end,
      }));
      return;
    }
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    let nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    if (nights < 1) nights = 1;
    setBookingData((prev) => ({
      ...prev,
      startDate: start,
      endDate: end,
      price: room.price * nights,
    }));
  };

  useEffect(() => {
    if (user && bookingData.userId === "") {
      setBookingData((prev) => ({
        ...prev,
        userId: user.id,
        name: user.fullName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
      }));
    }

    if (initialRoomData && bookingData.price === 0) {
      updatePrice(bookingData.startDate, bookingData.endDate);
    }
  }, [user, initialRoomData, bookingData.startDate, bookingData.endDate]);

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state to track submission

  const handleBooking = async (e) => {
    e.preventDefault();
    setError(null);

    if (isSubmitting) return; // Prevent multiple submissions if already submitting
    setIsSubmitting(true); // Set submitting state to true

    try {
      // Validate form data
      if (
        !bookingData.guests ||
        parseInt(bookingData.guests) > room.maxGuests
      ) {
        throw new Error(
          `Please enter valid number of guests (1-${room.maxGuests})`
        );
      }
      if (!bookingData.paymentMethod) {
        throw new Error("Please select a payment method");
      }

      // Validate price
      if (!room.price || room.price <= 0) {
        throw new Error("Room price is not properly set");
      }

      const bookingPayload = {
        userId: user.id,
        roomId: initialRoomData._id,
        ...bookingData,
        price: bookingData.price,
        startDate: bookingData.startDate.toISOString(),
        endDate: bookingData.endDate.toISOString(),
        guests: Number(bookingData.guests),
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Booking failed");
      }

      const result = await response.json();
      router.push(`/bookings/success?bookingId=${result.bookingId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false); // Re-enable the button after submission (success or failure)
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <button
        onClick={() => router.back()}
        className="mb-6 px-5 py-2 pl-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 font-semibold cursor-pointer text-white tracking-wide transition-colors duration-200 ease-in-out shadow-md"
      >
        ← Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-64 sm:h-80 object-cover rounded-xl shadow-lg"
          />
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-6 text-indigo-700 leading-tight">
            {room.name}
          </h1>
          <p className="text-gray-700 mt-3 text-lg leading-relaxed">
            {room.description}
          </p>
          <div className="mt-6 p-5 bg-indigo-50 rounded-lg shadow-sm">
            <p className="text-2xl font-bold text-indigo-800">
              ${room.price}/night
            </p>
            <p className="mt-2 text-gray-700 text-lg">
              Capacity: {room.maxGuests} guests
            </p>
          </div>
        </div>
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-indigo-700">
            Book This Room
          </h2>

          <form onSubmit={handleBooking} className="space-y-4 sm:space-y-5">
            <label htmlFor="username" className="block  tracking-widest ">
              <p className="pb-2 ml-1.5 font-semibold">username;</p>
              <input
                id="username"
                type="text"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                value={bookingData.name}
                placeholder="Enter your name"
                onChange={(e) =>
                  setBookingData({ ...bookingData, name: e.target.value })
                }
              />
            </label>
            <label htmlFor="email" className="block tracking-widest ">
              <p className="pb-2 ml-1.5 font-semibold">Email:</p>
              <input
                type="email"
                id="email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                value={bookingData.email}
                placeholder="Enter your email"
                onChange={(e) =>
                  setBookingData({ ...bookingData, email: e.target.value })
                }
              />
            </label>
            <label htmlFor="tel" className="block tracking-widest ">
              <p className="pb-2 ml-1.5 font-semibold">telephone:</p>
              <input
                type="tel"
                id="tel"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                value={bookingData.phone}
                placeholder="Enter your phone number"
                onChange={(e) =>
                  setBookingData({ ...bookingData, phone: e.target.value })
                }
              />
            </label>
            <label htmlFor="startdate" className="block  tracking-widest ">
              <p className="pb-2 ml-1.5 font-semibold">Start-date:</p>
              <input
                type="date"
                id="startdate"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                value={bookingData.startDate.toISOString().split("T")[0]}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  updatePrice(new Date(e.target.value), bookingData.endDate)
                }
              />
            </label>
            <label htmlFor="end-date" className="block tracking-widest ">
              <p className="pb-2 ml-1.5 font-semibold">End-date:</p>
              <input
                id="end-date"
                type="date"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                value={bookingData.endDate.toISOString().split("T")[0]}
                min={bookingData.startDate.toISOString().split("T")[0]}
                onChange={(e) =>
                  updatePrice(bookingData.startDate, new Date(e.target.value))
                }
              />
            </label>
            <label htmlFor="guest" className="block  tracking-widest ">
              <p className="pb-2 ml-1.5 font-semibold">Guest:</p>
              <input
                type="number"
                id="guest"
                min="1"
                max={room.maxGuests}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                value={bookingData.guests || ""}
                placeholder="Enter number of guests eg. 1"
                onChange={(e) =>
                  setBookingData({ ...bookingData, guests: e.target.value })
                }
              />
            </label>
            <label htmlFor="payments" className="block  tracking-widest ">
              <p className="pb-2 ml-1.5 font-semibold"> Payments:</p>
              <select
                id="payments"
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
            </label>
            <p className="text-xl sm:text-2xl font-extrabold pt-5 text-end text-red-700">
              Total Price: $
              {bookingData.price ? bookingData.price.toFixed(2) : "0.00"}
            </p>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className={`w-full bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-700 transform hover:scale-105 cursor-pointer"
              }`}
              disabled={isSubmitting} // Disable the button when submitting
            >
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
