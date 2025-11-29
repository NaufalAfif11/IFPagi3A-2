'use client';

import { useState, useEffect } from 'react';
import SidebarPenyedia from '@/components/ui/sidebar_admin';

// Types
interface Riset {
  id: number;
  judul: string;
  periset: string;
  kategori: string;
  link: string;
  status: 'draft' | 'publik';
  tahun: number;
  abstrak: string;
  tanggalDibuat: string;
}

// Initial Data
const initialRisetData: Riset[] = [
  {
    id: 1,
    judul: "AKSESIBILITAS PERLINDUNGAN HUKUM BAGI TENAGA KERJA PENYANDANG DISABILITAS",
    periset: "BAENIL HUDA",
    kategori: "hukum",
    link: "https://scholar.google.com/example1",
    status: "publik",
    tahun: 2024,
    abstrak: "Penelitian tentang aksesibilitas perlindungan hukum bagi tenaga kerja penyandang disabilitas.",
    tanggalDibuat: "2024-01-15"
  },
  {
    id: 2,
    judul: "ANALISIS DAMPAK DIGITALISASI TERHADAP PERTUMBUHAN EKONOMI DAERAH",
    periset: "SARI DEWI",
    kategori: "ekonomi",
    link: "https://scholar.google.com/example2",
    status: "draft",
    tahun: 2024,
    abstrak: "Studi mengenai pengaruh digitalisasi terhadap pertumbuhan ekonomi regional.",
    tanggalDibuat: "2024-01-10"
  },
  {
    id: 3,
    judul: "IMPLEMENTASI TEKNOLOGI BLOCKCHAIN DALAM SISTEM KEAMANAN DATA",
    periset: "RIZKI PRATAMA",
    kategori: "teknologi",
    link: "https://scholar.google.com/example3",
    status: "draft",
    tahun: 2023,
    abstrak: "Riset tentang penerapan teknologi blockchain untuk meningkatkan keamanan data.",
    tanggalDibuat: "2024-01-05"
  }
];

// Configuration
const statusConfig = {
  publik: { label: 'publik', color: 'bg-green-100 text-green-800 border-green-200' },
  draft: { label: 'Draft', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' }
};

const kategoriOptions = [
  { value: 'hukum', label: 'Hukum' },
  { value: 'ekonomi', label: 'Ekonomi' },
  { value: 'teknologi', label: 'Teknologi' },
  { value: 'sosial', label: 'Sosial' },
  { value: 'kesehatan', label: 'Kesehatan' },
  { value: 'pendidikan', label: 'Pendidikan' },
  { value: 'lingkungan', label: 'Lingkungan' },
  { value: 'transportasi', label: 'Transportasi' }
];

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'publik', label: 'publik' }
];

// Components
const RisetFilter = ({ 
  searchTerm, 
  filters, 
  onSearchChange, 
  onFilterChange, 
  onAddNew 
}: {
  searchTerm: string;
  filters: { judul: boolean; periset: boolean; kategori: boolean };
  onSearchChange: (value: string) => void;
  onFilterChange: (filters: { judul: boolean; periset: boolean; kategori: boolean }) => void;
  onAddNew: () => void;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter Pencarian</h2>
      
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Filter Checkboxes */}
        <div className="flex flex-wrap gap-4 items-center">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.judul}
              onChange={(e) => onFilterChange({ ...filters, judul: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <span className="text-sm text-gray-700">Judul Riset</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.periset}
              onChange={(e) => onFilterChange({ ...filters, periset: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <span className="text-sm text-gray-700">Nama Periset</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.kategori}
              onChange={(e) => onFilterChange({ ...filters, kategori: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <span className="text-sm text-gray-700">Kategori Riset</span>
          </label>
        </div>

        {/* Search Input */}
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={onAddNew}
          className="bg-[#1F4E73] hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 shadow-sm"
        >
          <span className="text-lg">+</span>
          <span>Tambah Riset Baru</span>
        </button>
      </div>
    </div>
  );
};

const RisetTable = ({ 
  data, 
  onEdit, 
  onDelete 
}: {
  data: Riset[];
  onEdit: (riset: Riset) => void;
  onDelete: (id: number) => void;
}) => {
  const getKategoriLabel = (kategori: string) => {
    return kategoriOptions.find(opt => opt.value === kategori)?.label || kategori;
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-200">
        <p className="text-gray-500 text-lg">Tidak ada data riset ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                No.
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Judul Riset
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nama Periset
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Dokumen Unduh
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((riset, index) => (
              <tr 
                key={riset.id} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {index + 1}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 max-w-md">
                    {riset.judul}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Tahun: {riset.tahun}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {riset.periset}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {getKategoriLabel(riset.kategori)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusConfig[riset.status].color}`}>
                    {statusConfig[riset.status].label}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <a
                    href={riset.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-900 underline font-medium transition-colors"
                  >
                    Lihat Jurnal
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(riset)}
                      className="text-yellow-700 hover:text-yellow-900 bg-yellow-50 hover:bg-yellow-100 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border border-yellow-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(riset.id)}
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

const RisetModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Riset, 'id' | 'tanggalDibuat'>) => void;
  initialData: Riset | null;
}) => {
  const [formData, setFormData] = useState({
    judul: '',
    periset: '',
    kategori: '',
    link: '',
    abstrak: '',
    tahun: new Date().getFullYear(),
    status: 'draft' as 'draft' | 'publik'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        judul: '',
        periset: '',
        kategori: '',
        link: '',
        abstrak: '',
        tahun: new Date().getFullYear(),
        status: 'draft'
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {initialData ? 'Edit Penelitian Riset' : 'Tambah Penelitan Riset Baru'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Riset *
            </label>
            <input
              type="text"
              required
              value={formData.judul}
              onChange={(e) => handleChange('judul', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Masukkan judul riset..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Periset *
              </label>
              <input
                type="text"
                required
                value={formData.periset}
                onChange={(e) => handleChange('periset', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Nama lengkap periset"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori Riset *
              </label>
              <select
                required
                value={formData.kategori}
                onChange={(e) => handleChange('kategori', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Pilih Kategori</option>
                {kategoriOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link Scholar/DOI *
            </label>
            <input
              type="url"
              required
              value={formData.link}
              onChange={(e) => handleChange('link', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="https://scholar.google.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Abstrak
            </label>
            <textarea
              value={formData.abstrak}
              onChange={(e) => handleChange('abstrak', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Ringkasan hasil riset..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tahun Riset *
              </label>
              <input
                type="number"
                required
                min="2000"
                max="2030"
                value={formData.tahun}
                onChange={(e) => handleChange('tahun', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value as 'draft' | 'publik')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              {initialData ? 'Update' : 'Simpan'} Riset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Component
export default function KelolaRiset() {
  const [activeMenu, setActiveMenu] = useState("Kelola Riset");

  const [risetData, setRisetData] = useState<Riset[]>([]);
  const [filteredData, setFilteredData] = useState<Riset[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    judul: true,
    periset: false,
    kategori: false
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRiset, setEditingRiset] = useState<Riset | null>(null);

  // Load initial data
  useEffect(() => {
    setRisetData(initialRisetData);
    setFilteredData(initialRisetData);
  }, []);

  // Apply filters when search term or filters change
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(risetData);
      return;
    }

    const filtered = risetData.filter(riset => {
      const searchLower = searchTerm.toLowerCase();
      const matches = [];
      
      if (filters.judul) {
        matches.push(riset.judul.toLowerCase().includes(searchLower));
      }
      if (filters.periset) {
        matches.push(riset.periset.toLowerCase().includes(searchLower));
      }
      if (filters.kategori) {
        const kategoriLabel = kategoriOptions.find(opt => opt.value === riset.kategori)?.label || '';
        matches.push(kategoriLabel.toLowerCase().includes(searchLower));
      }
      
      return matches.some(match => match);
    });

    setFilteredData(filtered);
  }, [searchTerm, filters, risetData]);

  const addRiset = (newRiset: Omit<Riset, 'id' | 'tanggalDibuat'>) => {
    const riset: Riset = {
      id: Math.max(...risetData.map(r => r.id), 0) + 1,
      ...newRiset,
      tanggalDibuat: new Date().toISOString().split('T')[0]
    };
    const updatedData = [...risetData, riset];
    setRisetData(updatedData);
  };

  const updateRiset = (id: number, updatedRiset: Omit<Riset, 'id' | 'tanggalDibuat'>) => {
    const updatedData = risetData.map(riset =>
      riset.id === id ? { ...riset, ...updatedRiset } : riset
    );
    setRisetData(updatedData);
  };

  const deleteRiset = (id: number) => {
    const updatedData = risetData.filter(riset => riset.id !== id);
    setRisetData(updatedData);
  };

  const handleAddNew = () => {
    setEditingRiset(null);
    setIsModalOpen(true);
  };

  const handleEdit = (riset: Riset) => {
    setEditingRiset(riset);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus riset ini?')) {
      deleteRiset(id);
    }
  };

  const handleSubmit = (formData: Omit<Riset, 'id' | 'tanggalDibuat'>) => {
    if (editingRiset) {
      updateRiset(editingRiset.id, formData);
    } else {
      addRiset(formData);
    }
  };

  return (
    <div className='flex min-h-screen'>
      <SidebarPenyedia activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1F4E73] to-[#3e81aa] text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white">Kelola Hasil Riset</h1>
          <p className="text-blue-100 text-sm">Selamat datang, Penyedia! Kelola hasil riset Anda di sini</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <RisetFilter
          searchTerm={searchTerm}
          filters={filters}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilters}
          onAddNew={handleAddNew}
        />

        <RisetTable
          data={filteredData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <RisetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={editingRiset}
        />
      </div>
    </div>
    </div>
  );
}