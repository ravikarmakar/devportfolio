import express from "express";
import {
  signup,
  login,
  logout,
  getAuthUser,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", protectRoute, getAuthUser);

export default router;
