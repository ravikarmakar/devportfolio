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
    },
    technologies: {
      type: [String],
      required: true,
    },
    links: {
      github: { type: String },
      hosted: { type: String },
    },
    status: {
      type: String,
      enum: ["upcoming", "in-progress", "completed"],
      default: "upcoming",
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },

    tags: {
      type: [String],
    },
    // details: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
