// middleware/verifyAdminAccess.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyAdminAccess = (req, res, next) => {
  const token = req.query.token; // Retrieve token from query parameters

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email === "ravikarmkar94475@gmail.com") {
      // Replace with the admin email you want to allow
      next(); // Token is valid, grant access
    } else {
      res.status(403).json({ message: "Unauthorized access" });
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default verifyAdminAccess;
