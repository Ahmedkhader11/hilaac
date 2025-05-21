"use client";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

export default function RoomGrid({ rooms }) {
  const router = useRouter(); // Initialize the router for navigation

  if (!rooms?.length) return <p>Loading rooms...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 border border-gray-300 p-3 rounded cursor-pointer ">
      {rooms.slice(0, 6).map((room) => (
        <div
          key={room.id}
          className="mb-3 p-4 hover:shadow-[4px_4px_0px_rgba(63,63,156,0.8)] transition-shadow rounded hover:transform hover:transition-transform hover:scale-102 duration-500"
        >
          {/* Image Section */}
          <div
            className="relative overflow-hidden rounded-lg cursor-pointer"
            onClick={() => router.push(`/rooms/${room._id}`)} // Navigate when clicking the image
          >
            <Image
              src={room.image}
              alt={room.name}
              width={400}
              height={300}
              className="rounded-lg block w-full h-full object-cover"
            />
          </div>

          {/* Button Section */}
          <div className="translate-y-[-22px]">
            <div className="bg-indigo-700 mb-5 w-3/4 h-11 mx-auto">
              <ul className="font-semibold text-white grid grid-cols-2 leading-10 text-center">
                <li className="border-r border-gray-500">
                  ${room.price}/Night
                </li>
                <li
                  className={`cursor-pointer border-l ${
                    room.booked
                      ? "text-yellow-500 cursor-not-allowed"
                      : "hover:bg-indigo-800"
                  }`}
                  onClick={() =>
                    !room.booked && router.push(`/rooms/${room._id}`)
                  } // Prevent booking action if booked
                >
                  {room.booked ? "Booked" : "Book Now"}
                </li>
              </ul>
            </div>
            <h5 className="font-semibold mb-2.5">{room.name}</h5>
            <p className="text-gray-500">{room.description}</p>
          </div>

          {/* Icon Section */}
          <div className="text-center mt-2">
            <ul className="flex justify-center space-x-8">
              {[1, 3, 4, 5, 6].map((num) => (
                <li key={num}>
                  <Image
                    src={`/images/option-icon-${num}.png`}
                    alt="option-icon"
                    width={24}
                    height={24}
                    className="h-5 w-5 filter-grayscale dark:invert dark:brightness-900"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
