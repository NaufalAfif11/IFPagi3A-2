"use client";

import { X, Edit, Trash2 } from "lucide-react";

interface DetailUsulanModalProps {
  usulan: {
    kebutuhan_id?: string;
    nama: string;
    alamat: string;
    email: string;
    telp: string;
    jabatan: string;
    nama_perusahaan: string;
    email_perusahaan: string;
    alamat_perusahaan: string;
    telp_perusahaan: string;
    jenis_produk: string;
    tanggal_kebutuhan: string;
    estimasi_budget: string;
    deskripsi: string;
    bidang_id: string;
    nama_bidang?: string;
    dokumen: string | null;
    status?: string;
    created_at?: string;
    peminat_count?: number;
  } | null;
  onClose: () => void;
  onEdit?: (usulan: string) => void;
  onDelete?: (id: number) => void;
  onOpenPeminat?: (kebutuhanId: string) => void;
}

export default function DetailUsulanModal({ usulan, onClose, onEdit, onDelete, onOpenPeminat }: DetailUsulanModalProps) {
  if (!usulan) return null;

  const formatCurrency = (value: string | number) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const handleDelete = () => {
    if (window.confirm('Yakin ingin menghapus usulan ini?')) {
      onDelete?.(usulan.kebutuhan_id || '');
      onClose();
    }
  };

  const hasPeminat = (usulan.peminat_count ?? 0) > 0;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1F4E73] text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Detail Usulan Produk</h2>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          
          {/* Data Pribadi */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b">Data Pribadi</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Nama Lengkap</label>
                <p className="font-medium">{usulan.nama}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Jabatan</label>
                <p className="font-medium">{usulan.jabatan || '-'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="font-medium">{usulan.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">No. Telepon</label>
                <p className="font-medium">{usulan.telp}</p>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-600">Alamat</label>
                <p className="font-medium">{usulan.alamat}</p>
              </div>
            </div>
          </div>

          {/* Data Perusahaan */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b">Data Perusahaan</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Nama Perusahaan</label>
                <p className="font-medium">{usulan.nama_perusahaan || '-'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email Perusahaan</label>
                <p className="font-medium">{usulan.email_perusahaan || '-'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Telepon Perusahaan</label>
                <p className="font-medium">{usulan.telp_perusahaan || '-'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Alamat Perusahaan</label>
                <p className="font-medium">{usulan.alamat_perusahaan || '-'}</p>
              </div>
            </div>
          </div>

          {/* Detail Produk */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b">Detail Produk</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Jenis Produk</label>
                <p className="font-medium">{usulan.jenis_produk}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Bidang</label>
                <p className="font-medium">{usulan.nama_bidang || usulan.bidang_id}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Tanggal Kebutuhan</label>
                <p className="font-medium">{formatDate(usulan.tanggal_kebutuhan)}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Estimasi Budget</label>
                <p className="font-medium">
                  {usulan.estimasi_budget ? formatCurrency(usulan.estimasi_budget) : '-'}
                </p>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-600">Deskripsi</label>
                <p className="font-medium">{usulan.deskripsi || '-'}</p>
              </div>
            </div>
          </div>

          {/* Dokumen */}
          {usulan.dokumen && (
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b">Dokumen Pendukung</h3>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <span className="text-sm font-medium">{usulan.dokumen}</span>
                <a
                  href={`http://localhost:5000/uploads/${usulan.dokumen}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Download
                </a>
              </div>
            </div>
          )}

          {/* Status & Tanggal */}
          {usulan.status && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <p className="font-medium">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                    usulan.status === 'approved' ? 'bg-green-100 text-green-800' :
                    usulan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {usulan.status}
                  </span>
                </p>
              </div>
              {usulan.created_at && (
                <div>
                  <label className="text-sm text-gray-600">Tanggal Diajukan</label>
                  <p className="font-medium">{formatDate(usulan.created_at)}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 p-4 border-t flex items-center justify-between gap-4">

        {/* KIRI — info & peminat */}
        <div>
            {hasPeminat && (
            <button
                onClick={() => onOpenPeminat?.(usulan.kebutuhan_id!)}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
                ✅ {usulan.peminat_count} Peminat • Lihat Peminat
            </button>
            )}
        </div>

        {/* KANAN — aksi */}
        <div className="flex gap-3">
            {onEdit && (
            <button
                onClick={() => {
                onEdit(usulan);
                onClose();
                }}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit
            </button>
            )}

            {onDelete && (
            <button
                onClick={() => onDelete(usulan.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Hapus
            </button>
            )}

            <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
            Tutup
            </button>
        </div>
        </div>
      </div>
    </div>
  );
}