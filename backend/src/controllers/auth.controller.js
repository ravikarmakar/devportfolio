import generateTokenSetCookie from "../lib/utils/generateToken.js";
import { AuthUser } from "../models/auth.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const authUser = await AuthUser.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateTokenSetCookie(authUser._id, res);

    res
      .status(201)
      .json({ message: "User created successfully", token, authUser });
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(password);

    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const authUser = await AuthUser.findOne({ username });

    if (!authUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, authUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateTokenSetCookie(authUser._id, res);

    const authData = { ...authUser.toObject() }; // Avoid modifying the original object
    delete authData.password;

    res.status(200).json({
      message: "Login successful",
      token,
      authData,
      role: authUser.role,
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

export const getAuthUser = async (req, res) => {
  try {
    if (!req.authUser) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user data in request" });
    }

    const authUser = await AuthUser.findById(req.authUser.id).select(
      "-password"
    );
    if (!authUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(authUser);
  } catch (error) {
    console.error("Error in getAuthUser controller:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
