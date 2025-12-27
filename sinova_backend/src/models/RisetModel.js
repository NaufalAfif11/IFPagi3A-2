import db from "../config/db.js";

class RisetModel {
  /* ================= PUBLIC ================= */
  static async getPublic({ page, limit, judul, namaPeriset, kategori }) {
    const offset = (page - 1) * limit;
    
    // Build WHERE clause dynamically
    let whereConditions = [];
    let queryParams = [];
    let paramCounter = 1;

    if (judul) {
      whereConditions.push(`r.judul ILIKE $${paramCounter}`);
      queryParams.push(`%${judul}%`);
      paramCounter++;
    }

    if (namaPeriset) {
      whereConditions.push(`r.nama_periset ILIKE $${paramCounter}`);
      queryParams.push(`%${namaPeriset}%`);
      paramCounter++;
    }

    if (kategori) {
      whereConditions.push(`k.nama_kategori = $${paramCounter}`);
      queryParams.push(kategori);
      paramCounter++;
    }

    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}` 
      : '';

    // Add LIMIT and OFFSET params
    const limitParam = paramCounter;
    const offsetParam = paramCounter + 1;
    queryParams.push(limit, offset);

    const dataQuery = `
      SELECT 
        r.id,
        r.judul,
        r.nama_periset,
        r.dokumen_url,
        r.created_at,
        k.nama_kategori
      FROM riset r
      JOIN kategori k ON r.kategori_id = k.kategori_id
      ${whereClause}
      ORDER BY r.created_at DESC
      LIMIT $${limitParam} OFFSET $${offsetParam}
    `;

    const countQuery = `
      SELECT COUNT(*) 
      FROM riset r
      JOIN kategori k ON r.kategori_id = k.kategori_id
      ${whereClause}
    `;

    // For count query, exclude LIMIT and OFFSET
    const countParams = queryParams.slice(0, -2);

    const [data, count] = await Promise.all([
      db.query(dataQuery, queryParams),
      db.query(countQuery, countParams),
    ]);

    const totalData = Number(count.rows[0].count);

    return {
      data: data.rows,
      pagination: {
        page,
        limit,
        totalData,
        totalPages: Math.ceil(totalData / limit),
      },
    };
  }

  /* ================= USER DASHBOARD ================= */
  static async getByUser(userId, { page, limit }) {
    const offset = (page - 1) * limit;

    const dataQuery = `
      SELECT 
        r.id,
        r.judul,
        r.nama_periset,
        r.dokumen_url,
        r.created_at,
        k.nama_kategori
      FROM riset r
      JOIN kategori k ON r.kategori_id = k.kategori_id
      WHERE r.user_id = $1
      ORDER BY r.created_at DESC
      LIMIT $2 OFFSET $3
    `;

    const countQuery = `
      SELECT COUNT(*) FROM riset WHERE user_id = $1
    `;

    const [data, count] = await Promise.all([
      db.query(dataQuery, [userId, limit, offset]),
      db.query(countQuery, [userId]),
    ]);

    const totalData = Number(count.rows[0].count);

    return {
      data: data.rows,
      pagination: {
        page,
        limit,
        totalData,
        totalPages: Math.ceil(totalData / limit),
      },
    };
  }

  /* ================= DETAIL ================= */
  static async getById(id) {
    const query = `
      SELECT 
        r.id,
        r.judul,
        r.nama_periset,
        r.dokumen_url,
        r.created_at,
        k.nama_kategori
      FROM riset r
      JOIN kategori k ON r.kategori_id = k.kategori_id
      WHERE r.id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  /* ================= CREATE ================= */
  static async create({ judul, namaPeriset, kategoriId, dokumenUrl, userId }) {
    const query = `
      INSERT INTO riset
        (judul, nama_periset, kategori_id, dokumen_url, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await db.query(query, [
      judul,
      namaPeriset,
      kategoriId,
      dokumenUrl,
      userId,
    ]);
    return result.rows[0];
  }

  /* ================= UPDATE ================= */
  static async update(id, userId, { judul, namaPeriset, kategoriId, dokumenUrl }) {
    const query = `
      UPDATE riset SET
        judul = $1,
        nama_periset = $2,
        kategori_id = $3,
        dokumen_url = $4
      WHERE id = $5 AND user_id = $6
      RETURNING *
    `;
    const result = await db.query(query, [
      judul,
      namaPeriset,
      kategoriId,
      dokumenUrl,
      id,
      userId,
    ]);
    return result.rows[0];
  }

  /* ================= DELETE ================= */
  static async delete(id, userId) {
    const query = `
      DELETE FROM riset
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;
    const result = await db.query(query, [id, userId]);
    return result.rows[0];
  }
}

export default RisetModel;