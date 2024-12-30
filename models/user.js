import mongoose, { models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    names: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      maxlength: 1,
    },
    department: { type: String, required: true },
    departmentAbbreviation: { type: String, required: true },
    level: {type: String}
  },
  {
    timestamps: true,
  }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
