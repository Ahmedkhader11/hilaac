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
      // Combine into one main async function
      setLoading(true); // Set loading true at the start of the whole process
      setError(null); // Clear previous errors

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
          setBookings([]); // No bookings, set empty array
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError(err.message || "Error loading profile data."); // Use err.message for more detail
      } finally {
        setLoading(false); // Always set loading to false when all fetches are done
      }
    };

    fetchData();
  }, [user, isSignedIn]); // isSignedIn can also be a dependency

  if (loading)
    return (
      <div className="container mx-auto flex flex-col items-center justify-center h-screen">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-600">
          Loading, please wait...
        </p>
      </div>
    );
  if (error) return <p className=" container mx-auto p-6 mt-10">{error}</p>;

  return (
    <div className="ring container mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow rounded p-4">
        <img
          src={user?.imageUrl || "/default-avatar.jpg"}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />
        <p>
          <strong>Name:</strong> {userData?.name}
        </p>
        <p>
          <strong>Email:</strong> {userData?.email}
        </p>
        <p>
          <strong>Role:</strong> {userData?.role}
        </p>
      </div>

      <h2 className="text-2xl mt-6 font-bold">Booking History</h2>
      <div className="mt-4">
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Room</th>
                <th className="px-4 py-2">Start Date</th>
                <th className="px-4 py-2">End Date</th>
                <th className="px-4 py-2">Total Days</th>
                <th className="px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                const totalDays = Math.ceil(
                  (new Date(booking.endDate) - new Date(booking.startDate)) /
                    (1000 * 60 * 60 * 24)
                );
                return (
                  <tr key={booking._id}>
                    <td className="border px-4 py-2">{booking.room}</td>
                    <td className="border px-4 py-2">
                      {new Date(booking.startDate).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(booking.endDate).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">{totalDays} days</td>
                    <td className="border px-4 py-2">${booking.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
