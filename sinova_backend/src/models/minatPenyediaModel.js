import pool from "../config/db.js";

export const createMinatPenyedia = async ({
  kebutuhan_id,
  user_id,
  deskripsi_proposal,
  file_proposal
}) => {
  const query = `
    INSERT INTO minat_penyedia
    (kebutuhan_id, user_id, deskripsi_proposal, file_proposal, status)
    VALUES ($1,$2,$3,$4,'menunggu')
    RETURNING *
  `;

  const values = [
    kebutuhan_id,
    user_id,
    deskripsi_proposal,
    file_proposal
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};


export const getMinatByKebutuhan = async (kebutuhanId) => {
  const result = await pool.query(
    `
    SELECT 
      mp.id,
      mp.deskripsi_proposal,
      mp.file_proposal,
      mp.status,
      mp.created_at,
      u.email
    FROM minat_penyedia mp
    JOIN users u ON mp.user_id = u.id
    WHERE mp.kebutuhan_id = $1
    ORDER BY mp.created_at DESC
    `,
    [kebutuhanId]
  );

  return result.rows;
};


export const approveMinat = async (minatId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Ambil data minat
    const { rows, rowCount } = await client.query(
      `
      SELECT id, kebutuhan_id, user_id
      FROM minat_penyedia
      WHERE id = $1
      `,
      [minatId]
    );

    if (!rowCount) {
      throw new Error("Minat tidak ditemukan");
    }

    const { kebutuhan_id, user_id } = rows[0];

    // 2. Set minat terpilih
    await client.query(
      `
      UPDATE minat_penyedia
      SET status = 'diterima'
      WHERE kebutuhan_id = $1 AND user_id = $2
      `,
      [kebutuhan_id, user_id]
    );

    // 3. Tolak minat lain
    await client.query(
      `
      UPDATE minat_penyedia
      SET status = 'ditolak'
      WHERE kebutuhan_id = $1 AND user_id != $2
      `,
      [kebutuhan_id, user_id]
    );

    // 4. Update kebutuhan
    await client.query(
      `
      UPDATE kebutuhan
      SET status = 'Sedang Dikerjakan',
          penyedia_dikerjakan = $1
      WHERE id = $2
    `,
      [user_id, kebutuhan_id]
    );

    await client.query("COMMIT");

    return {
      kebutuhan_id,
      user_id: user_id
    };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};


