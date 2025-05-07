// utils/db.js (optimized)
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connection = {};

async function db() {
  if (connection.isConnected) return;

  try {
    const dbConnection = await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    connection.isConnected = dbConnection.connections[0].readyState;
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
}

// Optional: Close connection on app shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
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
