import { generateOTP, storeOTP } from "../utils/otpVerify.js";
import { sendOTPEmail } from "../service/email.service.js";
import { jwtConfig } from "../config/jwt.config.js";

export const adminEmailVerification = async (req, res, next) => {
  try {
    const adminEmail = jwtConfig.ADMIN_EMAIL;
    const otp = generateOTP();

    storeOTP(adminEmail, otp);

    const emailSent = await sendOTPEmail(adminEmail, otp);

    if (!emailSent) {
      throw new Error("Failed to send email");
    }

    res.status(200).json({
      message:
        "Please verify your email. OTP has been sent to your admin email.",
      requiresVerification: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to initiate verification" });
  }
};
