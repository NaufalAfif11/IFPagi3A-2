import { createMinatPenyedia, getMinatByKebutuhan, approveMinat } from "../models/minatPenyediaModel.js";

export const ajukanProposal = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const kebutuhan_id = req.body?.kebutuhan_id;
    const deskripsi = req.body?.deskripsi;

    if (!kebutuhan_id || !deskripsi || !req.file) {
      return res.status(400).json({
        message: "Data tidak lengkap",
      });
    }

    const data = {
      kebutuhan_id: Number(kebutuhan_id),
      user_id: req.user.id,
      deskripsi_proposal: deskripsi,
      file_proposal: req.file.filename,
    };

    const result = await createMinatPenyedia(data);

    res.status(201).json({
      success: true,
      message: "Proposal berhasil diajukan",
      data: result,
    });
  } catch (err) {
    console.error("AJUKAN PROPOSAL ERROR:", err);
    res.status(500).json({
      message: "Gagal mengajukan proposal",
    });
  }
};


export const getPeminatByKebutuhan = async (req, res) => {
  try {
    const { kebutuhanId } = req.params;

    const data = await getMinatByKebutuhan(kebutuhanId);

    res.json({
      message: "list peminat",
      data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const approvePenyedia = async (req, res) => {
  try {
    const { id } = req.params; // ini minat_id

    if (!id) {
      return res.status(400).json({ message: "ID minat tidak ada" });
    }

    await approveMinat(id);

    res.json({
      success: true,
      message: "Proposal berhasil disetujui",
    });
  } catch (err) {
    console.error("APPROVE ERROR:", err);
    res.status(500).json({ message: "Gagal menyetujui proposal" });
  }
};
