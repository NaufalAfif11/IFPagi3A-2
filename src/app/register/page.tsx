'use client';

import Link from 'next/link';
import { FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#C6E5B3]">
      <div className="flex w-[800px] bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Kiri: Form Register */}
        <div className="flex flex-col justify-center items-center w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Daftar</h2>

          {/* Icon Register */}
          <div className="flex gap-4 mb-4">
            <button className="border border-gray-300 p-2 rounded-full text-green-800 hover:bg-green-100">
              <FaGoogle />
            </button>
            <button className="border border-gray-300 p-2 rounded-full text-green-800 hover:bg-green-100">
              <FaFacebookF />
            </button>
            <button className="border border-gray-300 p-2 rounded-full text-green-800 hover:bg-green-100">
              <FaGithub />
            </button>
            <button className="border border-gray-300 p-2 rounded-full text-green-800 hover:bg-green-100">
              <FaLinkedinIn />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-6">atau daftar dengan email kamu</p>

          {/* Form */}
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="border border-gray-300 rounded-md px-4 py-2 mb-3 w-full bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md px-4 py-2 mb-3 w-full bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Kata Sandi"
            className="border border-gray-300 rounded-md px-4 py-2 mb-3 w-full bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button className="bg-green-800 text-white font-semibold px-6 py-2 rounded-md hover:bg-green-900">
            DAFTAR
          </button>
        </div>

        {/* Kanan: Panel Login */}
        <div className="flex flex-col justify-center items-center w-1/2 bg-green-800 text-white p-10 rounded-l-[80px]">
          <h2 className="text-2xl font-bold mb-2">Selamat Datang Kembali!</h2>
          <p className="text-sm mb-6 text-center">
            Sudah punya akun? Silakan login untuk melanjutkan.
          </p>
          <Link
            href="/login"
            className="border border-white px-6 py-2 rounded-md hover:bg-white hover:text-green-800 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
