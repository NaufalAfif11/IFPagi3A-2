"use client";

import { useState } from "react";
import Footer from '@/components/ui/footer';
import Navbar from '../components/navbar';


export default function RisetPage() {
  const [judul, setJudul] = useState("");
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const data = Array.from({ length: 12 }, (_, i) => ({
    no: i + 1,
    judul: "AKSESIBILITAS PERLINDUNGAN HUKUM BAGI TENAGA KERJA PENYANDANG DISABILITAS",
    namaPeriset: "BAENIL HUDA",
    kategoriRiset: i % 3 === 0 ? "Kesehatan" : i % 3 === 1 ? "Teknologi" : "Hukum",
    dokumen: "https://www.example.com/dokumen-" + (i + 1),
  }));

  const filtered = data.filter(
    (item) =>
      item.judul.toLowerCase().includes(judul.toLowerCase()) &&
      item.namaPeriset.toLowerCase().includes(nama.toLowerCase()) &&
      (kategori === "" || kategori === "Semua" || kategori === "Kategori Riset" || item.kategoriRiset === kategori)
  );

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset to page 1 when filter changes
  const handleSearch = () => {
    setCurrentPage(1);
  };

  return (
    <>
          <Navbar />
    
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="min-h-screen flex flex-col bg-[#C6E5B3] py-8" style={{ animation: 'fadeIn 0.8s ease-in' }}>
        {/* Filter Section */}
        <div className="max-w-6xl mx-auto px-4 w-full" style={{ animation: 'slideDown 0.6s ease-out' }}>
          <div className="bg-[#2B5235] text-white px-4 py-3 rounded-t-lg font-semibold text-center">
            Filter Pencarian
          </div>
          <div className="bg-white p-4 rounded-b-lg shadow-lg flex flex-col md:flex-row gap-3 md:items-center justify-between">
            <input
              type="text"
              placeholder="Judul Riset"
              value={judul}
              onChange={(e) => {
                setJudul(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-[#2B5235] transition-all"
            />
            <input
              type="text"
              placeholder="Nama Periset"
              value={nama}
              onChange={(e) => {
                setNama(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-[#2B5235] transition-all"
            />
            <select
              value={kategori}
              onChange={(e) => {
                setKategori(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2B5235] transition-all"
            >
              <option>Kategori Riset</option>
              <option>Semua</option>
              <option>Kesehatan</option>
              <option>Teknologi</option>
              <option>Hukum</option>
            </select>
            <button 
              onClick={handleSearch}
              className="bg-[#2B5235] text-white px-6 py-2 rounded-lg hover:bg-[#3d7249] transition-all transform hover:scale-105 shadow-md"
            >
              Cari
            </button>
          </div>
        </div>

        {/* Tabel */}
        <div className="max-w-6xl mx-auto mt-6 px-4 w-full" style={{ animation: 'slideUp 0.8s ease-out' }}>
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-[#2B5235] text-white">
                  <th className="p-3 w-12 text-center border border-[#3d7249]">No.</th>
                  <th className="p-3 border border-[#3d7249]">Judul Riset</th>
                  <th className="p-3 border border-[#3d7249]">Nama Periset</th>
                  <th className="p-3 border border-[#3d7249]">Dokumen Unduh</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((item, index) => (
                    <tr 
                      key={item.no} 
                      className="border-b hover:bg-[#e8f5e0] transition-colors duration-200"
                      style={{ 
                        animation: `fadeIn ${0.3 + index * 0.1}s ease-in` 
                      }}
                    >
                      <td className="p-3 text-center border border-gray-200 font-bold">{item.no}.</td>
                      <td className="p-3 border border-gray-200">{item.judul}</td>
                      <td className="p-3 border border-gray-200">{item.namaPeriset}</td>
                      <td className="p-3 border border-gray-200">
                        <a
                          href={item.dokumen}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#2B5235] hover:text-[#3d7249] underline font-medium transition-colors"
                        >
                          Download Dokumen
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500 italic">
                      Tidak ada data yang cocok dengan pencarian Anda
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                  currentPage === 1 
                    ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400" 
                    : "hover:bg-[#2B5235] hover:text-white hover:border-[#2B5235] transform hover:scale-105"
                }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                    currentPage === page
                      ? "bg-[#2B5235] text-white border-[#2B5235] shadow-md"
                      : "hover:bg-[#e8f5e0] hover:border-[#2B5235] transform hover:scale-105"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                    : "hover:bg-[#2B5235] hover:text-white hover:border-[#2B5235] transform hover:scale-105"
                }`}
              >
                Next
              </button>
            </div>
          )}

          {/* Info */}
          <div className="text-center mt-4 text-gray-600 text-sm">
            Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filtered.length)} dari {filtered.length} hasil
          </div>
        </div>
      </div>
          <Footer />
      
    </>
  );
}