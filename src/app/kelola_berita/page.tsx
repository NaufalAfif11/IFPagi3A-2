'use client';

import { useState, useEffect } from 'react';

// Types
interface Berita {
  id: number;
  judul: string;
  isi: string;
  thumbnail: string;
  kategori: string;
  status: 'draft' | 'publik';
  tanggalDibuat: string;
  penulis: string;
}

// Initial Data (fallback jika backend mati)
const initialBeritaData: Berita[] = [
  {
    id: 1,
    judul: "Peluncuran Program Literasi Digital untuk UMKM Batam",
    isi: "Pemerintah Kota Batam meluncurkan program literasi digital yang bertujuan untuk meningkatkan kemampuan pelaku UMKM dalam memanfaatkan teknologi digital untuk mengembangkan usaha mereka. Program ini akan berlangsung selama 6 bulan dan melibatkan lebih dari 500 pelaku UMKM.",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400",
    kategori: "teknologi",
    status: "publik",
    tanggalDibuat: "2024-12-01",
    penulis: "Admin"
  },
  {
    id: 2,
    judul: "Peningkatan Infrastruktur Jalan di Kawasan Industri",
    isi: "Proyek pembangunan infrastruktur jalan di kawasan industri Batamindo dimulai hari ini. Proyek senilai 50 miliar rupiah ini diharapkan dapat meningkatkan aksesibilitas dan mendukung pertumbuhan ekonomi daerah.",
    thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400",
    kategori: "infrastruktur",
    status: "publik",
    tanggalDibuat: "2024-11-28",
    penulis: "Admin"
  },
  {
    id: 3,
    judul: "Workshop Kewirausahaan untuk Generasi Muda",
    isi: "Dinas Koperasi dan UKM menggelar workshop kewirausahaan yang diikuti oleh 200 pemuda dari berbagai kecamatan. Workshop ini menghadirkan narasumber dari pengusaha sukses dan praktisi bisnis.",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
    kategori: "ekonomi",
    status: "draft",
    tanggalDibuat: "2024-11-25",
    penulis: "Admin"
  }
];

// Configuration
const statusConfig = {
  publik: { label: 'Publik', color: 'bg-green-100 text-green-800 border-green-200' },
  draft: { label: 'Draft', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' }
};

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'publik', label: 'Publik' }
];

// API URL (sesuaikan jika endpoint berbeda)
const API_URL = 'http://localhost:5000/api/berita';

// Components
const BeritaFilter = ({ 
  searchTerm, 
  filters, 
  onSearchChange, 
  onFilterChange, 
  onAddNew 
}: {
  searchTerm: string;
  filters: { judul: boolean };
  onSearchChange: (value: string) => void;
  onFilterChange: (filters: { judul: boolean }) => void;
  onAddNew: () => void;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-4 md:mb-6 border border-gray-200">
      <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Filter Pencarian</h2>
      
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari berita berdasarkan judul..."
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        <button
          onClick={onAddNew}
          className="bg-[#1F4E73] hover:bg-blue-900 text-white px-4 md:px-6 py-2 rounded-lg text-sm md:text-base font-medium transition-colors duration-200 flex items-center justify-center space-x-2 shadow-sm whitespace-nowrap"
        >
          <span className="text-lg">+</span>
          <span className="hidden sm:inline">Tambah Berita Baru</span>
          <span className="sm:hidden">Tambah Berita</span>
        </button>
      </div>
    </div>
  );
};

const BeritaTable = ({ 
  data, 
  onEdit, 
  onDelete,
  onView
}: {
  data: Berita[];
  onEdit: (berita: Berita) => void;
  onDelete: (id: number) => void;
  onView: (berita: Berita) => void;
}) => {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-200">
        <p className="text-gray-500 text-lg">Tidak ada berita ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* Mobile Card View */}
      <div className="block md:hidden">
        {data.map((berita, index) => (
          <div key={berita.id} className="border-b border-gray-200 p-4 hover:bg-gray-50">
            <div className="flex gap-3 mb-3">
              <img 
                src={berita.thumbnail} 
                alt={berita.judul}
                className="w-20 h-20 object-cover rounded-lg shadow-sm flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                  {berita.judul}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold border 
  ${statusConfig[berita.status ?? 'draft'].color}`}>
  {statusConfig[berita.status ?? 'draft'].label}
</span>

                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-2 line-clamp-2">{berita.isi}</p>
            <div className="text-xs text-gray-500 mb-3">
              {new Date(berita.tanggalDibuat).toLocaleDateString('id-ID')}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onView(berita)}
                className="flex-1 text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md text-xs font-medium transition-colors border border-blue-200"
              >
                Lihat
              </button>
              <button
                onClick={() => onEdit(berita)}
                className="flex-1 text-yellow-700 hover:text-yellow-900 bg-yellow-50 hover:bg-yellow-100 px-3 py-1.5 rounded-md text-xs font-medium transition-colors border border-yellow-200"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(berita.id)}
                className="flex-1 text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md text-xs font-medium transition-colors border border-red-200"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                No.
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Thumbnail
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Judul Berita
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((berita, index) => (
              <tr 
                key={berita.id} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={berita.thumbnail} 
                    alt={berita.judul}
                    className="w-16 h-16 object-cover rounded-lg shadow-sm"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 max-w-md">
                    {berita.judul}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {berita.isi}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <span
  className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border 
  ${statusConfig[berita.status ?? 'draft'].color}`}
>
  {statusConfig[berita.status ?? 'draft'].label}
</span>

                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(berita.tanggalDibuat).toLocaleDateString('id-ID')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onView(berita)}
                      className="text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border border-blue-200"
                    >
                      Lihat
                    </button>
                    <button
                      onClick={() => onEdit(berita)}
                      className="text-yellow-700 hover:text-yellow-900 bg-yellow-50 hover:bg-yellow-100 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border border-yellow-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(berita.id)}
                      className="text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border border-red-200"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const BeritaModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Berita, 'id' | 'tanggalDibuat' | 'penulis'>) => void;
  initialData: Berita | null;
}) => {
  const [formData, setFormData] = useState({
    judul: '',
    isi: '',
    thumbnail: '',
    kategori: '',
    status: 'draft' as 'draft' | 'publik'
  });
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        judul: initialData.judul,
        isi: initialData.isi,
        thumbnail: initialData.thumbnail,
        kategori: initialData.kategori,
        status: initialData.status
      });
      setPreviewImage(initialData.thumbnail);
    } else {
      setFormData({
        judul: '',
        isi: '',
        thumbnail: '',
        kategori: '',
        status: 'draft'
      });
      setPreviewImage('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.judul || !formData.isi) {
      alert('Mohon lengkapi semua field yang wajib diisi!');
      return;
    }
    onSubmit(formData);
    onClose();
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData(prev => ({ ...prev, thumbnail: result }));
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-3xl my-8 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6 border-b border-gray-200 sticky top-0 bg-white z-10 flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            {initialData ? 'Edit Berita' : 'Tambah Berita Baru'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Berita *
            </label>
            <input
              type="text"
              value={formData.judul}
              onChange={(e) => handleChange('judul', e.target.value)}
              className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Masukkan judul berita..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Isi Berita *
            </label>
            <textarea
              value={formData.isi}
              onChange={(e) => handleChange('isi', e.target.value)}
              rows={6}
              className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Tulis isi berita lengkap di sini..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Thumbnail *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:md:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {previewImage && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className="w-full max-w-md h-40 md:h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value as 'draft' | 'publik')}
                className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 text-sm md:text-base text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors font-medium"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full sm:w-auto px-6 py-2 text-sm md:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              {initialData ? 'Update' : 'Publikasikan'} Berita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BeritaViewModal = ({
  isOpen,
  onClose,
  berita
}: {
  isOpen: boolean;
  onClose: () => void;
  berita: Berita | null;
}) => {
  if (!isOpen || !berita) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-3xl my-8 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={berita.thumbnail} 
            alt={berita.judul}
            className="w-full h-48 md:h-64 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 md:top-4 md:right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-3 md:space-y-4">
          <div className="flex items-center flex-wrap gap-2">
            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${statusConfig[berita.status].color}`}>
              {statusConfig[berita.status].label}
            </span>
          </div>

          <h1 className="text-xl md:text-3xl font-bold text-gray-900">{berita.judul}</h1>

          <div className="flex items-center text-xs md:text-sm text-gray-500 flex-wrap gap-2 md:gap-4">
            <span>Oleh: {berita.penulis}</span>
            <span className="hidden md:inline">•</span>
            <span>{new Date(berita.tanggalDibuat).toLocaleDateString('id-ID', { 
              day: 'numeric',
              month: 'long', 
              year: 'numeric' 
            })}</span>
          </div>

          <div className="border-t border-gray-200 pt-3 md:pt-4">
            <p className="text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">{berita.isi}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function KelolaBerita() {
  const [beritaData, setBeritaData] = useState<Berita[]>(initialBeritaData);
  const [filteredData, setFilteredData] = useState<Berita[]>(initialBeritaData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    judul: true
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingBerita, setEditingBerita] = useState<Berita | null>(null);
  const [viewingBerita, setViewingBerita] = useState<Berita | null>(null);

  useEffect(() => {
    // fetch from backend, fallback to initial data if error
    const fetchFromApi = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        // assume backend returns array of berita
        if (Array.isArray(data)) {
          setBeritaData(data);
          setFilteredData(data);
        } else if (data && Array.isArray(data.data)) {
          // support responses like { data: [...] }
          setBeritaData(data.data);
          setFilteredData(data.data);
        } else {
          // fallback
          setBeritaData(initialBeritaData);
          setFilteredData(initialBeritaData);
        }
      } catch (err) {
        console.error('Gagal fetch dari API, gunakan data lokal:', err);
        setBeritaData(initialBeritaData);
        setFilteredData(initialBeritaData);
      }
    };

    fetchFromApi();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(beritaData);
      return;
    }

    const filtered = beritaData.filter(berita => {
      const searchLower = searchTerm.toLowerCase();
      return berita.judul.toLowerCase().includes(searchLower);
    });

    setFilteredData(filtered);
  }, [searchTerm, beritaData]);

  const addBerita = async (newBerita: Omit<Berita, 'id' | 'tanggalDibuat' | 'penulis'>) => {
    try {
      const payload = { ...newBerita, penulis: 'Admin' };
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const saved = await res.json();
      // backend might return saved object directly or { data: saved }
      const beritaSaved = saved && saved.id ? saved : (saved.data || saved.berita || saved);

      setBeritaData(prev => [...prev, beritaSaved]);
    } catch (err) {
      console.error('Gagal tambah berita ke API, tambahkan ke lokal sebagai fallback:', err);
      // fallback lokal
      const berita: Berita = {
        id: Math.max(...beritaData.map(b => b.id), 0) + 1,
        ...newBerita,
        tanggalDibuat: new Date().toISOString().split('T')[0],
        penulis: 'Admin'
      };
      setBeritaData(prev => [...prev, berita]);
    }
  };

  const updateBerita = async (id: number, updatedBerita: Omit<Berita, 'id' | 'tanggalDibuat' | 'penulis'>) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBerita)
      });

      const updated = await res.json();
      const beritaUpdated = updated && updated.id ? updated : (updated.data || updated.berita || updated);

      setBeritaData(prev => prev.map(b => b.id === id ? { ...b, ...beritaUpdated } : b));
    } catch (err) {
      console.error('Gagal update ke API, update lokal sebagai fallback:', err);
      setBeritaData(prev => prev.map(b => b.id === id ? { ...b, ...updatedBerita } : b));
    }
  };

  const deleteBerita = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setBeritaData(prev => prev.filter(berita => berita.id !== id));
    } catch (err) {
      console.error('Gagal hapus dari API, hapus lokal sebagai fallback:', err);
      setBeritaData(prev => prev.filter(berita => berita.id !== id));
    }
  };

  const handleAddNew = () => {
    setEditingBerita(null);
    setIsModalOpen(true);
  };

  const handleEdit = (berita: Berita) => {
    setEditingBerita(berita);
    setIsModalOpen(true);
  };

  const handleView = (berita: Berita) => {
    setViewingBerita(berita);
    setIsViewModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      deleteBerita(id);
    }
  };

  const handleSubmit = (formData: Omit<Berita, 'id' | 'tanggalDibuat' | 'penulis'>) => {
    if (editingBerita) {
      updateBerita(editingBerita.id, formData);
    } else {
      addBerita(formData);
    }
  };

  return (
    <div className="flex-1 w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1F4E73] to-[#3e81aa] text-white py-6 md:py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Kelola Berita</h1>
          <p className="text-blue-100 text-xs md:text-sm mt-1">Kelola dan publikasikan berita terbaru</p>
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <BeritaFilter
          searchTerm={searchTerm}
          filters={filters}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilters}
          onAddNew={handleAddNew}
        />

        <BeritaTable
          data={filteredData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />

        <BeritaModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={editingBerita}
        />

        <BeritaViewModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          berita={viewingBerita}
        />
      </div>
    </div>
  );
}
