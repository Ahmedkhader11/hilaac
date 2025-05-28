import { notFound } from "next/navigation";
import db from "@/utils/db";
// import Room from "@/models/Room";
import Room from "@/models/roomSchema";
import RoomDetails from "./RoomDetails";

async function getRoomDataFromDB(id) {
  try {
    await db();
    const room = await Room.findById(id).lean();

    if (!room) {
      return notFound();
    }

    const serializedRoom = JSON.parse(JSON.stringify(room));

    return serializedRoom;
  } catch (error) {
    console.error(`Error fetching room with ID ${id} from database:`, error);

    // Mongoose CastError occurs if the ID format is invalid (e.g., not a valid ObjectId)
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return notFound(); // Treat invalid ID format as a 404
    }

    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      error.digest === "NEXT_NOT_FOUND"
    ) {
      throw error;
    }

    throw new Error("Failed to load room details due to a server-side error.");
  }
}

export default async function RoomPage({ params }) {
  const { id } = await params;
  const room = await getRoomDataFromDB(id);

  return <RoomDetails room={room} />;
}
