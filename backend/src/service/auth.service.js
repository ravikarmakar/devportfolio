import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config.js";

export const generateAdminToken = (email) => {
  return jwt.sign({ email, isAdmin: true }, jwtConfig.JWT_SECRET, {
    expiresIn: jwtConfig.JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
