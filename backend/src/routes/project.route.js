import express from "express";
import {
  getAllProject,
  addNewProject,
} from "../controllers/project.controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/", getAllProject);
router.post("/create", upload.single("image"), addNewProject);

// router.get("/:id", getProject);
// router.get("/upcoming", getUpcomingProject);
// router.put("/:id", updateProject);

export default router;
