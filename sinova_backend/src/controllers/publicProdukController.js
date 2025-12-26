import pool from '../config/db.js';

// Katalog produk publik (hanya yang diterima)
export const katalog = async (req, res) => {
  try {
    const { search, kategori } = req.query;
    
    let whereClause = "WHERE p.status='diterima'";
    const params = [];
    let paramIndex = 1;
    
    // Filter search
    if (search) {
      whereClause += ` AND (p.nama_produk ILIKE $${paramIndex} OR p.deskripsi ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }
    
    // Filter kategori
    if (kategori && kategori !== 'Semua Kategori') {
      whereClause += ` AND k.nama_kategori = $${paramIndex}`;
      params.push(kategori);
      paramIndex++;
    }
    
    const query = `
      SELECT 
        p.*,
        k.nama_kategori,
        u.name AS penyedia_name,
        u.email AS penyedia_email,
        COALESCE(
          json_agg(
            json_build_object('id', pf.id, 'path', pf.foto_path)
          ) FILTER (WHERE pf.id IS NOT NULL),
          '[]'
        ) AS foto_list
      FROM produk p
      LEFT JOIN kategori k ON p.kategori_id = k.kategori_id
      LEFT JOIN users u ON p.user_id = u.id
      LEFT JOIN produk_foto pf ON pf.produk_id = p.id
      ${whereClause}
      GROUP BY p.id, k.nama_kategori, u.name, u.email
      ORDER BY p.created_at DESC
    `;
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error katalog:', err);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil katalog', 
      error: err.message 
    });
  }
};

export const detailProdukPublic = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      SELECT 
        p.id,
        p.nama_produk,
        p.deskripsi,
        p.harga,
        p.kontak,
        k.nama_kategori,
        u.name AS penyedia_name,
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
      LEFT JOIN users u ON p.user_id = u.id
      LEFT JOIN produk_foto pf ON pf.produk_id = p.id
      WHERE p.id = $1 AND p.status = 'diterima'
      GROUP BY p.id, k.nama_kategori, u.name
    `, [id]);

    if (!result.rows.length) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error detailProdukPublic:', err);
    res.status(500).json({ message: 'Gagal ambil detail produk' });
  }
};
