import express from "express";
import {
  register,
  login,
  logout,
  getUserData,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user-data", getUserData);
router.get("/check-auth", protectRoute, checkAuth);

export default router;
