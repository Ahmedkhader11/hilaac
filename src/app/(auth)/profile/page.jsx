"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { format } from "date-fns"; // For formatting dates
import { CheckCircle, Plus } from "lucide-react"; // Icons for email verified/add email, mail, phone

export default function ProfilePage() {
  const { user, isSignedIn } = useUser();
  const [userData, setUserData] = useState(null); // For your custom backend user data (e.g., role, bookingCount)
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to format date for "User since" and "Profile updated"
  const formatDate = useCallback((dateString) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "MMM dd, yyyy"); // Corrected year format
    } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return dateString; // Return original if formatting fails
    }
  }, []);

  // Helper function for "Profile updated X minutes ago"
  const timeSinceLastUpdate = useCallback(() => {
    if (!user?.updatedAt) return ""; // Using Clerk's updatedAt for "Profile updated"
    const now = new Date();
    const updated = new Date(user.updatedAt);
    const diffMs = now.getTime() - updated.getTime(); // Use .getTime() for reliable diff
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffMinutes < 1) return "just now";
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffMonths < 12) return `${diffMonths} months ago`;
    return formatDate(user.updatedAt); // Fallback to full date for very old updates
  }, [user?.updatedAt, formatDate]); // Added formatDate to dependencies

  useEffect(() => {
    // Only proceed if the user is signed in and available
    if (!user || !isSignedIn) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const userRes = await fetch(`/api/users/${user.id}`);
        if (!userRes.ok) {
          throw new Error(`Failed to fetch user data: ${userRes.statusText}`);
        }
        const customUserData = await userRes.json();
        setUserData(customUserData);

        if (customUserData.bookingCount && customUserData.bookingCount > 0) {
          const bookingRes = await fetch(`/api/bookings/${user.id}`);
          if (!bookingRes.ok) {
            console.warn("No bookings found or error, returning empty list.");
            setBookings([]); // Set to empty if fetch fails
          } else {
            const bookingData = await bookingRes.json();
            setBookings(
              Array.isArray(bookingData)
                ? bookingData
                : bookingData.bookings || [] // Handle cases where API returns { bookings: [] }
            );
          }
        } else {
          setBookings([]); // No bookings expected, set to empty
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError(err.message || "Error loading profile data.");
        setUserData(null); // Clear user data on error to prevent partial display
        setBookings([]); // Clear bookings on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, isSignedIn]);

  const handleUpdateAvatar = () => {
    alert(
      "Functionality to update avatar goes here! Use Clerk's UserProfile component for this."
    );
    // Example: Router.push('/user-profile'); or open Clerk's modal
  };

  const handleClearAvatar = () => {
    alert(
      "Functionality to clear avatar goes here! This would involve an API call."
    );
  };

  const handleAddEmail = () => {
    alert(
      "Functionality to add email goes here! Use Clerk's UserProfile component for this."
    );
    // Example: Router.push('/user-profile'); or open Clerk's modal
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-600 dark:text-gray-400">
          Loading your profile data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-red-600 text-center bg-gray-50 dark:bg-gray-900">
        <p>Error: {error}</p>
      </div>
    );
  }

  // If not signed in or user/userData is null after loading, prompt sign-in
  if (!user || !isSignedIn || !userData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
          Please sign in to view your profile.
        </p>
      </div>
    );
  }

  const userFullName =
    user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim();

  const clerkUsername = user.username; // Clerk's username

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:text-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col items-start space-y-1 mb-6">
          <div className="flex justify-between items-center w-full border-b-1 pb-2.5 border-gray-200 ">
            <h1 className="text-lg font-semibold text-gray-800">
              {userFullName || clerkUsername || "User Profile"}
            </h1>
            <UserButton />
          </div>
          {user.createdAt && (
            <p className="text-gray-500 text-sm border-b-1 w-full pb-2.5 border-gray-200">
              <span className="font-bold text-lg">User since</span> <br />{" "}
              <span className="text-gray-800 text-xl font-semibold">
                {formatDate(user.createdAt)}
              </span>
            </p>
          )}
          {user.updatedAt && (
            <p className="text-gray-500 text-sm pt-1.5 ">
              Profile updated {timeSinceLastUpdate()}
            </p>
          )}
        </div>

        {/* Personal Information Card */}
        <div className="bg-white  p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-gray-800 bg-gray-100 py-5 rounded px-2">
            Personal Information
          </h2>

          <div className="flex items-center space-x-6 mb-6">
            <img
              src={user?.imageUrl || "/default-avatar.jpg"}
              alt={`${userFullName || "User"}'s avatar`}
              className="w-20 h-20 rounded-full object-cover shadow"
            />
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between gap-5 ">
                <button
                  onClick={handleUpdateAvatar}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                >
                  Update avatar
                </button>
                {user?.imageUrl && user.imageUrl !== "/default-avatar.jpg" && (
                  <button
                    onClick={handleClearAvatar}
                    className="px-4 py-2 text-red-600 dark:text-red-400 rounded-md text-sm hover:bg-red-50 dark:hover:bg-gray-700 transition-colors duration-200 bg-gray-100 font-bold cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Recommend size 1:1, up to 2mb
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-bold text-gray-700  mb-1"
              >
                First name
              </label>
              <input
                id="firstName"
                type="text"
                readOnly // Assuming these are display only
                value={user.firstName || "Not set"} // Using Clerk's firstName
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-bold text-gray-700  mb-1"
              >
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                readOnly // Assuming these are display only
                value={user.lastName || "Not set"} // Using Clerk's lastName
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Email Addresses Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 ">
            Email addresses
          </h2>
          {user.emailAddresses?.length > 0 ? (
            user.emailAddresses.map((emailObject) => (
              <div
                key={emailObject.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center space-x-7 md:space-x-48 lg:space-x-50 ">
                  <span className="text-gray-700  text-base">
                    {emailObject.emailAddress}
                  </span>
                  {emailObject.verification &&
                    emailObject.verification.status === "verified" && (
                      <CheckCircle
                        className="w-4 h-4 text-green-500"
                        title="Verified"
                      />
                    )}
                  {emailObject.id === user.primaryEmailAddressId && (
                    <span className="ml-2 px-2 py-0.5 bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-200 text-xs font-medium rounded-full">
                      Primary
                    </span>
                  )}
                </div>
                {/* Optional: Add "Link" button if Clerk allows linking/unlinking emails */}
                {/* <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">Link</button> */}
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              No email addresses found.
            </p>
          )}

          <button
            onClick={handleAddEmail}
            className="flex items-center text-blue-600 dark:text-blue-400 mt-4 text-sm font-medium hover:underline"
          >
            <Plus className="w-4 h-4 mr-1" /> Add email
          </button>
        </div>

        {/* Username Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 ">
            Username
          </h2>
          <div className="flex justify-between space-x-2 px-2">
            <input
              id="username"
              type="text"
              readOnly
              value={clerkUsername || "Not set"} // Using Clerk's username
              className="flex-grow px-3 py-2 border border-gray-300  rounded-md shadow-sm bg-gray-50  text-gray-900  focus:outline-none"
            />
            {/* Optional: Add a button to manage username via Clerk's UIs (e.g., UserProfile) */}
            <button className="px-3 py-2 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-500 transition-colors duration-200 cursor-pointer">
              Manage
            </button>
          </div>
        </div>

        {/* Booking History Section */}
        {bookings.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">
              Booking History
            </h2>
            <div className="mt-4">
              <div className="space-y-4">
                {bookings.map((booking) => {
                  const totalDays = Math.ceil(
                    (new Date(booking.endDate).getTime() -
                      new Date(booking.startDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  );

                  return (
                    <div
                      key={booking._id} // Assuming _id is unique and available
                      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-x-4">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 font-semibold">
                          {booking.room}{" "}
                          {/* Assuming booking.room is directly the room name/ID */}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          <strong>Check-in:</strong>{" "}
                          {new Date(booking.startDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <strong>Check-out:</strong>{" "}
                          {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <strong>Duration:</strong> {totalDays} days
                        </p>
                      </div>
                      <p className="text-lg font-bold text-green-500 mt-2 sm:mt-0">
                        <span className="text-white">Price:</span> $
                        {booking.price ? booking.price.toFixed(2) : "N/A"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Booking History
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              You don't have any bookings yet.
            </p>
            {/* Optional: Add a link to your booking page */}
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <Link href="/rooms">Book a Room</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
