"use client";

import React from 'react';
import { Download } from 'lucide-react';
import Image from 'next/image';
import Navbar from '../../components/ui/navbar';
import Footer from '@/components/ui/footer';


export default function Info() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 3;

  const panduanData = [
    { id: 1, title: 'Manual Book Sinova Kepulauan Riau (Publik)' },
    { id: 2, title: 'Manual Book Sinova Kepulauan Riau (Peneliti)' },
    { id: 3, title: 'Manual Book Sinova Kepulauan Riau (Brida)' },
    { id: 4, title: 'Manual Book Sinova Kepulauan Riau (Industri)' },
    { id: 5, title: 'Manual Book Sinova Kepulauan Riau (UMKM)' }
  ];

  const timPengembang = [
    { nama: 'Ir. Ahmad Hamim Thohari, S.T., M.T.', nip: '191943' },
    { nama: 'Sudra Irawan', nip: '181412' },
    { nama: 'Naufal Afif Al-Yafi', nip: '1100' },
    { nama: 'Fitri Nabila Aprianti', nip: '1012' },
    { nama: 'Annisa Fadilla Efendi Harahap', nip: '1024' },
    { nama: 'Salsa Putri Ajriyanti', nip: '1043' }
  ];

  const handleDownload = (id: number) => {
    console.log(`Downloading document with id: ${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">PANDUAN</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Akses panduan lengkap SINOVA
              </p>
          </div>

          <div className="p-6">
            <div className="overflow-hidden rounded-lg border border-[#1F4E73] shadow-md">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#1F4E73] text-white">
                    <th className="py-4 px-6 text-left font-semibold text-base w-20">No.</th>
                    <th className="py-4 px-6 text-left font-semibold text-base">Unduhan</th>
                    <th className="py-4 px-6 text-center font-semibold text-base w-48">Dokumen Unduh</th>
                  </tr>
                </thead>
                <tbody>
                  {panduanData.map((item) => (
                    <tr key={item.id} className="border-b border-black transition-colors duration-200">
                      <td className="py-4 px-6 text-gray-800 font-medium">{item.id}.</td>
                      <td className="py-4 px-6 text-gray-800">{item.title}</td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleDownload(item.id)}
                          className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded transition-colors duration-200 shadow-sm text-sm font-medium"
                        >
                          <Download size={16} />
                          <span>Download</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-bold text-black"
              >
                Previous
              </button>

              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded transition-colors text-sm font-medium ${
                    currentPage === page
                      ? 'bg-[#1F4E73] text-white'
                      : 'border border-black hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-bold text-black">
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Tim Pengembang</h2>
        </div>

        <div className="p-8 mx-9">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
            {timPengembang.map((anggota, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-[#1F4E73] to-[#3e81aa] rounded-lg h-56 mb-4 shadow-lg transform group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                  <div className="text-white text-6xl opacity-30">👤</div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{anggota.nama}</h3>
                <p className="text-gray-600 text-sm">{anggota.nip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    <Footer />
      
    </>
  );
}
