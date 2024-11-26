import { transporter } from "../config/adminVerify.js";
import { jwtConfig } from "../config/jwt.config.js";

export const sendOTPEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: jwtConfig.ADMIN_EMAIL,
      to: email,
      subject: "Admin Access Verification",
      html: `
        <h2>Admin Access Verification Required</h2>
        <p>Your OTP for admin access is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 5 minutes.</p>
      `,
    });
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
};
