'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Cek status login dan ambil nama pengguna dari localStorage
  useEffect(() => {
    const logged = localStorage.getItem('isLoggedIn');
    const storedUser = localStorage.getItem('username');
    setIsLoggedIn(logged === 'true');
    setUsername(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    router.push('/');
    window.location.reload(); // biar navbar langsung update
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isProfilePage = pathname === '/profil';

  return (
    <header
      className={`bg-white border-b-4 border-[#1F4E73] ${
        isProfilePage ? 'py-4' : ''
      }`}
    >
      <div
        className={`flex justify-between items-center px-8 ${
          isProfilePage ? 'py-6 gap-6' : 'py-3'
        }`}
      >
        {/* Kiri: Logo */}
        <div className={`flex items-center ${isProfilePage ? 'gap-6' : 'gap-3'}`}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={isProfilePage ? 100 : 90}
            height={isProfilePage ? 90 : 70}
          />
          <div>
            <h1
              className={`font-extrabold text-[#1F4E73] tracking-wide ${
                isProfilePage ? 'text-4xl' : 'text-3xl'
              }`}
            >
              SINOVA
            </h1>
            <p
              className={`text-[#1F4E73] font-semibold leading-tight ${
                isProfilePage ? 'text-base' : 'text-sm'
              }`}
            >
              Sistem Informasi dan Inovasi <br /> Riset Daerah
            </p>
          </div>
        </div>

        {/* Kanan: tombol masuk / user */}
        {!isLoggedIn ? (
          <Link
            href="/login"
            className="flex items-center gap-2 bg-[#1F4E73] text-white px-4 py-2 rounded-lg hover:bg-[#24482D] transition"
          >
            <i className="fa-solid fa-user"></i>
            Masuk
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 bg-[#1F4E73] text-white px-4 py-2 rounded-lg hover:bg-white transition"
            >
              <i className="fa-solid fa-user"></i>
              {username || 'Pengguna'}
              <i className="fa-solid fa-chevron-down text-sm ml-1"></i>
            </button>

            {/* Dropdown */}
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
      <nav className="bg-[#1F4E73] text-white flex justify-center">
        <ul className={`flex ${isProfilePage ? 'gap-4' : ''}`}>
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
                className={`block px-6 py-3 font-medium transition ${
                  pathname === item.href
                    ? 'bg-white text-[#1F4E73]'
                    : 'hover:bg-white hover:text-[#1F4E73]'
                }`}
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
