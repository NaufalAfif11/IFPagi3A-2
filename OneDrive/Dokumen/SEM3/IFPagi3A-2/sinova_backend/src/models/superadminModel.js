import pool from "../config/db.js";

export const findSuperAdminByEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email=$1 AND role='superadmin'",
        [email]
    );
    return result.rows[0];
};

// SUPERADMIN membuat admin baru
export const createAdmin = async (name, email, hashedPassword) => {
    const result = await pool.query(
        `INSERT INTO users (name, email, password, role)
         VALUES ($1, $2, $3, 'admin')
         RETURNING id, name, email, role`,
        [name, email, hashedPassword]
    );

    return result.rows[0];
};
