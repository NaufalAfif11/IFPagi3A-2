"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Diambil dari versi yang masuk
import SidebarPenyedia from "@/components/ui/sidebar_penyedia"; // Diambil dari versi yang masuk

import { List, CheckCircle, Clock, AlertCircle, PlusCircle } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// URL Backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// HARDCODED: ID Penyedia (nanti bisa dari session/auth)
const PENYEDIA_ID = 1;

interface Statistik {
  totalProduk: number;
  diverifikasi: number;
  menunggu: number;
  ditolak: number;
}

interface ProdukBulanan {
  bulan: string;
  jumlah: number;
}

interface StatusData {
  name: string;
  value: number;
}

interface Produk {
  id: number;
  nama: string;
  kategori: string;
  status: string;
  tanggal: string;
}

interface Aktivitas {
  id: number;
  aksi: string;
  waktu: string;
  type: string;
}

const DashboardPenyedia = () => { // Menggunakan nama komponen yang konsisten
  // State untuk navigasi (diambil dari versi yang masuk)
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const router = useRouter();

  // State untuk data dari API (diambil dari HEAD)
  const [statistik, setStatistik] = useState<Statistik>({
    totalProduk: 0,
    diverifikasi: 0,
    menunggu: 0,
    ditolak: 0,
  });
  const [dataProduk, setDataProduk] = useState<ProdukBulanan[]>([]);
  const [dataStatus, setDataStatus] = useState<StatusData[]>([]);
  const [produkTerbaru, setProdukTerbaru] = useState<Produk[]>([]);
  const [aktivitas, setAktivitas] = useState<Aktivitas[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔒 CEK LOGIN — jika tidak login, lempar ke halaman beranda (diambil dari versi yang masuk)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      router.replace("/");
    }
    // Hapus fetchDashboardData() dari sini, pindahkan ke useEffect di bawah
  }, [router]); 

  const COLORS = ["#22C55E", "#FACC15", "#EF4444"]; // Hijau, Kuning, Merah (Diverifikasi, Menunggu, Ditolak)

  // Fetch semua data dashboard
  useEffect(() => {
    // Pastikan ini hanya dijalankan jika user sudah login, atau handle loading/error di dalamnya
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      fetchDashboardData();
    } else {
      setLoading(false); // Matikan loading jika tidak ada login (meskipun router.replace akan berjalan)
    }
    
  }, []); // Dependency kosong agar hanya dijalankan sekali setelah mounting

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch statistik
      const statsResponse = await fetch(`${API_BASE_URL}/api/penyedia/statistics/${PENYEDIA_ID}`);
      if (!statsResponse.ok) throw new Error('Gagal memuat statistik');
      const statsData = await statsResponse.json();
      setStatistik(statsData);

      // Fetch produk bulanan
      const produkBulananResponse = await fetch(`${API_BASE_URL}/api/penyedia/produk-bulanan/${PENYEDIA_ID}?tahun=2024`);
      if (!produkBulananResponse.ok) throw new Error('Gagal memuat data produk bulanan');
      const produkBulananData = await produkBulananResponse.json();
      setDataProduk(produkBulananData);

      // Fetch status produk (DITAMBAH TRANSFORMASI DATA)
      const statusResponse = await fetch(`${API_BASE_URL}/api/penyedia/status-produk/${PENYEDIA_ID}`);
      if (!statusResponse.ok) throw new Error('Gagal memuat data status');
      
      const statusDataRaw = await statusResponse.json();
      
      // Transformasi data: Mengubah objek statistik menjadi array yang dibutuhkan PieChart
      const transformedStatusData: StatusData[] = [
        { name: "Diverifikasi", value: statusDataRaw.diverifikasi || 0 },
        { name: "Menunggu", value: statusDataRaw.menunggu || 0 },
        { name: "Ditolak", value: statusDataRaw.ditolak || 0 },
      ].filter(item => item.value > 0); 
      
      setDataStatus(transformedStatusData);
      // AKHIR TRANSFORMASI DATA

      // Fetch produk terbaru
      const produkResponse = await fetch(`${API_BASE_URL}/api/penyedia/produk-terbaru/${PENYEDIA_ID}?limit=3`);
      if (!produkResponse.ok) throw new Error('Gagal memuat produk terbaru');
      const produkData = await produkResponse.json();
      setProdukTerbaru(produkData);

      // Fetch aktivitas
      const aktivitasResponse = await fetch(`${API_BASE_URL}/api/penyedia/aktivitas/${PENYEDIA_ID}?limit=5`);
      if (!aktivitasResponse.ok) throw new Error('Gagal memuat aktivitas');
      const aktivitasData = await aktivitasResponse.json();
      setAktivitas(aktivitasData);

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Loading state (diposisikan sebelum return utama)
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#2D6A9E] mx-auto"></div>
          <p className="text-gray-600 mt-4 font-medium text-lg">Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 max-w-md w-full">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
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
    // Menggunakan div utama dari versi yang masuk (dengan Sidebar)
    <div className="flex h-screen bg-gray-50"> 
      
      <div className="flex-1 overflow-y-auto"> {/* Konten utama dashboard */}
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">Dashboard Penyedia</h1>
              <p className="text-sm text-gray-500 mt-1">Selamat datang kembali, Ir. Budi Santoso</p>
            </div>
            <button 
              onClick={fetchDashboardData}
              className="px-4 py-2 bg-[#2D6A9E] text-white rounded-lg hover:bg-[#245782] transition-colors flex items-center gap-2 font-medium shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>

          {/* STATISTIK */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Total Produk */}
            <div className="bg-gradient-to-br from-[#2D6A9E] to-[#245782] text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all">
              <div className="flex justify-between items-center mb-6">
                <div className="bg-white/20 p-6 rounded-full backdrop-blur-sm">
                  <List size={32} className="text-white" />
                </div>
                <p className="text-5xl font-bold">{statistik.totalProduk}</p>
              </div>
              <h3 className="text-xl font-bold">Total Produk</h3>
              <p className="text-white/90 text-sm mt-1">Total inovasi yang Anda buat</p>
            </div>

            {/* Diverifikasi */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all">
              <div className="flex justify-between items-center mb-6">
                <div className="bg-white/20 p-6 rounded-full backdrop-blur-sm">
                  <CheckCircle size={32} className="text-white" />
                </div>
                <p className="text-5xl font-bold">{statistik.diverifikasi}</p>
              </div>
              <h3 className="text-xl font-bold">Diverifikasi</h3>
              <p className="text-white/90 text-sm mt-1">Produk yang sudah valid</p>
            </div>

            {/* Menunggu */}
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all">
              <div className="flex justify-between items-center mb-6">
                <div className="bg-white/20 p-6 rounded-full backdrop-blur-sm">
                  <Clock size={32} className="text-white" />
                  </div>
                <p className="text-5xl font-bold">{statistik.menunggu}</p>
              </div>
              <h3 className="text-xl font-bold">Menunggu Verifikasi</h3>
              <p className="text-white/90 text-sm mt-1">Sedang diperiksa oleh admin</p>
            </div>
          </div>

          {/* GRAFIK */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Jumlah Produk per Bulan</h3>
              {dataProduk.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dataProduk}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="bulan" tick={{ fill: '#6b7280' }} />
                    <YAxis tick={{ fill: '#6b7280' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                    <Bar dataKey="jumlah" fill="#2D6A9E" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-10 text-gray-500">Tidak ada data</div>
              )}
            </div>

            {/* Pie Chart (Menambahkan data, cx, cy, outerRadius, dan Cells yang hilang) */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Status Produk</h3>
              {dataStatus.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: 'white'
                      }}
                      formatter={(value: number, name: string) => [value, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-10 text-gray-500">Tidak ada data</div>
              )}
            </div>
          </div>

          {/* LIST PRODUK & AKTIVITAS (Sama seperti HEAD) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Produk Terbaru */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Produk Terbaru</h2>
              {produkTerbaru.length > 0 ? (
                <div className="space-y-3">
                  {produkTerbaru.map((p) => (
                    <div key={p.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-800">{p.nama}</p>
                        <p className="text-xs text-gray-500">{p.kategori} • {p.tanggal}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        p.status === "Diverifikasi"
                          ? "bg-green-100 text-green-700"
                          : p.status === "Menunggu"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">Tidak ada produk</div>
              )}
            </div>

            {/* Aktivitas Terbaru */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Aktivitas Terbaru</h2>
              {aktivitas.length > 0 ? (
                <div className="space-y-4">
                  {aktivitas.map((a) => (
                    <div key={a.id} className="flex items-start gap-3">
                      <div className={`p-2 rounded-full flex-shrink-0 ${
                        a.type === "success"
                          ? "bg-green-100 text-green-700"
                          : a.type === "warning"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {a.type === "success" ? <CheckCircle size={16} /> :
                         a.type === "warning" ? <AlertCircle size={16} /> :
                         <PlusCircle size={16} />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{a.aksi}</p>
                        <p className="text-xs text-gray-500 mt-1">{a.waktu}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">Tidak ada aktivitas</div>
              )}
            </div>
          </div>

          <footer className="text-center text-xs text-gray-400 mt-10">
            © 2025 SINOVA — Dashboard Penyedia Inovasi
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPenyedia;