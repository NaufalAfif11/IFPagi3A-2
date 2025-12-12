"use client";

import { useEffect, useState, useCallback } from "react";
import SidebarPengguna from "@/components/ui/sidebar_pengguna";
import UsulanCard from "@/components/ui/usulan/UsulanCard";
import FilterUsulan from "@/components/ui/usulan/FilterUsulan";
import PeminatModal from "@/components/ui/usulan/PeminatModal";
import DetailUsulanModal from "@/components/ui/usulan/DetailUsulanModal";
import EditUsulanModal from "@/components/ui/usulan/EditUsulanModal";
import type { Usulan, Penyedia } from "@/types/usulan";

export default function RiwayatUsulanPage() {
  const [usulan, setUsulan] = useState<Usulan[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("semua");
  const [selectedUsulan, setSelectedUsulan] = useState<Usulan | null>(null);
  const [selectedRawUsulan, setSelectedRawUsulan] = useState<Usulan | null>(null);
  const [editData, setEditData] = useState<Usulan | null>(null);
  const [showDetailUsulanModal, setShowDetailUsulanModal] = useState(false);
  const [showPeminatModal, setShowPeminatModal] = useState(false);
  const [penyediaList, setPenyediaList] = useState<Penyedia[]>([]);
  const [search, setSearch] = useState("");

  const BASE_URL = "http://localhost:5000";

  // ============================================
  // FETCH USULAN (Ditaruh di luar useEffect!)
  // ============================================
  const fetchUsulan = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${BASE_URL}/api/kebutuhan`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log("📥 DATA USULAN:", data);
      setUsulan(data);
    } catch (err) {
      console.error("Gagal memuat usulan:", err);
    }
  }, []);

  // Load pertama
  useEffect(() => {
    fetchUsulan();
  }, [fetchUsulan]);

  // ============================================
  // Normalisasi data
  // ============================================
  const normalizedUsulan = usulan.map((u) => ({
    id: u.id,
    nama: u.nama,
    alamat: u.alamat,
    email: u.email,
    noTelp: u.telp,
    jabatan: u.jabatan,
    namaPerusahaan: u.nama_perusahaan,
    emailPerusahaan: u.email_perusahaan,
    alamatPerusahaan: u.alamat_perusahaan,
    noTelpPerusahaan: u.telp_perusahaan,
    jenisProdukanDiusulkan: u.jenis_produk || "",
    deskripsiKebutuhan: u.deskripsi || "",
    kapanDigunakan: u.tanggal_kebutuhan,
    estimasiBudget: u.estimasi_budget,
    dokumen: u.dokumen,
    tanggal: u.created_at,
    status: u.status || "Menunggu",
    statusDetail: u.status_detail || "Menunggu Persetujuan",
    kategori_id: u.kategori_id,
    nama_kategori: u.nama_kategori ?? "Tidak ada kategori",
    peminat: u.peminat || 0,
  }));

  const counts = {
    total: normalizedUsulan.length,
    menunggu: normalizedUsulan.filter((u) => u.status === "Menunggu").length,
    dikerjakan: normalizedUsulan.filter((u) => u.status === "Sedang Dikerjakan").length,
  };

  const filteredUsulan = normalizedUsulan.filter((u) => {
    const s = search.toLowerCase();
    return (
      (u.nama?.toLowerCase().includes(s) ||
        u.jenisProdukanDiusulkan?.toLowerCase().includes(s) ||
        u.deskripsiKebutuhan?.toLowerCase().includes(s)) &&
      (selectedFilter === "semua" ? true : u.status === selectedFilter)
    );
  });

  // ============================================
  // ACTION HANDLERS
  // ============================================
  const handleDeleteUsulan = async (id: number) => {
    if (!confirm("Hapus usulan ini?")) return;

    try {
      const token = localStorage.getItem("token");
      await fetch(`${BASE_URL}/api/kebutuhan/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchUsulan();
      setShowDetailUsulanModal(false);
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus");
    }
  };

  const handleEditUsulan = (u: Usulan) => {
    setEditData(u);
    setShowDetailUsulanModal(false);
  };

  const handleOpenPeminat = async (id: number) => {
    try {
      const res = await fetch(`${BASE_URL}/api/kebutuhan/${id}/penyedia`);
      const result = await res.json();
      setPenyediaList(result.data ?? []);
    } catch {
      setPenyediaList([]);
    }
    setShowPeminatModal(true);
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarPengguna />

      <div className="flex-1 p-6">
        <FilterUsulan
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          search={search}
          setSearch={setSearch}
          counts={counts}
        />

        {/* LIST USULAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsulan.map((u) => (
            <UsulanCard
              key={u.id}
              usulan={u}
              kategoriName={u.nama_kategori}
              onClick={() => {
                const raw = usulan.find((x) => x.id === u.id);
                setSelectedRawUsulan(raw!);
                setSelectedUsulan(u);
                setShowDetailUsulanModal(true);
              }}
            />
          ))}
        </div>

        {/* MODAL DETAIL */}
        {showDetailUsulanModal && selectedUsulan && (
          <DetailUsulanModal
            usulan={selectedUsulan}
            onClose={() => setShowDetailUsulanModal(false)}
            onEdit={() => handleEditUsulan(selectedRawUsulan!)}
            onDelete={handleDeleteUsulan}
            onOpenPeminat={() => handleOpenPeminat(selectedUsulan.id)}
          />
        )}

        {/* MODAL EDIT */}
        {editData && (
          <EditUsulanModal
            usulan={editData}
            onClose={() => setEditData(null)}
            onSuccess={() => {
              fetchUsulan();
              setEditData(null);
            }}
          />
        )}

        {/* MODAL PEMINAT */}
        {showPeminatModal && (
          <PeminatModal
            usulan={selectedUsulan}
            penyedia={penyediaList}
            onClose={() => setShowPeminatModal(false)}
            onApprove={(p) => alert(`Menyetujui ${p.nama_penyedia}`)}
          />
        )}
      </div>
    </div>
  );
}
