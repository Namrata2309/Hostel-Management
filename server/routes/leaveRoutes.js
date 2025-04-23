import express from 'express';
import LeaveApplication from '../models/LeaveApplication.js';

const router = express.Router();

router.post('/apply', async (req, res) => {
  try {
    const {
      firebaseUid,
      name,
      rollNo,
      hostelName,
      roomNo,
      phoneNo,
      fromDate,
      toDate,
      address,
      reasonType,
      otherReason,
      parentPhone,
      status,
      date
    } = req.body;

    // Create new leave application
    const newLeave = new LeaveApplication({
      firebaseUid, // Optional: Add to schema if needed for user tracking
      name,
      rollNo,
      hostelName,
      roomNo,
      phoneNo,
      fromDate,
      toDate,
      address,
      reasonType,
      otherReason,
      parentPhone,
      status,
      date
    });

    // Save to database
    await newLeave.save();

    res.status(201).json({ message: 'Leave application submitted successfully.' });
  } catch (error) {
    console.error('Error saving leave application:', error);
    res.status(500).json({ error: 'Server error. Failed to submit leave application.' });
  }
});


router.get('/history/:firebaseUid', async (req, res) => {
    try {
      const { firebaseUid } = req.params;
      const leaves = await LeaveApplication.find({ firebaseUid });
      res.status(200).json(leaves);
    } catch (error) {
      res.status(500).json({ message: 'Server error fetching leave history.' });
    }
  });
  


export default router;
