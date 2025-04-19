// server/models/Rector.js
const mongoose = require("mongoose");

const rectorSchema = new mongoose.Schema({
  firebaseUID: String,
  name: String,
  email: String,
  phone: String,
  role: {
    type: String,
    default: "rector"
  }
}, { timestamps: true });

module.exports = mongoose.model("Rector", rectorSchema);
