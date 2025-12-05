import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import penggunaRoutes from "./src/routes/penggunaRoutes.js";
import penyediaRoutes from "./src/routes/penyediaRoutes.js";
import pool, { connectDB } from "./src/config/db.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import beritaRoutes from "./src/routes/beritaRoutes.js";

dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


// ✔ FIX CORS
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Connect DB
connectDB();

// Routes
app.use("/auth/pengguna", penggunaRoutes);
app.use("/auth/penyedia", penyediaRoutes);
app.use("/auth/admin", adminRoutes);
app.use("/auth", authRoutes);

// ✔ Route berita yang benar
app.use("/api/berita", beritaRoutes);
app.use("/uploads", express.static("uploads"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT} 🚀`);
});
