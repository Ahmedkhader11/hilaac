import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true }, // Clerk's user ID
  email: { type: String, required: true },
  name: { type: String },
  role: { type: String, default: "user" }, // this could be "admin", "editor", etc.
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.index({ clerkId: 1, email: 1 });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
