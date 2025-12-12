"use client";

import { useState, useEffect, useMemo } from 'react';
import SidebarPenyedia from '@/components/ui/sidebar_penyedia';

const API_URL = "http://localhost:5000/api/riset";

interface Riset {
  id: string;
  judul: string;
  periset: string;
  kategori: string;
  link: string;
  tanggalDibuat: string;
  tahun: number;
  status: string;
}

export default function ResearchManagement() {
  const [data, setData] = useState<Riset[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    judul: true,
    periset: false,
    kategori: false
  });

  const [formData, setFormData] = useState({
    id: "",
    judul: "",
    periset: "",
    kategori: "",
    file: null as File | null
  });

  // Filtered data based on search
 const filteredData = useMemo(() => {

    if (!searchTerm) return data;

    return data.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      return (
        (filters.judul && item.judul.toLowerCase().includes(searchLower)) ||
        (filters.periset && item.periset.toLowerCase().includes(searchLower)) ||
        (filters.kategori && item.kategori.toLowerCase().includes(searchLower))
      );
    });
  }, [data, searchTerm, filters]);

  // FETCH DATA
  const fetchData = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching from:', `${API_URL}?page=${page}`);
      
      const res = await fetch(`${API_URL}?page=${page}&limit=10`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();
      console.log('Response:', json);

      if (json.success && json.data) {
        const mapped = json.data.map((item: any) => ({
          id: item.id.toString(),
          judul: item.judul,
          periset: item.nama_periset,
          kategori: item.kategori_riset,
          link: item.dokumen_url,
          tanggalDibuat: item.created_at,
          tahun: new Date(item.created_at).getFullYear(),
          status: "publik"
        }));

        setData(mapped);
        
        if (json.pagination) {
          setTotalPages(json.pagination.totalPages || 1);
        }
      } else {
        setData([]);
      }
      
    } catch (err) {
      console.error("Fetch error:", err);
      alert('Gagal mengambil data! Pastikan backend running di http://localhost:5000');
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  // OPEN MODAL
  const openAddModal = () => {
    setIsEdit(false);
    setFormData({ id: "", judul: "", periset: "", kategori: "", file: null });
    setIsModalOpen(true);
  };

  const openEditModal = (item: Riset) => {
    setIsEdit(true);
    setFormData({
      id: item.id,
      judul: item.judul,
      periset: item.periset,
      kategori: item.kategori,
      file: null
    });
    setIsModalOpen(true);
  };

  // CREATE
  const handleCreate = async () => {
    if (!formData.judul || !formData.periset || !formData.kategori) {
      alert('Semua field harus diisi!');
      return;
    }

    setIsLoading(true);
    try {
      const fd = new FormData();
      fd.append("judul", formData.judul);
      fd.append("namaPeriset", formData.periset);
      fd.append("kategoriRiset", formData.kategori);
      if (formData.file) {
        fd.append("dokumen", formData.file);
      }

      console.log('Creating...');
      
      const res = await fetch(API_URL, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();
      console.log('Create response:', json);

      if (json.success) {
        alert('Data berhasil ditambahkan!');
        setIsModalOpen(false);
        setFormData({ id: "", judul: "", periset: "", kategori: "", file: null });
        fetchData();
      } else {
        alert(json.message || 'Gagal menambahkan data!');
      }
    } catch (error) {
      console.error('Create error:', error);
      alert('Gagal menambahkan data!');
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!formData.judul || !formData.periset || !formData.kategori) {
      alert('Semua field harus diisi!');
      return;
    }

    setIsLoading(true);
    try {
      const fd = new FormData();
      fd.append("judul", formData.judul);
      fd.append("namaPeriset", formData.periset);
      fd.append("kategoriRiset", formData.kategori);
      if (formData.file) {
        fd.append("dokumen", formData.file);
      }

      console.log('Updating:', formData.id);

      const res = await fetch(`${API_URL}/${formData.id}`, {
        method: "PUT",
        body: fd,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();

      if (json.success) {
        alert('Data berhasil diupdate!');
        setIsModalOpen(false);
        setFormData({ id: "", judul: "", periset: "", kategori: "", file: null });
        fetchData();
      } else {
        alert(json.message || 'Gagal mengupdate data!');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Gagal mengupdate data!');
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, { 
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();
      
      if (json.success) {
        alert('Data berhasil dihapus!');
        fetchData();
      } else {
        alert(json.message || 'Gagal menghapus data!');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Gagal menghapus data!');
    } finally {
      setIsLoading(false);
    }
  };

  // FILTER COMPONENT
  const RisetFilter = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter Pencarian</h2>
        
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex flex-wrap gap-4 items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.judul}
                onChange={(e) => setFilters({ ...filters, judul: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">Judul Riset</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.periset}
                onChange={(e) => setFilters({ ...filters, periset: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">Nama Periset</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.kategori}
                onChange={(e) => setFilters({ ...filters, kategori: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">Kategori Riset</span>
            </label>
          </div>

          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    );
  };

  const [activeMenu, setActiveMenu] = useState("Kelola Riset");

  return (
    <div className="flex min-h-screen">
      <SidebarPenyedia activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 min-h-screen bg-gray-50">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#1F4E73] to-[#3e81aa] text-white py-8 shadow-lg">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Kelola Hasil Riset</h1>
            <p className="text-blue-100 text-sm">
              Selamat datang, Penyedia! Kelola hasil riset Anda di sini
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="container mx-auto px-4 py-8">
          <RisetFilter />

          {/* HEADER TABLE */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Manajemen Data Riset</h2>
            <button
              onClick={openAddModal}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              Tambah Riset
            </button>
          </div>

          {/* LOADING */}
          {isLoading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          )}

          {/* TABLE */}
          {!isLoading && (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3 text-left">Judul</th>
                    <th className="p-3 text-left">Periset</th>
                    <th className="p-3 text-left">Kategori</th>
                    <th className="p-3 text-left">Dokumen</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-500">
                        Tidak ada data riset
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{item.judul}</td>
                        <td className="p-3">{item.periset}</td>
                        <td className="p-3">{item.kategori}</td>
                        <td className="p-3">
                          {item.link ? (
                            <a
                              href={`http://localhost:5000/uploads/${item.link}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline hover:text-blue-800"
                            >
                              Lihat PDF
                            </a>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => openEditModal(item)}
                              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* PAGINATION */}
          <div className="flex justify-center mt-6 gap-2 items-center">
            <button
              disabled={page === 1 || isLoading}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-2 border rounded disabled:bg-gray-200 hover:bg-gray-100"
            >
              Previous
            </button>
            <span className="px-4">
              Halaman {page} dari {totalPages}
            </span>
            <button
              disabled={page === totalPages || isLoading}
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 border rounded disabled:bg-gray-200 hover:bg-gray-100"
            >
              Next
            </button>
          </div>

          {/* MODAL */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
                <h3 className="text-xl font-bold mb-4">
                  {isEdit ? "Edit Riset" : "Tambah Riset"}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">
                      Judul <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.judul}
                      onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan judul riset"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">
                      Nama Periset <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.periset}
                      onChange={(e) => setFormData({ ...formData, periset: e.target.value })}
                      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan nama periset"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">
                      Kategori <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.kategori}
                      onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan kategori"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">
                      Upload PDF {!isEdit && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                      className="w-full border px-3 py-2 rounded"
                    />
                    {formData.file && (
                      <p className="text-sm text-gray-600 mt-1">
                        File: {formData.file.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button 
                    onClick={() => {
                      setIsModalOpen(false);
                      setFormData({ id: "", judul: "", periset: "", kategori: "", file: null });
                    }}
                    disabled={isLoading}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Batal
                  </button>
                  <button
                    onClick={isEdit ? handleUpdate : handleCreate}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {isLoading ? 'Loading...' : (isEdit ? "Update" : "Simpan")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}