import express from "express";
import { upload } from "../middleware/multer.js";

import {
  addNewSkills,
  updateUser,
  updateSkills,
  deleteSkills,
  addNewProject,
  updateProject,
  deleteProject,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.put(
  "/user/:id",
  upload.fields([
    { name: "profileImage", maxCount: 1 }, // Single profile image
    { name: "resumeFile", maxCount: 1 }, // Single resume
  ]),
  updateUser
);

router.post("/skill", addNewSkills);
router.put("/skill/:id", updateSkills);
router.delete("/skill/:id", deleteSkills);

router.post("/project", upload.single("image"), addNewProject);
router.put("/project/:id", updateProject);
router.delete("/project/:id", deleteProject);

export default router;
