"use client";
import { useEffect, useState } from "react";
import RoomGrid from "./roomsSwiper";

export default function OurRoomsPage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms");
        if (!response.ok) throw new Error("Failed to fetch rooms");
        const data = await response.json();
        setRooms(data);
      } catch (err) {
        console.error("Error fetching rooms:", err.message);
      }
    };

    fetchRooms();
  }, []);

  if (!rooms.length) return null; // Next.js will show loading/error automatically

  return (
    <div className="mt-8">
      <RoomGrid rooms={rooms} />
    </div>
  );
}
