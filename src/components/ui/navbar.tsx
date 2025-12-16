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

  useEffect(() => {
    const updateUser = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setUsername(localStorage.getItem("username"));
      setRole(localStorage.getItem("role"));
    };

    updateUser();
    window.addEventListener("storage", updateUser);
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  // Klik di luar dropdown → tutup dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
  // Hapus SEMUA session
  localStorage.clear();  

  setIsLoggedIn(false);

  router.replace("/");

  // Cegah kembali ke halaman sebelumnya
  if (typeof window !== "undefined") {
    window.history.pushState(null, "", "/");
  }
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
    { name: "Informasi", href: "/information" },
    { name: "Layanan", href: "/layanan" },
    { name: "Hubungi Kami", href: "/hubungi-kami" },
  ];

  return (
    <>
      <header className="bg-[#F3F7FB] border-b-4 border-[#1F4E73] fixed top-0 left-0 w-full z-40">
        <div className="flex justify-between items-center px-6 sm:px-12 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={60} height={50} />
            <div className="hidden sm:block leading-tight">
              <h1 className="font-extrabold text-[#1F4E73] text-xl sm:text-2xl tracking-wide">
                SINOVA
              </h1>
              <p className="text-[#1F4E73] font-medium text-[10px] sm:text-xs">
                Sistem Informasi & Inovasi Riset Daerah
              </p>
            </div>
          </Link>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="text-[#1F4E73] text-2xl sm:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop User Button */}
          <div className="hidden sm:block" ref={dropdownRef}>
            {!isLoggedIn ? (
              <Link
                href="/login"
                className="bg-[#1F4E73] text-white px-4 py-2 rounded-lg hover:bg-[#163954] transition"
              >
                Masuk
              </Link>
            ) : (
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-[#1F4E73] text-white px-4 py-2 rounded-lg hover:bg-[#163954] transition flex items-center gap-2"
              >
                <i className="fa-solid fa-user"></i>
                {username || "Akun"}
                <i className="fa-solid fa-chevron-down text-sm"></i>
              </button>
            )}

            {isDropdownOpen && (
              <div className="absolute right-8 mt-2 w-44 bg-white border rounded-lg shadow-lg">
                <Link href={dashboardLink} className="block px-4 py-2 hover:bg-gray-100">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="bg-[#1F4E73] text-white hidden sm:flex justify-center shadow-inner">
          <ul className="flex">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="px-5 py-3 block hover:bg-[#163954] transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* spacer for fixed header */}
      <div className="h-[88px] w-full" />

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="bg-[#1F4E73] text-white px-6 py-4 space-y-3 sm:hidden mt-[88px] animate-slide-down">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenu(false)}
              className="block py-2 hover:bg-[#163954] rounded-md"
            >
              {item.name}
            </Link>
          ))}
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="block bg-white text-[#1F4E73] text-center py-2 rounded-md font-semibold"
            >
              Masuk
            </Link>
          ) : (
            <>
              <Link
                href={dashboardLink}
                className="block bg-white text-[#1F4E73] text-center py-2 rounded-md font-semibold"
                onClick={() => setMobileMenu(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full bg-red-600 text-white text-center py-2 rounded-md font-semibold"
              >
                Keluar
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
