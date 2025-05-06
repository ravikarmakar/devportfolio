import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Ensure Cloudinary configuration is complete
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error(
    "Cloudinary configuration is incomplete. Check your environment variables."
  );
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath || typeof localFilePath !== "string") {
      throw new Error("Invalid file path");
    }

    // Check if file exists
    if (!fs.existsSync(localFilePath)) {
      throw new Error(`File not found: ${localFilePath}`);
    }

    console.log("Uploading file:", localFilePath);

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      use_filename: true,
      unique_filename: false,
      folder: "uploads",
    });

    console.log("Cloudinary upload success:", result.secure_url);

    // Delete local file after successful upload
    fs.unlink(localFilePath, (err) => {
      if (err) console.error("Failed to delete local file:", err);
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message || error);
    return null;
  }
};
