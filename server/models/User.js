import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    default: null,
  },
  googleStyleId: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ['superadmin', 'rector', 'student', 'staff'],
    default: 'student',
  },
  roomNo: {
    type: String,
    default: null,
    validate: {
      validator: function (value) {
        if (this.role === 'student' && (!value || value.trim() === '')) {
          return false;
        }
        return true;
      },
      message: 'Room number is required for students.',
    },
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
 

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', userSchema);
