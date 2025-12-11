import {
    createKebutuhan,
    getAllKebutuhan,
    getKebutuhanById,
    updateKebutuhan,
    deleteKebutuhan,
    searchKebutuhanModel,
    getPenyediaByKebutuhan,
} from "../models/kebutuhanModel.js";

// kebutuhanController.js
export const addKebutuhan = async (req, res) => {
    console.log("\n========== NEW REQUEST ==========");
    console.log("📥 Body:", req.body);
    console.log("📎 File:", req.file);
    
    try {
        const data = req.body;
        
        // Validasi required fields
        const requiredFields = ['nama', 'alamat', 'email', 'telp', 'bidang_id'];
        const missingFields = requiredFields.filter(field => !data[field]);
        
        if (missingFields.length > 0) {
            console.log("❌ Missing fields:", missingFields);
            return res.status(400).json({ 
                error: `Field wajib: ${missingFields.join(', ')}` 
            });
        }
        
        // Handle file upload
        if (req.file) {
            console.log("✅ File:", req.file.filename);
            data.dokumen = req.file.filename;
        }

        console.log("📤 Saving to database...");
        const result = await createKebutuhan(data);
        
        console.log("✅ SUCCESS:", result);
        res.status(201).json({ 
            message: "Kebutuhan berhasil ditambahkan", 
            data: result 
        });
        
    } catch (err) {
        console.error("❌ ERROR:", err.message);
        console.error("❌ Stack:", err.stack);
        
        // Handle specific database errors
        if (err.code === '23503') {
            return res.status(400).json({ 
                error: "Bidang ID tidak valid" 
            });
        }
        
        if (err.code === '23505') {
            return res.status(400).json({ 
                error: "Data sudah ada (duplicate)" 
            });
        }
        
        res.status(500).json({ 
            error: err.message || "Terjadi kesalahan server" 
        });
    }
};

export const fetchKebutuhan = async (req, res) => {
    try {
        const list = await getAllKebutuhan();
        res.json(list);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const fetchKebutuhanById = async (req, res) => {
    try {
        const kebutuhan = await getKebutuhanById(req.params.id);
        res.json(kebutuhan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const editKebutuhan = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                error: "ID kebutuhan tidak valid"
            });
        }

        const data = req.body;

        if (req.file) {
            data.dokumen = req.file.filename;
        }

        const result = await updateKebutuhan(id, data);

        if (!result) {
            return res.status(404).json({ error: "Data tidak ditemukan" });
        }

        res.json({ message: "Update sukses", data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


export const removeKebutuhan = async (req, res) => {
    try {
        const result = await deleteKebutuhan(req.params.id);
        res.json({ message: "Berhasil dihapus", data: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const searchKebutuhan = async (req, res) => {
    try {
        const keyword = req.query.keyword;

        if (!keyword) {
            return res.status(400).json({
                success: false,
                message: "Keyword wajib diisi"
            });
        }

        const data = await searchKebutuhanModel(keyword);

        return res.json({
            success: true,
            message: "Pencarian berhasil",
            total: data.length,
            data
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server",
            error: error.message
        });
    }
};


export const fetchPenyediaByKebutuhan = async (req, res) => {
  try {
    const kebutuhanId = req.params.id;
    const data = await getPenyediaByKebutuhan(kebutuhanId);
    return res.json({
      success: true,
      total: data.length,
      data
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

