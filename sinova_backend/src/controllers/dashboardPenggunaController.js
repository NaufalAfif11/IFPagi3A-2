import {
  getTotalUsulan,
  getUsulanBaru,
  getHistory,
  getStatusData,
  getDataBulan,
} from "../models/dashboardPenggunaModel.js";

export const getDashboardPengguna = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const penggunaId = req.user.id;

    const totalUsulan = await getTotalUsulan(penggunaId);
    const usulanBaru = await getUsulanBaru(penggunaId);
    const history = await getHistory(penggunaId);
    const statusData = await getStatusData(penggunaId);
    const dataBulan = await getDataBulan(penggunaId);

    res.json({
      statistik: {
        totalUsulan,
        usulanBaru,
        history,
      },
      statusData,
      dataBulan,
    });
  } catch (err) {
    console.error("DASHBOARD PENGGUNA ERROR:", err.message);
    res.status(500).json({
      message: "Gagal ambil dashboard pengguna",
      error: err.message,
    });
  }
};
