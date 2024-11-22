import mongoose from "mongoose";

// Define User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    currLocation: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    profileImageUrl: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Create and export the User model
export const User = mongoose.model("User", userSchema);
