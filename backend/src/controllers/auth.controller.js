import fs from "fs";
import bcrypt from "bcryptjs";

import { User } from "../models/user.model.js";
import generateTokenSetCookie from "../lib/utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";

export const cleanupFiles = (imageFile, pdfFile) => {
  if (imageFile?.path) {
    try {
      fs.unlinkSync(imageFile.path); // Remove the image file after upload
    } catch (error) {
      console.error("Error deleting image file:", error);
    }
  }

  if (pdfFile?.path) {
    try {
      fs.unlinkSync(pdfFile.path); // Remove the PDF file after upload
    } catch (error) {
      console.error("Error deleting PDF file:", error);
    }
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const isExistingEmail = await User.findOne({ email });
    if (isExistingEmail) {
      res.status(400).json({ succes: false, message: "Email Alredy Exist" });
      return;
    }

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "ADMIN",
    });

    const token = generateTokenSetCookie(user._id, user.role, res);

    res.status(201).json({ message: "User created successfully", token, user });
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateTokenSetCookie(user._id, user.role, res);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        username: user.username,
      },
    });
  } catch (error) {
    console.log("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the authentication cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserData = async (req, res) => {
  try {
    const user = await User.find({}).select("-password -role");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUser controller:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      res.status(404).json({ success: false, messsage: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, email, location, bio, techRole, experience, phone } =
      req.body;

    const imageFile = req.files?.image?.[0];
    const pdfFile = req.files?.pdf?.[0];

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let imageUrl = user.imageUrl;
    let resumeUrl = user.resumeUrl;
    let imagePublicId = user.imagePublicId;
    let resumePublicId = user.resumePublicId;

    // Delete old image and upload new one
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

    // Delete old PDF and upload new one
    if (pdfFile?.path) {
      if (resumePublicId) {
        await cloudinary.uploader.destroy(resumePublicId, {
          resource_type: "raw",
        });
      }
      const pdfUploadResult = await cloudinary.uploader.upload(pdfFile.path, {
        folder: "raviportfolio/pdfs",
        resource_type: "raw",
      });
      resumeUrl = pdfUploadResult.secure_url;
      resumePublicId = pdfUploadResult.public_id;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      {
        username,
        email,
        location,
        bio,
        techRole,
        experience,
        phone,
        imageUrl,
        resumeUrl,
        imagePublicId,
        resumePublicId,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    cleanupFiles(imageFile, pdfFile);

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error in updating profile:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
