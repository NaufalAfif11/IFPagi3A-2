import {
    createKebutuhan,
    getAllKebutuhanByUser,
    getKebutuhanByIdAndUser,
    updateKebutuhanByUser,
    deleteKebutuhanByUser,
    searchKebutuhanModel,
    getPenyediaByKebutuhan,
} from "../models/kebutuhanModel.js";

// CREATE USULAN
export const addKebutuhan = async (req, res) => {
    try {
        const data = req.body;

        // Validasi required fields
        const requiredFields = ['nama', 'email', 'kategori_id'];
        const missingFields = requiredFields.filter(field => !data[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                error: `Field wajib: ${missingFields.join(', ')}` 
            });
        }

        // Upload dokumen
        if (req.file) data.dokumen = req.file.filename;

        // Set pengguna_id dari akun login
        data.pengguna_id = req.user.id;

        const result = await createKebutuhan(data);
        res.status(201).json({ message: "Usulan berhasil dibuat", data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// READ ALL USULAN PEMILIK (RIWAYAT)
export const fetchKebutuhan = async (req, res) => {
    try {
        const list = await getAllKebutuhanByUser(req.user.id);
        res.json(list);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ USULAN BY ID PEMILIK
export const fetchKebutuhanById = async (req, res) => {
    try {
        const kebutuhan = await getKebutuhanByIdAndUser(req.params.id, req.user.id);
        if (!kebutuhan) return res.status(404).json({ message: "Usulan tidak ditemukan" });
        res.json(kebutuhan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE USULAN PEMILIK
export const editKebutuhan = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        if (req.file) data.dokumen = req.file.filename;

        const result = await updateKebutuhanByUser(id, req.user.id, data);
        if (!result) return res.status(404).json({ message: "Usulan tidak ditemukan atau bukan milik Anda" });

        res.json({ message: "Update sukses", data: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE USULAN PEMILIK
export const removeKebutuhan = async (req, res) => {
    try {
        const result = await deleteKebutuhanByUser(req.params.id, req.user.id);
        if (!result) return res.status(404).json({ message: "Usulan tidak ditemukan atau bukan milik Anda" });
        res.json({ message: "Usulan berhasil dihapus", data: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// SEARCH (optional)
export const searchKebutuhan = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        if (!keyword) return res.status(400).json({ success: false, message: "Keyword wajib diisi" });

        const data = await searchKebutuhanModel(keyword);
        return res.json({ success: true, message: "Pencarian berhasil", total: data.length, data });
    } catch (err) {
        res.status(500).json({ success: false, message: "Terjadi kesalahan server", error: err.message });
    }
};

// FETCH PENYEDIA BERMINAT
export const fetchPenyediaByKebutuhan = async (req, res) => {
  try {
    const kebutuhanId = req.params.id;
    const data = await getPenyediaByKebutuhan(kebutuhanId);
    return res.json({ success: true, total: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
