import pool from '../config/db.js';

export const createKebutuhan = async (data) => {
  const query = `
    INSERT INTO kebutuhan (
      nama,
      alamat,
      email,
      telp,
      jabatan,

      nama_perusahaan,
      email_perusahaan,
      alamat_perusahaan,
      telp_perusahaan,

      jenis_produk,
      tanggal_kebutuhan,
      estimasi_budget,
      deskripsi,
      dokumen,

      bidang_id,
      pengguna_id
    )
    VALUES (
      $1,$2,$3,$4,$5,
      $6,$7,$8,$9,
      $10,$11,$12,$13,$14,
      $15,$16
    )
    RETURNING *;
  `;

  const values = [
    data.nama,
    data.alamat,
    data.email,
    data.telp,
    data.jabatan,

    data.nama_perusahaan,
    data.email_perusahaan,
    data.alamat_perusahaan,
    data.telp_perusahaan,

    data.jenis_produk,
    data.tanggal_kebutuhan,
    data.estimasi_budget,
    data.deskripsi,
    data.dokumen || null,

    data.bidang_id,
    data.pengguna_id || null,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};


export const getAllKebutuhan = async () => {
    const result = await pool.query(`
        SELECT 
            k.*, 
            b.nama_bidang,
            COALESCE(mp.peminat_count, 0) AS peminat
        FROM kebutuhan k
        LEFT JOIN bidang b 
            ON k.bidang_id = b.bidang_id
        LEFT JOIN (
            SELECT kebutuhan_id, COUNT(*) AS peminat_count
            FROM minat_penyedia
            GROUP BY kebutuhan_id
        ) mp
            ON mp.kebutuhan_id = k.id
        ORDER BY k.created_at DESC;
    `);
    return result.rows;
};


export const getKebutuhanById = async (id) => {
    const result = await pool.query(
        `SELECT * FROM kebutuhan WHERE id = $1`,
        [id]
    );
    return result.rows[0];
};

export const updateKebutuhan = async (id, data) => {
    const q = `
        UPDATE kebutuhan SET
            nama=$1, alamat=$2, email=$3, telp=$4, jabatan=$5,
            nama_perusahaan=$6, email_perusahaan=$7, alamat_perusahaan=$8, telp_perusahaan=$9,
            jenis_produk=$10, tanggal_kebutuhan=$11, deskripsi=$12, dokumen=$13,
            bidang_id=$14, estimasi_budget=$15
        WHERE id=$16
        RETURNING *;
    `;

    const values = [
        data.nama, data.alamat, data.email, data.telp, data.jabatan,
        data.nama_perusahaan, data.email_perusahaan, data.alamat_perusahaan, data.telp_perusahaan,
        data.jenis_produk, data.tanggal_kebutuhan, data.deskripsi, data.dokumen,
        data.bidang_id, data.estimasi_budget,
        id
    ];

    const result = await pool.query(q, values);
    return result.rows[0];
};

export const deleteKebutuhan = async (id) => {
    const result = await pool.query(
        `DELETE FROM kebutuhan WHERE id=$1 RETURNING *`,
        [id]
    );
    return result.rows[0];
};

export const searchKebutuhanModel = async (keyword) => {
    const result = await pool.query(`
        SELECT * FROM kebutuhan 
        WHERE lower(jenis_produk) LIKE lower($1)
           OR lower(deskripsi) LIKE lower($1)
    `, [`%${keyword}%`]);

    return result.rows;  // ✅ aman
};


export const getPenyediaByKebutuhan = async (kebutuhanId) => {
  // gabungkan data penyedia + minat
  const q = `
    SELECT
      mp.minat_id,
      mp.kebutuhan_id,
      p.penyedia_id,
      p.nama_penyedia,
      p.email,
      p.password,
      p.no_telp,
      p.alamat,
      p.instansi,
      p.role,
      mp.proposal,
      mp.estimasi_biaya,
      mp.estimasi_waktu,
      mp.tanggal_minat
    FROM minat_penyedia mp
    JOIN penyedia p ON p.penyedia_id = mp.penyedia_id
    WHERE mp.kebutuhan_id = $1
    ORDER BY mp.tanggal_minat DESC;
  `;

  const result = await pool.query(q, [kebutuhanId]);
  return result.rows;
};
