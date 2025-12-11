import express from 'express';
import { authMiddleware, requireRole } from '../middleware/authMiddleware.js'; 
import { uploadDokumen } from '../middleware/uploadMiddleware.js';
import layananController from '../controllers/layananController.js'; 
// Asumsi layananController diimpor sebagai default (mengandung semua fungsi)

const router = express.Router();

// ===============================================================
// 1. RUTE PENGGUNA: CREATE LAYANAN BARU (POST /api/layanan)
// ===============================================================
router.post(
    '/', 
    authMiddleware, 
    requireRole('pengguna'), // Hanya pengguna biasa yang bisa mengajukan usulan
    uploadDokumen,          
    layananController.createLayanan
);

// ===============================================================
// 2. RUTE ADMIN: READ ALL LAYANAN (GET /api/layanan)
// ===============================================================
// Ini adalah Rute yang hilang dari kode Anda sebelumnya, kini ditambahkan.
router.get(
    '/', 
    authMiddleware, 
    requireRole('admin'), // Hanya Admin yang bisa melihat SEMUA usulan
    layananController.getAllLayanan
);


// ===============================================================
// 3. RUTE PENGGUNA: RIWAYAT LAYANAN SAYA (GET /api/layanan/saya)
// ===============================================================
router.get(
    '/saya', 
    authMiddleware, 
    layananController.getLayananSaya 
);


// ===============================================================
// 4. RUTE BERSAMA: DETAIL LAYANAN BERDASARKAN ID (GET /api/layanan/:id)
// ===============================================================
// Ini adalah Rute yang hilang dari kode Anda sebelumnya, kini ditambahkan.
router.get(
    '/:id', 
    authMiddleware, 
    layananController.getLayananById // Otorisasi (Admin/Pengaju) dicek di Controller
);


// ===============================================================
// 5. RUTE ADMIN: UPDATE STATUS LAYANAN (PUT /api/layanan/:id/status)
// ===============================================================
router.put(
    '/:id/status', 
    authMiddleware, 
    requireRole('admin'), // Hanya Admin yang boleh mengubah status
    layananController.updateLayananStatus
);


// ===============================================================
// 6. RUTE BERSAMA: DOWNLOAD DOKUMEN (GET /api/layanan/:id/download)
// ===============================================================
// Ini adalah Rute yang hilang dari kode Anda sebelumnya, kini ditambahkan.
router.get(
    '/:id/download', 
    authMiddleware, 
    layananController.downloadDokumen // Otorisasi (Admin/Pengaju) dicek di Controller
);


export default router;