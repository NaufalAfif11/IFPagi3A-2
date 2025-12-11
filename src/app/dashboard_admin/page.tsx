"use client";

import React, { useState, useEffect } from "react";
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
} from "recharts";

// URL Backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface KategoriData {
  kategori: string;
  jumlah: number;
}

interface PengajuanData {
  bulan: string;
  jumlah: number;
}

interface Statistik {
  totalPenyedia: number;
  totalPengguna: number;
  laporanMasuk: number;
}

const DashboardAdmin = () => {
  // State untuk data dari API
  const [statistik, setStatistik] = useState<Statistik>({
    totalPenyedia: 0,
    totalPengguna: 0,
    laporanMasuk: 0,
  });
  const [kategoriData, setKategoriData] = useState<KategoriData[]>([]);
  const [dataPengajuan, setDataPengajuan] = useState<PengajuanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch semua data dashboard
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch statistik
      const statsResponse = await fetch(`${API_BASE_URL}/api/admin/statistics`);
      if (!statsResponse.ok) throw new Error('Gagal memuat statistik');
      const statsData = await statsResponse.json();
      setStatistik(statsData);

      // Fetch kategori data
      const kategoriResponse = await fetch(`${API_BASE_URL}/api/admin/kategori`);
      if (!kategoriResponse.ok) throw new Error('Gagal memuat data kategori');
      const kategoriDataResult = await kategoriResponse.json();
      setKategoriData(kategoriDataResult);

      // Fetch pengajuan bulanan
      const pengajuanResponse = await fetch(`${API_BASE_URL}/api/admin/pengajuan-bulanan?tahun=2024`);
      if (!pengajuanResponse.ok) throw new Error('Gagal memuat data pengajuan');
      const pengajuanDataResult = await pengajuanResponse.json();
      setDataPengajuan(pengajuanDataResult);

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
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
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
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
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">Dashboard Admin</h1>
            <p className="text-sm text-gray-500 mt-1">
              Selamat datang Admin — pantau data kategori & laporan.
            </p>
          </div>
          <button 
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {/* STATISTIK CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Card 1: Total Penyedia */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold opacity-90 mb-1">Total Penyedia</h3>
                <p className="text-4xl font-bold">{statistik.totalPenyedia}</p>
                <p className="text-sm opacity-80 mt-2">Penyedia terdaftar</p>
              </div>
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2: Total Pengguna */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold opacity-90 mb-1">Total Pengguna</h3>
                <p className="text-4xl font-bold">{statistik.totalPengguna}</p>
                <p className="text-sm opacity-80 mt-2">Pengguna aktif</p>
              </div>
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 3: Laporan Masuk */}
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold opacity-90 mb-1">Laporan Masuk</h3>
                <p className="text-4xl font-bold">{statistik.laporanMasuk}</p>
                <p className="text-sm opacity-80 mt-2">Menunggu review</p>
              </div>
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* GRAFIK KATEGORI */}
        <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg mb-10">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
            </svg>
            <h2 className="text-2xl font-bold text-gray-800">
              Grafik Kategori Layanan Terpopuler
            </h2>
          </div>

          {kategoriData.length > 0 ? (
            <div className="w-full h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={kategoriData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="kategori" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: '#6b7280' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Bar 
                    dataKey="jumlah" 
                    fill="#3B82F6" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-20">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-gray-500 font-medium">Tidak ada data kategori</p>
            </div>
          )}
        </div>

        {/* GRAFIK PENGAJUAN */}
        <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd"/>
            </svg>
            <h2 className="text-2xl font-bold text-gray-800">
              Grafik Pengajuan per Bulan (2024)
            </h2>
          </div>

          {dataPengajuan.length > 0 ? (
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataPengajuan} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="bulan" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: '#6b7280' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="jumlah" 
                    stroke="#2563EB" 
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#2563EB' }}
                    activeDot={{ r: 7, fill: '#1d4ed8' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-20">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              <p className="text-gray-500 font-medium">Tidak ada data pengajuan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;