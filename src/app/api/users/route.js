import { Webhook } from "svix";
import { headers } from "next/headers";
import db from "@/utils/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    await db(); // Connect to DB

    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET)
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable."); // More specific error message

    const headerList = headers();
    const svixHeaders = {
      "svix-id": headerList.get("svix-id"),
      "svix-timestamp": headerList.get("svix-timestamp"),
      "svix-signature": headerList.get("svix-signature"),
    };

    let payload;
    try {
      payload = await req.json();
      console.log(
        "Received Webhook Payload:",
        JSON.stringify(payload, null, 2)
      ); // Log received payload
    } catch (jsonParseError) {
      console.error("Error parsing webhook JSON payload:", jsonParseError);
      throw new Error(`Invalid JSON payload: ${jsonParseError.message}`); // Re-throw with descriptive error
    }

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
      evt = wh.verify(JSON.stringify(payload), svixHeaders);
    } catch (svixVerifyError) {
      console.error("Svix Webhook Verification Failed:", svixVerifyError); // Log full error object
      throw new Error(
        `Webhook verification failed: ${svixVerifyError.message}`
      ); // Re-throw with descriptive error
    }

    switch (evt.type) {
      case "user.created":
      case "user.updated":
        await handleUserUpsert(evt.data);
        break;
      case "user.deleted":
        await handleUserDelete(evt.data.id);
        break;
      default:
        console.warn(`Unhandled webhook event type: ${evt.type}`);
        break;
    }

    return new Response("Webhook processed", { status: 200 });
  } catch (err) {
    console.error("Error Object:", err);

    // Ensure we return a useful message, but avoid leaking too much internal detail if not in dev
    const errorMessage =
      err.message || "An unknown error occurred during webhook processing.";
    return new Response(errorMessage, { status: 400 });
  }
}

async function handleUserUpsert(clerkUser) {
  try {
    if (!clerkUser.id || !clerkUser.email_addresses?.length) {
      throw new Error(
        "Invalid user data: Missing Clerk ID or email addresses."
      );
    }

    const emailData = clerkUser.email_addresses.find(
      (e) => e.id === clerkUser.primary_email_address_id
    );

    if (!emailData) {
      throw new Error(
        "Invalid user data: Primary email not found in webhook data."
      );
    }

    const imageUrl =
      clerkUser.image_url ||
      clerkUser.profile_image_url ||
      "/default-avatar.jpg";
    console.log("Resolved imageUrl:", imageUrl); // Log resolved image URL

    const updatedUser = await User.findOneAndUpdate(
      { clerkId: clerkUser.id },
      {
        clerkId: clerkUser.id,
        email: emailData.email_address, // Ensure email_address is accessed safely
        name: `${clerkUser.first_name || ""} ${
          clerkUser.last_name || ""
        }`.trim(),
        imageUrl,
        bookingCount: 0,
        // timestamps: true handles createdAt and updatedAt
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    if (!updatedUser) {
      throw new Error(
        "Database operation failed: User.findOneAndUpdate returned null."
      );
    }
    console.log("User successfully saved/updated:", updatedUser.clerkId);
  } catch (err) {
    console.error("Error inside handleUserUpsert:", err); // Log full error object
    throw err; // Re-throw to the main catch block
  }
}

async function handleUserDelete(clerkUserId) {
  try {
    const result = await User.deleteOne({ clerkId: clerkUserId });
    if (result.deletedCount === 0) {
      console.warn(`No user found to delete with clerkId: ${clerkUserId}`);
    } else {
      console.log(`User with clerkId ${clerkUserId} deleted successfully.`);
    }
  } catch (err) {
    console.error("Error inside handleUserDelete:", err); // Log full error object
    throw err;
  }
}

export async function GET() {
  try {
    await db();

    const users = await User.find({}).lean();

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch users:", error);

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
