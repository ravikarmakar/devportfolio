import express from "express";
import { upload } from "../middleware/multer.js";
import {
  updateUser,
  addNewProject,
  updateProject,
  deleteProject,
  newSkillCategory,
  deleteSkillCategory,
  updateSkillCategory,
  addNewSkill,
  deleteSkill,
  updateSkill,
} from "../controllers/admin.controller.js";

const router = express.Router();

// User
router.put(
  "/user/:id",
  upload.fields([
    { name: "profileImage", maxCount: 1 }, // Single profile image
    { name: "resumeFile", maxCount: 1 }, // Single resume
  ]),
  updateUser
);

// Skill & Category
router.post("/category", newSkillCategory);
router.delete("/category/:id", deleteSkillCategory);
router.put("/category/:id", updateSkillCategory);
router.post("/skill", addNewSkill);
router.delete("/skill/:id", deleteSkill);
router.put("/skill/:id", updateSkill);

// Project
router.post("/project", upload.single("image"), addNewProject);
router.put("/project/:id", upload.single("image"), updateProject);
router.delete("/project/:id", deleteProject);

export default router;
