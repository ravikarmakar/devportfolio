import { SkillCategory } from "../models/skills.model.js";
import { Skill } from "../models/skills.model.js";

export const getAllSkillCategory = async (req, res) => {
  try {
    const skills = await SkillCategory.find({})
      .sort({ createdAt: 1 })
      .populate("skills");

    if (!skills) {
      res.status(404).json({ message: "Skills not found" });
    }

    res.status(200).json(skills);
  } catch (error) {
    console.log("Error in getAllSkills controller:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getSkillCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await SkillCategory.findById(id).populate("skills");

    if (!category) {
      res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.log("Error in getCategory controller:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getAllSkill = async (req, res) => {
  try {
    const skills = await Skill.find({}).sort({ createdAt: 1 });

    if (!skills) {
      res.status(404).json({ message: "Skills not found" });
    }

    res.status(200).json(skills);
  } catch (error) {
    console.log("Error in getAllSkills controller:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
