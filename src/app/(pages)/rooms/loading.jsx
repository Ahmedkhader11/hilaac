"use client";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-600 mr-10"></div>
      <div className="mt-6 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          Loading rooms...
        </h2>
        <p className="text-gray-500 mt-2">
          Please wait while we retrieve the data.
        </p>
      </div>
    </div>
  );
}
