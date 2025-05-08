import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
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
    role: {
      type: String,
      default: "USER",
    },
    location: { type: String, default: "Bengaluru" },
    bio: { type: String, trim: true },
    imageUrl: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/denu688jm/image/upload/v1734332257/j80kxp5noo7gxva3hlzw.png",
    },
    phone: { type: String, default: "+91 3983248920" },
  },
  {
    timestamps: true,
  }
);

export const AuthUser = mongoose.model("AuthUser", authSchema);
