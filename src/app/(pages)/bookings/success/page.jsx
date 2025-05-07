import Link from "next/link";

export default async function BookingSuccess({ searchParams }) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // const { bookingId } = await searchParams;
  const awaitedParams = await searchParams;
  const bookingId = awaitedParams?.bookingId || "Unknown";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="text-green-600 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
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
        <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-4">Your reservation ID: {bookingId}</p>
        <p className="mb-6">We've sent a confirmation email to your address</p>
        <Link
          href="/rooms"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer inline-block"
        >
          Back to Rooms
        </Link>
      </div>
    </div>
  );
}
