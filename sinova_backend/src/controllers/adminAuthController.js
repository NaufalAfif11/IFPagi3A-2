import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findAdminByEmail, createAdmin } from "../models/adminModel.js";

// ==============================
// LOGIN ADMIN
// ==============================
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await findAdminByEmail(email);
        if (!admin) {
            return res.status(400).json({ error: "Admin tidak ditemukan" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Password salah" });
        }

        const token = jwt.sign(
            { id: admin.id, role: admin.role, name: admin.name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login admin berhasil",
            user: {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
            token,
        });
    } catch (err) {
        console.error("ERROR LOGIN ADMIN:", err);
        res.status(500).json({ error: "Server error" });
    }
};
