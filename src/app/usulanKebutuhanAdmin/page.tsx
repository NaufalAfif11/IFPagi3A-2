'use client';

import { useState } from 'react';

export default function UsulanKebutuhanAdmin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [selectedUsulan, setSelectedUsulan] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // 🧩 Data dummy untuk tampilan
  const usulanData = [
    {
      id: 1,
      tanggalPengajuan: '2025-03-10',
      nama: 'Dr. Rahmat Hidayat',
      namaInstansi: 'Universitas Negeri Bandung',
      judulProposal: 'Sistem Deteksi Dini Longsor Berbasis IoT dan AI',
      kategoriInovasi: 'Teknologi Kebencanaan',
      latarBelakang: 'Sering terjadinya longsor di daerah perbukitan menyebabkan kerugian besar setiap tahun.',
      tujuan: 'Mengembangkan sistem peringatan dini berbasis sensor tanah dan prediksi cuaca.',
      manfaat: 'Meningkatkan kesiapsiagaan masyarakat terhadap bencana tanah longsor.',
      estimasiBiaya: 'Rp 850.000.000',
      status: 'pending',
    },
    {
      id: 2,
      tanggalPengajuan: '2025-02-21',
      nama: 'Siti Mulyani, M.Kom',
      namaInstansi: 'Diskominfo Kabupaten Garut',
      judulProposal: 'Digitalisasi Layanan Publik dengan Chatbot Multibahasa',
      kategoriInovasi: 'Pelayanan Publik',
      latarBelakang: 'Warga kesulitan mendapatkan informasi pelayanan karena keterbatasan staf front office.',
      tujuan: 'Membangun chatbot cerdas yang dapat menjawab pertanyaan umum dalam bahasa Indonesia dan Sunda.',
      manfaat: 'Mempercepat pelayanan publik dan meningkatkan kepuasan masyarakat.',
      estimasiBiaya: 'Rp 450.000.000',
      status: 'reviewed',
    },
    {
      id: 3,
      tanggalPengajuan: '2025-01-15',
      nama: 'Dr. Budi Santosa',
      namaInstansi: 'Badan Riset dan Inovasi Daerah (BRIDA)',
      judulProposal: 'Pemanfaatan Limbah Pertanian Menjadi Energi Biogas',
      kategoriInovasi: 'Energi Terbarukan',
      latarBelakang: 'Limbah hasil pertanian di pedesaan belum termanfaatkan secara optimal.',
      tujuan: 'Mengubah limbah pertanian menjadi sumber energi ramah lingkungan.',
      manfaat: 'Mengurangi polusi dan membantu ketahanan energi desa.',
      estimasiBiaya: 'Rp 1.200.000.000',
      status: 'approved',
    },
    {
      id: 4,
      tanggalPengajuan: '2025-04-07',
      nama: 'Ir. Rina Kartika',
      namaInstansi: 'PT BioFarm Indonesia',
      judulProposal: 'Riset Pengembangan Vaksin Lokal untuk Peternakan Unggas',
      kategoriInovasi: 'Kesehatan Hewan',
      latarBelakang: 'Masih tingginya impor vaksin unggas membuat biaya produksi meningkat.',
      tujuan: 'Mengembangkan vaksin unggas berbasis isolat lokal.',
      manfaat: 'Meningkatkan kemandirian peternakan nasional.',
      estimasiBiaya: 'Rp 2.300.000.000',
      status: 'approved',
    },
    {
      id: 5,
      tanggalPengajuan: '2025-05-19',
      nama: 'Ahmad Fauzi',
      namaInstansi: 'CV GreenTech Solusi',
      judulProposal: 'Aplikasi Pengelolaan Sampah Berbasis Komunitas',
      kategoriInovasi: 'Lingkungan',
      latarBelakang: 'Masalah sampah di perkotaan belum tertangani secara terintegrasi.',
      tujuan: 'Membangun platform digital untuk koordinasi antar warga dan petugas kebersihan.',
      manfaat: 'Mengurangi volume sampah dan meningkatkan kebersihan kota.',
      estimasiBiaya: 'Rp 600.000.000',
      status: 'rejected',
    },
  ];

  const filteredUsulan = usulanData.filter(usulan => {
    const matchesSearch =
      usulan.judulProposal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usulan.namaInstansi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usulan.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'semua' || usulan.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: usulanData.length,
    pending: usulanData.filter(u => u.status === 'pending').length,
    reviewed: usulanData.filter(u => u.status === 'reviewed').length,
    approved: usulanData.filter(u => u.status === 'approved').length,
    rejected: usulanData.filter(u => u.status === 'rejected').length,
  };

  const openDetailModal = (usulan) => {
    setSelectedUsulan(usulan);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedUsulan(null);
  };

  const statusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#F6C343';
      case 'reviewed':
        return '#60A5FA';
      case 'approved':
        return '#34D399';
      case 'rejected':
        return '#EF4444';
      default:
        return '#999';
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#C6E5B3' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#2B5235', padding: '24px', color: 'white', height: '100vh', position: 'sticky', top: 0 }}>
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>SINOVA</div>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>Sistem Informasi Inovasi</div>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>Riset Daerah</div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a href="#" style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.1)', textDecoration: 'none', color: 'white' }}>
            📊 Dashboard
          </a>
          <a href="#" style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.1)', textDecoration: 'none', color: 'white' }}>
            📦 Katalog Produk
          </a>
          <a href="#" style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.2)', textDecoration: 'none', color: 'white' }}>
            📝 Usulan Kebutuhan
          </a>
          <a href="#" style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.1)', textDecoration: 'none', color: 'white' }}>
            👤 Profile
          </a>
        </nav>

        <button style={{ marginTop: 'auto', position: 'absolute', bottom: '24px', width: '202px', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', cursor: 'pointer' }}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2B5235' }}>Monitoring Usulan Kebutuhan Inovasi</h1>
        <p style={{ color: '#2B5235', opacity: 0.7, marginBottom: '28px' }}>
          Admin dapat memantau semua usulan kebutuhan yang diajukan oleh pengguna.
        </p>

        {/* Statistik */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '14px', color: '#555' }}>{key.toUpperCase()}</div>
              <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#2B5235' }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Tabel */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px' }}>
          <input
            type="text"
            placeholder="🔍 Cari usulan berdasarkan judul, instansi, atau nama..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #E0E0E0', marginBottom: '16px' }}
          />
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#2B5235', color: 'white' }}>
                <tr>
                  <th style={{ padding: '12px' }}>No</th>
                  <th style={{ padding: '12px' }}>Tanggal</th>
                  <th style={{ padding: '12px' }}>Nama</th>
                  <th style={{ padding: '12px' }}>Instansi</th>
                  <th style={{ padding: '12px' }}>Judul Proposal</th>
                  <th style={{ padding: '12px' }}>Kategori</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsulan.map((u, i) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{i + 1}</td>
                    <td style={{ padding: '12px' }}>{new Date(u.tanggalPengajuan).toLocaleDateString('id-ID')}</td>
                    <td style={{ padding: '12px' }}>{u.nama}</td>
                    <td style={{ padding: '12px' }}>{u.namaInstansi}</td>
                    <td style={{ padding: '12px', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.judulProposal}</td>
                    <td style={{ padding: '12px' }}>{u.kategoriInovasi}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ backgroundColor: statusColor(u.status), color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '12px' }}>
                        {u.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button
                        onClick={() => openDetailModal(u)}
                        style={{ backgroundColor: '#2B5235', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }}
                      >
                        👁️ Lihat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsulan.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#777' }}>Tidak ada data ditemukan</div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Detail */}
      {showDetailModal && selectedUsulan && (
        <div
          onClick={closeDetailModal}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000, padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#2B5235', marginBottom: '16px' }}>
              Detail Usulan Inovasi
            </h2>
            <p><b>Nama Pengusul:</b> {selectedUsulan.nama}</p>
            <p><b>Instansi:</b> {selectedUsulan.namaInstansi}</p>
            <p><b>Judul Proposal:</b> {selectedUsulan.judulProposal}</p>
            <p><b>Kategori:</b> {selectedUsulan.kategoriInovasi}</p>
            <p><b>Latar Belakang:</b> {selectedUsulan.latarBelakang}</p>
            <p><b>Tujuan:</b> {selectedUsulan.tujuan}</p>
            <p><b>Manfaat:</b> {selectedUsulan.manfaat}</p>
            <p><b>Estimasi Biaya:</b> {selectedUsulan.estimasiBiaya}</p>
            <p><b>Status:</b> {selectedUsulan.status.toUpperCase()}</p>
            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <button
                onClick={closeDetailModal}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: '2px solid #2B5235',
                  backgroundColor: 'white',
                  color: '#2B5235',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
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
