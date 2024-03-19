import mongoose from "mongoose";

const { Schema } = mongoose;

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    password_digest: { type: String, required: true, select: false },
  },
  { timestamps: true }
);
export default mongoose.model("users", User);
