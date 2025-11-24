const express = require("express");
const cors = require("cors");
const pool = require("./db"); // koneksi database

const app = express();
app.use(cors());
app.use(express.json());

// ROUTE UTAMA
app.get("/", (req, res) => {
  res.send("SINOVA Backend Running");
});

// ============================
// 🔹 ROUTE GET PRODUK
// ============================
app.get("/produk", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM produk");
    res.json(result.rows);
  } catch (error) {
    console.error("ERROR GET /produk:", error);
    res.status(500).json({ error: error.message });
  }
});

// ============================
// 🔹 ROUTE POST PRODUK (Tambah Produk)
// ============================
app.post("/produk", async (req, res) => {
  try {
    const { nama_produk, deskripsi, penyedia_id } = req.body;

    if (!nama_produk || !deskripsi || !penyedia_id) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    const result = await pool.query(
      `INSERT INTO produk (nama_produk, deskripsi, penyedia_id, status_verifikasi)
       VALUES ($1, $2, $3, 'menunggu') 
       RETURNING *`,
      [nama_produk, deskripsi, penyedia_id]
    );

    res.json({
      message: "Produk berhasil ditambahkan",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("ERROR POST /produk:", error);
    res.status(500).json({ error: error.message });
  }
});

// SERVER LISTEN
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
