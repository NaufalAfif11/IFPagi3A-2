import express from "express";
import { loginSuperadmin, createAdminBySuperadmin } from "../controllers/superAdminAuthController.js";

const router = express.Router();

// Login Superadmin
router.post("/login", loginSuperadmin);

// Create Admin
router.post("/create-admin", createAdminBySuperadmin);

export default router;
