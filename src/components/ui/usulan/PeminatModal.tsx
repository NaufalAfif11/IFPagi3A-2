"use client";

import { X, Star, MessageSquare, Building } from "lucide-react";

interface PenyediaItem {
    id: string;
    nama: string;
    rating: number;
    proyekSelesai: number;
    pengalaman: string;
    spesialisasi: string[];
    proposal: string;
    estimasiBiaya: string;
    estimasiWaktu: string;
    tanggalMinat: string;
}

interface PeminatModalProps {
  usulan: {
    jenisProdukanDiusulkan: string;
  };
  penyedia: Array<PenyediaItem>;
  onClose: () => void;
  onApprove: (provider: PenyediaItem) => void;
}

export default function PeminatModal({
  usulan,
  penyedia,
  onClose,
  onApprove
}: PeminatModalProps) {
  if (!penyedia) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-y-auto max-h-[90vh]">

        <div className="bg-gradient-to-r from-[#1F4E73] to-[#3e81aa] text-white p-6 rounded-t-2xl flex justify-between">
          <div>
            <h2 className="text-xl font-bold">Penyedia Berminat</h2>
            <p className="text-blue-100">{usulan.jenisProdukanDiusulkan}</p>
          </div>
          <button onClick={onClose}><X className="w-6 h-6" /></button>
        </div>

        <div className="p-6 space-y-4">
          {penyedia.map((p: PenyediaItem) => (
            <div key={p.id} className="border p-4 rounded-xl">

              <div className="flex items-start gap-3 border-b pb-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-blue-700" />
                </div>

                <div className="flex-1">
                  <h4 className="font-bold">{p.nama}</h4>
                  <p className="text-xs text-gray-600 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> 
                    {p.rating} • {p.proyekSelesai} proyek • {p.pengalaman}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-md mb-3">
                <p className="text-xs text-gray-600 mb-1 flex gap-1 items-center">
                  <MessageSquare className="w-3 h-3" />
                  Proposal:
                </p>
                <p>{p.proposal}</p>
              </div>

              <button 
                onClick={() => onApprove(p)}
                className="w-full py-2 bg-[#1F4E73] text-white rounded-lg"
              >
                Setujui Penyedia
              </button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
