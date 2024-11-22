import express from "express";
import verifyAdminAccess from "../middleware/verifyAdminAccess.js";

const router = express.Router();

// Verification route (from email link)
router.get("/verify", verifyAdminAccess, (req, res) => {
  res.send("Verification successful! You can now access the admin dashboard.");
});

// Protected admin dashboard route
router.get("/dashboard", verifyAdminAccess, (req, res) => {
  res.send("Welcome to the admin dashboard!");
});

export default router;
