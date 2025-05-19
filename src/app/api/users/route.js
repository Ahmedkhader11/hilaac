import { Webhook } from "svix";
import { headers } from "next/headers";
import db from "@/utils/db";
import User from "@/modals/User";

export async function POST(req) {
  try {
    // Connect to DB using your existing connection
    await db();

    // Webhook verification
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) throw new Error("Missing CLERK_WEBHOOK_SECRET");

    const headerList = headers();
    const svixHeaders = {
      "svix-id": headerList.get("svix-id"),
      "svix-timestamp": headerList.get("svix-timestamp"),
      "svix-signature": headerList.get("svix-signature"),
    };

    const payload = await req.json();
    const wh = new Webhook(WEBHOOK_SECRET);
    const evt = wh.verify(JSON.stringify(payload), svixHeaders);

    // Handle events
    switch (evt.type) {
      case "user.created":
      case "user.updated":
        await handleUserUpsert(evt.data);
        break;
      case "user.deleted":
        await handleUserDelete(evt.data.id);
        break;
    }

    return new Response("Webhook processed", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response(err.message, { status: 400 });
  }
}

// Handle user creation/updates
async function handleUserUpsert(clerkUser) {
  const emailData = clerkUser.email_addresses.find(
    (e) => e.id === clerkUser.primary_email_address_id
  );

  await User.findOneAndUpdate(
    { clerkId: clerkUser.id },
    {
      clerkId: clerkUser.id,
      email: emailData?.email_address,
      name: `${clerkUser.first_name} ${clerkUser.last_name}`,
      imageUrl: image_url,
      updatedAt: new Date(),
    },
    { upsert: true, new: true }
  );
}

// Handle user deletions
async function handleUserDelete(clerkUserId) {
  await User.deleteOne({ clerkId: clerkUserId });
}
