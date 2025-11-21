'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem('isLoggedIn');
    const storedUser = localStorage.getItem('username');
    setIsLoggedIn(logged === 'true');
    setUsername(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername(null);
    router.push('/');
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="bg-[#F3F7FB] border-b-4 border-[#1F4E73]">
      {/* Top bar */}
      <div className="flex justify-between items-center px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo" width={90} height={70} />
          <div>
            <h1 className="font-extrabold text-[#1F4E73] text-3xl tracking-wide">
              SINOVA
            </h1>
            <p className="text-[#1F4E73] font-semibold text-sm leading-tight">
              Sistem Informasi dan Inovasi <br /> Riset Daerah
            </p>
          </div>
        </div>

        {/* Login / Dropdown */}
        {!isLoggedIn ? (
          <Link
            href="/login"
            className="flex items-center gap-2 bg-[#1F4E73] text-white px-4 py-2 rounded-lg hover:bg-[#163954] transition"
          >
            <i className="fa-solid fa-user"></i>
            Masuk
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 bg-[#1F4E73] text-white px-4 py-2 rounded-lg hover:bg-[#163954] transition"
            >
              <i className="fa-solid fa-user"></i>
              {username || 'Pengguna'}
              <i className="fa-solid fa-chevron-down text-sm ml-1"></i>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
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
        )}
      </div>

      {/* Menu */}
      <nav className="bg-[#1F4E73] text-white flex justify-center shadow-inner">
        <ul className="flex">
          {[
            { name: 'Beranda', href: '/' },
            { name: 'Profil', href: '/profile' },
            { name: 'Katalog Produk', href: '/katalog' },
            { name: 'Riset', href: '/riset' },
            { name: 'Informasi', href: '/information' },
            { name: 'Layanan', href: '/layanan' },
            { name: 'Hubungi Kami', href: '/hubungi-kami' },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="block px-6 py-3 font-medium hover:bg-[#163954] transition-all duration-200"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
