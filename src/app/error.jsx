"use client";
import { useRouter } from "next/navigation"; // Correct import for App Router
import { useTransition } from "react";

export default function Error({ error, reset }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const reload = () => {
    startTransition(() => {
      router.refresh(); // Refresh the current page
      reset(); // Reset error boundary
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="text-red-600 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-red-600">
          Something Went Wrong!
        </h1>
        <p className="text-gray-600 mb-6">
          {error?.message || "An unexpected error occurred."}
        </p>

        {/* Retry with startTransition for smoother UI updates */}
        <button
          onClick={reload}
          className={`px-6 py-2 rounded transition-colors cursor-pointer ${
            isPending
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          disabled={isPending}
        >
          {isPending ? "Retrying..." : "Retry"}
        </button>
      </div>
    </div>
  );
}
