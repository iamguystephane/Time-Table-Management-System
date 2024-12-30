import mongoose, { Schema, models } from "mongoose";

const availabilitySchema = new Schema({
  id: { type: String, required: true, unique: true },
  names: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  level: { type: String, required: true },
  semester: { type: String, required: true },
  department: { type: String, required: true },
  departmentAbbreviation: { type: String, required: true },
  course: { type: String, required: true },
  day: { type: String, required: true },
  time: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const availability =
  models.availability || mongoose.model("availability", availabilitySchema);
export default availability;
