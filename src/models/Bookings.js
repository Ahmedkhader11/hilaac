import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  name: { type: String, required: [true, "Name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [
      /^0(63|65|67)\d{7}$/,
      "Please use a valid Somali phone number format (e.g., 0631234567 or 0651234567 or 0671234567)",
    ],
  },
  startDate: { type: Date, required: true },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: "End date must be after start date",
    },
  },
  guests: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: {
      values: ["Zaad", "E-dahap", "Soltelco"],
      message: "Invalid payment method",
    },
    required: true,
  },
  price: { type: Number, required: true, min: [0, "Price cannot be negative"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

BookingSchema.index({ userId: 1, room: 1, startDate: 1, endDate: 1 });

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
export default Booking;
