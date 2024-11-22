import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
    links: {
      github: { type: String }, // GitHub repository link
      hosted: { type: String }, // Hosted site link
    },
    status: {
      type: String,
      enum: ["upcoming", "in-progress", "completed"], // Status options
      default: "upcoming", // Default status
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
    // creator: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User", // Linking to User model, assuming you have a User model
    // },
    tags: {
      type: [String],
    },
    details: {
      type: String,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
