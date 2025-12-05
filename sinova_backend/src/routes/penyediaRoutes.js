import express from "express";
import { registerPenyedia, loginPenyedia } from "../controllers/penyediaAuthController.js";

const router = express.Router();

router.post("/register", registerPenyedia);
router.post("/login", loginPenyedia);

export default router;
