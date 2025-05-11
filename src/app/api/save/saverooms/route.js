// API endpoint (rooms/route.js)
import db from "@/utils/db";
import Room from "@/modals/roomSchema";

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

export async function POST(req) {
  try {
    await db();

    const body = await req.json();
    const { id, name, description, image, price, maxGuests } = body;

    // Early return validation
    if (!id?.trim())
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
        headers: JSON_HEADERS,
      });
    if (!name?.trim())
      return new Response(JSON.stringify({ error: "Name is required" }), {
        status: 400,
        headers: JSON_HEADERS,
      });
    if (!description?.trim())
      return new Response(
        JSON.stringify({ error: "Description is required" }),
        { status: 400, headers: JSON_HEADERS }
      );
    if (!image?.trim())
      return new Response(JSON.stringify({ error: "Image URL is required" }), {
        status: 400,
        headers: JSON_HEADERS,
      });
    if (typeof price !== "number" || price <= 0)
      return new Response(
        JSON.stringify({ error: "Valid price is required" }),
        { status: 400, headers: JSON_HEADERS }
      );
    if (typeof maxGuests !== "number" || maxGuests <= 0)
      return new Response(
        JSON.stringify({ error: "Valid guest count is required" }),
        { status: 400, headers: JSON_HEADERS }
      );

    // Check if ID already exists
    const existingRoom = await Room.findOne({ id: id.trim() });
    if (existingRoom) {
      return new Response(
        JSON.stringify({ error: "Room with this ID already exists" }),
        { status: 409, headers: JSON_HEADERS }
      );
    }

    // Create new room with custom ID
    const newRoom = new Room({
      id: id.trim(),
      name: name.trim(),
      description: description.trim(),
      image: image.trim(),
      price,
      maxGuests,
    });

    await newRoom.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Room created successfully",
        newRoom,
      }),
      { status: 201, headers: JSON_HEADERS }
    );
  } catch (err) {
    console.error("Room creation error:", err);

    const errorResponse = {
      error: "Failed to create room",
      ...(process.env.NODE_ENV !== "production" && {
        details: err.message,
        ...(err.code === 11000 && { duplicateField: "id" }),
      }),
    };

    return new Response(JSON.stringify(errorResponse), {
      status: err.name === "ValidationError" ? 400 : 500,
      headers: JSON_HEADERS,
    });
  }
}

export async function GET() {
  try {
    await db();

    const rooms = await Room.find()
      .select("id name image price description maxGuests createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return new Response(
      JSON.stringify({
        success: true,
        count: rooms.length,
        data: rooms,
      }),
      { status: 200, headers: JSON_HEADERS }
    );
  } catch (err) {
    console.error("Room fetch error:", err);

    const errorResponse = {
      error: "Failed to fetch rooms",
      ...(process.env.NODE_ENV !== "production" && { details: err.message }),
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: JSON_HEADERS,
    });
  }
}

/* 











*/
// import { db } from "@/utils/db";
// import Room from "@/modal/roomSchema";

// export async function POST(req) {
//   await db(); // Connect to the database

//   try {
//     const body = await req.json(); // Parse JSON body
//     const { id, name, description, image, price, maxGuests } = body;

//     // Validate the input
//     if (!name || !description || !image || !price || !maxGuests) {
//       return new Response(
//         JSON.stringify({ error: "All fields are required" }),
//         {
//           status: 400,
//         }
//       );
//     }

//     // Create a new room document and save to the database
//     const newRoom = new Room({
//       id,
//       name,
//       description,
//       image,
//       price,
//       maxGuests,
//     });

//     await newRoom.save(); // Save the room
//     return new Response(
//       JSON.stringify({ message: "Room saved successfully", room: newRoom }),
//       { status: 201 }
//     );
//   } catch (err) {
//     return new Response(
//       JSON.stringify({
//         error: "Failed to save the room",
//         details: err.message,
//       }),
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   await db(); // Connect to the database

//   try {
//     // Fetch all room data from the database
//     const rooms = await Room.find();

//     return new Response(JSON.stringify(rooms), { status: 200 });
//   } catch (err) {
//     return new Response(
//       JSON.stringify({
//         error: "Failed to fetch rooms",
//         details: err.message,
//       }),
//       { status: 500 }
//     );
//   }
// }
