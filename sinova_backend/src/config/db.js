import { Pool } from 'pg';

let pool; // 🔥 Definisikan pool di luar scope agar bisa diakses initDB dan connectDB
let query; // Tambahkan query untuk kemudahan akses

const initDB = (config) => { // 🔥 Terima config dari server.js
    // Hapus ENV CHECK lama, karena config datang dari server.js
    
    // Inisialisasi Pool dengan konfigurasi yang diterima
    pool = new Pool({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        port: config.port,
    });
    
    // Definisikan fungsi query setelah pool dibuat
    query = (...args) => pool.query(...args); 
};

const connectDB = async () => {
    if (!pool) {
        console.error("Pool belum diinisialisasi! Panggil initDB(config) terlebih dahulu.");
        return;
    }
    
    try {
        await pool.connect();
        console.log("Connected to PostgreSQL 🚀");
        
        // 🔥 Jalankan tes query di sini, setelah connect berhasil
        const res = await query("SELECT current_database();");
        console.log("DB CONNECTED:", res.rows[0].current_database);
        
    } catch (error) {
        // Jika ENV CHECK masih undefined, error akan muncul di sini.
        console.error("Database connection error ❌", error);
    }
};

// Eksport initDB dan query
export default pool;
export { connectDB, initDB, query };