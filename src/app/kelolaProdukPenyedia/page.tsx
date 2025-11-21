'use client';

import { useState } from 'react';

export default function KatalogProdukPenyedia() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    kategori: '',
    deskripsi: '',
    harga: '',
    kontak: ''
  });

  // Data produk penyedia dengan status verifikasi
  const products = [
    {
      id: 1,
      nama: 'Aplikasi Manajemen Sampah',
      kategori: 'Aplikasi Mobile',
      deskripsi: 'Aplikasi untuk mengelola pengumpulan dan pemrosesan sampah di daerah dengan fitur tracking real-time',
      harga: 'Rp 15.000.000',
      rating: 4.5,
      jumlahPengguna: 12,
      status: 'verified',
      tanggalVerifikasi: '2025-01-15',
      catatanAdmin: 'Produk memenuhi standar kualitas dan telah diuji',
      image: null
    },
    {
      id: 2,
      nama: 'Smart Parking System',
      kategori: 'IoT',
      deskripsi: 'Sistem parkir pintar berbasis sensor IoT untuk meningkatkan efisiensi parkir dengan dashboard monitoring',
      harga: 'Rp 25.000.000',
      rating: 4.8,
      jumlahPengguna: 8,
      status: 'verified',
      tanggalVerifikasi: '2025-01-14',
      catatanAdmin: 'Inovasi sangat baik dan sesuai kebutuhan daerah',
      image: null
    },
    {
      id: 3,
      nama: 'E-Perizinan Terpadu',
      kategori: 'Website',
      deskripsi: 'Platform perizinan online terpadu untuk mempermudah proses administrasi perizinan dengan sistem terintegrasi',
      harga: 'Rp 30.000.000',
      rating: 4.7,
      jumlahPengguna: 15,
      status: 'verified',
      tanggalVerifikasi: '2025-01-10',
      catatanAdmin: 'Sistem terintegrasi dengan baik',
      image: null
    },
    {
      id: 4,
      nama: 'Sistem Monitoring Banjir',
      kategori: 'IoT',
      deskripsi: 'Sistem monitoring ketinggian air sungai real-time dengan early warning system untuk pencegahan banjir',
      harga: 'Rp 20.000.000',
      rating: 4.6,
      jumlahPengguna: 5,
      status: 'pending',
      tanggalSubmit: '2025-01-20',
      catatanAdmin: 'Sedang dalam proses review',
      image: null
    },
    {
      id: 5,
      nama: 'Portal Berita Daerah',
      kategori: 'Website',
      deskripsi: 'Platform portal berita dan informasi daerah dengan sistem manajemen konten yang mudah',
      harga: 'Rp 18.000.000',
      rating: 4.3,
      jumlahPengguna: 20,
      status: 'rejected',
      tanggalReview: '2025-01-18',
      catatanAdmin: 'Perlu perbaikan pada fitur keamanan dan performa',
      image: null
    },
    {
      id: 6,
      nama: 'Aplikasi Kesehatan Digital',
      kategori: 'Aplikasi Mobile',
      deskripsi: 'Aplikasi kesehatan untuk monitoring dan konsultasi kesehatan masyarakat secara digital',
      harga: 'Rp 22.000.000',
      rating: 4.4,
      jumlahPengguna: 10,
      status: 'pending',
      tanggalSubmit: '2025-01-22',
      catatanAdmin: 'Menunggu verifikasi dari admin',
      image: null
    }
  ];

  const categories = ['semua', 'Aplikasi Mobile', 'Website', 'IoT'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'semua' || product.kategori === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: products.length,
    verified: products.filter(p => p.status === 'verified').length,
    pending: products.filter(p => p.status === 'pending').length,
    rejected: products.filter(p => p.status === 'rejected').length
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Produk berhasil ditambahkan! Menunggu verifikasi admin.');
    setShowAddModal(false);
    setFormData({ nama: '', kategori: '', deskripsi: '', harga: '', kontak: '' });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#C6E5B3' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#2B5235', padding: '24px', color: 'white' }}>
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>SINOVA</div>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>Sistem Informasi Inovasi</div>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>Riset Daerah</div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a href="#" style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>📊</span> Dashboard
          </a>
          <a href="#" style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>📦</span> Katalog Produk
          </a>
          <a href="#" style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>👤</span> Profile
          </a>
        </nav>

        <button style={{ marginTop: 'auto', position: 'absolute', bottom: '24px', width: '202px', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>🚪</span> Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2B5235', marginBottom: '8px' }}>
              Katalog Produk Saya
            </h1>
            <p style={{ color: '#2B5235', opacity: 0.7 }}>
              Kelola produk inovasi dan riset yang Anda tawarkan
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#2B5235',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>+</span> Tambah Produk
          </button>
        </div>

        {/* Statistics Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Total Produk</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2B5235' }}>{stats.total}</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Terverifikasi</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#4CAF50' }}>{stats.verified}</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Pending Review</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FF9800' }}>{stats.pending}</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Perlu Perbaikan</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#F44336' }}>{stats.rejected}</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', marginBottom: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: selectedCategory === cat ? '#2B5235' : '#E8F5E9',
                  color: selectedCategory === cat ? 'white' : '#2B5235',
                  cursor: 'pointer',
                  fontWeight: '500',
                  textTransform: 'capitalize'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="🔍 Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '2px solid #E0E0E0',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', position: 'relative' }}>
              {/* Verification Badge */}
              <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10 }}>
                <div style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: product.status === 'verified' ? '#4CAF50' : product.status === 'pending' ? '#FF9800' : '#F44336',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  {product.status === 'verified' ? '✓ Terverifikasi' : product.status === 'pending' ? '⏳ Pending' : '✗ Perlu Perbaikan'}
                </div>
              </div>

              {/* Product Image */}
              <div style={{ width: '100%', height: '180px', backgroundColor: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '64px' }}>
                  {product.kategori === 'Aplikasi Mobile' ? '📱' : product.kategori === 'IoT' ? '🔌' : '🌐'}
                </div>
              </div>

              {/* Product Info */}
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2B5235', marginBottom: '8px' }}>
                  {product.nama}
                </h3>
                
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                  📂 {product.kategori}
                </div>
                
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2B5235', marginBottom: '12px' }}>
                  {product.harga}
                </div>

                <p style={{ fontSize: '14px', color: '#555', marginBottom: '12px', lineHeight: '1.5' }}>
                  {product.deskripsi}
                </p>

                {/* Stats */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', paddingTop: '12px', borderTop: '1px solid #E0E0E0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#666' }}>
                    <span>⭐</span>
                    <span>{product.rating}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#666' }}>
                    <span>👥</span>
                    <span>{product.jumlahPengguna} pengguna</span>
                  </div>
                </div>

                {/* Admin Verification Info */}
                <div style={{
                  backgroundColor: product.status === 'verified' ? '#E8F5E9' : product.status === 'pending' ? '#FFF3E0' : '#FFEBEE',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: product.status === 'verified' ? '#4CAF50' : product.status === 'pending' ? '#FF9800' : '#F44336', marginBottom: '4px' }}>
                    {product.status === 'verified' ? '✓ Status Verifikasi Admin' : product.status === 'pending' ? '⏳ Status Review' : '✗ Catatan Admin'}
                  </div>
                  <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.4' }}>
                    {product.catatanAdmin}
                  </div>
                  <div style={{ fontSize: '11px', color: '#999', marginTop: '6px' }}>
                    {product.status === 'verified' ? `Diverifikasi: ${new Date(product.tanggalVerifikasi).toLocaleDateString('id-ID')}` : 
                     product.status === 'pending' ? `Diajukan: ${new Date(product.tanggalSubmit).toLocaleDateString('id-ID')}` :
                     `Direview: ${new Date(product.tanggalReview).toLocaleDateString('id-ID')}`}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => alert(`Edit produk: ${product.nama}`)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '8px',
                      border: '2px solid #2B5235',
                      backgroundColor: 'white',
                      color: '#2B5235',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontSize: '14px'
                    }}
                  >
                    ✏️ Edit
                  </button>
                  
                  <button
                    onClick={() => alert(`Detail produk: ${product.nama}`)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: '#2B5235',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontSize: '14px'
                    }}
                  >
                    👁️ Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px', color: '#999' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📦</div>
            <div style={{ fontSize: '18px' }}>Tidak ada produk ditemukan</div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2B5235', marginBottom: '24px' }}>
              Tambah Produk Baru
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#2B5235', marginBottom: '8px' }}>
                  Nama Produk
                </label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  placeholder="Masukkan nama produk"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #E0E0E0',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#2B5235', marginBottom: '8px' }}>
                  Kategori
                </label>
                <select
                  value={formData.kategori}
                  onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #E0E0E0',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Pilih kategori</option>
                  <option value="Aplikasi Mobile">Aplikasi Mobile</option>
                  <option value="Website">Website</option>
                  <option value="IoT">IoT</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#2B5235', marginBottom: '8px' }}>
                  Deskripsi
                </label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                  placeholder="Jelaskan produk Anda..."
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #E0E0E0',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#2B5235', marginBottom: '8px' }}>
                  Harga
                </label>
                <input
                  type="text"
                  value={formData.harga}
                  onChange={(e) => setFormData({...formData, harga: e.target.value})}
                  placeholder="Rp 0"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #E0E0E0',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#2B5235', marginBottom: '8px' }}>
                  Kontak
                </label>
                <input
                  type="text"
                  value={formData.kontak}
                  onChange={(e) => setFormData({...formData, kontak: e.target.value})}
                  placeholder="Email atau nomor telepon"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #E0E0E0',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #E0E0E0',
                  backgroundColor: 'white',
                  color: '#666',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '14px'
                }}
              >
                Batal
              </button>
              
              <button
                onClick={handleSubmit}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#2B5235',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                Tambah Produk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}