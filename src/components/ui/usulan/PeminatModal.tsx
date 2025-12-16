"use client";

import { X, Building, MessageSquare, FileText, CheckCircle, Calendar, Mail } from "lucide-react";
import type { Usulan } from "@/types/usulan";

interface PenyediaItem {
  id: number;
  nama: string;
  email: string;
  deskripsi_proposal: string;
  file_proposal?: string;
  created_at: string;
}

interface Props {
  usulan: Usulan;
  penyedia: PenyediaItem[];
  onClose: () => void;
  onApprove: (p: PenyediaItem) => void;
}

export default function PeminatModal({
  usulan,
  penyedia,
  onClose,
  onApprove
}: Props) {

  if (!penyedia?.length) {
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center w-full max-w-md">
          <Building className="w-14 h-14 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Belum Ada Penyedia</h3>
          <p className="text-gray-600 mb-6">
            Belum ada penyedia yang mengajukan proposal
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-200 rounded-lg font-semibold"
          >
            Tutup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#1F4E73] to-[#3e81aa] text-white p-6">
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold">Penyedia Berminat</h2>
              <p className="text-blue-100">{usulan.nama}</p>
              <span className="inline-block mt-3 bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold">
                {penyedia.length} Proposal Masuk
              </span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-160px)]">
          {penyedia.map((p) => (
            <div key={p.id} className="border-2 rounded-xl hover:shadow-xl transition">

              {/* CARD HEADER */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-5 border-b">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-xl">{p.nama}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      {p.email}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(p.created_at).toLocaleDateString("id-ID")}
                  </div>
                </div>
              </div>

              {/* BODY */}
              <div className="p-5 space-y-4">

                {/* PROPOSAL */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <h5 className="font-bold">Deskripsi Proposal</h5>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border">
                    <p className="text-sm whitespace-pre-line">
                      {p.deskripsi_proposal}
                    </p>
                  </div>
                </div>

                {/* FILE */}
                {p.file_proposal && (
                  <a
                    href={`http://localhost:5000/uploads/${p.file_proposal}`}
                    target="_blank"
                    className="flex items-center gap-3 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl hover:bg-blue-100"
                  >
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-800">
                      Lihat File Proposal
                    </span>
                  </a>
                )}

                {/* ACTION */}
                <button
                  onClick={() => onApprove(p)}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition"
                >
                  <CheckCircle className="w-6 h-6" />
                  Setujui Proposal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
