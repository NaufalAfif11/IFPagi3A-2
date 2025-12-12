"use client";

import React, { useState } from "react";
import SidebarPenyedia from "@/components/ui/sidebar_penyedia";
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

const Dashboard_penyedia = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  // Statistik Produk
  const statistik = {
    totalProduk: 32,
    diverifikasi: 18,
    menunggu: 9,
  };

  // Chart Data
  const dataProduk = [
    { bulan: "Jun", jumlah: 5 },
    { bulan: "Jul", jumlah: 8 },
    { bulan: "Agu", jumlah: 12 },
    { bulan: "Sep", jumlah: 15 },
    { bulan: "Okt", jumlah: 20 },
  ];

  const dataStatus = [
    { name: "Diverifikasi", value: 18 },
    { name: "Menunggu", value: 9 },
    { name: "Ditolak", value: 5 },
  ];

  const produkTerbaru = [
    { id: 1, nama: "Aplikasi Cuaca Laut", kategori: "Maritim", status: "Diverifikasi", tanggal: "24 Okt 2025" },
    { id: 2, nama: "Sensor Suhu Pintar", kategori: "IoT", status: "Menunggu", tanggal: "23 Okt 2025" },
    { id: 3, nama: "Mesin Pakan Ikan", kategori: "Perikanan", status: "Diverifikasi", tanggal: "20 Okt 2025" },
  ];

  const aktivitas = [
    { id: 1, aksi: "Produk Anda diverifikasi: Mesin Pakan Ikan", waktu: "3 jam lalu", type: "success" },
    { id: 2, aksi: "Anda mengajukan produk baru: Sensor Suhu Pintar", waktu: "1 hari lalu", type: "info" },
    { id: 3, aksi: "Produk Anda memerlukan revisi: Alat Ukur Arus Laut", waktu: "2 hari lalu", type: "warning" },
  ];

  const COLORS = ["#22C55E", "#FACC15", "#EF4444"];

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarPenyedia  />

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Penyedia</h1>
          <p className="text-sm text-gray-500">Selamat datang kembali, Ir. Budi Santoso</p>

          {/* STATISTIK */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Produk */}
            <div className="bg-[#2D6A9E] text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition">
              <div className="flex justify-between items-center mb-6">
                <div className="bg-white/20 p-6 rounded-full">
                  <List size={32} className="text-white" />
                </div>
                <p className="text-5xl font-bold">{statistik.totalProduk}</p>
              </div>
              <h3 className="text-xl font-bold">Total Produk</h3>
              <p className="text-white/90 text-sm">Total inovasi yang Anda buat</p>
            </div>

            {/* Diverifikasi */}
            <div className="bg-[#2D6A9E] text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition">
              <div className="flex justify-between items-center mb-6">
                <div className="bg-white/20 p-6 rounded-full">
                  <CheckCircle size={32} className="text-white" />
                </div>
                <p className="text-5xl font-bold">{statistik.diverifikasi}</p>
              </div>
              <h3 className="text-xl font-bold">Diverifikasi</h3>
              <p className="text-white/90 text-sm">Produk yang sudah valid</p>
            </div>

            {/* Menunggu */}
            <div className="bg-[#2D6A9E] text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition">
              <div className="flex justify-between items-center mb-6">
                <div className="bg-white/20 p-6 rounded-full">
                  <Clock size={32} className="text-white" />
                </div>
                <p className="text-5xl font-bold">{statistik.menunggu}</p>
              </div>
              <h3 className="text-xl font-bold">Menunggu Verifikasi</h3>
              <p className="text-white/90 text-sm">Sedang diperiksa oleh admin</p>
            </div>
          </div>

          {/* GRAFIK */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4">Jumlah Produk per Bulan</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataProduk}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bulan" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="jumlah" fill="#2D6A9E" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4">Status Produk</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={dataStatus} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
                    {dataStatus.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* LIST PRODUK & AKTIVITAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Produk Terbaru */}
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <h2 className="text-lg font-bold mb-4">Produk Terbaru</h2>
              <div className="space-y-3">
                {produkTerbaru.map((p) => (
                  <div key={p.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 flex justify-between">
                    <div>
                      <p className="font-semibold">{p.nama}</p>
                      <p className="text-xs text-gray-500">{p.kategori} • {p.tanggal}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      p.status === "Diverifikasi"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Aktivitas Terbaru */}
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <h2 className="text-lg font-bold mb-4">Aktivitas Terbaru</h2>
              <div className="space-y-4">
                {aktivitas.map((a) => (
                  <div key={a.id} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
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
                    <div>
                      <p className="text-sm">{a.aksi}</p>
                      <p className="text-xs text-gray-500">{a.waktu}</p>
                    </div>
                  </div>
                ))}
              </div>
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

export default Dashboard_penyedia;
