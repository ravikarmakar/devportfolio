import express from "express";
import {
  contactMessage,
  getAllMessage,
  replyMessage,
  deleteMessage,
  updateRead,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/", getAllMessage);
router.post("/contact", contactMessage);
router.post("/reply", replyMessage);
router.delete("/:id", deleteMessage);
router.put("/:id/read", updateRead);

export default router;
