import cloudinary from "../config/cloudinary.js";
import { Project } from "../models/project.model.js";
import { cleanupFiles } from "./auth.controller.js";

export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      technologies,
      sourceLink,
      liveLink,
      details,
    } = req.body;

    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ message: "Image file is required" });
    }
    const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
      folder: "raviportfolio/images",
    });
    const imageUrl = uploadResult.secure_url;
    const imagePublicId = uploadResult.public_id;

    const newProject = new Project({
      title,
      description,
      category,
      technologies,
      sourceLink,
      liveLink,
      details,
      imageUrl,
      imagePublicId,
    });

    await newProject.save();

    cleanupFiles(imageFile);

    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Error creating project controller:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const fetchAllProject = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });

    if (!projects) {
      res.status(404).json({ message: "Projects not found" });
    }

    res.status(200).json(projects);
  } catch (error) {
    console.log("Error in getting all projects controller:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const fetchProjectDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.log("Error in fetching project details:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateProject = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      technologies,
      sourceLink,
      liveLink,
      details,
    } = req.body;

    const { id } = req.params;

    const imageFile = req.file;

    const project = await Project.findById(id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project Not found" });
    }

    let imageUrl = project.imageUrl;
    let imagePublicId = project.imagePublicId;

    if (imageFile?.path) {
      if (imagePublicId) {
        await cloudinary.uploader.destroy(imagePublicId);
      }
      const imageUploadResult = await cloudinary.uploader.upload(
        imageFile.path,
        {
          folder: "raviportfolio/images",
        }
      );
      imageUrl = imageUploadResult.secure_url;
      imagePublicId = imageUploadResult.public_id;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        technologies,
        sourceLink,
        liveLink,
        details,
        imageUrl,
        imagePublicId,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    cleanupFiles(imageFile);

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.log("Error in updating project controller:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (deletedProject.imagePublicId) {
      await cloudinary.uploader.destroy(deletedProject.imagePublicId);
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleting project controller:", error);
    res.status(500).json({ message: "Internal Server error", error });
  }
};

export const fetchFeaturedProjects = async (req, res) => {
  try {
    const featuredProjects = await Project.find({ isFeatured: true }).sort({
      createdAt: -1,
    });

    if (!featuredProjects || featuredProjects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No featured projects found",
      });
    }

    res.status(200).json({
      success: true,
      project: featuredProjects,
    });
  } catch (error) {
    console.error("Error in fetching featured project controller:", error);
    res.status(500).json({ message: "Internal Server error", error });
  }
};

export const toggleFeaturedProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.isFeatured = !project.isFeatured;
    await project.save();

    res.status(200).json({
      success: true,
      message: "Featured status updated successfully",
    });
  } catch (error) {
    console.error("Error in toggling featured project controller:", error);
    res.status(500).json({ message: "Internal Server error", error });
  }
};
