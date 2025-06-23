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
      <div className="flex flex-col justify-center items-center p-4 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex relative justify-center items-center">
          <div className="w-16 h-16 rounded-full border-4 border-gray-300 animate-spin border-t-blue-500"></div>
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-600 dark:text-gray-400">
          Loading your profile data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-6 min-h-screen text-center text-red-600 bg-gray-50 dark:bg-gray-900">
        <p>Error: {error}</p>
      </div>
    );
  }

  // If not signed in or user/userData is null after loading, prompt sign-in
  if (!user || !isSignedIn || !userData) {
    return (
      <div className="flex flex-col justify-center items-center p-4 min-h-screen bg-gray-50 dark:bg-gray-900">
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
    <div className="px-4 py-6 min-h-screen text-gray-900 bg-gray-100 dark:text-gray-100 sm:px-6 lg:px-8">
      <div className="mx-auto space-y-6 max-w-2xl">
        <div className="flex flex-col items-start mb-6 space-y-1">
          <div className="flex justify-between items-center w-full border-b-1 pb-2.5 border-gray-200 ">
            <h1 className="text-lg font-semibold text-gray-800">
              {userFullName || clerkUsername || "User Profile"}
            </h1>
            <UserButton />
          </div>
          {user.createdAt && (
            <p className="text-gray-500 text-sm border-b-1 w-full pb-2.5 border-gray-200">
              <span className="text-lg font-bold">User since</span> <br />{" "}
              <span className="text-xl font-semibold text-gray-800">
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
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="px-2 py-5 mb-4 text-lg font-bold text-gray-800 bg-gray-100 rounded">
            Personal Information
          </h2>

          <div className="flex items-center mb-6 space-x-6">
            <img
              src={user?.imageUrl || "/default-avatar.jpg"}
              alt={`${userFullName || "User"}'s avatar`}
              className="object-cover w-20 h-20 rounded-full shadow"
            />
            <div className="flex flex-col space-y-3">
              <div className="flex gap-5 justify-between">
                <button
                  onClick={handleUpdateAvatar}
                  className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-md transition-colors duration-200 cursor-pointer dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Update avatar
                </button>
                {user?.imageUrl && user.imageUrl !== "/default-avatar.jpg" && (
                  <button
                    onClick={handleClearAvatar}
                    className="px-4 py-2 text-sm font-bold text-red-600 bg-gray-100 rounded-md transition-colors duration-200 cursor-pointer dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700"
                  >
                    Clear
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Recommend size 1:1, up to 2mb
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-1 text-sm font-bold text-gray-700"
              >
                First name
              </label>
              <input
                id="firstName"
                type="text"
                readOnly // Assuming these are display only
                value={user.firstName || "Not set"} // Using Clerk's firstName
                className="px-3 py-2 w-full text-gray-900 bg-white rounded-md border-2 border-gray-200 shadow-sm focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-1 text-sm font-bold text-gray-700"
              >
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                readOnly // Assuming these are display only
                value={user.lastName || "Not set"} // Using Clerk's lastName
                className="px-3 py-2 w-full text-gray-900 bg-white rounded-md border-2 border-gray-200 shadow-sm focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Email Addresses Card */}
        <div className="p-3 bg-white rounded-lg shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Email addresses
          </h2>
          {user.emailAddresses?.length > 0 ? (
            user.emailAddresses.map((emailObject) => (
              <div
                key={emailObject.id}
                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center space-x-7 md:space-x-48 lg:space-x-50">
                  <span className="text-base text-gray-700">
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
                {/* <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Link</button> */}
              </div>
            ))
          ) : (
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              No email addresses found.
            </p>
          )}

          <button
            onClick={handleAddEmail}
            className="flex items-center mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            <Plus className="mr-1 w-4 h-4" /> Add email
          </button>
        </div>

        {/* Username Card */}
        <div className="p-3 bg-white rounded-lg shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Username</h2>
          <div className="flex gap-x-2 justify-between">
            <input
              id="username"
              type="text"
              readOnly
              value={clerkUsername || "Not set"} // Using Clerk's username
              className="flex-grow px-3 py-2 text-gray-900 bg-gray-50 rounded-md border border-gray-300 shadow-sm focus:outline-none"
            />
            {/* Optional: Add a button to manage username via Clerk's UIs (e.g., UserProfile) */}
            <button className="px-2 py-2 text-sm font-medium text-white bg-gray-600 rounded-md transition-colors duration-200 cursor-pointer hover:bg-gray-500">
              Manage
            </button>
          </div>
        </div>

        {/* Booking History Section */}
        {bookings.length > 0 ? (
          <>
            <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">
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
                      className="flex flex-col p-4 bg-gray-100 rounded-lg shadow dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4">
                        <div className="px-4 py-3 font-semibold text-gray-900 bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-100">
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
                      <p className="mt-2 text-lg font-bold text-green-500 sm:mt-0">
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
          <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
              Booking History
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              You don't have any bookings yet.
            </p>
            {/* Optional: Add a link to your booking page */}
            <button className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md transition-colors hover:bg-blue-700">
              <Link href="/rooms">Book a Room</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
