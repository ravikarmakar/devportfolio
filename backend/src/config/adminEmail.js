// Email configuration

import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail", // or SMTP server
  auth: {
    user: process.env.USER_EMAIL, // Replace with your email
    pass: process.env.USER_EMAIL_PASS, // Replace with your email password or app-specific password
  },
});
