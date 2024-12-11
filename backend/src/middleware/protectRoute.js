import jwt from "jsonwebtoken";
import { AuthUser } from "../models/auth.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const authUser = await AuthUser.findById(decoded.authUserId).select(
      "-password"
    );
    if (!authUser) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.authUser = authUser; // Attach user data to request
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }
    console.error("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
