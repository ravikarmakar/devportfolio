import express from "express";
import {
  fetchAllProject,
  createProject,
  fetchProjectDetails,
  updateProject,
  deleteProject,
  fetchFeaturedProjects,
} from "../controllers/project.controller.js";
import { upload } from "../middleware/multer.js";
import { isAdmin, protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", fetchAllProject);
router.get("/featured-projects", fetchFeaturedProjects);
router.post(
  "/create",
  protectRoute,
  isAdmin,
  upload.single("image"),
  createProject
);
router.get("/:id", fetchProjectDetails);
router.put(
  "/:id",
  protectRoute,
  isAdmin,
  upload.single("image"),
  updateProject
);
router.delete("/:id", protectRoute, isAdmin, deleteProject);

export default router;
