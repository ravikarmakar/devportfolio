import jwt from "jsonwebtoken";

const generateTokenSetCookie = (authUserId, role, res) => {
  const token = jwt.sign({ authUserId, role }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
  });

  return token;
};

export default generateTokenSetCookie;
