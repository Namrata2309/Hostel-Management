// routes/complaints.js
import express from 'express';
import Complaint from '../models/Complaint.js';

const router = express.Router();

// Submit complaint
router.post('/submit', async (req, res) => {
  try {
    const { firebaseUid, title, description } = req.body;

    if (!firebaseUid || !title || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newComplaint = new Complaint({
      user: firebaseUid,
      title,
      description,
      status: 'Pending'
    });

    await newComplaint.save();

    res.status(201).json(newComplaint);
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's complaints
router.get('/user/:firebaseUid', async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.params.firebaseUid }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error('Error fetching all complaints:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update complaint status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'In Progress', 'Resolved'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (error) {
    console.error('Error updating complaint status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
