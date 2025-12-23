"use client";

import { useEffect, useState } from "react";
import SidebarAdmin from "@/components/ui/sidebar_admin";

export default function UsulanKebutuhanAdmin() {
  const [usulanData, setUsulanData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [selectedUsulan, setSelectedUsulan] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // ===============================
  // FETCH DATA RIWAYAT USULAN
  // ===============================
  useEffect(() => {
    const fetchUsulan = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/admin/riwayat-usulan",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const json = await res.json();
        setUsulanData(json.data || []);
      } catch (error) {
        console.error("Gagal mengambil data usulan:", error);
      }
    };

    fetchUsulan();
  }, []);

  // ===============================
  // FILTER DATA
  // ===============================
  const filteredUsulan = usulanData.filter((u) => {
    const matchesSearch =
      u.judul_usulan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.nama_pengguna.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesStatus = true;

    if (filterStatus === "menunggu") {
      matchesStatus = !u.penyedia_dikerjakan || u.penyedia_dikerjakan === "-";
    }

    if (filterStatus === "dikerjakan") {
      matchesStatus = u.penyedia_dikerjakan && u.penyedia_dikerjakan !== "-";
    }

    return matchesSearch && matchesStatus;
  });

  // ===============================
  // STATISTIK
  // ===============================
  const stats = {
    semua: usulanData.length,
    menunggu: usulanData.filter(
      (u) => !u.penyedia_dikerjakan || u.penyedia_dikerjakan === "-"
    ).length,
    dikerjakan: usulanData.filter(
      (u) => u.penyedia_dikerjakan && u.penyedia_dikerjakan !== "-"
    ).length,
  };

  // ===============================
  // STATUS UI
  // ===============================
  const statusLabel = (u) =>
    u.penyedia_dikerjakan && u.penyedia_dikerjakan !== "-"
      ? "DIKERJAKAN"
      : "MENUNGGU";

  const statusColor = (u) =>
    u.penyedia_dikerjakan && u.penyedia_dikerjakan !== "-"
      ? "#34D399"
      : "#F6C343";

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SidebarAdmin />

      <div style={{ flex: 1, padding: "32px" }}>
        <h1 style={{ fontSize: 28, fontWeight: "bold", color: "#1F4E73" }}>
          Riwayat Usulan Kebutuhan
        </h1>
        <p style={{ color: "#64748B", marginBottom: 24 }}>
          Monitoring seluruh usulan kebutuhan inovasi
        </p>

        {/* ================= STATISTIK ================= */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {Object.entries(stats).map(([key, value]) => (
            <div
              key={key}
              onClick={() => setFilterStatus(key)}
              style={{
                backgroundColor: "#1F4E73",
                color: "white",
                padding: 20,
                borderRadius: 12,
                textAlign: "center",
                cursor: "pointer",
                opacity: filterStatus === key ? 1 : 0.7,
              }}
            >
              <div style={{ fontSize: 13, textTransform: "uppercase" }}>
                {key}
              </div>
              <div style={{ fontSize: 28, fontWeight: "bold" }}>{value}</div>
            </div>
          ))}
        </div>

        {/* ================= SEARCH ================= */}
        <input
          type="text"
          placeholder="Cari judul usulan atau nama pengusul..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 8,
            border: "2px solid #E2E8F0",
            marginBottom: 20,
          }}
        />

        {/* ================= TABEL ================= */}
        <div
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#1F4E73", color: "white" }}>
              <tr>
                <th style={{ padding: 12 }}>No</th>
                <th style={{ padding: 12 }}>Tanggal</th>
                <th style={{ padding: 12 }}>Pengusul</th>
                <th style={{ padding: 12 }}>Judul Usulan</th>
                <th style={{ padding: 12 }}>Status</th>
                <th style={{ padding: 12 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsulan.map((u, i) => (
                <tr key={u.kebutuhan_id} style={{ borderBottom: "1px solid #E2E8F0" }}>
                  <td style={{ padding: 12 }}>{i + 1}</td>
                  <td style={{ padding: 12 }}>
                    {new Date(u.tanggal_kebutuhan).toLocaleDateString("id-ID")}
                  </td>
                  <td style={{ padding: 12 }}>{u.nama_pengguna}</td>
                  <td style={{ padding: 12 }}>{u.judul_usulan}</td>
                  <td style={{ padding: 12 }}>
                    <span
                      style={{
                        backgroundColor: statusColor(u),
                        color: "white",
                        padding: "6px 14px",
                        borderRadius: 6,
                        fontSize: 11,
                      }}
                    >
                      {statusLabel(u)}
                    </span>
                  </td>
                  <td style={{ padding: 12 }}>
                    <button
                      onClick={() => {
                        setSelectedUsulan(u);
                        setShowDetailModal(true);
                      }}
                      style={{
                        backgroundColor: "#1F4E73",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        padding: "8px 16px",
                        cursor: "pointer",
                      }}
                    >
                      Lihat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsulan.length === 0 && (
            <div style={{ textAlign: "center", padding: 40, color: "#94A3B8" }}>
              Tidak ada data
            </div>
          )}
        </div>
      </div>

      {/* ================= MODAL DETAIL ================= */}
      {showDetailModal && selectedUsulan && (
        <div
          onClick={() => setShowDetailModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              padding: 24,
              borderRadius: 12,
              maxWidth: 600,
              width: "100%",
            }}
          >
            <h2 style={{ color: "#1F4E73", marginBottom: 16 }}>
              Detail Usulan
            </h2>
            <p><b>Pengusul:</b> {selectedUsulan.nama_pengguna}</p>
            <p><b>Judul:</b> {selectedUsulan.judul_usulan}</p>
            <p><b>Status:</b> {statusLabel(selectedUsulan)}</p>
            <p><b>Penyedia:</b> {selectedUsulan.penyedia_dikerjakan}</p>

            <div style={{ textAlign: "right", marginTop: 20 }}>
              <button
                onClick={() => setShowDetailModal(false)}
                style={{
                  border: "2px solid #1F4E73",
                  background: "white",
                  color: "#1F4E73",
                  padding: "8px 20px",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
