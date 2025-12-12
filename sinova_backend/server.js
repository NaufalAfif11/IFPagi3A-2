import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import penggunaRoutes from "./src/routes/penggunaRoutes.js";
import penyediaRoutes from "./src/routes/penyediaRoutes.js";
import pool, { connectDB } from "./src/config/db.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import beritaRoutes from "./src/routes/beritaRoutes.js";
import lupaKataSandiRoutes from "./src/routes/lupaKataSandiRoutes.js";
import path from "path";

dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();
app.use(express.json());
app.use(cors());

// Connect DB
connectDB();

// Routes
// Authentication routes
app.use("/auth/pengguna", penggunaRoutes);
app.use("/auth/penyedia", penyediaRoutes);
app.use("/auth/admin", adminRoutes);
app.use("/auth", authRoutes);

// Feature routes
app.use("/api/berita", beritaRoutes);
app.use("/api/lupasandi", lupaKataSandiRoutes);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT} 🚀`);
});
