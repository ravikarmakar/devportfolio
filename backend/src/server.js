import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";

import projectRoutes from "./routes/project.route.js";
import contactRoute from "./routes/contact.route.js";
import skillsRoutes from "./routes/skills.route.js";
import authRoute from "./routes/auth.route.js";
import adminRoute from "./routes/admin.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin:
    process.env.NODE_ENV === "development"
      ? process.env.DEVELOPEMENT_PORTFOLIO_LINK
      : process.env.PRODUCTION_PORTFOLIO_LINK,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoute);
app.use("/api/skills", skillsRoutes);
app.use("/api/message", messageRoute);
app.use("/api/admin", adminRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

export default app;
