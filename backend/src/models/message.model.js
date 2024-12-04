import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    message: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      max: 20,
    },
    read: {
      type: Boolean,
      default: false,
    },
    starred: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    seenTimestamp: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
); // Enables createdAt and updatedAt

export const Message = mongoose.model("Message", messageSchema);
