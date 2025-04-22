// routes/noticeRoutes.js
import express from "express";
import Notice from "../models/Notice.js";

const router = express.Router();

// POST: Create a new notice
router.post("/", async (req, res) => {
  try {
    const { title, message, createdAt } = req.body;
    const newNotice = new Notice({ title, message, createdAt });
    await newNotice.save();
    res.status(201).json({ message: "Notice posted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to post notice", error });
  }
});

// GET: Fetch all notices
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notices", error });
  }
});

export default router;
