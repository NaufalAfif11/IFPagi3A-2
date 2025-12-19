"use client";

import { useState } from "react";
import { X, FileText, CheckCircle, Calendar, Mail } from "lucide-react";

interface PenyediaItem {
  minat_id: number;
  kebutuhan_id: number;
  penyedia_id: number;
  nama: string;
  email: string;
  deskripsi: string;
  proposal_file?: string;
  estimasi_biaya?: string;
  estimasi_waktu?: string;
  tanggal_minat: string;
  status: string;
}

interface Props {
  show: boolean;
  penyedia: PenyediaItem[];
  onClose: () => void;
  onApprove: (p: PenyediaItem) => void;
}

export default function MinatPenyediaModal({
  show,
  penyedia = [],
  onClose,
  onApprove,
}: Props) {

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 overflow-y-auto">

      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#1F4E73] to-[#3e81aa] text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Penyedia Berminat</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-100px)]">
  {penyedia.length === 0 ? (
    <div className="text-center py-10">
      <p className="text-gray-600">
        Belum ada penyedia yang mengajukan proposal.
      </p>
    </div>
  ) : (
    penyedia.map((p) => (
      <div
        key={p.minat_id}
        className="border-2 rounded-xl hover:shadow-xl transition p-5"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h4 className="font-bold text-xl">{p.nama}</h4>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              {p.email}
            </div>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(p.tanggal_minat).toLocaleDateString("id-ID")}
          </div>
        </div>

        {/* DESKRIPSI */}
        <div className="space-y-3">
          <div>
            <h5 className="flex items-center gap-2 font-bold">
              <FileText className="w-5 h-5 text-blue-600" />
              Deskripsi Proposal
            </h5>
            <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">
              {p.deskripsi}
            </p>
          </div>

          {/* FILE */}
          {p.proposal_file && (
            <a
              href={`http://localhost:5000/uploads/proposal/${p.proposal_file}`}
              target="_blank"
              className="flex items-center gap-2 text-blue-700 font-semibold"
            >
              <FileText className="w-5 h-5" />
              Lihat File Proposal
            </a>
          )}

          {/* APPROVE */}
          {p.status === "menunggu" && (
            <button
              onClick={() => onApprove(p)}
              className="w-full py-3 bg-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Setujui Proposal
            </button>
          )}
        </div>
      </div>
    ))
  )}
</div>


      </div>
    </div>
  );
}
