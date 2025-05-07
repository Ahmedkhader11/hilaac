"use client";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-600 border-b-4"></div>
      <h2 className="text-xl font-semibold text-gray-700 mt-4">
        Loading About Page...
      </h2>
      <p className="text-gray-500 mt-2">
        Please wait while we prepare the details.
      </p>
    </div>
  );
}
