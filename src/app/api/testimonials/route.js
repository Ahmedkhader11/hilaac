import Testimonials from "@/modal/testimonialShemal";
import db from "@/utils/db";

export async function GET() {
  try {
    await db(); // Ensure the database connection is established

    // Fetch testimonials efficiently using lean() for better performance
    const testimonials = await Testimonials.find({}).lean();

    return new Response(JSON.stringify(testimonials), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
