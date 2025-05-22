"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function ProfilePage() {
  const { user, isSignedIn } = useUser();
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !isSignedIn) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // --- Fetch User Data ---
        const userRes = await fetch(`/api/users/${user.id}`);
        if (!userRes.ok) throw new Error("Failed to fetch user data");
        const userData = await userRes.json();
        setUserData(userData);

        // --- Fetch Bookings ---
        if (userData.bookingCount > 0) {
          const bookingRes = await fetch(`/api/bookings/${user.id}`);
          if (!bookingRes.ok) {
            console.warn("No bookings found or error, returning empty list.");
            setBookings([]);
          } else {
            const bookingData = await bookingRes.json();
            setBookings(
              Array.isArray(bookingData)
                ? bookingData
                : bookingData.bookings || []
            );
          }
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError(err.message || "Error loading profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, isSignedIn]);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-600">
          Loading, please wait...
        </p>
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto p-6 mt-10 text-red-600 text-center">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="container mx-auto p-6 mt-10">
      {/* Profile Info Section */}
      <div className="bg-gray-100 shadow rounded-lg p-6 mb-8 text-center sm:text-left  dark:text-black">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src={user?.imageUrl || "/default-avatar.jpg"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-4 sm:mb-0 sm:mr-4"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">Profile</h1>
            <p className="text-lg mb-1">
              <strong>Name:</strong> {userData?.name}
            </p>
            <p className="text-lg mb-1">
              <strong>Email:</strong> {userData?.email}
            </p>
            <p className="text-lg">
              <strong>Role:</strong> {userData?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Booking History Section */}
      <h2 className="text-2xl font-bold mb-4 ">Booking History</h2>
      <div className="mt-4">
        {bookings.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-600">You have not booked yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const totalDays = Math.ceil(
                (new Date(booking.endDate) - new Date(booking.startDate)) /
                  (1000 * 60 * 60 * 24)
              );

              return (
                <div
                  key={booking._id}
                  className="bg-gray-100 p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-x-4">
                    <div className="bg-gray-200  rounded-lg px-4 py-3 text-gray-900 font-semibold">
                      {booking.room}
                    </div>
                    <p className="text-gray-700">
                      <strong>Start:</strong>{" "}
                      {new Date(booking.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">
                      <strong>End:</strong>{" "}
                      {new Date(booking.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 pb-3">
                      <strong>Days:</strong> {totalDays} days
                    </p>
                  </div>
                  <p className="text-lg font-bold text-blue-500 mt-2 sm:mt-0">
                    ${booking.price.toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
