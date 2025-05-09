import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: { type: String, default: "USER" },
    location: { type: String, default: "Bengaluru" },
    bio: { type: String, trim: true, default: "My Bio" },
    techRole: { type: String, default: "Full Stack Developer" },
    experience: { type: Number, default: 0 },
    phone: { type: String, default: "+91 3983248920" },
    imagePublicId: { type: String },
    resumePublicId: { type: String },
    resumeUrl: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
  },

  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
