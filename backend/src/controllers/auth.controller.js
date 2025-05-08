import generateTokenSetCookie from "../lib/utils/generateToken.js";
import { AuthUser } from "../models/auth.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // return console.log(req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const isExistingEmail = await AuthUser.findOne({ email });

    if (isExistingEmail) {
      res.status(400).json({ succes: false, message: "Email Alredy Exist" });
      return;
    }

    const user = await AuthUser.create({
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

    const user = await AuthUser.findOne({ username });

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
    const user = await AuthUser.find({}).select("-password -role");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getAuthUser controller:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    console.log(req.user.userId);
    const user = await AuthUser.findById(req.user.userId);

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
