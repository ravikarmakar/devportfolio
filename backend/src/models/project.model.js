import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    technologies: { type: [String], default: [] },
    imageUrl: { type: String },
    imagePublicId: { type: String },
    sourceLink: { type: String },
    liveLink: { type: String },
    details: { type: String },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
