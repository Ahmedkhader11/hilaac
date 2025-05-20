import db from "@/utils/db";
import Testimonials from "@/models/testimonialShemal";

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

export async function POST(req) {
  try {
    await db();

    const body = await req.json();
    const { id, name, review, imageSrc, role, rating } = body;

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
    if (!review?.trim())
      return new Response(JSON.stringify({ error: "review is required" }), {
        status: 400,
        headers: JSON_HEADERS,
      });
    if (!role?.trim())
      return new Response(JSON.stringify({ error: "role is required" }), {
        status: 400,
        headers: JSON_HEADERS,
      });
    if (!imageSrc?.trim())
      return new Response(
        JSON.stringify({ error: "imageSrc URL is required" }),
        {
          status: 400,
          headers: JSON_HEADERS,
        }
      );

    if (typeof rating !== "number" || rating <= 0)
      return new Response(
        JSON.stringify({ error: "Valid rating  is required" }),
        { status: 400, headers: JSON_HEADERS }
      );

    // Create new room with custom ID
    const newTestimonial = new Testimonials({
      id: id.trim(),
      name: name.trim(),
      review: review.trim(),
      imageSrc: imageSrc.trim(),
      role,
      rating,
    });

    await newTestimonial.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "testimonial created successfully",
        newTestimonial,
      }),
      { status: 201, headers: JSON_HEADERS }
    );
  } catch (err) {
    console.error("testimonial creation error:", err);

    const errorResponse = {
      error: "Failed to create testimonial",
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

    const testimonial = await Testimonials.find()
      .select("id name imageSrc role review rating createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return new Response(
      JSON.stringify({
        success: true,
        count: testimonial.length,
        data: testimonial,
      }),
      { status: 200, headers: JSON_HEADERS }
    );
  } catch (err) {
    console.error("testimonial fetch error:", err);

    const errorResponse = {
      error: "Failed to fetch testimonial",
      ...(process.env.NODE_ENV !== "production" && { details: err.message }),
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: JSON_HEADERS,
    });
  }
}

// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import db from "@/utils/db";
// import User from "@/modals/User";

// export async function POST(req) {
//   try {
//     // Connect to DB using your existing connection
//     await db();

//     // Webhook verification
//     const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
//     if (!WEBHOOK_SECRET) throw new Error("Missing CLERK_WEBHOOK_SECRET");

//     const headerList = headers();
//     const svixHeaders = {
//       "svix-id": headerList.get("svix-id"),
//       "svix-timestamp": headerList.get("svix-timestamp"),
//       "svix-signature": headerList.get("svix-signature"),
//     };

//     const payload = await req.json();
//     console.log("Webhook Payload:", payload);
//     const wh = new Webhook(WEBHOOK_SECRET);
//     const evt = wh.verify(JSON.stringify(payload), svixHeaders);

//     // Handle events
//     switch (evt.type) {
//       case "user.created":
//       case "user.updated":
//         await handleUserUpsert(evt.data);
//         break;
//       case "user.deleted":
//         await handleUserDelete(evt.data.id);
//         break;
//     }

//     return new Response("Webhook processed", { status: 200 });
//   } catch (err) {
//     console.error("Webhook error:", err);
//     return new Response(err.message, { status: 400 });
//   }
// }

// // Handle user creation/updates
// async function handleUserUpsert(clerkUser) {
//   // Validate required fields
//   if (!clerkUser.id || !clerkUser.email_addresses?.length) {
//     throw new Error("Missing required fields in webhook data");
//   }
//   const emailData = clerkUser.email_addresses.find(
//     (e) => e.id === clerkUser.primary_email_address_id
//   );
//   if (!emailData) {
//     throw new Error("Primary email not found");
//   }

//   await User.findOneAndUpdate(
//     { clerkId: clerkUser.id },
//     {
//       clerkId: clerkUser.id,
//       email: emailData?.email_address,
//       name: `${clerkUser.first_name} ${clerkUser.last_name}`,
//       imageUrl: clerkUser.image_url,
//       bookingCount: 0,
//       updatedAt: new Date(),
//     },
//     { upsert: true, new: true }
//   );
// }

// // Handle user deletions
// async function handleUserDelete(clerkUserId) {
//   try {
//     await User.deleteOne({ clerkId: clerkUserId });
//   } catch (err) {
//     console.error("handleUserDelete error:", err);
//     throw err;
//   }
// }

// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import db from "@/utils/db";
// import User from "@/modals/User";

// export async function POST(req) {
//   try {
//     await db();

//     // Webhook verification
//     const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
//     if (!WEBHOOK_SECRET) throw new Error("Missing CLERK_WEBHOOK_SECRET");

//     const headerList = headers();
//     const svixHeaders = {
//       "svix-id": headerList.get("svix-id"),
//       "svix-timestamp": headerList.get("svix-timestamp"),
//       "svix-signature": headerList.get("svix-signature"),
//     };

//     const payload = await req.json();
//     console.log("Webhook Payload:", payload);
//     const wh = new Webhook(WEBHOOK_SECRET);
//     const evt = wh.verify(JSON.stringify(payload), svixHeaders);

//     // Handle events
//     switch (evt.type) {
//       case "user.created":
//       case "user.updated":
//         await handleUserUpsert(evt.data);
//         break;
//       case "user.deleted":
//         await handleUserDelete(evt.data.id);
//         break;
//     }

//     return new Response("Webhook processed", { status: 200 });
//   } catch (err) {
//     console.error("Webhook error:", err);
//     return new Response(err.message, { status: 400 });
//   }
// }

// // Handle user creation/updates
// async function handleUserUpsert(clerkUser) {
//   const emailData = clerkUser.email_addresses.find(
//     (e) => e.id === clerkUser.primary_email_address_id
//   );

//   await User.findOneAndUpdate(
//     { clerkId: clerkUser.id },
//     {
//       clerkId: clerkUser.id,
//       email: emailData?.email_address,
//       name: `${clerkUser.first_name} ${clerkUser.last_name}`,
//       imageUrl: clerkUser.image_url, // Fix image_url variable reference
//       updatedAt: new Date(),
//       bookingCount: 0, // Initialize booking count for new users
//     },
//     { upsert: true, new: true }
//   );
// }

// // Handle user deletions
// async function handleUserDelete(clerkUserId) {
//   await User.deleteOne({ clerkId: clerkUserId });
// }

// // API to Fetch Users
// export async function GET() {
//   try {
//     await db();

//     const users = await User.find({}).lean();

//     return new Response(JSON.stringify(users), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Failed to fetch users:", error);

//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
