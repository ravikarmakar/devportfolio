import express from "express";
import {
  fetchAllProject,
  createProject,
  fetchProjectDetails,
  updateProject,
  deleteProject,
  fetchFeaturedProjects,
  toggleFeaturedProject,
} from "../controllers/project.controller.js";
import { upload } from "../middleware/multer.js";
import { isAdmin, protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", fetchAllProject);
router.get("/featured-projects", fetchFeaturedProjects);

router.use(protectRoute)

router.post(
  "/create",
  isAdmin,
  upload.single("image"),
  createProject
);
router.get("/:id", fetchProjectDetails);

router.use(isAdmin)

router.put("/:id", upload.single("image"), updateProject);
router.delete("/:id", deleteProject);
router.put("/toggle-featured/:id", toggleFeaturedProject);

export default router;
