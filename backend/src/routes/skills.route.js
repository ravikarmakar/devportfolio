import express from "express";
import { getAllSkills } from "../controllers/skills.controller.js";

const router = express.Router();

router.get("/", getAllSkills);

export default router;
