import express from "express";
import RisetController from "../controllers/RisetController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =====================================================
   PUBLIC ROUTES (TANPA LOGIN)
   ===================================================== */

// GET /api/riset - tampil SEMUA riset (public)
router.get("/", RisetController.getPublic);

/* =====================================================
   AUTHENTICATED ROUTES (WAJIB LOGIN)
   ===================================================== */

// ⚠️ HARUS DI ATAS /:id
router.get("/my", authMiddleware, RisetController.getMyRiset);
router.post("/", authMiddleware, RisetController.create);
router.put("/:id", authMiddleware, RisetController.update);
router.delete("/:id", authMiddleware, RisetController.delete);

/* =====================================================
   DETAIL ROUTE (PALING BAWAH)
   ===================================================== */

// GET /api/riset/:id - detail riset (publik)
router.get("/:id", RisetController.getById);

export default router;
