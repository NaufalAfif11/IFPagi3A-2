"use client";

import React, { useState } from "react";
import SidebarAdmin from "@/components/ui/sidebar_admin";
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

const DashboardAdmin = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

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

  // Statistik
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
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
        <p className="text-sm text-gray-500 mt-1">
          Selamat datang Admin — pantau data kategori & laporan.
        </p>

        {/* STATISTIK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">Total Penyedia</h3>
            <p className="text-4xl font-bold mt-2">{statistik.totalPenyedia}</p>
          </div>

          <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">Total Pengguna</h3>
            <p className="text-4xl font-bold mt-2">{statistik.totalPengguna}</p>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">Laporan Masuk</h3>
            <p className="text-4xl font-bold mt-2">{statistik.laporanMasuk}</p>
          </div>
        </div>

        {/* GRAFIK */}
        <div className="bg-white p-6 rounded-xl shadow mt-10">
          <h2 className="text-xl font-semibold mb-4">
            Grafik Kategori Layanan Terpopuler
          </h2>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kategoriData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="kategori" />
                <Tooltip />
                <Bar dataKey="jumlah" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grafik Pengajuan */}
        <div className="bg-white p-6 rounded-xl shadow-lg mt-10">
          <h2 className="text-xl font-semibold mb-4">Grafik Pengajuan per Bulan</h2>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataPengajuan}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis/>
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
