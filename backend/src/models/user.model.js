import mongoose from "mongoose";

// Define User schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, default: "USER" },
    email: { type: String, required: true, trim: true, lowercase: true },
    mobileNumber: { type: String, required: true },
    currLocation: { type: String, required: true },
    bio: { type: String, trim: true },
    websiteUrl: { type: String, trim: true },
    profileImageUrl: { type: String, trim: true },
    resumeUrl: { type: String, trim: true },
    aboutMe: { type: String, trim: true },
    profileSummery: { type: String, trim: true },
  },
  { timestamps: true }
);

// Create and export the User model
export const User = mongoose.model("User", userSchema);
