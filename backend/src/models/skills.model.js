import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    iconName: {
      type: String,
    },
    description: {
      type: String,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SkillCategory",
      required: false,
    },
    // experienceYears: {
    //   type: Number,
    //   default: 0, // Years of experience in the skill
    // },
    // isInProgress: {
    // type: Boolean,
    // default: false,
    // },
    tags: {
      type: [String], // Optional: Tags for categorization (e.g., "Frontend", "Backend")
    },
  },
  { timestamps: true }
);

// Define a Category Schema for grouping skills
const skillCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    iconName: {
      type: String,
    },
    description: {
      type: String,
    },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }], // Embedded skills schema
  },
  { timestamps: true }
);

// Create Models for both schemas
export const Skill = mongoose.model("Skill", skillSchema);

export const SkillCategory = mongoose.model(
  "SkillCategory",
  skillCategorySchema
);
