"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SidebarAdmin from "@/components/ui/sidebar_admin";
import { Users, User, Inbox, Download, FileText, FileSpreadsheet, AlertCircle } from "lucide-react"; // Menambahkan AlertCircle

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


const COLORS = [
  "#3B82F6", // biru
  "#10B981", // hijau
  "#F59E0B", // kuning
  "#EF4444", // merah
  "#8B5CF6", // ungu
  "#14B8A6", // teal
  "#F43F5E", // pink
];

// DUMMY DATA LINE CHART (Pengganti dataPengajuan yang hilang)
const dataPengajuan = [
  { bulan: "Jan", jumlah: 15 },
  { bulan: "Feb", jumlah: 22 },
  { bulan: "Mar", jumlah: 18 },
  { bulan: "Apr", jumlah: 30 },
  { bulan: "Mei", jumlah: 45 },
  { bulan: "Jun", jumlah: 38 },
  { bulan: "Jul", jumlah: 55 },
  { bulan: "Agu", jumlah: 60 },
  { bulan: "Sep", jumlah: 48 },
  { bulan: "Okt", jumlah: 52 },
  { bulan: "Nov", jumlah: 65 },
  { bulan: "Des", jumlah: 70 },
];

const DashboardAdmin = () => {
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState("Dashboard");
  
  // ✅ PERBAIKAN: Menambahkan state loading dan error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ⭐ STATE MENU EXPORT
  const [showExportMenu, setShowExportMenu] = useState(false);

  // DUMMY DATA STATISTIK
  const statistik = {
    totalPenyedia: 45,
    totalPengguna: 780,
    laporanMasuk: 32, // Ini digunakan sebagai 'Total Produk' di Card
  };

  // DUMMY DATA BAR CHART
  const kategoriData = [
    { kategori: "Pendidikan", jumlah: 120 },
    { kategori: "Kesehatan", jumlah: 95 },
    { kategori: "Lingkungan", jumlah: 80 },
    { kategori: "Transportasi", jumlah: 60 },
    { kategori: "Pariwisata", jumlah: 150 },
    { kategori: "Perikanan", jumlah: 70 },
    { kategori: "Industri Kreatif", jumlah: 110 },
  ];


  // ✅ PERBAIKAN: Mendefinisikan fungsi fetchDashboardData (untuk keperluan retry)
  const fetchDashboardData = async () => {
    // Logika dummy untuk memuat data
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Di sini harusnya ada logic fetch data API
      // Jika berhasil:
      setLoading(false);
    } catch (err) {
      setError("Gagal memuat data dari API."); // Ganti dengan pesan error yang sesuai
      setLoading(false);
    }
  };


  // CEK TOKEN dan Panggil fetchDashboardData
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      setLoading(false); // Pastikan loading dimatikan jika redirect
    } else {
      // Panggil fetch data jika token ada
      fetchDashboardData();
    }

    // History state management untuk mencegah back button
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
    
  }, []);


  // ⭐ FUNGSI EKSPOR (dummy)
  const handleExportPDF = () => {
    alert("Export PDF berhasil dijalankan!");
    setShowExportMenu(false);
  };

  const handleExportExcel = () => {
    alert("Export Excel berhasil dijalankan!");
    setShowExportMenu(false);
  };


  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 font-medium text-lg">Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 max-w-md w-full">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" /> {/* Menggunakan AlertCircle dari lucide-react */}
            <h3 className="text-red-600 font-bold text-xl">Terjadi Kesalahan</h3>
          </div>
          <p className="text-red-700 mb-6">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 h-screen">

      <div className="flex-1 p-8 overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10"> {/* Menambahkan mb-10 */}
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
              <div 
                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-10"
                onMouseLeave={() => setShowExportMenu(false)} // Menutup saat mouse keluar (opsional)
              >

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"> {/* Menambahkan mb-10 */}

          <div className="cursor-pointer bg-[#1F4E73] text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-white/20 rounded-full p-6">
                <Users size={32} className="text-white" />
              </div>
              <p className="text-5xl font-bold">{statistik.totalPenyedia}</p>
            </div>
            <h3 className="text-xl font-bold mb-2">Total Penyedia</h3>
            <p className="text-sm text-white/90">Jumlah seluruh penyedia terdaftar</p>
          </div>

          <div className="cursor-pointer bg-[#1F4E73] text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-white/20 rounded-full p-6">
                <User size={32} className="text-white" />
              </div>
              <p className="text-5xl font-bold">{statistik.totalPengguna}</p>
            </div>
            <h3 className="text-xl font-bold mb-2">Total Pengguna</h3>
            <p className="text-sm text-white/90">Jumlah seluruh pengguna terdaftar</p>
          </div>

          <div className="cursor-pointer bg-[#1F4E73] text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-white/20 rounded-full p-6">
                <Inbox size={32} className="text-white" />
              </div>
              <p className="text-5xl font-bold">{statistik.laporanMasuk}</p>
            </div>
            <h3 className="text-xl font-bold mb-2">Laporan Masuk</h3> {/* Mengganti 'Total Produk' menjadi 'Laporan Masuk' agar sesuai ikon Inbox */}
            <p className="text-sm text-white/90">Jumlah laporan yang perlu ditinjau</p>
          </div>

        </div>


        {/* GRAFIK: BAR CHART & LINE CHART */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> {/* Menggunakan Grid Layout */}
          
          {/* BAR CHART - Kategori Layanan Terpopuler */}
          <div className="bg-white p-6 rounded-2xl shadow-lg h-96"> {/* Menetapkan tinggi agar proporsional */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Kategori Layanan Terpopuler
            </h2>

            <div className="w-full h-[calc(100%-48px)]"> {/* Mengatur tinggi relatif terhadap parent */}
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={kategoriData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  
                  <XAxis
                    dataKey="kategori"
                    tick={{ fontSize: 10, fill: '#4B5563' }}
                    angle={-40} // Mengurangi sudut agar lebih mudah dibaca
                    textAnchor="end"
                    height={70} // Mengurangi tinggi XAxis
                    interval={0}
                  />

                  <YAxis tick={{ fill: '#4B5563' }} />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      backgroundColor: '#fff',
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

          {/* LINE CHART - Grafik Pengajuan per Bulan */}
          <div className="bg-white p-6 rounded-xl shadow-lg h-96"> {/* Menetapkan tinggi yang sama */}
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Grafik Pengajuan per Bulan
            </h2>

            <div className="w-full h-[calc(100%-48px)]"> {/* Mengatur tinggi relatif terhadap parent */}
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataPengajuan}> {/* Menggunakan dataPengajuan yang sudah didefinisikan */}
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="bulan" tick={{ fill: '#4B5563' }} />
                  <YAxis tick={{ fill: '#4B5563' }} />
                  <Tooltip 
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      backgroundColor: '#fff',
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="jumlah" 
                    stroke="#1F4E73" // Menggunakan warna yang seragam dengan Card
                    strokeWidth={3} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;