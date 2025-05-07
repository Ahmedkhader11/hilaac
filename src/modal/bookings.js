import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room", // Reference to the Room model
    required: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  startDate: {
    type: Date,
    required: true,
  },
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
  guests: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: {
      values: ["Zaad", "E-dahap", "Soltelco"], // Match frontend values
      message: "Invalid payment method",
    },
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add index for common queries
BookingSchema.index({ room: 1, startDate: 1, endDate: 1 });

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
export default Booking;
