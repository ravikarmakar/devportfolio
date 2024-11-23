const mongoose = require("mongoose");

const skillCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String, // Icon reference as a string (e.g., a URL or a font icon class)
    },
    description: {
      type: String, // Brief description of the category
    },
    // displayOrder: {
    //   type: Number, // Allows ordering of categories if needed
    //   default: 0,
    // },
    skills: [
      {
        name: {
          type: String,
          required: true,
        },
        level: {
          type: Number,
          required: true,
        },
        icon: {
          type: String, // Icon reference for the skill
        },
        description: {
          type: String, // Description of the skill
        },
        experienceYears: {
          type: Number, // Number of years of experience in this skill
          default: 0,
        },
        isInProgress: {
          type: Boolean, // Flag to show if the skill is still being learned
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const SkillCategory = mongoose.model("SkillCategory", skillCategorySchema);

module.exports = SkillCategory;
