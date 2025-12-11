"use client";

import { useEffect, useState } from "react";
import SidebarPengguna from "@/components/ui/sidebar_pengguna";
import UsulanCard from "@/components/ui/usulan/UsulanCard";
import FilterUsulan from "@/components/ui/usulan/FilterUsulan";
import PeminatModal from "@/components/ui/usulan/PeminatModal";
import DetailUsulanModal from "@/components/ui/usulan/DetailUsulanModal";
import EditUsulanModal from "@/components/ui/usulan/EditUsulanModal";
import type { Usulan, Penyedia } from "@/types/usulan";
import { getUsulan, getPenyediaByUsulan } from "@/lib/api/usulan";

export default function RiwayatUsulanPage() {
  const [activeMenu, setActiveMenu] = useState("Riwayat Usulan");
  const [usulan, setUsulan] = useState<Usulan[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("semua");
  const [selectedUsulan, setSelectedUsulan] = useState<Usulan | null>(null);
  const [showDetailUsulanModal, setShowDetailUsulanModal] = useState(false);
  const [editData, setEditData] = useState<Usulan | null>(null);
  const [selectedRawUsulan, setSelectedRawUsulan] = useState<Usulan | null>(null);
  const [showPeminatModal, setShowPeminatModal] = useState(false);
  const [penyediaList, setPenyediaList] = useState<Penyedia[]>([]);
  const [search, setSearch] = useState("");
 
  useEffect(() => {
    fetchUsulan();
  }, []);

  const fetchUsulan = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/kebutuhan");
        const data = await res.json();
        setUsulan(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

  const handleEditUsulan = (usulan: Usulan) => {
    setEditData(usulan);
    setShowDetailUsulanModal(false);
  }

  const handleDeleteUsulan = async (id: number) => {
    const yakin = confirm("apakah anda yakin ingin menghapus usulan ini?");

    if (!yakin) return;

    try {
      await fetch(`http://localhost:5000/api/kebutuhan/${id}`, {
        method: "DELETE",
      });

      setUsulan(prev => prev.filter(u => u.id !== id));
      setShowDetailUsulanModal(false);
    } catch (err) {
      console.error(err);
      alert("gagal menghapus usulan");
    }
  };



  const handleOpenPeminat = async (kebutuhanId: string) => {
  try {
    const penyedia = await getPenyediaByUsulan(parseInt(kebutuhanId));

    setPenyediaList(penyedia);
    setShowPeminatModal(true);
  } catch (err) {
    console.error("Gagal ambil peminat:", err);
    setPenyediaList([]);
    setShowPeminatModal(true); // tetep buka → tapi kosong
  }
};


  // normalisasi status DB → status UI
  const normalizedUsulan = usulan.map((u: Usulan) => ({
    id: u.id,
    nama: u.nama,
    alamat: u.alamat,
    email: u.email,
    noTelp: u.telp,
    jabatan: u.jabatan,

    // --- perusahaan ---
    namaPerusahaan: u.nama_perusahaan,
    emailPerusahaan: u.email_perusahaan,
    noTelpPerusahaan: u.telp_perusahaan,
    alamatPerusahaan: u.alamat_perusahaan,

    // --- kebutuhan / produk ---
    jenisProdukanDiusulkan: u.jenis_produk,
    deskripsiKebutuhan: u.deskripsi,
    kapanDigunakan: u.tanggal_kebutuhan,        // dipakai di card (Timeline)
    estimasiBudget: u.estimasi_budget,

    dokumen: u.dokumen,

    // --- tanggal ---
    tanggal: u.created_at,                      // card butuh "Diposting: ..."

    // --- status ---
    status: u.status === "Menunggu" ? "Menunggu Persetujuan" : u.status,
    statusDetail: u.status_detail,

    // --- bidang & peminat ---
    bidang_id: u.bidang_id ?? "Tidak ada bidang",
    nama_bidang: u.nama_bidang ?? "Tidak ada bidang",
    peminat: u.peminat,

    // --- belum ada penyedia (backend belum kasi) ---
    penyediaDikerjakan: null,
  }));

  // hitung jumlah per status
  const counts = {
    total: normalizedUsulan.length,
    menunggu: normalizedUsulan.filter(u => u.status === "Menunggu Persetujuan").length,
    dikerjakan: normalizedUsulan.filter(u => u.status === "Sedang Dikerjakan").length
  };

  const filteredUsulan = normalizedUsulan.filter((u) => {
    const matchSearch =
      u.nama.toLowerCase().includes(search.toLowerCase()) ||
      u.jenisProdukanDiusulkan.toLowerCase().includes(search.toLowerCase()) ||
      u.deskripsiKebutuhan.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      selectedFilter === "semua" ? true : u.status === selectedFilter;

    return matchStatus && matchSearch;
  });



  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarPengguna activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 p-6">
        <FilterUsulan
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          search={search}
          setSearch={setSearch}
          counts={{
            total: normalizedUsulan.length,
            menunggu: normalizedUsulan.filter((u) => u.status === "Menunggu Persetujuan").length,
            dikerjakan: normalizedUsulan.filter((u) => u.status === "Sedang Dikerjakan").length,
          }}/>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsulan.map((u) => (
           <UsulanCard
              key={u.id}
              usulan={u}
              bidangName={u.nama_bidang}
              onClick={() => {
                const raw = usulan.find(x => x.id === u.id);
                setSelectedRawUsulan(raw!);
                setSelectedUsulan(u);
                setShowDetailUsulanModal(true);
              }}/>
          ))}
        </div>

        
        {showDetailUsulanModal && selectedUsulan && (
          <DetailUsulanModal
            usulan={selectedUsulan}
            onClose={() => setShowDetailUsulanModal(false)}
            onEdit={() => handleEditUsulan(selectedRawUsulan!)}
            onDelete={handleDeleteUsulan}
            onOpenPeminat={handleOpenPeminat}
          />
        )}

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

        {showPeminatModal && (
          <PeminatModal
            usulan={selectedUsulan}
            penyedia={penyediaList}
            onClose={() => setShowPeminatModal(false)}
            onApprove={(p) => alert(`Menyetujui ${p.nama}`)}
          />
        )}
      </div>
    </div>
  );
}
