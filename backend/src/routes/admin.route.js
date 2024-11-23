import express from "express";
import { updateUser } from "../controllers/admin.controller.js";
// import verifyAdminAccess from "../middleware/verifyAdminAccess.js";

const router = express.Router();

router.put("/:id", updateUser);

// Verification route (from email link)
// router.get("/verify", verifyAdminAccess, (req, res) => {
//   res.send("Verification successful! You can now access the admin dashboard.");
// });

// // Protected admin dashboard route
// router.get("/dashboard", verifyAdminAccess, (req, res) => {
//   res.send("Welcome to the admin dashboard!");
// });

export default router;
