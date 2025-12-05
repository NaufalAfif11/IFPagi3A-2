'use client';

import React, { useEffect, useState } from 'react';
import SidebarAdmin from '@/components/ui/sidebar_admin'; // sesuaikan path kalau beda

// ---------------- Types ----------------
type Status = 'draft' | 'publik';

interface Berita {
  id: number;
  judul: string;
  isi: string;
  thumbnail: string; // URL
  status: Status;
  tanggal_dibuat?: string;
  penulis?: string | null;
}

// ---------------- Config ----------------
const API_URL = 'http://localhost:5000/api/berita';

const statusConfig: Record<Status, { label: string; className: string }> = {
  publik: { label: 'Publik', className: 'bg-green-50 text-green-800 border-green-200' },
  draft: { label: 'Draft', className: 'bg-yellow-50 text-yellow-800 border-yellow-200' },
};

// ---------------- Helpers ----------------
const parseResponseData = (resJson: any) => {
  if (!resJson) return null;
  if (Array.isArray(resJson)) return resJson;
  if (Array.isArray(resJson.data)) return resJson.data;
  if (resJson.data && (Array.isArray(resJson.data) || typeof resJson.data === 'object')) return resJson.data;
  return resJson;
};

const normalizeThumbnail = (item: any) => {
  if (!item) return item;
  if (item.thumbnail && typeof item.thumbnail === 'string' && !item.thumbnail.startsWith('http')) {
    const base = typeof window !== 'undefined' ? window.location.origin : '';
    item.thumbnail = item.thumbnail.startsWith('/') ? `${base}${item.thumbnail}` : `${base}/${item.thumbnail}`;
  }
  return item;
};

// ---------------- Components ----------------

// Filter Component
function BeritaFilter({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterStatusChange,
  onAddNew
}: {
  searchTerm: string;
  onSearchChange: (v: string) => void;
  filterStatus: string;
  onFilterStatusChange: (v: string) => void;
  onAddNew: () => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-4 md:mb-6 border border-gray-200">
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari berita berdasarkan judul atau isi..."
          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <select
          value={filterStatus}
          onChange={(e) => onFilterStatusChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="all">Semua Status</option>
          <option value="publik">Publik</option>
          <option value="draft">Draft</option>
        </select>

        <div className="ml-auto w-full md:w-auto">
          <button
            onClick={onAddNew}
            className="w-full md:w-auto bg-[#1F4E73] hover:bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
          >
            <span className="text-lg">+</span>
            <span>Tambah Berita</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Table Component
function BeritaTable({
  data,
  onEdit,
  onDelete,
  onView
}: {
  data: Berita[];
  onEdit: (b: Berita) => void;
  onDelete: (id: number) => void;
  onView: (b: Berita) => void;
}) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-200">
        <p className="text-gray-500 text-lg">Tidak ada berita ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* mobile list */}
      <div className="block md:hidden">
        {data.map((b) => (
          <div key={b.id} className="border-b border-gray-200 p-4 hover:bg-gray-50">
            <div className="flex gap-3 mb-3">
              <img src={b.thumbnail} alt={b.judul} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{b.judul}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold border ${b.status ? statusConfig[b.status].className : ''}`}>
                    {b.status ? statusConfig[b.status].label : '—'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">{b.isi}</p>
                <div className="text-xs text-gray-500 mb-3">{b.tanggal_dibuat ? new Date(b.tanggal_dibuat).toLocaleDateString('id-ID') : '-'}</div>
                <div className="flex gap-2">
                  <button onClick={() => onView(b)} className="flex-1 text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md text-xs font-medium border border-blue-200">Lihat</button>
                  <button onClick={() => onEdit(b)} className="flex-1 text-yellow-700 bg-yellow-50 px-3 py-1.5 rounded-md text-xs font-medium border border-yellow-200">Edit</button>
                  <button onClick={() => onDelete(b.id)} className="flex-1 text-red-700 bg-red-50 px-3 py-1.5 rounded-md text-xs font-medium border border-red-200">Hapus</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">No.</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thumbnail</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Judul</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tanggal</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((b, idx) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{idx + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={b.thumbnail} alt={b.judul} className="w-16 h-16 object-cover rounded-lg" />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 max-w-md">{b.judul}</div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2">{b.isi}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${b.status ? statusConfig[b.status].className : ''}`}>
                    {b.status ? statusConfig[b.status].label : '—'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.tanggal_dibuat ? new Date(b.tanggal_dibuat).toLocaleDateString('id-ID') : '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button onClick={() => onView(b)} className="text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md text-sm font-medium border border-blue-200">Lihat</button>
                    <button onClick={() => onEdit(b)} className="text-yellow-700 bg-yellow-50 px-3 py-1.5 rounded-md text-sm font-medium border border-yellow-200">Edit</button>
                    <button onClick={() => onDelete(b.id)} className="text-red-700 bg-red-50 px-3 py-1.5 rounded-md text-sm font-medium border border-red-200">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Modal Add/Edit
function BeritaModal({
  isOpen,
  onClose,
  onSubmit,
  initialData
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: { judul: string; isi: string; status: Status; thumbnail?: File | null }) => void;
  initialData: Berita | null;
}) {
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [status, setStatus] = useState<Status>('draft');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      setJudul(initialData.judul ?? '');
      setIsi(initialData.isi ?? '');
      setStatus(initialData.status ?? 'draft');
      setFile(null);
      setPreview(initialData.thumbnail ?? '');
    } else {
      setJudul('');
      setIsi('');
      setStatus('draft');
      setFile(null);
      setPreview('');
    }
  }, [initialData, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreview(initialData?.thumbnail ?? '');
    }
  };

  const handleSubmit = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!judul.trim() || !isi.trim()) {
      alert('Judul dan isi wajib diisi');
      return;
    }
    onSubmit({ judul: judul.trim(), isi: isi.trim(), status, thumbnail: file ?? undefined });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-3xl my-8 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6 border-b border-gray-200 sticky top-0 bg-white z-10 flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">{initialData ? 'Edit Berita' : 'Tambah Berita Baru'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg></button>
        </div>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Judul Berita *</label>
            <input value={judul} onChange={(e) => setJudul(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Masukkan judul berita..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Isi Berita *</label>
            <textarea value={isi} onChange={(e) => setIsi(e.target.value)} rows={6} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Tulis isi berita..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Thumbnail</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
            {preview && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img src={preview} alt="preview" className="w-full max-w-md h-40 object-cover rounded-lg" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as Status)} className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="draft">Draft</option>
              <option value="publik">Publik</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button onClick={onClose} className="px-6 py-2 text-sm bg-gray-100 rounded-md">Batal</button>
            <button onClick={handleSubmit} className="px-6 py-2 text-sm bg-blue-600 text-white rounded-md">{initialData ? 'Update' : 'Publikasikan'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// View Modal
function BeritaViewModal({ isOpen, onClose, berita }: { isOpen: boolean; onClose: () => void; berita: Berita | null; }) {
  if (!isOpen || !berita) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-3xl my-8 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {berita.thumbnail && <img src={berita.thumbnail} alt={berita.judul} className="w-full h-48 md:h-64 object-cover rounded-t-lg" />}
          <button onClick={onClose} className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"><svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg></button>
        </div>

        <div className="p-4 md:p-6 space-y-3 md:space-y-4">
          <div className="flex items-center flex-wrap gap-2">
            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${statusConfig[berita.status].className}`}>
              {statusConfig[berita.status].label}
            </span>
          </div>

          <h1 className="text-xl md:text-3xl font-bold text-gray-900">{berita.judul}</h1>

          <div className="flex items-center text-xs md:text-sm text-gray-500 flex-wrap gap-2 md:gap-4">
            <span>Oleh: {berita.penulis ?? '—'}</span>
            <span className="hidden md:inline">•</span>
            <span>{berita.tanggal_dibuat ? new Date(berita.tanggal_dibuat).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</span>
          </div>

          <div className="border-t border-gray-200 pt-3 md:pt-4">
            <p className="text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">{berita.isi}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------- Main Page ----------------
export default function KelolaBeritaPage() {
  const [beritaData, setBeritaData] = useState<Berita[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | Status>('all');

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBerita, setEditingBerita] = useState<Berita | null>(null);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewingBerita, setViewingBerita] = useState<Berita | null>(null);

  // fetch
  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        const parsed = parseResponseData(json);
        if (Array.isArray(parsed)) {
          // normalize thumbnails
          const normalized = parsed.map((p: any) => normalizeThumbnail(p));
          setBeritaData(normalized);
        } else {
          setBeritaData([]);
        }
      } catch (err) {
        console.error('Gagal fetch berita:', err);
        setBeritaData([]);
      }
    };
    fetchBerita();
  }, []);

  // filter + search
  const filtered = beritaData.filter((b) => {
    const matchesSearch = searchTerm.trim() === '' || b.judul.toLowerCase().includes(searchTerm.toLowerCase()) || b.isi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ? true : b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // create
  const addBerita = async (payload: { judul: string; isi: string; status: Status; thumbnail?: File | null }) => {
    try {
      const form = new FormData();
      form.append('judul', payload.judul);
      form.append('isi', payload.isi);
      form.append('status', payload.status);
      if (payload.thumbnail instanceof File) form.append('thumbnail', payload.thumbnail);

      const res = await fetch(API_URL, { method: 'POST', body: form });
      const json = await res.json();
      const saved = json?.data ?? json;
      normalizeThumbnail(saved);
      setBeritaData(prev => [...prev, saved]);
    } catch (err) {
      console.error('Gagal tambah berita:', err);
      alert('Gagal menambahkan berita. Cek console.');
    }
  };

  // update
  const updateBerita = async (id: number, payload: { judul: string; isi: string; status: Status; thumbnail?: File | null }) => {
    try {
      const form = new FormData();
      form.append('judul', payload.judul);
      form.append('isi', payload.isi);
      form.append('status', payload.status);
      if (payload.thumbnail instanceof File) form.append('thumbnail', payload.thumbnail);

      const res = await fetch(`${API_URL}/${id}`, { method: 'PUT', body: form });
      const json = await res.json();
      const updated = json?.data ?? json;
      normalizeThumbnail(updated);
      setBeritaData(prev => prev.map(b => (b.id === id ? updated : b)));
    } catch (err) {
      console.error('Gagal update berita:', err);
      alert('Gagal update berita. Cek console.');
    }
  };

  // delete
  const deleteBerita = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setBeritaData(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error('Gagal hapus berita:', err);
      alert('Gagal menghapus berita. Cek console.');
    }
  };

  // open handlers
  const openAdd = () => { setEditingBerita(null); setIsModalOpen(true); };
  const openEdit = (b: Berita) => { setEditingBerita(b); setIsModalOpen(true); };
  const openView = (b: Berita) => { setViewingBerita(b); setIsViewOpen(true); };

  // submit handler (from modal)
  const handleSubmitFromModal = (payload: { judul: string; isi: string; status: Status; thumbnail?: File | null }) => {
    if (editingBerita) updateBerita(editingBerita.id, payload);
    else addBerita(payload);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Main */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Kelola Berita</h1>

        <BeritaFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterStatusChange={(v) => setFilterStatus(v as any)}
          onAddNew={openAdd}
        />

        <BeritaTable data={filtered} onEdit={openEdit} onDelete={deleteBerita} onView={openView} />

        <BeritaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmitFromModal} initialData={editingBerita} />

        <BeritaViewModal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} berita={viewingBerita} />
      </main>
    </div>
  );
}
