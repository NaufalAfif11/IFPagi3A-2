import pool from '../config/db.js';
import { deleteFile } from "../utils/fileHelper.js";

/* =========================
   ➕ TAMBAH PRODUK BARU
========================= */
export const storeProduk = async (req, res) => {
  try {
    const { nama_produk, kategori_id, deskripsi, kontak } = req.body;

    // ✅ FIX BIGINT
    const hargaInt = Math.round(Number(req.body.harga));
    if (isNaN(hargaInt)) {
      return res.status(400).json({ message: "Harga tidak valid" });
    }

    const mainFotoPath =
      req.files && req.files.length > 0 ? req.files[0].path : null;

    const produkResult = await pool.query(
      `
      INSERT INTO produk 
        (user_id, kategori_id, nama_produk, deskripsi, harga, kontak, foto_produk, status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,'menunggu')
      RETURNING *
      `,
      [
        req.user.id,
        kategori_id,
        nama_produk,
        deskripsi,
        hargaInt, // ✅ BIGINT BERSIH
        kontak,
        mainFotoPath,
      ]
    );

    const produk = produkResult.rows[0];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        await pool.query(
          "INSERT INTO produk_foto (produk_id, foto_path) VALUES ($1,$2)",
          [produk.id, file.path]
        );
      }
    }

    res.json({
      message: "Produk dikirim, menunggu approval admin",
      produk,
    });
  } catch (err) {
    console.error("Error storeProduk:", err);
    res
      .status(500)
      .json({ message: "Gagal menambahkan produk", error: err.message });
  }
};

/* =========================
   📄 LIST PRODUK
========================= */
export const listProduk = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        p.*,
        k.nama_kategori,
        COALESCE(
          json_agg(
            json_build_object(
              'id', pf.id,
              'path', pf.foto_path
            ) ORDER BY pf.id
          ) FILTER (WHERE pf.id IS NOT NULL),
          '[]'
        ) AS foto_list
      FROM produk p
      LEFT JOIN kategori k ON p.kategori_id = k.kategori_id
      LEFT JOIN produk_foto pf ON pf.produk_id = p.id
      WHERE p.user_id = $1
      GROUP BY p.id, k.nama_kategori
      ORDER BY p.created_at DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error listProduk:", err);
    res
      .status(500)
      .json({ message: "Gagal ambil produk", error: err.message });
  }
};

/* =========================
   📄 DETAIL PRODUK
========================= */
export const detailProduk = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        p.*,
        k.nama_kategori,
        COALESCE(
          json_agg(
            json_build_object(
              'id', pf.id,
              'path', pf.foto_path
            ) ORDER BY pf.id
          ) FILTER (WHERE pf.id IS NOT NULL),
          '[]'
        ) AS foto_list
      FROM produk p
      LEFT JOIN kategori k ON p.kategori_id = k.kategori_id
      LEFT JOIN produk_foto pf ON pf.produk_id = p.id
      WHERE p.id = $1 AND p.user_id = $2
      GROUP BY p.id, k.nama_kategori
      `,
      [req.params.id, req.user.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error detailProduk:", err);
    res
      .status(500)
      .json({ message: "Gagal ambil detail produk", error: err.message });
  }
};

/* =========================
   ✏️ UPDATE PRODUK
========================= */
export const updateProduk = async (req, res) => {
  try {
    const produkId = req.params.id;

    const check = await pool.query(
      "SELECT * FROM produk WHERE id=$1 AND user_id=$2",
      [produkId, req.user.id]
    );

    if (!check.rows.length)
      return res.status(404).json({ message: "Produk tidak ditemukan" });

    if (check.rows[0].status === "diterima")
      return res
        .status(403)
        .json({ message: "Produk sudah diterima, tidak bisa diedit" });

    // ✅ FIX BIGINT
    const hargaInt = Math.round(Number(req.body.harga));
    if (isNaN(hargaInt)) {
      return res.status(400).json({ message: "Harga tidak valid" });
    }

    const updateData = [
      req.body.nama_produk,
      req.body.kategori_id,
      req.body.deskripsi,
      hargaInt, // ✅
      req.body.kontak,
    ];

    let updateQuery = `
      UPDATE produk SET
        nama_produk=$1,
        kategori_id=$2,
        deskripsi=$3,
        harga=$4,
        kontak=$5,
        status='menunggu',
        alasan_penolakan=NULL,
        updated_at=NOW()
    `;

    if (req.files && req.files.length > 0) {
      updateQuery += `, foto_produk=$6`;
      updateData.push(req.files[0].path);

      if (check.rows[0].foto_produk)
        deleteFile(check.rows[0].foto_produk);

      const oldFotos = await pool.query(
        "SELECT foto_path FROM produk_foto WHERE produk_id=$1",
        [produkId]
      );
      for (const f of oldFotos.rows) deleteFile(f.foto_path);

      await pool.query("DELETE FROM produk_foto WHERE produk_id=$1", [
        produkId,
      ]);
    }

    updateQuery += ` WHERE id=$${updateData.length + 1} RETURNING *`;
    updateData.push(produkId);

    const updated = await pool.query(updateQuery, updateData);

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        await pool.query(
          "INSERT INTO produk_foto (produk_id, foto_path) VALUES ($1,$2)",
          [produkId, file.path]
        );
      }
    }

    res.json({
      message: "Produk berhasil diperbarui",
      produk: updated.rows[0],
    });
  } catch (err) {
    console.error("Error updateProduk:", err);
    res
      .status(500)
      .json({ message: "Gagal update produk", error: err.message });
  }
};

/* =========================
   🗑️ HAPUS PRODUK
========================= */
export const deleteProduk = async (req, res) => {
  try {
    const produkData = await pool.query(
      `
      SELECT * FROM produk 
      WHERE id=$1 AND user_id=$2 AND status IN ('menunggu','ditolak')
      `,
      [req.params.id, req.user.id]
    );

    if (!produkData.rows.length)
      return res.status(403).json({ message: "Tidak bisa hapus produk ini" });

    if (produkData.rows[0].foto_produk)
      deleteFile(produkData.rows[0].foto_produk);

    const fotoList = await pool.query(
      "SELECT foto_path FROM produk_foto WHERE produk_id=$1",
      [req.params.id]
    );
    for (const foto of fotoList.rows) deleteFile(foto.foto_path);

    await pool.query("DELETE FROM produk WHERE id=$1", [req.params.id]);

    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    console.error("Error deleteProduk:", err);
    res.status(500).json({
      message: "Terjadi kesalahan saat menghapus produk",
      error: err.message,
    });
  }
};
