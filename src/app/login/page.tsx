'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true'); // Simulasi login
    localStorage.setItem('username', 'Fitri Nabila');
    router.push('/'); // Navigasi ke halaman beranda
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex w-[800px] bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Kiri: Form Login */}
        <div className="flex flex-col justify-center items-center w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Masuk</h2>

          <div className="flex gap-4 mb-4">
            <button className="border border-gray-300 p-2 rounded-full text-blue-800 hover:bg-blue-100">
              <FaGoogle />
            </button>
            
            <button className="border border-gray-300 p-2 rounded-full text-blue-800 hover:bg-blue-100">
              <FaGithub />
            </button>
            
          </div>

          <p className="text-sm text-gray-600 mb-6">atau gunakan akun Anda</p>

          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md px-4 py-2 mb-3 w-full bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Kata Sandi"
            className="border border-gray-300 rounded-md px-4 py-2 mb-3 w-full bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <a href="lupa_katasandi" className="text-xs text-gray-500 mb-4">
            Lupa kata sandi?
          </a>

          <button
            onClick={handleLogin}
            className="bg-blue-800 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-900"
          >
            MASUK
          </button>
        </div>

        {/* Kanan: Panel Register */}
        <div className="flex flex-col justify-center items-center w-1/2 bg-blue-800 text-white p-10 rounded-l-[80px]">
          <h2 className="text-2xl font-bold mb-2">Halo, Teman Baru!</h2>
          <p className="text-sm mb-6 text-center">
            Daftarkan akun kamu untuk menggunakan semua fitur kami.
          </p>
          <Link
            href="/register"
            className="border border-white px-6 py-2 rounded-md hover:bg-white hover:text-blue-800 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}