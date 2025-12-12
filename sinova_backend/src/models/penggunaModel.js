import pool from "../config/db.js";

// Cari user by email
export const findPenggunaByEmail = (email) => {
    return pool.query(`
        SELECT 
            u.id,
            u.name,
            u.email,
            u.password,
            r.role_name AS role
        FROM users u
        JOIN role r ON r.id = u.role_id
        WHERE u.email = $1 AND r.role_name = 'pengguna'
    `, [email]);
};


// Membuat user baru + detail default
export const createPengguna = async (name, email, hashedPassword) => {

    const roleRes = await pool.query(
        `SELECT id FROM role WHERE role_name = $1`,  // FIX
        ["pengguna"]
    );

    if (!roleRes.rows.length) {
        throw new Error("Role pengguna tidak ditemukan");
    }

    const roleId = roleRes.rows[0].id;

    const userRes = await pool.query(
        `INSERT INTO users (name, email, password, role_id)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, email, role_id`,
        [name, email, hashedPassword, roleId]
    );

    const userId = userRes.rows[0].id;

    await pool.query(
        `INSERT INTO detail_users (user_id, phone, foto_profil)
         VALUES ($1, null, null)`,
        [userId]
    );

    return userRes;
};
