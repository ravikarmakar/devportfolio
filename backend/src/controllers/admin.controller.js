import { SkillCategory, Skill } from "../models/skills.model.js";

export const getDashboard = (req, res) => {
  res.json({ message: "Welcome to admin dashboard" });
};

// Skill & Category
export const newSkillCategory = async (req, res) => {
  try {
    const { title, iconName, description } = req.body;

    const newCategory = new SkillCategory({
      title,
      iconName,
      description,
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Skill category created successfully!",
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create skill category.",
      error: error.message,
    });
  }
};

export const deleteSkillCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await Skill.deleteMany({ categoryId: id });
    await SkillCategory.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "SkillCategory deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete skill category.",
      error: error.message,
    });
  }
};

export const updateSkillCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCategory = await SkillCategory.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Skill category not found." });
    }

    res.status(200).json({
      success: true,
      message: "Skill category updated successfully!",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update skill category.",
      error: error.message,
    });
  }
};

export const addNewSkill = async (req, res) => {
  try {
    const { name, level, iconName, description, categoryId, tags } = req.body;

    let category = null;
    if (categoryId) {
      category = await SkillCategory.findById(categoryId);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Skill category not found.",
        });
      }
    }

    const newSkill = new Skill({
      name,
      level,
      iconName,
      description,
      categoryId: category ? category._id : null,
      tags,
    });

    await newSkill.save();

    // If category exists, add the skill to the category's skills array
    if (category) {
      category.skills.push(newSkill);
      await category.save();
    }

    res.status(201).json({
      success: true,
      message: "Skill added successfully!",
      data: newSkill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add skill.",
      error: error.message,
    });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findById(id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (skill.categoryId) {
      await SkillCategory.findByIdAndUpdate(skill.categoryId, {
        $pull: { skills: skill._id },
      });
    }

    await Skill.findByIdAndDelete(id);

    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error("Error in deleteSkill controller:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill not found." });
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully!",
      data: updatedSkill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update skill.",
      error: error.message,
    });
  }
};
