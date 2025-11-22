"use client";

import { useState } from "react";
import Navbar from "../../components/ui/navbar"
import Footer from "@/components/ui/footer";

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
      <Navbar/>

      <div className="min-h-screen flex flex-col bg-white py-4 sm:py-8" style={{ animation: 'fadeIn 0.8s ease-in' }}>
        {/* Filter Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ animation: 'slideDown 0.6s ease-out' }}>
          <div className="bg-[#1F4E73] text-white px-4 py-3 rounded-t-lg font-semibold text-center text-sm sm:text-base">
            Filter Pencarian
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-b-lg shadow-lg flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <input
              type="text"
              placeholder="Judul Riset"
              value={judul}
              onChange={(e) => {
                setJudul(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full md:flex-1 focus:outline-none focus:ring-2 focus:ring-[#1F4E73] transition-all text-sm sm:text-base"
            />
            <input
              type="text"
              placeholder="Nama Periset"
              value={nama}
              onChange={(e) => {
                setNama(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full md:flex-1 focus:outline-none focus:ring-2 focus:ring-[#1F4E73] transition-all text-sm sm:text-base"
            />
            <select
              value={kategori}
              onChange={(e) => {
                setKategori(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-[#1F4E73] transition-all text-sm sm:text-base"
            >
              <option>Kategori Riset</option>
              <option>Semua</option>
              <option>Kesehatan</option>
              <option>Teknologi</option>
              <option>Hukum</option>
            </select>
            <button 
              onClick={handleSearch}
              className="bg-[#1F4E73] text-white px-6 py-2 rounded-lg hover:bg-[#3d7249] transition-all transform hover:scale-105 shadow-md w-full md:w-auto text-sm sm:text-base"
            >
              Cari
            </button>
          </div>
        </div>

        {/* Tabel */}
        <div className="max-w-6xl mx-auto mt-4 sm:mt-6 px-4 sm:px-6 lg:px-8 w-full" style={{ animation: 'slideUp 0.8s ease-out' }}>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-[#1F4E73] text-white">
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
                      className="border-b hover:bg-[#white] transition-colors duration-200"
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
                          className="text-[#1F4E73] hover:text-[#3d7249] underline font-medium transition-colors"
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

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <div 
                  key={item.no}
                  className="bg-white rounded-lg shadow-lg p-4 border border-gray-200"
                  style={{ 
                    animation: `fadeIn ${0.3 + index * 0.1}s ease-in` 
                  }}
                >
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                    <span className="text-[#1F4E73] font-bold text-lg">No. {item.no}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 font-semibold mb-1">Judul Riset</p>
                      <p className="text-sm font-medium text-gray-800">{item.judul}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 font-semibold mb-1">Nama Periset</p>
                      <p className="text-sm text-gray-800">{item.namaPeriset}</p>
                    </div>
                    
                    <div>
                      <a
                        href={item.dokumen}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full text-center bg-[#1F4E73] text-white px-4 py-2 rounded-lg hover:bg-[#3d7249] transition-all font-medium text-sm"
                      >
                        Download Dokumen
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <p className="text-gray-500 italic">Tidak ada data yang cocok dengan pencarian Anda</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center mt-4 sm:mt-6 gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 sm:px-4 py-2 border rounded-lg font-medium transition-all text-sm sm:text-base ${
                  currentPage === 1 
                    ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400" 
                    : "hover:bg-[#1F4E73] hover:text-white hover:border-[#1F4E73] transform hover:scale-105"
                }`}
              >
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>

              <div className="flex flex-wrap justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 sm:px-4 py-2 border rounded-lg font-medium transition-all text-sm sm:text-base ${
                      currentPage === page
                        ? "bg-[#1F4E73] text-white border-[#1F4E73] shadow-md"
                        : "hover:bg-[#white] hover:border-[#1F4E73] transform hover:scale-105"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 sm:px-4 py-2 border rounded-lg font-medium transition-all text-sm sm:text-base ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                    : "hover:bg-[#1F4E73] hover:text-white hover:border-[#1F4E73] transform hover:scale-105"
                }`}
              >
                Next
              </button>
            </div>
          )}

          {/* Info */}
          <div className="text-center mt-3 sm:mt-4 text-gray-600 text-xs sm:text-sm">
            Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filtered.length)} dari {filtered.length} hasil
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}