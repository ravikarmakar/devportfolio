import mongoose from "mongoose";

// Define the schema for individual skills
const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    iconUrl: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
  },
  { timestamps: true }
);

export const Skill = mongoose.model("Skill", skillSchema);

// Define the schema for skill categories
const skillCategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["frontend", "backend", "database", "devops", "design", "other"],
      required: true,
      unique: true, // Ensure that the category is unique
    },
    items: [skillSchema], // Array of skills
  },
  { timestamps: true }
);

export const SkillCategory = mongoose.model(
  "SkillCategory",
  skillCategorySchema
);
