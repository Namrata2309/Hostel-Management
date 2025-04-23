import mongoose from 'mongoose';

const leaveApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  firebaseUid: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true
  },
  hostelName: {
    type: String,
    required: true
  },
  roomNo: {
    type: String,
    required: true
  },
  phoneNo: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  reasonType: {
    type: String,
    required: true,
    enum: ['Medical', 'Family Emergency', 'Personal', 'Academic', 'Other']
  },
  otherReason: {
    type: String,
    default: ''
  },
  parentPhone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Prevent model overwrite in dev environments
const LeaveApplication = mongoose.models.LeaveApplication || mongoose.model('LeaveApplication', leaveApplicationSchema);
export default LeaveApplication;
