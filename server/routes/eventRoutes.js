import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// POST /api/events
router.post("/", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json({ message: "Event created successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to create event.", error: err.message });
  }
});

// Edit route
router.put("/:id", async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Failed to update event." });
  }
});

// Delete route
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted." });
  } catch {
    res.status(500).json({ message: "Failed to delete event." });
  }
});

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events." });
  }
});

export default router;
