import { User } from "../models/user.model.js";
import { SkillCategory, Skill } from "../models/skills.model.js";
import { Project } from "../models/project.model.js";
import mongoose from "mongoose";

import { uploadOnCloudinary } from "../config/cloudinary.js";
import e from "express";

export const getDashboard = (req, res) => {
  res.json({ message: "Welcome to admin dashboard" });
};

// Profile..
export const updateUser = async (req, res) => {
  console.log(req.body);
  // try {
  //   const { id } = req.params;
  //   const { image, resume, ...otherFileds } = req.body;

  //   const updateData = { ...otherFileds };

  //   if (!id || !mongoose.Types.ObjectId.isValid(id)) {
  //     return res.status(400).json({ message: "User ID is required." });
  //   }

  //   if (image) {
  //     const uploadResult = await uploadOnCloudinary(image);
  //     if (!uploadResult) {
  //       return res.status(500).json({ message: "Image upload failed." });
  //     }
  //     updateData.profileImageUrl = uploadResult; // Save the Cloudinary URL
  //   }

  //   if (resume) {
  //     const uploadResult = await uploadOnCloudinary(resume);
  //     if (!uploadResult) {
  //       return res.status(500).json({ message: "Resume upload failed." });
  //     }
  //     updateData.resumeUrl = uploadResult;
  //   }

  //   const updatedUser = await User.findByIdAndUpdate(
  //     id,
  //     { $set: updateData },
  //     { new: true, runValidators: true }
  //   );

  //   if (!updatedUser) {
  //     return res.status(404).json({ message: "User not found." });
  //   }

  //   res
  //     .status(200)
  //     .json({ message: "User updated successfully.", user: updatedUser });
  // } catch (error) {
  //   console.error("Error updating user:", error);
  //   res
  //     .status(500)
  //     .json({ message: "An error occurred while updating the user." });
  // }
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

// Project..
export const addNewProject = async (req, res) => {
  const { title, description, status, technologies, priority, tags, image } =
    req.body;

  const links = JSON.parse(req.body.links || "{}");

  try {
    if (!title || !description || !image) {
      return res
        .status(400)
        .json({ message: "Title, description, and image are required" });
    }
    const imageUrl = await uploadOnCloudinary(image);

    const newProject = new Project({
      title,
      description,
      status,
      technologies,
      links,
      priority,
      tags,
      imgUrl: image,
    });

    await newProject.save();

    res.status(201).json({
      message: "Project created successfully",
      data: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid or missing project ID" });
    }

    const { image, ...otherFileds } = req.body;

    const updateData = { ...otherFileds };

    if (image) {
      const imageUrl = await Promise.race([
        uploadOnCloudinary(image),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Cloudinary timeout")), 10000)
        ),
      ]);
      updateData.imgUrl = imageUrl;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error("Error in updateProject on admin controller:", error);
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project deleted successfully",
      data: deletedProject,
    });
  } catch (error) {
    console.error("Error in deleteProject controller:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
