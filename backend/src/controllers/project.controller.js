import { Project } from "../models/project.model.js";

export const getAllProject = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });

    if (!projects) {
      res.status(404).json({ message: "Projects not found" });
    }

    res.status(200).json(projects);
  } catch (error) {
    console.log("Error in getAllProject controller:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
