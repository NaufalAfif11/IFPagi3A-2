import RisetModel from "../models/RisetModel.js";

class RisetController {
  /* ========= PUBLIC ========= */
  static async getPublic(req, res) {
    try {
      const { 
        page = 1, 
        limit = 10,
        judul = '',
        namaPeriset = '',
        kategori = ''
      } = req.query;

      const result = await RisetModel.getPublic({
        page: Number(page),
        limit: Number(limit),
        judul,
        namaPeriset,
        kategori
      });

      res.json({ success: true, ...result });
    } catch (err) {
      console.error("Error getPublic:", err);
      res.status(500).json({ 
        success: false, 
        message: "Gagal mengambil riset publik" 
      });
    }
  }

  static async getById(req, res) {
    try {
      const data = await RisetModel.getById(req.params.id);
      if (!data) {
        return res.status(404).json({ 
          success: false, 
          message: "Riset tidak ditemukan" 
        });
      }
      res.json({ success: true, data });
    } catch (err) {
      console.error("Error getById:", err);
      res.status(500).json({ success: false });
    }
  }

  /* ========= DASHBOARD ========= */
  static async getMyRiset(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await RisetModel.getByUser(req.user.id, {
        page: Number(page),
        limit: Number(limit),
      });
      res.json({ success: true, ...result });
    } catch (err) {
      console.error("Error getMyRiset:", err);
      res.status(500).json({ success: false });
    }
  }

  static async create(req, res) {
    try {
      const { judul, namaPeriset, kategoriId, dokumenUrl } = req.body;
      
      if (!judul || !namaPeriset || !kategoriId || !dokumenUrl) {
        return res.status(400).json({ 
          success: false, 
          message: "Semua field wajib diisi" 
        });
      }

      const data = await RisetModel.create({
        judul,
        namaPeriset,
        kategoriId,
        dokumenUrl,
        userId: req.user.id,
      });

      res.status(201).json({ success: true, data });
    } catch (err) {
      console.error("Error create:", err);
      res.status(500).json({ 
        success: false, 
        message: "Gagal membuat riset" 
      });
    }
  }

  static async update(req, res) {
    try {
      const { judul, namaPeriset, kategoriId, dokumenUrl } = req.body;
      
      const updated = await RisetModel.update(
        req.params.id,
        req.user.id,
        { judul, namaPeriset, kategoriId, dokumenUrl }
      );

      if (!updated) {
        return res.status(403).json({ 
          success: false, 
          message: "Bukan milik Anda atau riset tidak ditemukan" 
        });
      }

      res.json({ success: true, data: updated });
    } catch (err) {
      console.error("Error update:", err);
      res.status(500).json({ 
        success: false, 
        message: "Gagal update riset" 
      });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await RisetModel.delete(req.params.id, req.user.id);
      
      if (!deleted) {
        return res.status(403).json({ 
          success: false, 
          message: "Bukan milik Anda atau riset tidak ditemukan" 
        });
      }

      res.json({ success: true, message: "Riset berhasil dihapus" });
    } catch (err) {
      console.error("Error delete:", err);
      res.status(500).json({ 
        success: false, 
        message: "Gagal menghapus riset" 
      });
    }
  }
}

export default RisetController;