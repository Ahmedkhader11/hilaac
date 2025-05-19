"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-red-500 text-6xl font-bold">⚠️</div>
      <h2 className="text-xl font-semibold text-red-600 mt-4">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 mt-2">
        {error?.message || "Failed to load the About page."}
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
