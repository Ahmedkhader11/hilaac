import Link from "next/link";

async function fetchBooking(bookingId) {
  console.log("bookingId:", bookingId);
  if (!bookingId || bookingId === "Unknown") return null;
  try {
    const res = await fetch(`/api/bookings/${bookingId}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Fetch error:", e);
    return null;
  }
}
export default async function BookingSuccess({ searchParams }) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // const { bookingId } = await searchParams;
  const awaitedParams = await searchParams;
  const bookingId = awaitedParams?.bookingId || "Unknown";
  const booking = await fetchBooking(bookingId);

  return (
    <div className="flex justify-center items-center px-2 py-8 min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="p-8 w-full max-w-lg text-center bg-white rounded-2xl border border-blue-100 shadow-2xl">
        <div className="mb-4 text-green-600">
          <svg
            className="mx-auto w-16 h-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="mb-2 text-3xl font-extrabold text-blue-700">
          Booking Confirmed!
        </h1>
        <p className="mb-4 text-lg text-gray-600">
          Your reservation ID:{" "}
          <span className="font-mono text-blue-600">{bookingId}</span>
        </p>
        <p className="mb-6 text-gray-500">
          We've sent a confirmation email to your address.
        </p>
        {booking ? (
          <div className="p-6 mb-6 text-left bg-gray-50 rounded-lg shadow-inner">
            <h2 className="mb-2 text-xl font-bold text-blue-800">
              Booking Receipt
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Room:</span>{" "}
                <span>{booking.room.name || ""}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Description:</span>{" "}
                <span>{booking.roomDescription || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Price per night:</span>{" "}
                <span>${booking.roomPrice || booking.price || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Check-in:</span>{" "}
                <span>
                  {booking.startDate
                    ? new Date(booking.startDate).toLocaleDateString()
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Check-out:</span>{" "}
                <span>
                  {booking.endDate
                    ? new Date(booking.endDate).toLocaleDateString()
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Guests:</span>{" "}
                <span>{booking.guests}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Payment Method:</span>{" "}
                <span>{booking.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 mt-2 border-t">
                <span className="text-lg font-bold">Total Paid:</span>{" "}
                <span className="text-lg font-bold text-green-700">
                  ${booking.totalPrice || booking.price}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 text-red-500">
            Booking details not found. Please check your email for confirmation.
          </div>
        )}
        <Link
          href="/rooms"
          className="inline-block px-6 py-2 font-semibold text-white bg-blue-600 rounded shadow-md transition-colors cursor-pointer hover:bg-blue-700"
        >
          Back to Rooms
        </Link>
      </div>
    </div>
  );
}
