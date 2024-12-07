import { User } from "../models/user.model.js";
import { SkillCategory } from "../models/skills.model.js";
import { Project } from "../models/project.model.js";

import { uploadOnCloudinary } from "../config/cloudinary.js";
// import fs from "fs";

export const getDashboard = (req, res) => {
  res.json({ message: "Welcome to admin dashboard" });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const {
    name,
    email,
    phone,
    location,
    websiteUrl,
    bio,
    profileSummery,
    aboutMe,
  } = req.body;

  const profileImg = req.files?.profileImage?.[0]?.path || null; // Cloudinary path for profileImage
  const resume = req.files?.resumeFile?.[0]?.path || null; // Cloudinary path for resume

  const profileUrl = await uploadOnCloudinary(profileImg);
  const resumeUrl = await uploadOnCloudinary(resume);

  const updateData = {
    name,
    email,
    mobileNumber: phone,
    profileImageUrl: profileUrl,
    resumeUrl: resumeUrl,
    currLocation: location,
    websiteUrl,
    bio,
    profileSummery,
    aboutMe,
  };

  console.log(updateData);

  try {
    // Update user in the database
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("Error in updateUser controller:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const addNewSkills = async (req, res) => {
  const { title, iconName, description, skills } = req.body;

  try {
    const newSkillCategory = new SkillCategory({
      title,
      iconName,
      description,
      skills,
    });

    await newSkillCategory.save();
    res.status(201).json({
      message: "Skill Category created successfully",
      data: newSkillCategory,
    });
  } catch (error) {
    console.error("Error in addNewSkill controller:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateSkills = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedSkillCategory = await SkillCategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedSkillCategory) {
      return res.status(404).json({ message: "Skill Category not found" });
    }

    res.status(200).json({
      message: "Skill Category updated successfully",
      data: updatedSkillCategory,
    });
  } catch (error) {
    console.error("Error in updateSkills controller:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteSkills = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSkillCategory = await SkillCategory.findByIdAndDelete(id);
    if (!deletedSkillCategory) {
      return res.status(404).json({ message: "Skill Category not found" });
    }
    res.status(200).json({ message: "Skill Category deleted successfully" });
  } catch (error) {
    console.error("Error in deleteSkills controller:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addNewProject = async (req, res) => {
  const {
    title,
    description,
    status,
    technologies,
    links,
    priority,
    tags,
    image,
  } = req.body;

  const imageUrl = await uploadOnCloudinary(image);

  try {
    // Create a new Project document
    const newProject = new Project({
      title,
      description,
      status,
      technologies,
      links,
      priority,
      tags,
      imgUrl: req.body.image,
    });

    // Save the new Project to the database
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
  const { id } = req.params;

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error("Error in updateProject controller:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
