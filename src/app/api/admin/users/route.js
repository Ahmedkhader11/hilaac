// import db from "@/utils/db";
// import User from "@/modals/User";
// import { headers } from "next/headers";

// export async function POST(req) {
//   try {
//     const clerkSignature = headers().get("Clerk-Signature");
//     if (!clerkSignature)
//       return Response.json({ error: "Unauthorized" }, { status: 401 });

//     const { type, data } = await req.json();

//     if (type === "user.created" || type === "user.updated") {
//       await db();
//       await User.findOneAndUpdate(
//         { clerkId: data.id },
//         {
//           firstName: data.firstName,
//           lastName: data.lastName,
//           email: data.emailAddresses[0]?.emailAddress,
//           role: data.publicMetadata?.role || "user",
//           updatedAt: new Date(),
//         },
//         { upsert: true, new: true }
//       );
//     }

//     if (type === "user.deleted") {
//       await db();
//       await User.findOneAndDelete({ clerkId: data.id });
//     }

//     return Response.json({ success: true });
//   } catch (error) {
//     console.error("Clerk Webhook Error:", error);
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }
