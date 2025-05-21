"use client";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Loading rooms... </p>
      </div>
    </div>
  );
}
