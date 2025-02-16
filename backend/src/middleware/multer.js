import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Ensure __dirname compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "public/temp");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_"); // Prevent unsafe characters
    cb(null, safeName.split(".")[0] + "-" + uniqueSuffix + ext);
  },
});

// File filter for allowed types
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    req.fileValidationError =
      "Invalid file type. Only JPEG, PNG, and PDF are allowed.";
    return cb(null, false);
  }
  cb(null, true);
};

// Multer upload instance
export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter,
});
