"use client";

import { X, Edit, Trash2 } from "lucide-react";

interface DetailUsulanModalProps {
  usulan: any;
  onClose: () => void;
  onEdit?: (usulan: any) => void;
  onDelete?: (id: number) => void;
  onOpenPeminat?: (kebutuhanId: number) => void;
}

export default function DetailUsulanModal({
  usulan,
  onClose,
  onEdit,
  onDelete,
  onOpenPeminat
}: DetailUsulanModalProps) {
  if (!usulan) return null;

  // FORMAT CURRENCY
  const formatCurrency = (value: string | number) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  // FORMAT DATE
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const hasPeminat = (usulan.peminat ?? 0) > 0;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">

        {/* HEADER */}
        <div className="bg-[#1F4E73] text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Detail Usulan Produk</h2>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">

          {/* DATA PRIBADI */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b">Data Pribadi</h3>
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="text-sm text-gray-600">Nama Lengkap</label>
                <p className="font-medium">{usulan.nama}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Jabatan</label>
                <p className="font-medium">{usulan.jabatan || "-"}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="font-medium">{usulan.email}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">No. Telepon</label>
                <p className="font-medium">{usulan.noTelp}</p>
              </div>

              <div className="col-span-2">
                <label className="text-sm text-gray-600">Alamat</label>
                <p className="font-medium">{usulan.alamat}</p>
              </div>

            </div>
          </div>

          {/* DATA PERUSAHAAN */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b">Data Perusahaan</h3>
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="text-sm text-gray-600">Nama Perusahaan</label>
                <p className="font-medium">{usulan.namaPerusahaan}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Email Perusahaan</label>
                <p className="font-medium">{usulan.emailPerusahaan}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Telepon Perusahaan</label>
                <p className="font-medium">{usulan.noTelpPerusahaan}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Alamat Perusahaan</label>
                <p className="font-medium">{usulan.alamatPerusahaan}</p>
              </div>

            </div>
          </div>

          {/* DETAIL PRODUK */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b">Detail Produk</h3>
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="text-sm text-gray-600">Jenis Produk</label>
                <p className="font-medium">{usulan.jenisProdukanDiusulkan}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Kategori</label>
                <p className="font-medium">{usulan.nama_kategori}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Tanggal Kebutuhan</label>
                <p className="font-medium">{formatDate(usulan.kapanDigunakan)}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Estimasi Budget</label>
                <p className="font-medium">
                  {usulan.estimasiBudget ? formatCurrency(usulan.estimasiBudget) : "-"}
                </p>
              </div>

              <div className="col-span-2">
                <label className="text-sm text-gray-600">Deskripsi</label>
                <p className="font-medium">{usulan.deskripsiKebutuhan}</p>
              </div>

            </div>
          </div>

          {/* DOKUMEN */}
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

        </div>

        {/* FOOTER */}
        <div className="bg-gray-50 p-4 border-t flex items-center justify-between">

          {/* PEMINAT */}
          <div>
            {hasPeminat && (
              <button
                onClick={() => onOpenPeminat?.(usulan.id)}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                {usulan.peminat} Peminat • Lihat
              </button>
            )}
          </div>

          {/* AKSI */}
          <div className="flex gap-3">

            <button
              onClick={() => {
                onEdit?.(usulan);
                onClose();
              }}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center gap-2"
            >
              <Edit className="w-4 h-4" /> Edit
            </button>

            <button
              onClick={() => onDelete?.(usulan.id)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Hapus
            </button>

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
