"use client";

import { useEffect, useState, useCallback } from "react";
import SidebarPengguna from "@/components/ui/sidebar_pengguna";
import UsulanCard from "@/components/ui/usulan/UsulanCard";
import FilterUsulan from "@/components/ui/usulan/FilterUsulan";
import DetailUsulanModal from "@/components/ui/usulan/DetailUsulanModal";
import MinatPenyediaModal from "@/components/ui/usulan/MinatPenyediaModal";
// import PeminatModal from "@/components/ui/usulan/PeminatModal";
import type { Usulan } from "@/types/usulan";

export default function UsulanPenyediaPage() {
  const [usulan, setUsulan] = useState<Usulan[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("semua");
  const [selectedUsulan, setSelectedUsulan] = useState<Usulan | null>(null);
  const [selectedRawUsulan, setSelectedRawUsulan] = useState<Usulan | null>(null);
  const [showDetailUsulanModal, setShowDetailUsulanModal] = useState(false);
  const [showMinatPenyediaModal, setShowMinatPenyediaModal] = useState(false);
  // const [showPeminatModal, setShowPeminatModal] = useState(false);
  // const [penyediaList, setPenyediaList] = useState<Penyedia[]>([]);
  const [search, setSearch] = useState("");

  const BASE_URL = "http://localhost:5000";

  // ============================================
  // FETCH USULAN
  // ============================================
  const fetchUsulan = useCallback(async () => {
    try {

      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${BASE_URL}/api/kebutuhan/penyedia`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      const list = Array.isArray(result) ? result : result.data;
      setUsulan(list ?? []);
      
    } catch (err) {
      console.error("Gagal memuat usulan:", err);
    }
  }, []);

  useEffect(() => {
    fetchUsulan();
  }, [fetchUsulan]);

  // ============================================
  // Normalisasi data - GUNAKAN usulan yang sudah dijamin array
  // ============================================
  const normalizedUsulan = Array.isArray(usulan)
  ? usulan.map((u) => ({
    id: u.id,
    nama: u.nama || "",
    alamat: u.alamat || "",
    email: u.email || "",
    noTelp: u.telp || "",
    jabatan: u.jabatan || "",
    namaPerusahaan: u.nama_perusahaan || "",
    emailPerusahaan: u.email_perusahaan || "",
    alamatPerusahaan: u.alamat_perusahaan || "",
    noTelpPerusahaan: u.telp_perusahaan || "",
    jenisProdukanDiusulkan: u.jenis_produk || "",
    deskripsiKebutuhan: u.deskripsi || "",
    kapanDigunakan: u.tanggal_kebutuhan || "",
    estimasiBudget: u.estimasi_budget || 0,
    dokumen: u.dokumen || "",
    tanggal: u.created_at || "",
    status: u.status || "Tersedia",
    statusDetail: u.status_detail || "Tersedia",
    kategori_id: u.kategori_id || null,
    nama_kategori: u.nama_kategori || "Tidak ada kategori",
    peminat: u.peminat || 0,
    penyediaDikerjakan: u.penyedia_dikerjakan ? {
      id: u.penyedia_dikerjakan.id,
      nama: u.penyedia_dikerjakan.nama,
      tanggalAmbil: u.penyedia_dikerjakan.tanggal_ambil,
      estimasiSelesai: u.penyedia_dikerjakan.estimasi_selesai,
    } : null,
  }))
  : [];

  const counts = {
    total: normalizedUsulan.length,
    tersedia: normalizedUsulan.filter((u) => u.status === "Tersedia").length,
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

  // const handleOpenPeminat = async (id: number) => {
  //   try {
  //     const res = await fetch(`${BASE_URL}/api/kebutuhan/${id}/penyedia`);
  //     const result = await res.json();
  //     setPenyediaList(result.data ?? []);
  //   } catch {
  //     setPenyediaList([]);
  //   }
  //   setShowPeminatModal(true);
  // };

 const handleOpenAjukanProposal = () => {
    setShowDetailUsulanModal(false); // optional
    setShowMinatPenyediaModal(true);
  };



  // ============================================
  // RENDER
  // ============================================
  return (
    <div className='flex min-h-screen'>
      <SidebarPenyedia activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-gradient-to-r from-[#3e81aa] to-[#1F4E73] text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Riwayat Usulan Kebutuhan</h1>
              <p className="text-blue-100 text-sm">Selamat datang pengguna! Lihat Usulanmu</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input 
                type="text"
                placeholder="Cari usulan..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFilter('semua')}
                className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  selectedFilter === 'semua' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Semua ({usulanList.length})
              </button>
              <button
                onClick={() => setSelectedFilter('Tersedia')}
                className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  selectedFilter === 'Tersedia' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tersedia ({tersedia})
              </button>
              <button
                onClick={() => setSelectedFilter('Sedang Dikerjakan')}
                className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  selectedFilter === 'Sedang Dikerjakan' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Dikerjakan ({sedangDikerjakan})
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 pt-6 space-y-6">
        <FilterUsulan
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          search={search}
          setSearch={setSearch}
          counts={counts}
        />
        </div>

        {/* LIST USULAN */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
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
            onAjukanProposal={handleOpenAjukanProposal}
            showAjukanProposal={true}
          />
        )}

        {/* MODAL ajukan proposal*/}
        <MinatPenyediaModal
          show={showMinatPenyediaModal}
          selectedUsulan={selectedUsulan}
          onClose={() => setShowMinatPenyediaModal(false)}
          onSuccess={() => {
            fetchUsulan();
          }}
        />;

        {/* MODAL PEMINAT
        {showPeminatModal && (
          <PeminatModal
            usulan={selectedUsulan}
            penyedia={penyediaList}
            onClose={() => setShowPeminatModal(false)}
            onApprove={(p) => alert(`Menyetujui ${p.nama}`)}
          />
        )}  */}
      </div>
    </div>
  );
}