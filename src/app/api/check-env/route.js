import { NextResponse } from "next/server";

// api/check-env/route.js
export async function GET() {
  console.log("Raw ENV:", process.env.MONGODB_URL);
  return NextResponse.json({
    dbUrl: process.env.MONGODB_URL,
  });
}
