import express from "express";
import {
  createContact,
  fetchAllContacts,
} from "../controllers/contact.controller.js";
import { isAdmin, protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, fetchAllContacts);
router.post("/create", protectRoute, isAdmin, createContact);

export default router;
