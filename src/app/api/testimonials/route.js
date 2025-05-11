import Testimonials from "@/modals/testimonialShemal";
import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await db(); // Ensure the database connection is established

    // Fetch testimonials efficiently using lean() for better performance
    const testimonials = await Testimonials.find({}).lean();

    return new NextResponse(JSON.stringify(testimonials), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
