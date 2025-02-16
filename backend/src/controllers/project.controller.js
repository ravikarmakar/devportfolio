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

export const addNewProject = async (req, res) => {
  console.log("EndPoint hit");

  console.log(req.body);
  // try {
  //   // Check if req.body exists
  //   if (!req.body) {
  //     return res.status(400).json({ message: "Request body is empty" });
  //   }

  //   console.log("Received Data:", req.body);

  //   // Extract fields
  //   const { title, description, status, technologies, priority, tags } =
  //     req.body;
  //   const links = JSON.parse(req.body.links || "[]"); // Ensure links is an array

  //   // Validate required fields
  //   if (!title || !description || !req.file) {
  //     return res
  //       .status(400)
  //       .json({ message: "Title, description, and image are required" });
  //   }

  //   // Upload image to Cloudinary
  //   const imageUrl = await uploadOnCloudinary(req.file.path);
  //   if (!imageUrl) {
  //     return res.status(500).json({ message: "Image upload failed" });
  //   }

  //   // Create new project
  //   const newProject = new Project({
  //     title,
  //     description,
  //     status,
  //     technologies,
  //     links,
  //     priority,
  //     tags,
  //     imgUrl: imageUrl,
  //   });

  //   // Save to database
  //   await newProject.save();

  //   // Send success response
  //   return res.status(201).json({
  //     message: "Project created successfully",
  //     data: newProject,
  //   });
  // } catch (error) {
  //   console.error("Error creating project:", error);
  //   return res
  //     .status(500)
  //     .json({ message: "Server error", error: error.message });
  // }
};
