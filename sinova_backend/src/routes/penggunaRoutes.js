// penggunaRoutes.js (Contoh)

import express from 'express';
// Pastikan path-nya benar
import { createPengguna } from '../controllers/authController.js'; 

const router = express.Router();

// Contoh rute POST untuk pendaftaran
router.post('/register', createPengguna);

export default router;