"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/ui/navbar";
import Footer from "@/components/ui/footer";

export default function RisetPage() {
  const [judul, setJudul] = useState("");
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 4;

  // ============================
  // FETCH DATA DARI EXPRESS API
  // ============================
  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/riset?judul=${judul}&namaPeriset=${nama}&kategori=${kategori}&page=${currentPage}&limit=${itemsPerPage}`
      );

      const json = await res.json();

      if (json.success) {
        setData(
          json.data.map((item: any, index: number) => ({
            no: index + 1 + (currentPage - 1) * itemsPerPage,
            judul: item.judul,
            namaPeriset: item.nama_periset,
            kategoriRiset: item.kategori_riset,
            dokumen: item.dokumen_url,
          }))
        );

        setTotalPages(json.pagination.totalPages);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }

    setLoading(false);
  };

  // Load awal
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData();
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // START INDEX & END INDEX
  const startIndex = (currentPage - 1) * itemsPerPage;

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

      <Navbar />

      <div
        className="min-h-screen flex flex-col bg-white py-4 sm:py-8"
        style={{ animation: "fadeIn 0.8s ease-in" }}
      >
        {/* Filter Section */}
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
          style={{ animation: "slideDown 0.6s ease-out" }}
        >
          <div className="bg-[#1F4E73] text-white px-4 py-3 rounded-t-lg font-semibold text-center text-sm sm:text-base">
            Filter Pencarian
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-b-lg shadow-lg flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <input
              type="text"
              placeholder="Judul Riset"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full md:flex-1 text-sm sm:text-base"
            />

            <input
              type="text"
              placeholder="Nama Periset"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full md:flex-1 text-sm sm:text-base"
            />

            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-auto text-sm sm:text-base"
            >
              <option value="">Kategori Riset</option>
              <option value="Semua">Semua</option>
              <option value="Kesehatan">Kesehatan</option>
              <option value="Teknologi">Teknologi</option>
              <option value="Hukum">Hukum</option>
            </select>

            <button
              onClick={handleSearch}
              className="bg-[#1F4E73] text-white px-6 py-2 rounded-lg hover:bg-[#3d7249] transition-all shadow-md w-full md:w-auto text-sm sm:text-base"
            >
              Cari
            </button>
          </div>
        </div>

        {/* Tabel */}
        <div
          className="max-w-6xl mx-auto mt-4 sm:mt-6 px-4 sm:px-6 lg:px-8 w-full"
          style={{ animation: "slideUp 0.8s ease-out" }}
        >
          {/* Loading Text */}
          {loading && (
            <p className="text-center py-4 text-gray-600 text-sm italic">
              Memuat data...
            </p>
          )}

          {/* Desktop Table */}
          {!loading && (
            <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-lg">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-[#1F4E73] text-white">
                    <th className="p-3 w-12 text-center">No.</th>
                    <th className="p-3">Judul Riset</th>
                    <th className="p-3">Nama Periset</th>
                    <th className="p-3">Dokumen Unduh</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((item, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-3 text-center font-bold">{item.no}</td>
                        <td className="p-3">{item.judul}</td>
                        <td className="p-3">{item.namaPeriset}</td>
                        <td className="p-3">
                          <a
                            href={`http://localhost:5000/uploads/${item.dokumen}`}
                            target="_blank"
                            className="text-[#1F4E73] underline font-medium"
                          >
                            Download Dokumen
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-gray-500">
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile Card */}
          <div className="md:hidden space-y-4">
            {!loading &&
              (data.length > 0 ? (
                data.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg shadow-lg p-4 border"
                  >
                    <div className="flex justify-between mb-3 border-b pb-2">
                      <span className="text-[#1F4E73] font-bold text-lg">
                        No. {item.no}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500">Judul Riset</p>
                    <p className="text-sm font-medium mb-3">{item.judul}</p>

                    <p className="text-xs text-gray-500">Nama Periset</p>
                    <p className="text-sm mb-3">{item.namaPeriset}</p>

                    <a
                      href={item.dokumen}
                      target="_blank"
                      className="block text-center bg-[#1F4E73] text-white py-2 rounded-lg"
                    >
                      Download Dokumen
                    </a>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                  <p className="text-gray-500 italic">Tidak ada data</p>
                </div>
              ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center mt-5 gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#1F4E73] hover:text-white"
                }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`px-4 py-2 border rounded-lg ${
                    currentPage === p
                      ? "bg-[#1F4E73] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#1F4E73] hover:text-white"
                }`}
              >
                Next
              </button>
            </div>
          )}

          {/* Info */}
          <div className="text-center mt-2 text-gray-600 text-xs">
            Menampilkan {startIndex + 1} –{" "}
            {startIndex + data.length} hasil
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
