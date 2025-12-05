import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

console.log("ENV CHECK:", process.env.DB_USER, process.env.DB_PASS);

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Optional: test connection
const connectDB = async () => {
    try {
        await pool.connect();
        console.log("Connected to PostgreSQL 🚀");
    } catch (error) {
        console.error("Database connection error ❌", error);
    }
};

pool.query("SELECT current_database();")
    .then(res => console.log("DB CONNECTED:", res.rows[0].current_database))
    .catch(err => console.error(err));

// ⬅️ Export dengan ES module
export default pool;
export { connectDB };
