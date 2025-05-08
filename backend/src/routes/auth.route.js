import express from "express";
import {
  register,
  login,
  logout,
  getUserData,
  checkAuth,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user-data", getUserData);
router.get("/check-auth", protectRoute, checkAuth);
router.put(
  "/update-profile",
  protectRoute,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  updateProfile
);

export default router;
