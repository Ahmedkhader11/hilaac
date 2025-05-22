import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true }, // Clerk's user ID
    email: { type: String, required: true },
    name: { type: String },
    role: { type: String, default: "user" },
    imageUrl: { type: String },
    bookingCount: {
      type: Number,
      default: 0,
      min: 0, // Ensure bookingCount is not negative
      max: 1, // Enforce a maximum of 1
    },
  },
  { timestamps: true } // <-- This handles createdAt and updatedAt automatically
);

// Pre-save hook to ensure bookingCount is 0 or 1
UserSchema.pre("save", function (next) {
  if (this.bookingCount > 1) {
    this.bookingCount = 1; // Correct the count if it exceeds 1
  }
  next();
});

UserSchema.index({ clerkId: 1, email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ bookingCount: 1 });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
