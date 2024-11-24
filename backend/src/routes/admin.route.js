import express from "express";
import {
  addNewSkills,
  updateUser,
  updateSkills,
  deleteSkills,
  addNewProject,
  updateProject,
  deleteProject,
} from "../controllers/admin.controller.js";
// import verifyAdminAccess from "../middleware/verifyAdminAccess.js";

const router = express.Router();

router.put("/user/:id", updateUser);

router.post("/skill", addNewSkills);
router.put("/skill/:id", updateSkills);
router.delete("/skill/:id", deleteSkills);

router.post("/project", addNewProject);
router.put("/project/:id", updateProject);
router.delete("/project/:id", deleteProject);

// Verification route (from email link)
// router.get("/verify", verifyAdminAccess, (req, res) => {
//   res.send("Verification successful! You can now access the admin dashboard.");
// });

// // Protected admin dashboard route
// router.get("/dashboard", verifyAdminAccess, (req, res) => {
//   res.send("Welcome to the admin dashboard!");
// });

export default router;
