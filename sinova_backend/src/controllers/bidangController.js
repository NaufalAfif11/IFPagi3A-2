import pool from "../config/db.js";


export const getAllBidang = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bidang ORDER BY bidang_id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetch bidang:", err);
    res.status(500).json({ message: "Gagal fetch bidang" });
  }
};
