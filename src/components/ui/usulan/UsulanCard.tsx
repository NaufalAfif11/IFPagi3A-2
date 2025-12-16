"use client";

import StatusBadge from "./StatusBadge";
import { Building, Calendar, TrendingUp, Clock, Users, Eye } from "lucide-react";

interface Usulan {
    id: number;
    nama: string;
    alamat: string;
    email: string;
    noTelp: string;
    jabatan: string;
    namaPerusahaan: string;
    emailPerusahaan: string;
    noTelpPerusahaan: string;
    alamatPerusahaan: string;
    kapanDigunakan: string;
    jenisProdukanDiusulkan: string;
    deskripsiKebutuhan: string;
    dokumen: string | null;
    tanggal: string;
    status: string;
    statusDetail: string;
    peminat: number;
    kategori_id: string;
    nama_kategori: string;
    estimasiBudget: string;
    penyediaDikerjakan: {
      id: string;
      nama: string;
      tanggalAmbil: string;
      estimasiSelesai: string;
    } | null;
  }

    interface UsulanCardProps {
        usulan: Usulan;
        kategoriName: string;
        onClick: () => void;
    }
    
export default function UsulanCard({ usulan, kategoriName, onClick }: UsulanCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md transition-all border-2 border-transparent hover:border-blue-200">
      <div className={`p-4 border-b ${
        usulan.status === "Sedang Dikerjakan" ? "bg-blue-50" : "bg-gradient-to-r from-blue-50 to-blue-100"
      }`}>
        
        <div className="flex items-start justify-between mb-3">
          <span className="px-2 py-1 rounded-md text-xs font-semibold bg-blue-100 text-blue-700">
            {kategoriName}
          </span>

          <StatusBadge status={usulan.status} />
        </div>

        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
          {usulan.jenisProdukanDiusulkan}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Building className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{usulan.namaPerusahaan}</span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {usulan.deskripsiKebutuhan}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span><strong>Timeline:</strong> {usulan.kapanDigunakan}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span><strong>Budget:</strong> {usulan.estimasiBudget}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Clock className="w-4 h-4 text-orange-500" />
            <span><strong>Diposting:</strong> {usulan.tanggal}</span>
          </div>
        </div>

        {usulan.status === "Sedang Dikerjakan" && usulan.penyediaDikerjakan && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {usulan.penyediaDikerjakan?.nama
              ? usulan.penyediaDikerjakan.nama.charAt(0)
              : "?"}
            </div>

            <div>
              <p className="text-xs text-blue-700 font-semibold">
                Sedang Dikerjakan Oleh
              </p>
              <p className="text-sm font-bold text-blue-900">
                {usulan.penyediaDikerjakan.nama || "Penyedia"}
              </p>
            </div>
          </div>
        </div>
      )}


        {usulan.status === "Tersedia" && (
          <div className="flex items-center gap-1 text-xs text-orange-600 font-semibold mb-4">
            <Users className="w-4 h-4" />
            {usulan.peminat} Peminat
          </div>
        )}

        <button
          onClick={onClick}
          className={`w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                    usulan.status === 'Tersedia'
                      ? 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                      : 'bg-gradient-to-r from-[#3e81aa] to-[#1F4E73] text-white hover:bg-gradient-to-l'
                  }`}>
          <Eye className="w-4 h-4" />
          {usulan.status === 'Tersedia' ? 'Lihat Info' : 'Lihat Detail & Ajukan'}
        </button>
      </div>
    </div>
  );
}
