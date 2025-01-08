import { Message } from "../models/message.model.js";

export const getAllMessage = async (req, res) => {
  try {
    const getAllMessage = await Message.find({}).sort({ createdAt: -1 });
    res.status(200).json(getAllMessage);
  } catch (error) {
    console.log("Error in getAllMessage controller:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const contactMessage = async (req, res) => {
  const { name, email, message, subject } = req.body;

  try {
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const newMessage = new Message({
      name,
      email,
      message,
      subject,
    });

    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {}
};

export const replyMessage = async (req, res) => {};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Message ID is required" });
    }

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log("Error in deleteMessage controller:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateRead = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Message ID is required" });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      {
        ...req.body,
        read: true,
        seenTimestamp: new Date(),
      },
      {
        new: true,
      }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({
      message: "Message updated successfully",
      data: updatedMessage,
    });
  } catch (error) {
    console.log("Error in updateMessage controller:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
