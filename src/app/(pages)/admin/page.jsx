import db from "@/utils/db";
import Booking from "@/models/Bookings";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export default async function DashboardHome() {
  // Connect to the database
  await db();

  // Fetch basic metrics
  const bookingsCount = await Booking.countDocuments({});
  const usersCount = await User.countDocuments({});

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Admin Dashboard
      </h1>
      <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
        Welcome to your dashboard! Here you can view a summary of your system
        and navigate to manage users, bookings, and more.
      </p>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 tracking-wider">
            Total Users
          </h2>
          <p className="mt-2 text-3xl text-gray-800 dark:text-gray-100">
            {usersCount}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 tracking-wider">
            Total Bookings
          </h2>
          <p className="mt-2 text-3xl text-gray-800 dark:text-gray-100">
            {bookingsCount}
          </p>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
          Quick Access
        </h2>
        <div className="flex gap-4">
          <a
            href="/admin/users"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Manage Users
          </a>
          <a
            href="/admin/bookings"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            View Bookings
          </a>
        </div>
      </div>
    </div>
  );
}
