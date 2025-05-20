import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true }, // Clerk's user ID
    email: { type: String, required: true },
    name: { type: String },
    role: { type: String, default: "user" },
    imageUrl: { type: String },
    bookingCount: { type: Number, default: 0 },
    // createdAt: { type: Date, default: Date.now }, // <-- REMOVE OR COMMENT OUT
    // updatedAt: { type: Date, default: Date.now }, // <-- REMOVE OR COMMENT OUT
  },
  { timestamps: true } // <-- This handles createdAt and updatedAt automatically
);

UserSchema.index({ clerkId: 1, email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ bookingCount: 1 });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
