"use client";

import { useState } from 'react';

export default function ProfileEdit() {
  const [formData, setFormData] = useState({
    namaLengkap: '',
    email: '',
    noTelepon: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Profil berhasil diperbarui!');
  };

  return (
    <div className="min-h-screen bg-[#C6E5B3] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
        {/* Profile Header */}
        <div className="relative mb-8 sm:mb-12 md:mb-16">
          {/* Header Bar */}
          <div className="h-16 sm:h-20 md:h-24 rounded-t-2xl bg-[#2B5235]"></div>
          
          {/* Profile Picture */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 sm:-bottom-14 md:-bottom-16">
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 bg-[#C6E5B3] border-[#2B5235] flex items-center justify-center cursor-pointer hover:border-[#3d7249] transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#2B5235"
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                  <circle cx="12" cy="13" r="3"></circle>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center mt-16 sm:mt-20 md:mt-24 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 text-[#2B5235]">
            {formData.namaLengkap || 'Nama Pengguna'}
          </h2>
          <button 
            className="px-6 sm:px-8 md:px-10 py-2 sm:py-2.5 md:py-3 rounded-lg bg-[#2B5235] text-white font-medium border-none cursor-pointer shadow-sm hover:bg-[#3d7249] transition-colors text-sm sm:text-base"
            onClick={() => alert('Edit profil diklik')}
          >
            Edit Profil
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5 sm:gap-6">
          <div className="border-b-2 border-[#2B5235] pb-2">
            <h3 className="text-sm sm:text-base font-semibold italic text-[#2B5235]">
              Informasi Pribadi
            </h3>
          </div>

          {/* Nama Lengkap */}
          <div>
            <label 
              htmlFor="namaLengkap" 
              className="block text-sm sm:text-base font-medium mb-2 text-[#2B5235]"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="namaLengkap"
              name="namaLengkap"
              value={formData.namaLengkap}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-[#2B5235] text-white border-none outline-none shadow-sm placeholder-gray-300 text-sm sm:text-base"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          {/* Email */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm sm:text-base font-medium mb-2 text-[#2B5235]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-[#2B5235] text-white border-none outline-none shadow-sm placeholder-gray-300 text-sm sm:text-base"
              placeholder="Masukkan email"
            />
          </div>

          {/* No. Telepon */}
          <div>
            <label 
              htmlFor="noTelepon" 
              className="block text-sm sm:text-base font-medium mb-2 text-[#2B5235]"
            >
              No. Telepon
            </label>
            <input
              type="tel"
              id="noTelepon"
              name="noTelepon"
              value={formData.noTelepon}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-[#2B5235] text-white border-none outline-none shadow-sm placeholder-gray-300 text-sm sm:text-base"
              placeholder="Masukkan nomor telepon"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 sm:pt-6">
            <button
              type="button"
              className="w-full py-3 sm:py-3.5 rounded-lg bg-[#2B5235] text-white font-semibold border-none cursor-pointer shadow-sm hover:bg-[#3d7249] transition-colors text-sm sm:text-base"
              onClick={handleSubmit}
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}