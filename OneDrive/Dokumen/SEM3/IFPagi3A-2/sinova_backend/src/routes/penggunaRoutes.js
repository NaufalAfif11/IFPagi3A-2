import express from "express";
import { registerPengguna, loginPengguna } from "../controllers/penggunaAuthController.js";

const router = express.Router();

router.post("/register", registerPengguna);
router.post("/login", loginPengguna);

export default router;
