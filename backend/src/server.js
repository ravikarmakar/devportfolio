import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import projectRoutes from "./routes/project.route.js";
import skillsRoutes from "./routes/skills.route.js";
import userRoutes from "./routes/users.route.js";
import authRoute from "./routes/auth.route.js";
import adminRoute from "./routes/admin.route.js";
import messageRoute from "./routes/message.route.js";
import morgan from "morgan";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:3002",
    credentials: true,
  })
);

console.log("working on branch");

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/message", messageRoute);
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

export default app;
