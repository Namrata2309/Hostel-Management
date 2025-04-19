// server/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const admin = require("../config/firebase");
const Rector = require("../models/rector");

// Add Rector Route
router.post("/add-rector", async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // 1. Create Rector in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // 2. Store Rector details in MongoDB
    const rector = new Rector({
      firebaseUID: userRecord.uid,
      name,
      email,
      phone
    });

    await rector.save();

    res.status(201).json({ message: "Rector added successfully", rector });
  } catch (error) {
    console.error("Error adding rector:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
