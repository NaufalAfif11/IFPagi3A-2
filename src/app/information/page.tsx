"use client";

import React from 'react';
import { Download } from 'lucide-react';
import Navbar from '../../components/ui/navbar';
import Footer from '@/components/ui/footer';

export default function Info() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const panduanData = [
    { id: 1, title: 'Manual Book Sinova Kepulauan Riau (Publik)' },
    { id: 2, title: 'Manual Book Sinova Kepulauan Riau (Peneliti)' },
    { id: 3, title: 'Manual Book Sinova Kepulauan Riau (Brida)' },
    { id: 4, title: 'Manual Book Sinova Kepulauan Riau (Industri)' },
    { id: 5, title: 'Manual Book Sinova Kepulauan Riau (UMKM)' },
    { id: 6, title: 'Panduan Penggunaan Dashboard' },
    { id: 7, title: 'FAQ dan Troubleshooting' },
    { id: 8, title: 'Kebijakan Privasi dan Data' }
  ];

  const totalPages = Math.ceil(panduanData.length / itemsPerPage);
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = panduanData.slice(indexOfFirstItem, indexOfLastItem);

  const handleDownload = (id: number) => {
    console.log(`Downloading document with id: ${id}`);
    // Implementasi download akan ditambahkan nanti
    alert(`Download dokumen ID: ${id} akan segera dimulai`);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              📚 Dokumentasi & Panduan
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Panduan Penggunaan SINOVA
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Akses panduan lengkap untuk menggunakan platform SINOVA secara optimal
            </p>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#1F4E73] to-[#3e81aa] text-white">
                    <th className="py-4 px-6 text-left font-semibold text-base rounded-tl-lg w-20">
                      No.
                    </th>
                    <th className="py-4 px-6 text-left font-semibold text-base">
                      Judul Panduan
                    </th>
                    <th className="py-4 px-6 text-center font-semibold text-base rounded-tr-lg w-48">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr 
                      key={item.id} 
                      className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-6 text-gray-800 font-medium">
                        {indexOfFirstItem + index + 1}.
                      </td>
                      <td className="py-4 px-6 text-gray-800">
                        {item.title}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleDownload(item.id)}
                          className="inline-flex items-center gap-2 bg-[#1F4E73] hover:bg-[#163d5a] text-white px-5 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
                        >
                          <Download size={16} />
                          <span>Download</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {/* Empty state if no data */}
                  {currentItems.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-12 text-center text-gray-500">
                        Tidak ada panduan tersedia
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap justify-center items-center gap-2 mt-6 pt-4 border-t">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium text-gray-700"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                      currentPage === page
                        ? 'bg-[#1F4E73] text-white shadow-md'
                        : 'border border-gray-300 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium text-gray-700"
                >
                  Next
                </button>
              </div>
            )}

            {/* Info text */}
            {currentItems.length > 0 && (
              <div className="text-center mt-4 text-gray-600 text-sm">
                Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, panduanData.length)} dari {panduanData.length} panduan
              </div>
            )}
          </div>

         
        </div>
      </div>
      <Footer />
    </>
  );
}