import express from "express";

const router = express.Router();

// Request access route (sends verification email)
router.get("/request-admin-access", async (req, res) => {
  try {
    await sendVerificationEmail("ravikarmkar94475@gmail.com"); // Replace with your admin email
    res.send("Verification email sent. Please check your inbox.");
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

export default router;
