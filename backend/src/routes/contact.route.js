import express from "express";
import {
  createContact,
  fetchAllContacts,
} from "../controllers/contact.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, fetchAllContacts);
router.post("/create", createContact);

export default router;
