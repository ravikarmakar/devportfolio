// utils/sendVerificationEmail.js
import jwt from "jsonwebtoken";
import { transporter } from "../config/adminEmail.js";

let verificationToken; // In-memory storage for token, replace with database in production

export const sendVerificationEmail = async (email) => {
  // Create a token that expires in 1 hour
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const verificationLink = `http://localhost:3000/admin/verify?token=${token}`;

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Admin Dashboard Access Verification",
    text: `Please click the link to verify access to the admin dashboard: ${verificationLink}`,
  };

  await transporter.sendMail(mailOptions);
  console.log("Verification email sent!");
};
