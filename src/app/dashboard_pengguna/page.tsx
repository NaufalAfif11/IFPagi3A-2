"use client";

import React, { useState, useEffect } from "react";
import SidebarPengguna from "@/components/ui/sidebar_pengguna";
import {
  List,
  PlusCircle,
  Clock,
} from "lucide-react";
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

interface Statistik {
  totalUsulan: number;
  usulanBaru: number;
  history: number;
}

interface DataStatus {
  name: string;
  value: number;
}

interface DataBulan {
  bulan: string;
  jumlah: number;
}

const COLORS = ["#FACC15", "#22C55E"]; // Menunggu, Dikerjakan

const Dashboard_pengguna = () => {
  const [statistik, setStatistik] = useState<Statistik>({
    totalUsulan: 0,
    usulanBaru: 0,
    history: 0,
  });

  const [dataUsulan, setDataUsulan] = useState<DataBulan[]>([]);
  const [dataStatus, setDataStatus] = useState<DataStatus[]>([
    { name: "Menunggu", value: 0 },
    { name: "Dikerjakan", value: 0 },
  ]);

 useEffect(() => {
  fetch("http://localhost:5000/api/dashboard-pengguna")
    .then(res => res.json())
    .then(data => {
      console.log(data); // cek apakah data muncul di console
      setStatistik(data.statistik);
      setDataUsulan(data.dataBulan);

      const statusTemplate = [
        { name: "Menunggu", value: 0 },
        { name: "Dikerjakan", value: 0 },
      ];

      data.statusData.forEach((item: any) => {
        const index = statusTemplate.findIndex(s => s.name === item.name);
        if (index >= 0) statusTemplate[index].value = item.value;
      });

      setDataStatus(statusTemplate);
    })
    .catch(err => console.log(err));
}, []);


  return (
    <div className="flex h-screen">
      <SidebarPengguna />

      {/* MAIN */}
      <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">Selamat datang kembali, Dr. Ahmad Yani</p>

          {/* ========== KOTAK STATISTIK ========== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* TOTAL USULAN */}
            <div className="cursor-pointer bg-[#2D6A9E] text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-white/20 rounded-full p-6">
                  <List size={32} className="text-white" />
                </div>
                <p className="text-5xl font-bold">{statistik.totalUsulan}</p>
              </div>
              <h3 className="text-xl font-bold mb-2">Total Usulan</h3>
              <p className="text-sm text-white/90">Semua usulan yang diajukan</p>
            </div>

            {/* USULAN BARU */}
            <div className="cursor-pointer bg-[#2D6A9E] text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-white/20 rounded-full p-6">
                  <PlusCircle size={32} className="text-white" />
                </div>
                <p className="text-5xl font-bold">{statistik.usulanBaru}</p>
              </div>
              <h3 className="text-xl font-bold mb-2">Usulan Baru</h3>
              <p className="text-sm text-white/90">Buat usulan baru →</p>
            </div>

            {/* RIWAYAT */}
            <div className="cursor-pointer bg-[#2D6A9E] text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-white/20 rounded-full p-6">
                  <Clock size={32} className="text-white" />
                </div>
                <p className="text-5xl font-bold">{statistik.history}</p>
              </div>
              <h3 className="text-xl font-bold mb-2">Riwayat Usulan</h3>
              <p className="text-sm text-white/90">Usulan yang diproses</p>
            </div>
          </div>

          {/* GRAFIK */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Bar Chart */}
            <div className="bg-white shadow rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Jumlah Usulan per Bulan</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataUsulan}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bulan" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="jumlah" fill="#2D6A9E" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white shadow rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Status Usulan</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataStatus}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {dataStatus.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_pengguna;
