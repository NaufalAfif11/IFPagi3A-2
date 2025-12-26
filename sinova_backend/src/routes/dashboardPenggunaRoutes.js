import express from "express";
import { getDashboardPengguna } from "../controllers/dashboardPenggunaController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard-pengguna", authMiddleware, getDashboardPengguna);

export default router;
