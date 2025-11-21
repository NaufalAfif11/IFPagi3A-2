"use client";

import React from "react";
import { Home, Users, Package, FileText, LogOut } from "lucide-react";

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (value: string) => void;
}

const SidebarAdmin: React.FC<SidebarProps> = ({ activeMenu, setActiveMenu }) => {
  return (
    <div className="w-64 bg-[#1E3A55] h-screen flex flex-col">
      <div className="p-5 border-b border-blue-900">
        <h1 className="text-xl font-bold text-white">SINOVA</h1>
        <p className="text-xs text-blue-300 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {[
            { name: "Dashboard", icon: <Home size={20} /> },
            { name: "Katalog Produk", icon: <Home size={20} /> },
            { name: "profile", icon: <Home size={20} /> },
        
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

      <div className="p-4 border-t border-blue-900">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-300 hover:bg-blue-800 rounded-lg">
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </div>
  );
};

export default SidebarAdmin;
