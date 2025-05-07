// api/check-env/route.js
export async function GET() {
  console.log("Raw ENV:", process.env.MONGODB_URL);
  return Response.json({
    dbUrl: process.env.MONGODB_URL,
  });
}
