"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, Package, FileText, User, LogOut, Menu, X } from "lucide-react";

const SidebarPenyedia = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Toggle Button Mobile */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 bg-[#1F4E73] text-white fixed top-3 left-3 z-50 rounded-full shadow-md md:hidden border border-blue-300"
        >
          <Menu size={16} />
        </button>
      )}

      {/* SIDEBAR */}
      <div
        className={`bg-[#1F4E73] text-white h-screen flex flex-col fixed md:static top-0 left-0 overflow-y-auto transition-transform duration-500 ease-in-out z-40
        ${isOpen ? "w-64 translate-x-0" : "w-0 md:w-20 -translate-x-full md:translate-x-0"}`}
      >
        {/* Close Button Mobile */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden absolute top-4 right-4 text-white"
          >
            <X size={20} />
          </button>
        )}

        {/* Collapse Button Desktop */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:block absolute top-4 right-4 text-white"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* HEADER */}
        {isOpen && (
          <div className="p-4 border-b border-blue-800">
            <h1 className="text-xl font-bold text-white">SINOVA</h1>
            <p className="text-xs text-blue-200 mt-1">Sistem Informasi & Inovasi Riset Daerah</p>
          </div>
        )}

        {/* MENU */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard_penyedia">
                <div className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-blue-800 text-blue-200 cursor-pointer">
                  <Home size={20} /> {isOpen && "Dashboard"}
                </div>
              </Link>
            </li>

            <li>
              <Link href="/kelolaProdukPenyedia">
                <div className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-blue-800 text-blue-200 cursor-pointer">
                  <Package size={20} /> {isOpen && "Produk Saya"}
                </div>
              </Link>
            </li>

            <li>
              <Link href="/usulan_penyedia">
                <div className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-blue-800 text-blue-200 cursor-pointer">
                  <FileText size={20} /> {isOpen && "Riwayat Pengajuan"}
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

        {/* USER FOOTER */}
        <Link href="/edit-profil">
          <div className="p-4 border-t border-blue-800 cursor-pointer flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              BS
            </div>
            {isOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Ir. Budi Santoso</p>
                <p className="text-xs text-blue-200">Penyedia</p>
              </div>
            )}
          </div>
        </Link>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-300 hover:bg-blue-800 rounded-lg mb-4">
          <LogOut size={18} /> {isOpen && "Keluar"}
        </button>
      </div>
    </div>
  );
};

export default SidebarPenyedia;
