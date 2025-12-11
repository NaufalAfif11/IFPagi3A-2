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
import beritaRoutes from "./src/routes/beritaRoutes.js";
import lupaKataSandiRoutes from "./src/routes/lupaKataSandiRoutes.js";

dotenv.config();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


// ✔ FIX CORS
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Connect to database
connectDB();

// Routes
app.use("/auth/pengguna", penggunaRoutes);
app.use("/auth/penyedia", penyediaRoutes);
app.use("/auth/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/api/riset", risetRoutes);

// ✔ Route berita yang benar
app.use("/api/berita", beritaRoutes);
app.use("/uploads", express.static("uploads"));

app.use("/api/reset", lupaKataSandiRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;