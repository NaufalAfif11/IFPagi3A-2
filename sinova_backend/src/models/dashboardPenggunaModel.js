import pool from "../config/db.js";

export const getTotalUsulan = async (penggunaId) => {
  const res = await pool.query(
    "SELECT COUNT(*) FROM kebutuhan WHERE pengguna_id = $1",
    [penggunaId]
  );
  return Number(res.rows[0].count);
};

export const getUsulanBaru = async (penggunaId) => {
  const res = await pool.query(
    `
    SELECT COUNT(*) 
    FROM kebutuhan 
    WHERE pengguna_id = $1 
    AND penyedia_dikerjakan IS NULL
    `,
    [penggunaId]
  );
  return Number(res.rows[0].count);
};

export const getHistory = async (penggunaId) => {
  const res = await pool.query(
    `
    SELECT COUNT(*) 
    FROM kebutuhan 
    WHERE pengguna_id = $1 
    AND penyedia_dikerjakan IS NOT NULL
    `,
    [penggunaId]
  );
  return Number(res.rows[0].count);
};

export const getStatusData = async (penggunaId) => {
  const res = await pool.query(
    `
    SELECT 
      CASE 
        WHEN penyedia_dikerjakan IS NULL THEN 'Menunggu'
        ELSE 'Dikerjakan'
      END AS name,
      COUNT(*)::int AS value
    FROM kebutuhan
    WHERE pengguna_id = $1
    GROUP BY name
    `,
    [penggunaId]
  );

  return res.rows;
};

export const getDataBulan = async (penggunaId) => {
  const res = await pool.query(
    `
    SELECT 
      TO_CHAR(tanggal_kebutuhan, 'Mon') AS bulan,
      COUNT(*)::int AS jumlah,
      MIN(tanggal_kebutuhan) AS sort_date
    FROM kebutuhan
    WHERE pengguna_id = $1
    GROUP BY bulan
    ORDER BY sort_date
    `,
    [penggunaId]
  );

  return res.rows.map(r => ({
    bulan: r.bulan,
    jumlah: r.jumlah,
  }));
};
