import RoomDetails from "./RoomDetails";

/*
 */
async function getRoomData(id) {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/rooms/${id}`);
    console.log(res);
    if (!res.ok) {
      throw new Error(`Failed to fetch room (Status: ${res.status})`);
    }
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to load room details");
  }
}

export default async function RoomPage({ params }) {
  try {
    const { id } = await params;
    const room = await getRoomData(id);
    return <RoomDetails room={room} />;
  } catch (error) {
    throw error;
  }
}
