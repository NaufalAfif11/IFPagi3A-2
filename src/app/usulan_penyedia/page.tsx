'use client';

import React, { useState } from 'react';
import { Package, Building, Calendar, Users, Eye, Lock, CheckCircle, Clock, Search, TrendingUp, MapPin, Mail, Phone, ArrowRight, Send, Upload, X } from 'lucide-react';
import SidebarPenyedia from '@/components/ui/sidebar_penyedia';

type Status = 'Tersedia' | 'Sedang Dikerjakan';

interface KontakPerson {
  nama: string;
  jabatan: string;
  email: string;
  telp: string;
  alamat: string;
}

interface Usulan {
  id: number;
  jenisProdukanDiusulkan: string;
  namaPerusahaan: string;
  deskripsiKebutuhan: string;
  kapanDigunakan: string;
  tanggal: string;
  status: Status;
  peminat: number;
  kategori: string;
  estimasiBudget: string;
  kontakPerson: KontakPerson;
}

export default function PengajuanUsulan() {
  const [activeMenu, setActiveMenu] = useState("Riwayat Pengajuan");

  const [selectedFilter, setSelectedFilter] = useState<string>('semua');
  const [selectedUsulan, setSelectedUsulan] = useState<Usulan | null>(null);
  const [showProposalForm, setShowProposalForm] = useState<boolean>(false);
  const [proposalData, setProposalData] = useState({
    nama: '',
    email: '',
    deskripsi: '',
    file: null as File | null
  });
  const [usulanList, setUsulanList] = useState<Usulan[]>([
    {
      id: 1,
      jenisProdukanDiusulkan: 'Aplikasi Teknologi',
      namaPerusahaan: 'Dinas Lingkungan Hidup Kota Batam',
      deskripsiKebutuhan: 'Membutuhkan aplikasi untuk mengelola pengumpulan sampah di seluruh wilayah Kota Batam. Aplikasi harus dapat melacak jadwal pengambilan sampah, monitoring armada, dan pelaporan volume sampah per area.',
      kapanDigunakan: 'Q1 2026 (Januari - Maret 2026)',
      tanggal: '15 Okt 2025',
      status: 'Sedang Dikerjakan',
      peminat: 3,
      kategori: 'Teknologi',
      estimasiBudget: 'Rp 50 - 100 Juta',
      kontakPerson: {
        nama: 'Budi Santoso',
        jabatan: 'Kepala Dinas',
        email: 'budi.santoso@batam.go.id',
        telp: '0812-3456-7890',
        alamat: 'Jl. Engku Putri, Batam Center'
      }
    },
    {
      id: 2,
      jenisProdukanDiusulkan: 'Platform Pendidikan',
      namaPerusahaan: 'Dinas Pendidikan Kota Batam',
      deskripsiKebutuhan: 'Platform pembelajaran online untuk siswa SD hingga SMA di Kota Batam. Fitur yang dibutuhkan: video learning, quiz interaktif, absensi digital, dan monitoring progress siswa.',
      kapanDigunakan: 'Q2 2026 (April - Juni 2026)',
      tanggal: '12 Okt 2025',
      status: 'Tersedia',
      peminat: 5,
      kategori: 'Pendidikan',
      estimasiBudget: 'Rp 75 - 150 Juta',
      kontakPerson: {
        nama: 'Siti Rahma',
        jabatan: 'Sekretaris Dinas',
        email: 'siti.rahma@batam.go.id',
        telp: '0813-9876-5432',
        alamat: 'Jl. Raja Ali Haji, Batam'
      }
    },
    {
      id: 3,
      jenisProdukanDiusulkan: 'Sistem Informasi Geografis',
      namaPerusahaan: 'Dinas Komunikasi dan Informatika',
      deskripsiKebutuhan: 'Sistem informasi geografis untuk pemetaan infrastruktur digital di Kota Batam. Sistem harus terintegrasi dengan data BPS dan menampilkan visualisasi real-time.',
      kapanDigunakan: 'Q4 2025 (Oktober - Desember 2025)',
      tanggal: '08 Okt 2025',
      status: 'Sedang Dikerjakan',
      peminat: 1,
      kategori: 'Informasi',
      estimasiBudget: 'Rp 40 - 80 Juta',
      kontakPerson: {
        nama: 'Ahmad Hidayat',
        jabatan: 'Kabid Teknologi Informasi',
        email: 'ahmad.h@batam.go.id',
        telp: '0821-4567-8901',
        alamat: 'Jl. Gajah Mada, Batam Center'
      }
    },
    {
      id: 4,
      jenisProdukanDiusulkan: 'IoT & Monitoring System',
      namaPerusahaan: 'PT Batam Smart City',
      deskripsiKebutuhan: 'Sistem monitoring kualitas udara menggunakan sensor IoT yang tersebar di 20 titik strategis. Dashboard monitoring real-time dengan alert system dan historical data analysis.',
      kapanDigunakan: 'Q3 2026 (Juli - September 2026)',
      tanggal: '05 Okt 2025',
      status: 'Tersedia',
      peminat: 2,
      kategori: 'Informasi',
      estimasiBudget: 'Rp 100 - 200 Juta',
      kontakPerson: {
        nama: 'Dewi Kusuma',
        jabatan: 'Manager Operasional',
        email: 'dewi.kusuma@smartcity.com',
        telp: '0822-6543-2109',
        alamat: 'Kawasan Industri Batamindo'
      }
    },
    {
      id: 5,
      jenisProdukanDiusulkan: 'Aplikasi Mobile Pelayanan Publik',
      namaPerusahaan: 'Dinas Kependudukan dan Pencatatan Sipil',
      deskripsiKebutuhan: 'Aplikasi mobile untuk pengajuan dokumen kependudukan online. Fitur: pengajuan KTP, KK, Akta Kelahiran, tracking status dokumen, dan notifikasi jadwal pengambilan.',
      kapanDigunakan: 'Q1 2026 (Januari - Maret 2026)',
      tanggal: '01 Okt 2025',
      status: 'Tersedia',
      peminat: 4,
      kategori: 'Teknologi',
      estimasiBudget: 'Rp 25 - 50 Juta',
      kontakPerson: {
        nama: 'Roni Prasetyo',
        jabatan: 'Kepala Seksi',
        email: 'roni.p@batam.go.id',
        telp: '0813-2345-6789',
        alamat: 'Jl. Pembangunan, Batam'
      }
    },
    {
      id: 6,
      jenisProdukanDiusulkan: 'Dashboard Monitoring CCTV',
      namaPerusahaan: 'Kepolisian Resort Kota Batam',
      deskripsiKebutuhan: 'Dashboard terpusat untuk monitoring 200+ CCTV di seluruh kota. Fitur AI untuk deteksi anomali, face recognition, dan integrasi dengan sistem command center.',
      kapanDigunakan: 'Q2 2026 (April - Juni 2026)',
      tanggal: '28 Sep 2025',
      status: 'Tersedia',
      peminat: 3,
      kategori: 'Keamanan',
      estimasiBudget: 'Rp 150 - 300 Juta',
      kontakPerson: {
        nama: 'Kompol Agus Suryanto',
        jabatan: 'Kasat Intelkam',
        email: 'agus.s@polri.go.id',
        telp: '0811-2233-4455',
        alamat: 'Jl. Raya Batam Center'
      }
    }
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProposalData({ ...proposalData, file: e.target.files[0] });
    }
  };

  const kirimProposal = () => {
    if (!selectedUsulan) return;
    
    // Validasi form
    if (!proposalData.nama || !proposalData.email || !proposalData.deskripsi || !proposalData.file) {
      alert('Harap lengkapi semua field yang wajib diisi!');
      return;
    }

    // Tambah jumlah peminat pada usulan yang dipilih
    const updatedUsulanList = usulanList.map(usulan => {
      if (usulan.id === selectedUsulan.id) {
        return {
          ...usulan,
          peminat: usulan.peminat + 1
        };
      }
      return usulan;
    });

    setUsulanList(updatedUsulanList);
    
    alert('Proposal berhasil dikirim! Jumlah peminat telah bertambah.');
    setShowProposalForm(false);
    setSelectedUsulan(null);
    setProposalData({ nama: '', email: '', deskripsi: '', file: null });
  };

  const getStatusBadge = (status: Status) => {
    if (status === 'Tersedia') {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 border border-green-300 rounded-full text-xs font-semibold flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Tersedia
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-300 rounded-full text-xs font-semibold flex items-center gap-1">
        <Lock className="w-3 h-3" />
        Sedang Dikerjakan
      </span>
    );
  };

  const filteredUsulan = selectedFilter === 'semua' 
    ? usulanList 
    : usulanList.filter(u => u.status === selectedFilter);

  const tersedia = usulanList.filter(u => u.status === 'Tersedia').length;
  const sedangDikerjakan = usulanList.filter(u => u.status === 'Sedang Dikerjakan').length;

  return (
    <div className='flex min-h-screen'>
      <SidebarPenyedia activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-gradient-to-r from-[#3e81aa] to-[#1F4E73] text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Riwayat Usulan Kebutuhan</h1>
              <p className="text-blue-100 text-sm">Selamat datang pengguna! Lihat Usulanmu</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input 
                type="text"
                placeholder="Cari usulan..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFilter('semua')}
                className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  selectedFilter === 'semua' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Semua ({usulanList.length})
              </button>
              <button
                onClick={() => setSelectedFilter('Tersedia')}
                className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  selectedFilter === 'Tersedia' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tersedia ({tersedia})
              </button>
              <button
                onClick={() => setSelectedFilter('Sedang Dikerjakan')}
                className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  selectedFilter === 'Sedang Dikerjakan' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Dikerjakan ({sedangDikerjakan})
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsulan.map((usulan) => (
            <div 
              key={usulan.id}
              className={`bg-white rounded-xl shadow-md transition-all border-2 ${
                usulan.status === 'Sedang Dikerjakan' ? 'border-blue-200' : 'border-gray-200'
              }`}
            >
              <div className={`p-4 border-b ${
                usulan.status === 'Sedang Dikerjakan' ? 'bg-blue-50' : 'bg-gradient-to-r from-blue-50 to-blue-100'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    usulan.kategori === 'Teknologi' ? 'bg-blue-100 text-blue-700' :
                    usulan.kategori === 'Pendidikan' ? 'bg-green-100 text-green-700' :
                    usulan.kategori === 'Informasi' ? 'bg-orange-100 text-orange-700' :
                    usulan.kategori === 'Keamanan' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {usulan.kategori}
                  </span>
                  {getStatusBadge(usulan.status)}
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

              <div className='mb-4 h-6 flex items-center'>
                {usulan.status === 'Tersedia' && (
                  <div className="mb-4">
                    <span className="flex items-center gap-1 text-xs text-orange-600 font-semibold">
                      <Users className="w-4 h-4" />
                      {usulan.peminat} Peminat
                    </span>
                  </div>
                )}
              </div>

                <button 
                  onClick={() => setSelectedUsulan(usulan)}
                  className={`w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                    usulan.status === 'Sedang Dikerjakan'
                      ? 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                      : 'bg-gradient-to-r from-[#3e81aa] to-[#1F4E73] text-white hover:bg-gradient-to-l'
                  }`}>
                  <Eye className="w-4 h-4" />
                  {usulan.status === 'Sedang Dikerjakan' ? 'Lihat Info' : 'Lihat Detail & Ajukan'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedUsulan && !showProposalForm && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedUsulan(null)}>
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-2xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <span className={`px-3 py-1 rounded-md text-xs font-semibold mb-3 inline-block ${
                    selectedUsulan.kategori === 'Teknologi' ? 'bg-blue-100 text-blue-700' :
                    selectedUsulan.kategori === 'Pendidikan' ? 'bg-green-100 text-green-700' :
                    selectedUsulan.kategori === 'Informasi' ? 'bg-orange-100 text-orange-700' :
                    selectedUsulan.kategori === 'Keamanan' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {selectedUsulan.kategori}
                  </span>
                  <h2 className="text-2xl font-bold mb-2">{selectedUsulan.jenisProdukanDiusulkan}</h2>
                  <p className="text-blue-100 flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    {selectedUsulan.namaPerusahaan}
                  </p>
                </div>
                {getStatusBadge(selectedUsulan.status)}
              </div>
            </div>

            {/* modal body */}
            <div className="p-6 space-y-6">
              {selectedUsulan.status === 'Tersedia' && (
                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-orange-600" />
                    <div>
                      <h4 className="font-bold text-orange-900">{selectedUsulan.peminat} Penyedia Berminat</h4>
                      <p className="text-sm text-orange-700">Peluang tinggi untuk terealisasi</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  Deskripsi Kebutuhan
                </h4>
                <p className="text-gray-700 leading-relaxed">{selectedUsulan.deskripsiKebutuhan}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Timeline Penggunaan</p>
                  <p className="font-bold text-gray-900">{selectedUsulan.kapanDigunakan}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Estimasi Budget</p>
                  <p className="font-bold text-gray-900">{selectedUsulan.estimasiBudget}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Kontak Person
                </h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-600">Nama & Jabatan</p>
                    <p className="font-semibold text-gray-900">{selectedUsulan.kontakPerson.nama}</p>
                    <p className="text-sm text-gray-600">{selectedUsulan.kontakPerson.jabatan}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{selectedUsulan.kontakPerson.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{selectedUsulan.kontakPerson.telp}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-gray-700">{selectedUsulan.kontakPerson.alamat}</span>
                  </div>
                </div>
              </div>

              {selectedUsulan.status === 'Tersedia' && (
                <button 
                  onClick={() => setShowProposalForm(true)}
                  className="w-full bg-gradient-to-r from-[#3e81aa] to-[#1F4E73] text-white rounded-xl py-4 font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  Ajukan Proposal
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}

              <button 
                onClick={() => setSelectedUsulan(null)}
                className="w-full bg-gray-100 text-gray-700 rounded-xl py-3 font-semibold hover:bg-gray-200 transition-colors">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* modal ajukan prop */}
      {showProposalForm && selectedUsulan && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowProposalForm(false)}>
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#3e81aa] to-[#1F4E73] text-white p-6 rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Ajukan Proposal</h2>
                  <p className="text-green-100">{selectedUsulan.jenisProdukanDiusulkan}</p>
                </div>
                <button 
                  onClick={() => setShowProposalForm(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <p className="text-sm text-gray-700">
                  Isi form di bawah untuk mengajukan proposal Anda untuk proyek dari <strong>{selectedUsulan.namaPerusahaan}</strong>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  value={proposalData.nama}
                  onChange={(e) => setProposalData({ ...proposalData, nama: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan nama lengkap Anda"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email"
                  value={proposalData.email}
                  onChange={(e) => setProposalData({ ...proposalData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e81aa] focus:border-transparent"
                  placeholder="email@example.com"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Proposal <span className="text-red-500">*</span>
                </label>
                <textarea 
                  value={proposalData.deskripsi}
                  onChange={(e) => setProposalData({ ...proposalData, deskripsi: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-[#1F4E73] focus:border-transparent"
                  rows={5}
                  placeholder="Jelaskan bagaimana Anda akan mengerjakan proyek ini, pengalaman relevan, dan keunggulan proposal Anda...">
                </textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File Proposal <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1F4E73] transition-colors">
                  <input 
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx"/>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    {proposalData.file ? (
                      <div>
                        <p className="text-sm font-medium text-blue-600">{proposalData.file.name}</p>
                        <p className="text-xs text-gray-500 mt-1">Klik untuk mengubah file</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Klik untuk upload file proposal</p>
                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, atau DOCX (Maks. 10MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={kirimProposal}
                  className="flex-1 bg-gradient-to-r from-[#3e81aa] to-[#1F4E73] text-white rounded-xl py-4 font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Kirim Proposal
                </button>
                <button 
                  onClick={() => setShowProposalForm(false)}
                  className="px-6 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}