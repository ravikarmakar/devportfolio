import express from "express";
import {
  getAllSkillCategory,
  getAllSkill,
  getSkillCategory,
} from "../controllers/skills.controller.js";

const router = express.Router();

router.get("/", getAllSkill);
router.get("/categories", getAllSkillCategory);
router.get("/categories/:id", getSkillCategory);

export default router;
