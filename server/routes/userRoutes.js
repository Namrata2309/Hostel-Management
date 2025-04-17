const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { uid, email, role } = req.body;
  try {
    const newUser = new User({ uid, email, role });
    await newUser.save();
    res.status(201).json({ message: 'User saved to DB' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving user', error: err.message });
  }
});

module.exports = router;