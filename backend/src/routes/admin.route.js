import express from "express";
import { upload } from "../middleware/multer.js";
import {
  newSkillCategory,
  deleteSkillCategory,
  updateSkillCategory,
  addNewSkill,
  deleteSkill,
  updateSkill,
} from "../controllers/admin.controller.js";

const router = express.Router();

// Skill & Category
router.post("/category", newSkillCategory);
router.delete("/category/:id", deleteSkillCategory);
router.put("/category/:id", updateSkillCategory);
router.post("/skill", addNewSkill);
router.delete("/skill/:id", deleteSkill);
router.put("/skill/:id", updateSkill);

export default router;
