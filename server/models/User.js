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
  rollNo: {
    type: String,
    default: null,
    validate: {
      validator: function (value) {
        if (this.role === 'student' && (!value || value.trim() === '')) {
          return false;
        }
        return true;
      },
      message: 'Roll No number is required for students.',
    },
  },
  hostel: {
    type: String,
    validate: {
      validator: function (value) {
        if (this.role === 'student' && (!value || value.trim() === '')) {
          return false;
        }
        return true;
      },
      message: 'Hostel type is required for students.',
    },
  },
  phoneNo: {
    type: String,
  
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
  isProfileComplete: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', userSchema);
