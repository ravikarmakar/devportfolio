import { verifyToken } from "../service/auth.service.js";

export const protectAdminRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access denied" });
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.isAdmin) {
      return res.status(403).json({ error: "Not authorized" });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
