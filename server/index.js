import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
// import path from "path";
import path from "path"; // Import path module
import { fileURLToPath } from "url"; // Needed for ES module compatibility
import userRoutes from "./routes/userRoutes.js";
import authRoutes from './routes/authRoutes.js'; 
import noticeRoutes from "./routes/noticeRoutes.js";
import complaintRoutes from './routes/complaintsRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", userRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/notice", noticeRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/events', eventRoutes);

// Serve frontend dist folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend", "dist")));

// Serve index.html for any route that doesn't match an API route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
