import db from "@/utils/db";
import Testimonials from "@/modals/testimonialShemal";

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
