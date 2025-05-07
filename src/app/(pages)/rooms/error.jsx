"use client";

export default function Error({ error, reset }) {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl text-red-500 font-bold">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 mt-2">
        {error?.message || "Failed to load rooms."}
      </p>
      <button
        onClick={reset}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer mt-4"
      >
        Retry
      </button>
    </div>
  );
}
