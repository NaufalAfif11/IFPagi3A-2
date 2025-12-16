"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Package, User, LogOut, Menu, X, Lightbulb, FileText } from "lucide-react";

const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState<{ name: string; foto?: string } | null>(null);
  const router = useRouter();

  // Fetch admin profile dari backend
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const res = await fetch(`${API_URL}/auth/admin/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Gagal ambil data admin, status: ${res.status}`);

        const data = await res.json();
setUser({ name: data.name, foto: data.foto_profil || "" });
      } catch (err) {
        console.error(err);
        setUser({ name: "Admin Utama" });
      }
    };

    fetchAdmin();
  }, []);
useEffect(() => {
  const setWidth = () => {
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    let width = "16rem"; // w-64
    if (!isOpen) {
      width = isDesktop ? "5rem" : "0px"; // collapsed atau mobile
    }
    document.documentElement.style.setProperty("--sidebar-width", width);
  };

  setWidth();
  window.addEventListener("resize", setWidth);
  return () => window.removeEventListener("resize", setWidth);
}, [isOpen]);

  // Logout
    const handleLogout = () => {
  // Hapus semua session
  localStorage.clear();

  // Redirect ke beranda publik (belum login)
  router.replace("/");

  // Cegah back ke dashboard
  if (typeof window !== "undefined") {
    window.history.pushState(null, "", "/");
  }
};
  return (
    <div className="flex h-screen">
      {/* Toggle button mobile */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 bg-[#1F4E73] text-white fixed top-3 left-3 z-50 rounded-full shadow-md md:hidden border border-blue-300"
        >
          <Menu size={18} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`bg-[#1F4E73] text-white h-screen overflow-y-auto flex flex-col fixed md:static top-0 left-0 transition-all duration-300 z-40
        ${isOpen ? "w-64 translate-x-0" : "w-0 md:w-20 -translate-x-full md:translate-x-0"}`}
      >
        {/* Close button mobile */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden absolute top-3 right-3 text-white p-1 rounded-full"
          >
            <X size={20} />
          </button>
        )}

        {/* Toggle desktop */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:block absolute top-4 right-4 text-white"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo */}
        {isOpen && (
          <div className="p-4 border-b border-blue-800">
            <Link href="/" className="block w-fit">
              <h1 className="text-xl font-bold text-white cursor-pointer">SINOVA</h1>
            </Link>
            <p className="text-xs text-blue-200 mt-1">Sistem Informasi & Inovasi Riset Daerah</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard_admin">
                <div className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-blue-800 text-blue-200 cursor-pointer">
                  <Home size={20} /> {isOpen && "Dashboard"}
                </div>
              </Link>
            </li>
            <li>
              <Link href="/katalogproduk_admin">
                <div className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-blue-800 text-blue-200 cursor-pointer">
                  <Package size={20} /> {isOpen && "Katalog Produk"}
                </div>
              </Link>
            </li>
            <li>
              <Link href="/usulanKebutuhanAdmin">
                <div className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-blue-800 text-blue-200 cursor-pointer">
                  <Lightbulb size={20} /> {isOpen && "Usulan Kebutuhan"}
                </div>
              </Link>
            </li>
            <li>
              <Link href="/kelola_berita">
                <div className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-blue-800 text-blue-200 cursor-pointer">
                  <FileText size={20} /> {isOpen && "Kelola Berita"}
                </div>
              </Link>
            </li>
            <li>
              <Link href="/laporan_admin">
                <div className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-blue-800 text-blue-200 cursor-pointer">
                  <FileText size={20} /> {isOpen && "Laporan"}
                </div>
              </Link>
            </li>
            <li>
              <Link href="/edit-profil">
                <div className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-blue-800 text-blue-200 cursor-pointer">
                  <User size={20} /> {isOpen && "Profil"}
                </div>
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Footer */}
        <Link href="/edit-profil" className="p-4 border-t border-blue-800 cursor-pointer block">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name?.slice(0, 2).toUpperCase() || "AU"}
            </div>
            {isOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{user?.name || "Admin Utama"}</p>
                <p className="text-xs text-blue-200">Administrator</p>
              </div>
            )}
          </div>
        </Link>

        {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-300 hover:bg-blue-800 rounded-lg"
                >
                  <LogOut size={18} /> {isOpen && "Keluar"}
                </button>
      </div>
    </div>
  );
};

export default SidebarAdmin;
