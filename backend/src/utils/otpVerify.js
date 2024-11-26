const pendingAdminAccess = new Map();

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOTP = (email, otp) => {
  pendingAdminAccess.set(email, {
    otp,
    timestamp: Date.now(),
    verified: false,
  });
};

export const verifyOTP = (email, otp) => {
  const accessAttempt = pendingAdminAccess.get(email);
  if (!accessAttempt)
    return { valid: false, message: "No pending verification" };

  if (Date.now() - accessAttempt.timestamp > 5 * 60 * 1000) {
    pendingAdminAccess.delete(email);
    return { valid: false, message: "OTP expired" };
  }

  if (accessAttempt.otp !== otp) {
    return { valid: false, message: "Invalid OTP" };
  }

  pendingAdminAccess.delete(email);
  return { valid: true };
};
