import express from 'express';
import * as publicController from '../controllers/publicProdukController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ KATALOG (PUBLIK)
router.get('/katalog', publicController.katalog);

// 🔐 DETAIL PRODUK (WAJIB LOGIN)
router.get('/:id', authMiddleware, publicController.detailProdukPublic);

export default router;
