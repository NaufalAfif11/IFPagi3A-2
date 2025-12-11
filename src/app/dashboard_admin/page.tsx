"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SidebarAdmin from "@/components/ui/sidebar_admin";
import { Users, User, Inbox } from "lucide-react";


const COLORS = [
  "#3B82F6", // biru
  "#10B981", // hijau
  "#F59E0B", // kuning
  "#EF4444", // merah
  "#8B5CF6", // ungu
  "#14B8A6", // teal
  "#F43F5E", // pink
];

// ⭐ Tambahan ikon export
import {
  Download,
  FileText,
  FileSpreadsheet
} from "lucide-react";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";


const DashboardAdmin = () => {
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState("Dashboard");

  // ⭐ STATE MENU EXPORT
  const [showExportMenu, setShowExportMenu] = useState(false);

  // ⭐ FUNGSI EKSPOR (dummy)
  const handleExportPDF = () => {
    alert("Export PDF berhasil dijalankan!");
  };

  const handleExportExcel = () => {
    alert("Export Excel berhasil dijalankan!");
  };

  // CEK TOKEN
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    }

    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }, []);

  // DATA GRAPH
  const kategoriData = [
    { kategori: "Pendidikan", jumlah: 120 },
    { kategori: "Kesehatan", jumlah: 95 },
    { kategori: "Lingkungan", jumlah: 80 },
    { kategori: "Transportasi", jumlah: 60 },
    { kategori: "Pariwisata", jumlah: 150 },
    { kategori: "Perikanan", jumlah: 70 },
    { kategori: "Industri Kreatif", jumlah: 110 },
  ];

  const statistik = {
    totalPenyedia: 45,
    totalPengguna: 780,
    laporanMasuk: 32,
  };

  const dataPengajuan = [
    { bulan: "Jan", jumlah: 80 },
    { bulan: "Feb", jumlah: 65 },
    { bulan: "Mar", jumlah: 120 },
    { bulan: "Apr", jumlah: 95 },
    { bulan: "Mei", jumlah: 140 },
    { bulan: "Jun", jumlah: 110 },
  ];

  return (
    <div className="flex bg-gray-100 h-screen">
      <SidebarAdmin />

      <div className="flex-1 p-8 overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
            <p className="text-sm text-gray-500 mt-1">
              Selamat datang Admin — pantau data kategori & laporan.
            </p>
          </div>

          {/* ⭐ TOMBOL EXPORT LAPORAN */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 lg:px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <Download size={20} />
              <span className="hidden lg:inline font-semibold">Ekspor Laporan</span>
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-10">

                <button
                  onClick={handleExportPDF}
                  className="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center gap-3 transition-colors"
                >
                  <FileText className="text-red-600" size={20} />
                  <span className="font-medium text-gray-700">Ekspor ke PDF</span>
                </button>

                <button
                  onClick={handleExportExcel}
                  className="w-full px-4 py-3 text-left hover:bg-green-50 flex items-center gap-3 transition-colors border-t"
                >
                  <FileSpreadsheet className="text-green-600" size={20} />
                  <span className="font-medium text-gray-700">Ekspor ke Excel</span>
                </button>

              </div>
            )}
          </div>
        </div>

        {/* CARD STATISTIK */}
        {/* CARD STATISTIK */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

  <div className="cursor-pointer bg-[#1F4E73] text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
    <div className="flex items-center justify-between mb-6">
      <div className="bg-white/20 rounded-full p-6">
        <Users size={32} className="text-white" />
      </div>
      <p className="text-5xl font-bold">{statistik.totalPenyedia}</p>
    </div>
    <h3 className="text-xl font-bold mb-2">Total Penyedia</h3>
    <p className="text-sm text-white/90">Jumlah seluruh penyedia</p>
  </div>

  <div className="cursor-pointer bg-[#1F4E73] text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
    <div className="flex items-center justify-between mb-6">
      <div className="bg-white/20 rounded-full p-6">
        <User size={32} className="text-white" />
      </div>
      <p className="text-5xl font-bold">{statistik.totalPengguna}</p>
    </div>
    <h3 className="text-xl font-bold mb-2">Total Pengguna</h3>
    <p className="text-sm text-white/90">Jumlah seluruh pengguna</p>
  </div>

  <div className="cursor-pointer bg-[#1F4E73] text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
    <div className="flex items-center justify-between mb-6">
      <div className="bg-white/20 rounded-full p-6">
        <Inbox size={32} className="text-white" />
      </div>
      <p className="text-5xl font-bold">{statistik.laporanMasuk}</p>
    </div>
    <h3 className="text-xl font-bold mb-2">Total Produk</h3>
    <p className="text-sm text-white/90">Jumlah produk yang terverifikasi</p>
  </div>

</div>


        {/* BAR CHART */}
        {/* GRAFIK KATEGORI */}
<div className="bg-white p-6 rounded-2xl shadow-lg">
  <h2 className="text-xl font-bold text-gray-800 mb-4">
    Kategori Layanan Terpopuler
  </h2>

  <div className="w-full h-80">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={kategoriData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        
        <XAxis
          dataKey="kategori"
          tick={{ fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={100}
        />

        <YAxis />

        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        />

        <Bar dataKey="jumlah" radius={[8, 8, 0, 0]}>
          {kategoriData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>


        {/* LINE CHART */}
        <div className="bg-white p-6 rounded-xl shadow-lg mt-10">
          <h2 className="text-xl font-semibold mb-4">
            Grafik Pengajuan per Bulan
          </h2>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataPengajuan}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="jumlah" stroke="#2563EB" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
