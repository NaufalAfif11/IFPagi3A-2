import pool from "../config/db.js";

export const findPenggunaByEmail = (email) => {
    return pool.query(
        "SELECT * FROM users WHERE email=$1 AND role='pengguna'",
        [email]
    );
};

export const createPengguna = (name, email, hashed) => {
    return pool.query(
        "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,'pengguna') RETURNING id, name, email, role",
        [name, email, hashed]
    );
};
