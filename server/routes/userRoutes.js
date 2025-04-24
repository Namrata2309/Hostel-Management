// server/routes/userRoutes.js
import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.send("User route works!");
});

router.get("/students", async (req, res) => {
  console.log("GET /students route hit ✅");
  try {
    const students = await User.find({ role: "student" }).sort({ roomNo: 1 });
    res.status(200).json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: "Failed to fetch students" });
  }
});


router.post("/getUserByFirebaseUid", async (req, res) => {
  try {
    const { firebaseUid } = req.body;
    const user = await User.findOne({ firebaseUid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ role: user.role, email: user.email,roomNo:user.roomNo,rollNo:user.rollNo,username:user.username,isProfileComplete:user.isProfileComplete,phone:user.phoneNo,hostel:user.hostel});
  } catch (err) {
    console.error("Error fetching user by firebaseUid:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


// Register user (Google or Email+Password)
router.post("/register", async (req, res) => {
  
  const { firebaseUid, email, username, googleId, googleStyleId, role, roomNo,uid,id,rollNo } = req.body;
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
      rollNo,
      uid:email,
      id:googleId,
      
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


router.post('/updateProfile', async (req, res) => {
  try {
    const { firebaseUid, hostel, phoneNo } = req.body;

    const isProfileComplete = hostel.trim() !== '' && phoneNo.trim() !== '';

    const updatedUser = await User.findOneAndUpdate(
      { firebaseUid },
      {
        hostel,
        phoneNo,
        isProfileComplete:true
      },
     
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        hostel: updatedUser.hostel,
        phone: updatedUser.phoneNo,
        isProfileComplete:updatedUser.isProfileComplete
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
