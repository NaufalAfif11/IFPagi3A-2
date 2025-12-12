import express from "express";
import { registerPengguna, loginPengguna } from "../controllers/penggunaAuthController.js";

const router = express.Router();

// REGISTER
router.post("/register", registerPengguna);

// LOGIN
router.post("/login", loginPengguna);

export default router;
