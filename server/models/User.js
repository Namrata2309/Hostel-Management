const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'rector', 'student'], required: true }
});

module.exports = mongoose.model('User', userSchema);
