'use client';

import { useState } from 'react';

export default function ProfileEdit({ user }) {
  const [formData, setFormData] = useState({
    namaLengkap: user?.namaLengkap || '',
    email: user?.email || '',
    noTelepon: user?.noTelepon || ''
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

  const primaryColor = '#2B5235';
  const bgColor = '#C6E5B3';

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: bgColor }}>
      <div className="w-full max-w-md">
        {/* Profile Header */}
        <div className="relative mb-8">
          {/* Header Bar */}
          <div className="h-16 rounded-t-2xl" style={{ backgroundColor: primaryColor }}></div>
          
          {/* Profile Picture */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
            <div className="relative">
              <div 
                className="w-24 h-24 rounded-full border-4 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                style={{ 
                  backgroundColor: bgColor,
                  borderColor: primaryColor
                }}
              >
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.namaLengkap || 'User'}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="32" 
                    height="32" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke={primaryColor}
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                    <circle cx="12" cy="13" r="3"></circle>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center mt-16 mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: primaryColor }}>
            {formData.namaLengkap || 'Nama Pengguna'}
          </h2>
          <button 
            className="px-8 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity shadow-md"
            style={{ backgroundColor: primaryColor }}
            onClick={() => alert('Edit profil diklik')}
          >
            Edit Profil
          </button>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div className="border-b-2 pb-2" style={{ borderColor: primaryColor }}>
            <h3 className="text-sm font-semibold italic" style={{ color: primaryColor }}>
              Informasi Pribadi
            </h3>
          </div>

          {/* Nama Lengkap */}
          <div>
            <label 
              htmlFor="namaLengkap" 
              className="block text-sm font-medium mb-2"
              style={{ color: primaryColor }}
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="namaLengkap"
              name="namaLengkap"
              value={formData.namaLengkap}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 shadow-sm"
              style={{ backgroundColor: primaryColor }}
              placeholder="Masukkan nama lengkap"
            />
          </div>

          {/* Email */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium mb-2"
              style={{ color: primaryColor }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 shadow-sm"
              style={{ backgroundColor: primaryColor }}
              placeholder="Masukkan email"
            />
          </div>

          {/* No. Telepon */}
          <div>
            <label 
              htmlFor="noTelepon" 
              className="block text-sm font-medium mb-2"
              style={{ color: primaryColor }}
            >
              No. Telepon
            </label>
            <input
              type="tel"
              id="noTelepon"
              name="noTelepon"
              value={formData.noTelepon}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 shadow-sm"
              style={{ backgroundColor: primaryColor }}
              placeholder="Masukkan nomor telepon"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="button"
              className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity shadow-md"
              style={{ backgroundColor: primaryColor }}
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