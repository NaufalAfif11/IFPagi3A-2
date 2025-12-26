'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // 🔥 STATE MODAL LOGOUT
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ================= AUTH SYNC =================
  useEffect(() => {
    const updateUser = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setUsername(localStorage.getItem("username"));
      setRole(localStorage.getItem("role"));
    };

    updateUser();
    window.addEventListener("storage", updateUser);
    window.addEventListener("auth-change", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("auth-change", updateUser);
    };
  }, []);

  // ================= CLOSE DROPDOWN OUTSIDE =================
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    setIsLoggedIn(false);
    setUsername(null);
    setRole(null);

    setIsDropdownOpen(false);
    setMobileMenu(false);

    window.dispatchEvent(new Event("auth-change"));
    router.replace("/");
  };

  const dashboardLink =
    role === "pengguna"
      ? "/dashboard_pengguna"
      : role === "penyedia"
      ? "/dashboard_penyedia"
      : role === "admin"
      ? "/dashboard_admin"
      : "/dashboard";

  const menuItems = [
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "/profile" },
    { name: "Katalog Produk", href: "/katalog" },
    { name: "Riset", href: "/riset" },
    { name: "Panduan", href: "/information" },
    { name: "Layanan", href: "/layanan" },
    { name: "Hubungi Kami", href: "/hubungi-kami" },
  ];

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="bg-[#F3F7FB] border-b-4 border-[#1F4E73] fixed top-0 left-0 w-full z-40">
        <div className="flex justify-between items-center px-6 sm:px-12 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={60} height={50} />
            <div className="hidden sm:block leading-tight">
              <h1 className="font-extrabold text-[#1F4E73] text-xl sm:text-2xl">
                SINOVA
              </h1>
              <p className="text-[#1F4E73] text-xs">
                Sistem Informasi & Inovasi Riset Daerah
              </p>
            </div>
          </Link>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="text-[#1F4E73] text-2xl sm:hidden"
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop User */}
          <div className="hidden sm:block relative" ref={dropdownRef}>
            {!isLoggedIn ? (
              <Link
                href="/login"
                className="bg-[#1F4E73] text-white px-4 py-2 rounded-lg"
              >
                Masuk
              </Link>
            ) : (
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-[#1F4E73] text-white px-4 py-2 rounded-lg flex gap-2"
                >
                  {username || "Akun"}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border">
                    <Link
                      href={dashboardLink}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="bg-[#1F4E73] text-white hidden sm:flex justify-center">
          <ul className="flex">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="px-5 py-3 block hover:bg-[#163954]">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Spacer */}
      <div className="h-[88px]" />

      {/* ================= MOBILE MENU ================= */}
      {mobileMenu && (
        <div className="bg-[#1F4E73] text-white px-6 py-4 sm:hidden">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} className="block py-2">
              {item.name}
            </Link>
          ))}

          {!isLoggedIn ? (
            <Link href="/login" className="block bg-white text-[#1F4E73] py-2 mt-3 text-center rounded">
              Masuk
            </Link>
          ) : (
            <>
              <Link href={dashboardLink} className="block bg-white text-[#1F4E73] py-2 mt-3 text-center rounded">
                Dashboard
              </Link>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="block w-full bg-red-600 py-2 mt-2 rounded"
              >
                Keluar
              </button>
            </>
          )}
        </div>
      )}

      {/* ================= LOGOUT MODAL ================= */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm">
            <h3 className="text-lg font-semibold mb-2">Konfirmasi Keluar</h3>
            <p className="text-sm text-gray-600 mb-6">
              Apakah kamu yakin ingin keluar dari akun ini?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 border rounded-md"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  handleLogout();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
