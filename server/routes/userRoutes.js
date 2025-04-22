// server/routes/userRoutes.js
import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.send("User route works!");
});

// Register user (Google or Email+Password)
router.post("/register", async (req, res) => {
  const { firebaseUid, email, username, googleId, googleStyleId, role, roomNo,uid } = req.body;
  try {
  
   

    // Create new user
    const newUser = new User({
      firebaseUid,
      email,
      username,
      googleId,
      googleStyleId,
      role,
      roomNo,
      uid:email,
      id:firebaseUid
    });

    // Save to DB
    await newUser.save();

    res.status(201).json({
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
      user: newUser,
    });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
