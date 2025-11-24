"use client";

import React from "react";
import { Home, FileText, Package, User, LogOut } from "lucide-react";

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (value: string) => void;
}

const SidebarPenyedia: React.FC<SidebarProps> = ({ activeMenu, setActiveMenu }) => {
  return (
    <div className="w-64 flex flex-col bg-[#1F4E73] h-screen">
      <div className="p-4 border-b border-blue-800">
        <h1 className="text-xl font-bold text-white">SINOVA</h1>
        <p className="text-xs text-blue-200 mt-1">Portal Penyedia Inovasi</p>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {[
            { name: "Dashboard", icon: <Home size={20} /> },
            { name: "Produk Saya", icon: <Package size={20} /> },
            { name: "Riwayat Pengajuan", icon: <FileText size={20} /> },
            { name: "Profil", icon: <User size={20} /> },
          ].map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActiveMenu(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${
                  activeMenu === item.name
                    ? "bg-blue-700 text-white border-l-4 border-yellow-400"
                    : "text-blue-200 hover:bg-blue-800"
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-blue-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            IN
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Ir. Budi Santoso</p>
            <p className="text-xs text-blue-200">Penyedia</p>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-300 hover:bg-blue-800 rounded-lg">
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </div>
  );
};

export default SidebarPenyedia;
