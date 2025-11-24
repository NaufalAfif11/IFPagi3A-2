'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {User, Clock, CheckCircle, Package, X, Calendar, Building, Mail, Phone, MapPin, Users, Star, Lock, Eye, Award, MessageSquare, ThumbsUp, Search, TrendingUp } from 'lucide-react';
import SidebarPengguna from '@/components/ui/sidebar_pengguna';

export default function RiwayatUsulan() {
  const [activeMenu, setActiveMenu] = useState("Riwayat Usulan");

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
    kategori: string;
    estimasiBudget: string;
    penyediaDikerjakan: {
      id: string;
      nama: string;
      tanggalAmbil: string;
      estimasiSelesai: string;
    } | null;
  }

  interface Penyedia {
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

  const [selectedUsulan, setSelectedUsulan] = useState<Usulan | null>(null);
  const [showPeminatModal, setShowPeminatModal] = useState(false);
  const [selectedPenyedia, setSelectedPenyedia] = useState<Penyedia | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('semua');

  // Data dummy untuk penyedia yang berminat
  const penyediaMinat: { [key: number]: Penyedia[] } = {
    1: [
      {
        id: 'p1',
        nama: 'PT Digital Inovasi Indonesia',
        rating: 4.8,
        proyekSelesai: 45,
        pengalaman: '8 Tahun',
        spesialisasi: ['Mobile Apps', 'Web Development', 'IoT'],
        proposal: 'Kami siap mengembangkan aplikasi manajemen sampah dengan teknologi terkini...',
        estimasiBiaya: 'Rp 75.000.000',
        estimasiWaktu: '4 Bulan',
        tanggalMinat: '18 Okt 2025'
      },
      {
        id: 'p2',
        nama: 'CV Teknologi Nusantara',
        rating: 4.5,
        proyekSelesai: 32,
        pengalaman: '5 Tahun',
        spesialisasi: ['Web Apps', 'Dashboard', 'API'],
        proposal: 'Dengan pengalaman 5 tahun, kami yakin dapat membangun solusi yang tepat...',
        estimasiBiaya: 'Rp 65.000.000',
        estimasiWaktu: '5 Bulan',
        tanggalMinat: '19 Okt 2025'
      },
      {
        id: 'p3',
        nama: 'PT Solusi Digital Mandiri',
        rating: 4.7,
        proyekSelesai: 38,
        pengalaman: '6 Tahun',
        spesialisasi: ['Mobile Apps', 'Cloud Computing', 'AI'],
        proposal: 'Kami menawarkan solusi komprehensif dengan integrasi AI untuk prediksi...',
        estimasiBiaya: 'Rp 85.000.000',
        estimasiWaktu: '3 Bulan',
        tanggalMinat: '17 Okt 2025'
      }
    ],
    2: [
      {
        id: 'p4',
        nama: 'PT Edukasi Digital',
        rating: 4.9,
        proyekSelesai: 52,
        pengalaman: '10 Tahun',
        spesialisasi: ['E-Learning', 'LMS', 'Education Tech'],
        proposal: 'Spesialisasi kami di bidang pendidikan akan memastikan platform yang user-friendly...',
        estimasiBiaya: 'Rp 95.000.000',
        estimasiWaktu: '5 Bulan',
        tanggalMinat: '13 Okt 2025'
      },
      {
        id: 'p5',
        nama: 'CV Belajar Online',
        rating: 4.6,
        proyekSelesai: 28,
        pengalaman: '4 Tahun',
        spesialisasi: ['E-Learning', 'Video Streaming', 'Quiz System'],
        proposal: 'Kami fokus pada pengalaman belajar yang interaktif dan engaging...',
        estimasiBiaya: 'Rp 80.000.000',
        estimasiWaktu: '6 Bulan',
        tanggalMinat: '13 Okt 2025'
      }
    ],
    4: [
      {
        id: 'p6',
        nama: 'PT IoT Smart Solution',
        rating: 4.8,
        proyekSelesai: 41,
        pengalaman: '7 Tahun',
        spesialisasi: ['IoT', 'Sensor Network', 'Real-time Monitoring'],
        proposal: 'Pengalaman kami dalam IoT akan menghasilkan sistem monitoring yang akurat...',
        estimasiBiaya: 'Rp 150.000.000',
        estimasiWaktu: '8 Bulan',
        tanggalMinat: '06 Okt 2025'
      },
      {
        id: 'p7',
        nama: 'CV Sensor Teknologi',
        rating: 4.4,
        proyekSelesai: 25,
        pengalaman: '5 Tahun',
        spesialisasi: ['IoT', 'Arduino', 'Embedded System'],
        proposal: 'Kami menawarkan solusi IoT yang cost-effective dengan kualitas terjamin...',
        estimasiBiaya: 'Rp 120.000.000',
        estimasiWaktu: '10 Bulan',
        tanggalMinat: '07 Okt 2025'
      }
    ],
    5: [
      {
        id: 'p8',
        nama: 'PT Aplikasi Mobile Nusantara',
        rating: 4.7,
        proyekSelesai: 36,
        pengalaman: '6 Tahun',
        spesialisasi: ['Mobile Apps', 'Flutter', 'React Native'],
        proposal: 'Aplikasi mobile dengan UX terbaik adalah keahlian kami...',
        estimasiBiaya: 'Rp 45.000.000',
        estimasiWaktu: '3 Bulan',
        tanggalMinat: '02 Okt 2025'
      }
    ]
  };

  // Data dummy untuk usulan sesuai form
  const usulanData: Usulan[] = [
    {
      id: 1,
      nama: 'Budi Santoso',
      alamat: 'Jl. Merdeka No. 123, Batam Center',
      email: 'budi.santoso@email.com',
      noTelp: '0812-3456-7890',
      jabatan: 'Kepala Dinas Lingkungan Hidup',
      namaPerusahaan: 'Dinas Lingkungan Hidup Kota Batam',
      emailPerusahaan: 'dlh@batam.go. id',
      noTelpPerusahaan: '0778-123456',
      alamatPerusahaan: 'Jl. Engku Putri, Batam Center',
      kapanDigunakan: 'Q1 2026 (Januari - Maret 2026)',
      jenisProdukanDiusulkan: 'Aplikasi Mobile & Web',
      deskripsiKebutuhan: 'Membutuhkan aplikasi untuk mengelola pengumpulan sampah di seluruh wilayah Kota Batam. Aplikasi harus dapat melacak jadwal pengambilan sampah, monitoring armada, dan pelaporan volume sampah per area.',
      dokumen: 'proposal_sampah.pdf',
      tanggal: '15 Okt 2025',
      status: 'Sedang Dikerjakan',
      statusDetail: 'Diambil oleh PT Digital Inovasi Indonesia',
      peminat: 3,
      kategori: 'Teknologi',
      estimasiBudget: 'Rp 50 - 100 Juta',
      penyediaDikerjakan: {
        id: 'p1',
        nama: 'PT Digital Inovasi Indonesia',
        tanggalAmbil: '20 Okt 2025',
        estimasiSelesai: 'Maret 2026'
      }
    },
    {
      id: 2,
      nama: 'Budi Santoso',
      alamat: 'Jl. Merdeka No. 123, Batam Center',
      email: 'budi.santoso@email.com',
      noTelp: '0812-3456-7890',
      jabatan: 'Kepala Dinas Lingkungan Hidup',
      namaPerusahaan: 'Dinas Lingkungan Hidup Kota Batam',
      emailPerusahaan: 'dlh@batam.go. id',
      noTelpPerusahaan: '0778-123456',
      alamatPerusahaan: 'Jl. Engku Putri, Batam Center',
      kapanDigunakan: 'Q2 2026 (April - Juni 2026)',
      jenisProdukanDiusulkan: 'Platform E-Learning',
      deskripsiKebutuhan: 'Platform pembelajaran online untuk siswa SD hingga SMA di Kota Batam. Fitur yang dibutuhkan: video learning, quiz interaktif, absensi digital, dan monitoring progress siswa.',
      dokumen: 'rpp_elearning.pdf',
      tanggal: '12 Okt 2025',
      status: 'Menunggu Persetujuan',
      statusDetail: 'Ada penyedia yang berminat',
      peminat: 2,
      kategori: 'Pendidikan',
      estimasiBudget: 'Rp 75 - 150 Juta',
      penyediaDikerjakan: null
    },
    {
      id: 3,
      nama: 'Budi Santoso',
      alamat: 'Jl. Merdeka No. 123, Batam Center',
      email: 'budi.santoso@email.com',
      noTelp: '0812-3456-7890',
      jabatan: 'Kepala Dinas Lingkungan Hidup',
      namaPerusahaan: 'Dinas Lingkungan Hidup Kota Batam',
      emailPerusahaan: 'dlh@batam.go. id',
      noTelpPerusahaan: '0778-123456',
      alamatPerusahaan: 'Jl. Engku Putri, Batam Center',
      kapanDigunakan: 'Q4 2025 (Oktober - Desember 2025)',
      jenisProdukanDiusulkan: 'Sistem Informasi',
      deskripsiKebutuhan: 'Sistem informasi geografis untuk pemetaan infrastruktur digital di Kota Batam. Sistem harus terintegrasi dengan data BPS dan menampilkan visualisasi real-time.',
      dokumen: null,
      tanggal: '08 Okt 2025',
      status: 'Menunggu Persetujuan',
      statusDetail: 'Ada penyedia yang berminat',
      peminat: 1,
      kategori: 'Informasi',
      estimasiBudget: 'Rp 40 - 80 Juta',
      penyediaDikerjakan: null
    }
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'Sedang Dikerjakan') {
      return (
        <span className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-300 rounded-full text-xs font-semibold flex items-center gap-1">
          <Lock className="w-3 h-3" />
          Sedang Dikerjakan
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-green-100 text-green-700 border border-green-300 rounded-full text-xs font-semibold flex items-center gap-1">
        <CheckCircle className="w-3 h-3" />
        Menunggu Persetujuan
      </span>
    );
  };

  const filteredUsulan = selectedFilter === 'semua' 
    ? usulanData 
    : usulanData.filter(u => u.status === selectedFilter);

  const menungguPersetujuan = usulanData.filter(u => u.status === 'Menunggu Persetujuan').length;
  const sedangDikerjakan = usulanData.filter(u => u.status === 'Sedang Dikerjakan').length;

  const viewDetail = (usulan: Usulan) => {
    setSelectedUsulan(usulan);
  };

  const viewPeminat = (usulan: Usulan) => {
    setSelectedUsulan(usulan);
    setShowPeminatModal(true);
  };

  const approvePenyedia = (penyedia: Penyedia) => {
    setSelectedPenyedia(penyedia);
    alert(`Anda telah menyetujui ${penyedia.nama} untuk mengerjakan usulan ini!`);
    setShowPeminatModal(false);
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <SidebarPengguna activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1F4E73] to-[#3e81aa] text-white shadow-xl">
          <div className="px-4 py-8">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">Riwayat Usulan Kebutuhan</h1>
                <p className="text-blue-100 text-sm">Selamat datang pengguna! Lihat Usulan Anda</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-4 py-6">
          {/* Filter Section */}
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
                      ? 'bg-[#1F4E73] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Semua ({usulanData.length})
                </button>
                <button
                  onClick={() => setSelectedFilter('Menunggu Persetujuan')}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    selectedFilter === 'Menunggu Persetujuan' 
                      ? 'bg-[#1F4E73] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Menunggu ({menungguPersetujuan})
                </button>
                <button
                  onClick={() => setSelectedFilter('Sedang Dikerjakan')}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    selectedFilter === 'Sedang Dikerjakan' 
                      ? 'bg-[#1F4E73] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Dikerjakan ({sedangDikerjakan})
                </button>
                <Link href="/layanan">
                  <button className="px-4 py-2.5 rounded-lg font-medium text-sm transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                    + Ajukan 
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Usulan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsulan.map((usulan) => (
              <div 
                key={usulan.id}
                className="bg-white rounded-xl shadow-md transition-all border-2 border-transparent hover:border-blue-200"
              >
                <div className={`p-4 border-b ${
                  usulan.status === 'Sedang Dikerjakan' ? 'bg-blue-50' : 'bg-gradient-to-r from-blue-50 to-blue-100'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      usulan.kategori === 'Teknologi' ? 'bg-blue-100 text-blue-700' :
                      usulan.kategori === 'Pendidikan' ? 'bg-green-100 text-green-700' :
                      usulan.kategori === 'Informasi' ? 'bg-orange-100 text-orange-700' :
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

                  <div className="mb-4 h-6 flex items-center">
                    {usulan.status === 'Menunggu Persetujuan' && (
                      <span className="flex items-center gap-1 text-xs text-orange-600 font-semibold">
                        <Users className="w-4 h-4" />
                        {usulan.peminat} Peminat
                      </span>
                    )}
                  </div>

                  <button 
                    onClick={() => usulan.status === 'Menunggu Persetujuan' ? viewPeminat(usulan) : viewDetail(usulan)}
                    className={`w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                      usulan.status === 'Sedang Dikerjakan'
                        ? 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                        : 'bg-gradient-to-r from-[#1F4E73] to-[#3e81aa] text-white hover:bg-gradient-to-l'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    {usulan.status === 'Sedang Dikerjakan' ? 'Lihat Detail' : 'Lihat Penyedia'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Penyedia Berminat */}
      {showPeminatModal && selectedUsulan && penyediaMinat[selectedUsulan.id] && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowPeminatModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#1F4E73] to-[#3e81aa] text-white p-6 rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Penyedia Berminat</h2>
                  <p className="text-blue-100">{selectedUsulan.jenisProdukanDiusulkan}</p>
                </div>
                <button 
                  onClick={() => setShowPeminatModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-orange-600" />
                  <div>
                    <h4 className="font-bold text-orange-900">{penyediaMinat[selectedUsulan.id].length} Penyedia Berminat</h4>
                    <p className="text-sm text-orange-700">Pilih penyedia yang paling sesuai untuk mengerjakan usulan Anda</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {penyediaMinat[selectedUsulan.id].map((penyedia: Penyedia) => (
                  <div key={penyedia.id} className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-4">
                    {/* Header Penyedia */}
                    <div className="flex items-start gap-3 mb-3 pb-3 border-b border-gray-200">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building className="w-6 h-6 text-blue-700" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{penyedia.nama}</h4>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {penyedia.rating}
                          </span>
                          <span>•</span>
                          <span>{penyedia.proyekSelesai} Proyek</span>
                          <span>•</span>
                          <span>{penyedia.pengalaman}</span>
                        </div>
                      </div>
                    </div>

                    {/* Spesialisasi */}
                    <div className="mb-3">
                      <p className="text-xs text-gray-600 mb-2">Spesialisasi:</p>
                      <div className="flex flex-wrap gap-2">
                        {penyedia.spesialisasi.map((skill: string, skillIdx: number) => (
                          <span key={skillIdx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Proposal */}
                    <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        Proposal:
                      </p>
                      <p className="text-sm text-gray-800">{penyedia.proposal}</p>
                    </div>

                    {/* Estimasi */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                        <p className="text-xs text-gray-600 mb-1">Estimasi Biaya</p>
                        <p className="font-bold text-green-700 text-sm">{penyedia.estimasiBiaya}</p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                        <p className="text-xs text-gray-600 mb-1">Estimasi Waktu</p>
                        <p className="font-bold text-blue-700 text-sm">{penyedia.estimasiWaktu}</p>
                      </div>
                    </div>

                    {/* Tanggal Minat */}
                    <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Mengajukan minat: {penyedia.tanggalMinat}
                    </p>

                    {/* Button Approve */}
                    <button 
                      onClick={() => approvePenyedia(penyedia)}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg py-3 font-semibold flex items-center justify-center gap-2 shadow-md"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Setujui Penyedia Ini
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail Usulan */}
      {selectedUsulan && !showPeminatModal && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedUsulan(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-[#1F4E73] to-[#3e81aa] text-white p-6 rounded-t-2xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <span className={`px-3 py-1 rounded-md text-xs font-semibold mb-3 inline-block ${
                    selectedUsulan.kategori === 'Teknologi' ? 'bg-blue-100 text-blue-700' :
                    selectedUsulan.kategori === 'Pendidikan' ? 'bg-green-100 text-green-700' :
                    selectedUsulan.kategori === 'Informasi' ? 'bg-orange-100 text-orange-700' :
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

            <div className="p-6 space-y-6">
              {selectedUsulan.status === 'Menunggu Persetujuan' && (
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

              {selectedUsulan.status === 'Sedang Dikerjakan' && selectedUsulan.penyediaDikerjakan && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-blue-600" />
                    <div>
                      <h4 className="font-bold text-blue-900">Sedang Dikerjakan oleh {selectedUsulan.penyediaDikerjakan.nama}</h4>
                      <p className="text-sm text-blue-700">Estimasi selesai: {selectedUsulan.penyediaDikerjakan.estimasiSelesai}</p>
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
                  <User className="w-5 h-5 text-blue-600" />
                  Informasi Pengaju
                </h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-600">Nama & Jabatan</p>
                    <p className="font-semibold text-gray-900">{selectedUsulan.nama}</p>
                    <p className="text-sm text-gray-600">{selectedUsulan.jabatan}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{selectedUsulan.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{selectedUsulan.noTelp}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-gray-700">{selectedUsulan.alamat}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedUsulan(null)}
                className="w-full bg-gray-100 text-gray-700 rounded-xl py-3 font-semibold hover:bg-gray-200 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}