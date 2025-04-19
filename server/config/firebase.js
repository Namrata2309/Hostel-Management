// server/config/firebase.js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Add your Firebase Admin SDK key here

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
