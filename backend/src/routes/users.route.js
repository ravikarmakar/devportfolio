import express from "express";
import { userInfo } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", userInfo);

export default router;
