import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

let cached = global.mongoose || { conn: null, promise: null };

async function db() {
  if (cached.conn) return cached.conn; // Return cached connection

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })
      .then((conn) => {
        console.log("MongoDB Connected");
        cached.conn = conn;
        return conn;
      })
      .catch((err) => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
      });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached; // Store globally
  return cached.conn;
}

// Close connection on shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB Disconnected");
  process.exit(0);
});

export default db;

/* 




*/
// import mongoose from "mongoose";

// export const db = async () => {
//   try {
//     const URL = process.env.MONGODB_URL; // Use the environment variable
//     if (!URL) {
//       throw new Error("MONGODB_URL environment variable is not defined");
//     }

//     if (mongoose.connection.readyState === 1) {
//       // If already connected, return the existing connection
//       return mongoose.connection;
//     }

//     await mongoose.connect(URL); // No need for useNewUrlParser or useUnifiedTopology
//     console.log("Connected to MongoDB");
//     return mongoose.connection;
//   } catch (error) {
//     console.error("Failed to Connect DB", error);
//     throw error;
//   }
// };
