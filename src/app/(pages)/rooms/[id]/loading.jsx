export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="relative flex justify-center items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>

        {/* Glowing Effect */}
        <div className="absolute w-24 h-24 border-t-2 border-indigo-300 rounded-full opacity-50 animate-pulse"></div>
      </div>

      <p className="mt-4 text-lg font-semibold text-indigo-600 tracking-wide">
        Finding the perfect room for you...
      </p>
    </div>
  );
}
