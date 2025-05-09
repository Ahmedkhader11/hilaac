import mongoose, { Schema } from "mongoose";

const TestimonialSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  imageSrc: { type: String, required: true },
  role: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
});

const Testimonials =
  mongoose.models.Testimonials ||
  mongoose.model("Testimonials", TestimonialSchema);

export default Testimonials;
