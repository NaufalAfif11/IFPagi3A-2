import pool from "../config/db.js";

export const findPenyediaByEmail = (email) => {
    return pool.query(
        "SELECT * FROM users WHERE email=$1 AND role='penyedia'",
        [email]
    );
};

export const createPenyedia = (name, email, hashed) => {
    return pool.query(
        "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,'penyedia') RETURNING id, name, email, role",
        [name, email, hashed]
    );
};
