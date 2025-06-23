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
    <div className="p-4 mx-auto max-w-5xl sm:p-6 lg:p-8">
      <button
        onClick={() => router.back()}
        className="px-5 py-2 pl-2 mb-6 font-semibold tracking-wide text-white bg-indigo-600 rounded-lg shadow-md transition-colors duration-200 ease-in-out cursor-pointer hover:bg-indigo-700"
      >
        ← Back
      </button>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <div>
          <img
            src={room.image}
            alt={room.name}
            className="object-cover w-full h-64 rounded-xl shadow-lg sm:h-80"
          />
          <h1 className="mt-6 text-3xl font-extrabold leading-tight text-indigo-700 sm:text-4xl">
            {room.name}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-gray-700">
            {room.description}
          </p>
          <div className="p-5 mt-6 bg-indigo-50 rounded-lg shadow-sm">
            <p className="text-2xl font-bold text-indigo-800">
              ${room.price}/night
            </p>
            <p className="mt-2 text-lg text-gray-700">
              Capacity: {room.maxGuests} guests
            </p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-2xl sm:p-8">
          <h2 className="mb-5 text-2xl font-bold text-indigo-700 sm:text-3xl">
            Book This Room
          </h2>

          <form onSubmit={handleBooking} className="space-y-4 sm:space-y-5">
            <label htmlFor="username" className="block tracking-widest">
              <p className="pb-2 ml-1.5 font-semibold">username;</p>
              <input
                id="username"
                type="text"
                required
                className="p-3 w-full rounded-lg border border-gray-300 transition duration-150 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={bookingData.name}
                placeholder="Enter your name"
                onChange={(e) =>
                  setBookingData({ ...bookingData, name: e.target.value })
                }
              />
            </label>
            <label htmlFor="email" className="block tracking-widest">
              <p className="pb-2 ml-1.5 font-semibold">Email:</p>
              <input
                type="email"
                id="email"
                required
                className="p-3 w-full rounded-lg border border-gray-300 transition duration-150 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={bookingData.email}
                placeholder="Enter your email"
                onChange={(e) =>
                  setBookingData({ ...bookingData, email: e.target.value })
                }
              />
            </label>
            <label htmlFor="tel" className="block tracking-widest">
              <p className="pb-2 ml-1.5 font-semibold">telephone:</p>
              <input
                type="tel"
                id="tel"
                required
                className="p-3 w-full rounded-lg border border-gray-300 transition duration-150 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={bookingData.phone}
                placeholder="Enter your phone number"
                onChange={(e) =>
                  setBookingData({ ...bookingData, phone: e.target.value })
                }
              />
            </label>
            <label htmlFor="startdate" className="block tracking-widest">
              <p className="pb-2 ml-1.5 font-semibold">Start-date:</p>
              <input
                type="date"
                id="startdate"
                required
                className="p-3 w-full rounded-lg border border-gray-300 transition duration-150 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={bookingData.startDate.toISOString().split("T")[0]}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  updatePrice(new Date(e.target.value), bookingData.endDate)
                }
              />
            </label>
            <label htmlFor="end-date" className="block tracking-widest">
              <p className="pb-2 ml-1.5 font-semibold">End-date:</p>
              <input
                id="end-date"
                type="date"
                required
                className="p-3 w-full rounded-lg border border-gray-300 transition duration-150 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={bookingData.endDate.toISOString().split("T")[0]}
                min={bookingData.startDate.toISOString().split("T")[0]}
                onChange={(e) =>
                  updatePrice(bookingData.startDate, new Date(e.target.value))
                }
              />
            </label>
            <label htmlFor="guest" className="block tracking-widest">
              <p className="pb-2 ml-1.5 font-semibold">Guest:</p>
              <input
                type="number"
                id="guest"
                min="1"
                max={room.maxGuests}
                required
                className="p-3 w-full rounded-lg border border-gray-300 transition duration-150 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={bookingData.guests || ""}
                placeholder="Enter number of guests eg. 1"
                onChange={(e) =>
                  setBookingData({ ...bookingData, guests: e.target.value })
                }
              />
            </label>
            <label htmlFor="payments" className="block tracking-widest">
              <p className="pb-2 ml-1.5 font-semibold"> Payments:</p>
              <select
                id="payments"
                required
                className="p-3 w-full bg-white rounded-lg border border-gray-300 transition duration-150 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
            <p className="pt-5 text-xl font-extrabold text-red-700 sm:text-2xl text-end">
              Total Price: $
              {bookingData.price ? bookingData.price.toFixed(2) : "0.00"}
            </p>
            {error && <p className="text-center text-red-500">{error}</p>}
            <button
              type="submit"
              className={`w-full bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "transform cursor-pointer hover:bg-indigo-700 hover:scale-105"
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
