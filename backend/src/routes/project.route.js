import express from "express";
import { getAllProject } from "../controllers/project.controller.js";

const router = express.Router();

router.get("/", getAllProject);
// router.get("/:id", getProject);
// router.get("/upcoming", getUpcomingProject);
// router.post("/", createProject);
// router.put("/:id", updateProject);

export default router;
