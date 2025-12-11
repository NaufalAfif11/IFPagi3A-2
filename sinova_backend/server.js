import express from "express";
import cors from "cors";
// Import utilitas Node.js untuk menangani path di ES Modules
import path from "path";
import { fileURLToPath } from 'url';

// --- BAGIAN PENTING: PENGATURAN PATH & DOTENV ---
// Dapatkan __filename dan __dirname yang kompatibel dengan ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import dotenv (harus sebelum dipanggil)
import dotenv from "dotenv";

// 🔥 SOLUSI KUNCI: Muat .env menggunakan path absolut. Ini harus dilakukan sebelum import file lokal yang menggunakan process.env.
dotenv.config({ path: path.resolve(__dirname, '.env') });
// ----------------------------------------------------

// Import konfigurasi dan koneksi database (Sekarang aman karena .env sudah dimuat)
import pool, { connectDB, initDB } from "./src/config/db.js";// Import semua Routes (Wajib menambahkan ekstensi .js!)
import penggunaRoutes from "./src/routes/penggunaRoutes.js";
import penyediaRoutes from "./src/routes/penyediaRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import kebutuhanRoutes from "./src/routes/kebutuhanRoutes.js";
import bidangRoutes from "./src/routes/bidangRoutes.js";
import risetRoutes from "./src/routes/RisetRoutes.js";
import beritaRoutes from "./src/routes/beritaRoutes.js";
import lupaKataSandiRoutes from "./src/routes/lupaKataSandiRoutes.js";

// Verifikasi JWT_SECRET
console.log("JWT_SECRET:", process.env.JWT_SECRET ? 'Ditemukan' : 'TIDAK DITEMUKAN - Cek .env');

const app = express();

// ===================================
// MIDDLEWARE CONFIGURATION
// ===================================

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Static files
app.use("/uploads", express.static(path.join(__dirname, 'uploads'))); // Menggunakan path.join untuk konsistensi

// ===================================
// DATABASE CONNECTION
// ===================================
// connectDB di sini hanya akan memanggil pool.connect() yang bersifat opsional.
const dbConfig = {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
};

// 🔥 LANGKAH 2: INISIALISASI POOL DENGAN KONFIGURASI YANG TERBACA
// Ini yang menghilangkan error "Pool belum diinisialisasi!"
initDB(dbConfig);
connectDB();

// ===================================
// API ROUTES
// ===================================

app.use("/api/kebutuhan", kebutuhanRoutes);

app.use("/api/bidang", bidangRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT} 🚀`);
// Health check endpoint
app.get("/", (req, res) => {
    res.json({ 
        message: "Sinova Backend API is running",
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});

// Authentication routes
app.use("/auth/penggunaRoutes.js", penggunaRoutes);
app.use("/auth/penyediaRoutes.js", penyediaRoutes);
app.use("/auth/admin", adminRoutes);
app.use("/auth", authRoutes); // Rute auth umum (misalnya /auth/login)

// Feature routes
app.use('/api/layanan', layananRoutes);
app.use("/api/berita", beritaRoutes);

// ===================================
// ERROR HANDLING
// ===================================

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.url} tidak ditemukan`
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Global Error:", err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        // Hanya kirim stack di lingkungan development
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }) 
    });
});

// ===================================
// SERVER STARTUP
// ===================================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => { // Simpan instance server
    console.log(`✅ Server berjalan di port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    
    // Tutup koneksi database
    pool.end(() => { 
        console.log('PostgreSQL connection pool closed');
        
        // Tutup server HTTP
        server.close(() => {
            console.log('HTTP server closed');
            process.exit(0);
        });
    });
});

// Export default app (opsional, berguna untuk testing)
export default app;