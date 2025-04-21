import express from 'express';
import admin from '../config/firebase.js';
import User from '../models/User.js';

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Authenticate Firebase token & fetch user from MongoDB
router.post('/login', async (req, res) => {
  const { token } = req.body;

  try {
    // 1. Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebaseUid = decodedToken.uid;

    // 2. Fetch user from MongoDB by firebaseUid
    const user = await User.findOne({ firebaseUid });

    if (!user) {
      return res.status(404).json({ message: 'User not found in database' });
    }

    // 3. Respond with user details (you can customize this)
    res.status(200).json({
      user: {
        firebaseUid: user.firebaseUid,
        email: user.email,
        username: user.username,
        role: user.role,
        roomNo: user.roomNo,
        googleId: user.googleId,
        googleStyleId: user.googleStyleId,
      },
    });
  } catch (error) {
    console.error('Auth error:', error.message);
    res.status(401).json({ message: 'Invalid or expired Firebase token' });
  }
});

export default router;
