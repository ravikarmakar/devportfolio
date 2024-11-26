// Email configuration
import { jwtConfig } from "./jwt.config.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: jwtConfig.ADMIN_EMAIL,
    pass: jwtConfig.EMAIL_PASSWORD,
  },
});
