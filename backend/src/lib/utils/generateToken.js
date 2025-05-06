import jwt from "jsonwebtoken";

const generateTokenSetCookie = (authUserId, res) => {
  const token = jwt.sign({ authUserId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    // sameSite: "strict", // use this when site is hosted on a same domain with CORS-origin
    sameSite: "None", // use this when site is hosted on a different domain with CORS-origin
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
  });

  return token;
};

export default generateTokenSetCookie;
