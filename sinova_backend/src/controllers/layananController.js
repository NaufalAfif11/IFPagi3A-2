import pool from '../config/db.js'; // Mengimpor pool sebagai default export

import fs from 'fs';

import path from 'path';



/**

 * Helper function untuk memudahkan pemanggilan query

 * Kita gunakan pool.query untuk konsistensi

 */

const query = (text, params) => pool.query(text, params);





/**

 * =========================================

 * 1. CREATE LAYANAN (Pengguna)

 * =========================================

 * Rute: POST /api/layanan

 * Akses: requireRole('pengguna')

 */

export const createLayanan = async (req, res) => {

    // Data dari JWT (authMiddleware)

    const userId = req.user.id; 

    

    // Data dari formulir (req.body)

    const { 

        nama, alamat, email, telp, jabatan, namaperusahaan, emailPerusahaan, 

        alamatPerusahaan, telpPerusahaan, jenisProduk, tanggal, deskripsi 

    } = req.body; 



    // Data File (req.file) - Hanya ada jika dokumen diunggah oleh Multer

    const dokumenPath = req.file ? req.file.path : null;



    // --- Validasi Dasar ---

    if (!nama || !email || !jenisProduk || !deskripsi || !namaperusahaan) {

        // Jika validasi gagal, hapus file yang mungkin sudah diunggah

        if (dokumenPath && fs.existsSync(dokumenPath)) fs.unlinkSync(dokumenPath); 

        return res.status(400).json({ 

            message: 'Field Nama, Email, Jenis Produk, Deskripsi, dan Nama Perusahaan wajib diisi.' 

        });

    }



    try {

        const text = `

            INSERT INTO layanan_usulan (

                pengaju_id, nama, alamat, email, telp, jabatan, namaperusahaan, emailperusahaan, 

                alamatperusahaan, telpperusahaan, jenisproduk, tanggal_rencana, deskripsi, 

                dokumen_path, status, created_at

            )

            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 'Diajukan', NOW())

            RETURNING id, jenisproduk, status, created_at

        `;

        

        const values = [

            userId, nama, alamat, email, telp, jabatan, namaperusahaan, emailPerusahaan, 

            alamatPerusahaan, telpPerusahaan, jenisProduk, tanggal, deskripsi, dokumenPath

        ];

        

        const result = await query(text, values);



        return res.status(201).json({

            message: 'Permintaan usulan produk berhasil diajukan.',

            data: result.rows[0]

        });



    } catch (error) {

        // Jika query ke DB gagal, hapus file yang sudah diunggah

        if (dokumenPath && fs.existsSync(dokumenPath)) fs.unlinkSync(dokumenPath);

        

        console.error("Error saat menyimpan Layanan Usulan ke PG:", error);

        return res.status(500).json({ 

            message: 'Terjadi kesalahan server saat menyimpan data.', 

            error: error.message 

        });

    }

};





/**

 * =========================================

 * 2. READ ALL (Admin)

 * =========================================

 * Rute: GET /api/layanan

 * Akses: requireRole('admin')

 */

export const getAllLayanan = async (req, res) => {

    try {

        const text = `

            SELECT 

                lu.id, lu.jenisproduk, lu.status, lu.created_at, lu.namaperusahaan, lu.tanggal_rencana,

                p.nama AS nama_pengaju, p.email AS email_pengaju

            FROM layanan_usulan lu

            JOIN pengguna p ON lu.pengaju_id = p.id

            ORDER BY lu.created_at DESC

        `;

        

        const result = await query(text); 



        return res.status(200).json({

            message: `Ditemukan ${result.rows.length} total usulan layanan.`,

            data: result.rows

        });



    } catch (error) {

        console.error("[Error PG] Gagal mengambil semua Layanan:", error.message);

        return res.status(500).json({ 

            message: 'Terjadi kesalahan server saat mengambil semua data layanan.', 

            error: error.message 

        });

    }

};



/**

 * =========================================

 * 3. READ USER'S LAYANAN (Pengguna)

 * =========================================

 * Rute: GET /api/layanan/saya

 * Akses: authMiddleware (pengguna manapun)

 */

export const getLayananSaya = async (req, res) => {

    const userId = req.user.id; 



    try {

        const text = `

            SELECT id, jenisproduk, status, created_at, namaperusahaan

            FROM layanan_usulan

            WHERE pengaju_id = $1

            ORDER BY created_at DESC

        `;

        

        const result = await query(text, [userId]); 



        return res.status(200).json({

            message: `Daftar ${result.rows.length} layanan yang diajukan.`,

            data: result.rows

        });



    } catch (error) {

        console.error(`[Error PG] Gagal mengambil Layanan oleh User ID ${userId}:`, error.message);

        return res.status(500).json({ 

            message: 'Terjadi kesalahan server saat mengambil data layanan.', 

            error: error.message 

        });

    }

};



/**

 * =========================================

 * 4. READ BY ID (Admin/Pengaju)

 * =========================================

 * Rute: GET /api/layanan/:id

 * Akses: authMiddleware (otorisasi di controller)

 */

export const getLayananById = async (req, res) => {

    const { id } = req.params;

    const userId = req.user.id;

    const userRole = req.user.role;



    try {

        // Gabungkan data layanan dan nama/email pengaju

        const text = `

            SELECT 

                lu.*, p.nama AS nama_pengaju, p.email AS email_pengaju

            FROM layanan_usulan lu

            JOIN pengguna p ON lu.pengaju_id = p.id

            WHERE lu.id = $1

        `;

        const result = await query(text, [id]);



        if (result.rowCount === 0) {

            return res.status(404).json({ message: 'Usulan layanan tidak ditemukan.' });

        }



        const layanan = result.rows[0];



        // Cek Otorisasi: Hanya Admin atau Pengaju Asli yang boleh melihat detail

        if (userRole !== 'admin' && layanan.pengaju_id !== userId) {

            return res.status(403).json({ message: 'Anda tidak memiliki izin untuk melihat detail usulan ini.' });

        }



        // Untuk Pengguna, sembunyikan path file demi keamanan

        if (userRole !== 'admin') {

             // Mengganti path absolut dengan status ketersediaan

             layanan.dokumen_path = layanan.dokumen_path ? 'Dokumen Tersedia' : null; 

        }



        return res.status(200).json({ data: layanan });



    } catch (error) {

        console.error(`[Error PG] Gagal mengambil Layanan ID ${id}:`, error.message);

        return res.status(500).json({ message: 'Terjadi kesalahan server.' });

    }

};



/**

 * =========================================

 * 5. UPDATE Status (Admin)

 * =========================================

 * Rute: PUT /api/layanan/:id/status

 * Akses: requireRole('admin')

 */

export const updateLayananStatus = async (req, res) => {

    const { id } = req.params; 

    const { status } = req.body; 



    // Menambahkan 'Dibatalkan' sebagai status yang valid (jika Pengguna ingin membatalkan)

    const validStatuses = ['Diajukan', 'Diproses', 'Selesai', 'Ditolak', 'Dibatalkan'];

    

    if (!status || !validStatuses.includes(status)) {

        return res.status(400).json({ 

            message: 'Status tidak valid atau wajib diisi.', 

            valid_statuses: validStatuses 

        });

    }



    try {

        const text = `

            UPDATE layanan_usulan 

            SET status = $1, updated_at = NOW()

            WHERE id = $2

            RETURNING id, jenisproduk, status, updated_at

        `;

        const values = [status, id];

        

        const result = await query(text, values);



        if (result.rowCount === 0) {

            return res.status(404).json({ message: `Layanan dengan ID ${id} tidak ditemukan.` });

        }



        return res.status(200).json({

            message: `Status layanan ID ${id} berhasil diperbarui menjadi '${status}'.`,

            data: result.rows[0]

        });



    } catch (error) {

        console.error(`[Error PG] Gagal update status layanan ID ${id}:`, error.message);

        return res.status(500).json({ 

            message: 'Terjadi kesalahan server saat memperbarui status layanan.', 

            error: error.message 

        });

    }

};





/**

 * =========================================

 * 6. DOWNLOAD DOKUMEN (Admin/Pengaju)

 * =========================================

 * Rute: GET /api/layanan/:id/download

 * Akses: authMiddleware (otorisasi di controller)

 */

export const downloadDokumen = async (req, res) => {

    const { id } = req.params;

    const userId = req.user.id;

    const userRole = req.user.role;



    try {

        const text = `SELECT pengaju_id, dokumen_path FROM layanan_usulan WHERE id = $1`;

        const result = await query(text, [id]);



        if (result.rowCount === 0 || !result.rows[0].dokumen_path) {

            return res.status(404).json({ message: 'Dokumen tidak ditemukan atau belum diunggah.' });

        }



        const layanan = result.rows[0];



        // Cek Otorisasi: Hanya Admin atau Pengaju Asli yang boleh mengunduh

        if (userRole !== 'admin' && layanan.pengaju_id !== userId) {

            return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengunduh dokumen ini.' });

        }

        

        // Kirim file ke klien

        const filePath = path.resolve(layanan.dokumen_path); // Path absolut dari path yang disimpan Multer

        

        // Cek apakah file ada secara fisik sebelum mencoba download

        if (!fs.existsSync(filePath)) {

             console.error(`File fisik tidak ditemukan di path: ${filePath}`);

             return res.status(404).json({ message: "File fisik dokumen tidak ditemukan di server (mungkin telah dipindahkan atau dihapus)." });

        }



        res.download(filePath, (err) => {

            if (err) {

                console.error("Gagal mengunduh file:", err);

                // Jika error terjadi selama transmisi file

                if (!res.headersSent) {

                    res.status(500).send({ message: "Gagal memproses pengunduhan dokumen." });

                }

            }

        });



    } catch (error) {

        console.error(`[Error PG] Gagal mengambil path dokumen ID ${id}:`, error.message);

        return res.status(500).json({ message: 'Terjadi kesalahan server.' });

    }

};





// =========================================

// EKSPOR SEMUA FUNGSI

// =========================================

export default {

    createLayanan,

    getAllLayanan,

    getLayananSaya,

    getLayananById,

    updateLayananStatus,

    downloadDokumen,

};