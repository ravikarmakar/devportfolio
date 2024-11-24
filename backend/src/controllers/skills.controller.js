import { SkillCategory } from "../models/skills.model.js";

export const getAllSkills = async (req, res) => {
  try {
    const skills = await SkillCategory.find({}).sort({ createdAt: 1 });

    if (!skills) {
      res.status(404).json({ message: "Skills not found" });
    }

    res.status(200).json(skills);
  } catch (error) {
    console.log("Error in getAllSkills controller:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
