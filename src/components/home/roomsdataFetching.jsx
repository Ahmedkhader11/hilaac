"use client";
import { useEffect, useState } from "react";
import RoomSwiper from "./RoomsSwiper";

export default function RoomsdataFetching() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        setError(null); // Reset error state
        const response = await fetch("/api/rooms");
        if (!response.ok) throw new Error("Failed to fetch rooms");
        const data = await response.json();
        setRooms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="mt-8">
      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500"></div>
          <p className="ml-3 text-gray-700">Loading rooms...</p>
        </div>
      )}
      {error && (
        <div className="text-center text-red-500 font-semibold">
          Error: {error}
        </div>
      )}
      {rooms.length > 0 && <RoomSwiper rooms={rooms.slice(0, 4)} />}
    </div>
  );
}
