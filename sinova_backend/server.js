import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import penggunaRoutes from "./src/routes/penggunaRoutes.js";
import penyediaRoutes from "./src/routes/penyediaRoutes.js";
import pool, { connectDB } from "./src/config/db.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import risetRoutes from "./src/routes/RisetRoutes.js";

dotenv.config();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware - URUTAN PENTING!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // CORS harus sebelum routes

// Static files - serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to database
connectDB();

// Routes
app.use("/auth/pengguna", penggunaRoutes);
app.use("/auth/penyedia", penyediaRoutes);
app.use("/auth/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/api/riset", risetRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Sinova API is running", 
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;