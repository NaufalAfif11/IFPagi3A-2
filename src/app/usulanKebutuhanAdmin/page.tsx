'use client';

import { useState } from 'react';

export default function UsulanKebutuhanAdmin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [selectedUsulan, setSelectedUsulan] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

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

  const statusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'PENDING';
      case 'reviewed':
        return 'REVIEWED';
      case 'approved':
        return 'APPROVED';
      case 'rejected':
        return 'REJECTED';
      default:
        return status.toUpperCase();
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFFFFF', position: 'relative' }}>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        style={{
          display: 'none',
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 1001,
          padding: '12px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#1F4E73',
          color: 'white',
          cursor: 'pointer',
          fontSize: '20px'
        }}
        className="mobile-menu-btn"
      >
        ☰
      </button>

      {/* Sidebar Overlay */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          style={{
            display: 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999
          }}
          className="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <div 
        style={{ 
          width: '250px', 
          backgroundColor: '#1F4E73', 
          padding: '24px', 
          color: 'white', 
          height: '100vh', 
          position: 'sticky', 
          top: 0,
          transition: 'transform 0.3s ease',
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)'
        }}
        className={showSidebar ? 'sidebar sidebar-open' : 'sidebar'}
      >
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>SINOVA</div>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>Sistem Informasi Inovasi</div>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>Riset Daerah</div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a href="#" style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.1)', textDecoration: 'none', color: 'white', transition: 'background-color 0.2s' }}>
            📊 Dashboard
          </a>
          <a href="#" style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.1)', textDecoration: 'none', color: 'white', transition: 'background-color 0.2s' }}>
            📦 Katalog Produk
          </a>
          <a href="#" style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.25)', textDecoration: 'none', color: 'white', fontWeight: '500' }}>
            📝 Usulan Kebutuhan
          </a>
          <a href="#" style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.1)', textDecoration: 'none', color: 'white', transition: 'background-color 0.2s' }}>
            👤 Profile
          </a>
        </nav>

        <button style={{ marginTop: 'auto', position: 'absolute', bottom: '24px', width: 'calc(100% - 48px)', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px', width: '100%', minWidth: 0 }} className="main-content">
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F4E73', marginBottom: '8px' }} className="page-title">
          Monitoring Usulan Kebutuhan Inovasi
        </h1>
        <p style={{ color: '#64748B', marginBottom: '32px', fontSize: '15px' }} className="page-subtitle">
          Admin dapat memantau semua usulan kebutuhan yang diajukan oleh pengguna.
        </p>

        {/* Statistik */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '32px' }} className="stats-grid">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} style={{ backgroundColor: '#1F4E73', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} className="stat-card">
              <div style={{ fontSize: '13px', color: '#FFFFFF', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '500', opacity: 0.9 }}>{key === 'total' ? 'Total' : key}</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#FFFFFF' }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Tabel Desktop */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} className="table-container">
          <input
            type="text"
            placeholder="🔍 Cari usulan berdasarkan judul, instansi, atau nama..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '2px solid #E2E8F0', marginBottom: '20px', fontSize: '14px', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
          />
          
          {/* Desktop Table View */}
          <div style={{ overflowX: 'auto' }} className="desktop-table">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead style={{ backgroundColor: '#1F4E73', color: 'white' }}>
                <tr>
                  <th style={{ padding: '14px', fontSize: '14px', fontWeight: '600' }}>No</th>
                  <th style={{ padding: '14px', fontSize: '14px', fontWeight: '600' }}>Tanggal</th>
                  <th style={{ padding: '14px', fontSize: '14px', fontWeight: '600' }}>Nama</th>
                  <th style={{ padding: '14px', fontSize: '14px', fontWeight: '600' }}>Instansi</th>
                  <th style={{ padding: '14px', fontSize: '14px', fontWeight: '600' }}>Judul Proposal</th>
                  <th style={{ padding: '14px', fontSize: '14px', fontWeight: '600' }}>Kategori</th>
                  <th style={{ padding: '14px', fontSize: '14px', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '14px', fontSize: '14px', fontWeight: '600' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsulan.map((u, i) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #E2E8F0', transition: 'background-color 0.2s' }}>
                    <td style={{ padding: '14px', fontSize: '14px', color: '#334155' }}>{i + 1}</td>
                    <td style={{ padding: '14px', fontSize: '14px', color: '#334155' }}>{new Date(u.tanggalPengajuan).toLocaleDateString('id-ID')}</td>
                    <td style={{ padding: '14px', fontSize: '14px', color: '#334155' }}>{u.nama}</td>
                    <td style={{ padding: '14px', fontSize: '14px', color: '#334155' }}>{u.namaInstansi}</td>
                    <td style={{ padding: '14px', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '14px', color: '#334155' }}>{u.judulProposal}</td>
                    <td style={{ padding: '14px', fontSize: '14px', color: '#334155' }}>{u.kategoriInovasi}</td>
                    <td style={{ padding: '14px' }}>
                      <span style={{ backgroundColor: statusColor(u.status), color: 'white', padding: '6px 14px', borderRadius: '6px', fontSize: '11px', whiteSpace: 'nowrap', fontWeight: '500' }}>
                        {statusLabel(u.status)}
                      </span>
                    </td>
                    <td style={{ padding: '14px', textAlign: 'center' }}>
                      <button
                        onClick={() => openDetailModal(u)}
                        style={{ backgroundColor: '#1F4E73', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', transition: 'background-color 0.2s' }}
                      >
                        👁️ Lihat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsulan.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px', color: '#94A3B8' }}>Tidak ada data ditemukan</div>
            )}
          </div>

          {/* Mobile Card View */}
          <div className="mobile-cards">
            {filteredUsulan.length > 0 ? (
              filteredUsulan.map((u, i) => (
                <div key={u.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '16px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1F4E73' }}>#{i + 1}</span>
                    <span style={{ backgroundColor: statusColor(u.status), color: 'white', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '500' }}>
                      {statusLabel(u.status)}
                    </span>
                  </div>
                  
                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Tanggal</div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>{new Date(u.tanggalPengajuan).toLocaleDateString('id-ID')}</div>
                  </div>
                  
                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Nama</div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>{u.nama}</div>
                  </div>
                  
                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Instansi</div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>{u.namaInstansi}</div>
                  </div>
                  
                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Judul Proposal</div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>{u.judulProposal}</div>
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Kategori</div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>{u.kategoriInovasi}</div>
                  </div>
                  
                  <button
                    onClick={() => openDetailModal(u)}
                    style={{ width: '100%', backgroundColor: '#1F4E73', color: 'white', border: 'none', borderRadius: '8px', padding: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
                  >
                    👁️ Lihat Detail
                  </button>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>Tidak ada data ditemukan</div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Detail */}
      {showDetailModal && selectedUsulan && (
        <div
          onClick={closeDetailModal}
          style={{
            position: 'fixed', 
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            zIndex: 1000, 
            padding: '16px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '28px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
            }}
          >
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1F4E73', marginBottom: '20px' }}>
              Detail Usulan Inovasi
            </h2>
            <div style={{ fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              <p><b>Nama Pengusul:</b> {selectedUsulan.nama}</p>
              <p><b>Instansi:</b> {selectedUsulan.namaInstansi}</p>
              <p><b>Judul Proposal:</b> {selectedUsulan.judulProposal}</p>
              <p><b>Kategori:</b> {selectedUsulan.kategoriInovasi}</p>
              <p><b>Latar Belakang:</b> {selectedUsulan.latarBelakang}</p>
              <p><b>Tujuan:</b> {selectedUsulan.tujuan}</p>
              <p><b>Manfaat:</b> {selectedUsulan.manfaat}</p>
              <p><b>Estimasi Biaya:</b> {selectedUsulan.estimasiBiaya}</p>
              <p><b>Status:</b> {statusLabel(selectedUsulan.status)}</p>
            </div>
            <div style={{ marginTop: '28px', textAlign: 'right' }}>
              <button
                onClick={closeDetailModal}
                style={{
                  padding: '10px 24px',
                  borderRadius: '8px',
                  border: '2px solid #1F4E73',
                  backgroundColor: 'white',
                  color: '#1F4E73',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .mobile-cards {
          display: none;
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
          
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 1000;
            transform: translateX(-100%);
          }
          
          .sidebar-open {
            transform: translateX(0);
          }
          
          .sidebar-overlay {
            display: block !important;
          }
          
          .main-content {
            padding: 60px 16px 16px 16px !important;
          }
          
          .page-title {
            font-size: 20px !important;
          }
          
          .page-subtitle {
            font-size: 13px !important;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          
          .stat-card {
            padding: 12px !important;
          }
          
          .stat-card div:first-child {
            font-size: 11px !important;
          }
          
          .stat-card div:last-child {
            font-size: 18px !important;
          }
          
          .desktop-table {
            display: none !important;
          }
          
          .mobile-cards {
            display: block !important;
          }
          
          .table-container {
            padding: 16px !important;
          }
        }
        
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        /* Hover Effects */
        tbody tr:hover {
          background-color: #F8FAFC;
        }

        button:hover {
          opacity: 0.9;
        }

        input:focus {
          outline: none;
          border-color: #1F4E73;
        }

        a:hover {
          background-color: rgba(255,255,255,0.2) !important;
        }
      `}</style>
    </div>
  );
}