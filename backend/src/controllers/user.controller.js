import { User } from "../models/user.model.js";

export const userInfo = async (req, res) => {
  try {
    const user = await User.find({});

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in userInfo controller:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
