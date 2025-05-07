import mongoose, { Schema } from "mongoose";

const RoomSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  maxGuests: { type: Number, required: true },
});

const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);

export default Room;
