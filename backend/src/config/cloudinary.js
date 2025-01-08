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
  api_secret: process.env.CLOUDINARY_API_SECRET ? "Present" : "Missing",
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath || typeof localFilePath !== "string") {
      throw new Error("Invalid file path");
    }

    // Check if file exists
    if (!fs.existsSync(localFilePath)) {
      throw new Error(`File not found at path: ${localFilePath}`);
    }

    console.log("Uploading file:", localFilePath);

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "raw",
      format: "pdf",
      flags: "attachment"
    });

    console.log("Cloudinary upload success:", result);

    // Optional: Delete local file after upload
    fs.unlinkSync(localFilePath);

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error.response || error);
    return null;
  }
};
