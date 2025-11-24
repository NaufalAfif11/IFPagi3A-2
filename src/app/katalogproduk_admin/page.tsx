'use client';

import { useState } from 'react';
import { Home, Package, Lightbulb, User, LogOut, Menu, X, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import SidebarAdmin from "@/components/admin/SidebarAdmin";


export default function KatalogProduk_admin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [activeMenu, setActiveMenu] = useState('Katalog Produk');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [verificationNote, setVerificationNote] = useState('');

  const [products, setProducts] = useState([
    {
      id: 1,
      nama: 'Aplikasi Manajemen Sampah',
      kategori: 'Lingkungan',
      deskripsi: 'Aplikasi untuk mengelola pengumpulan dan pemrosesan sampah di daerah dengan fitur tracking real-time',
      harga: 'Rp 15.000.000',
      status: 'verified',
      tanggalVerifikasi: '2025-01-15',
      catatanAdmin: 'Produk memenuhi standar kualitas dan telah diuji',
      kontak: 'developer@sampah.id'
    },
    {
      id: 2,
      nama: 'Smart Parking System',
      kategori: 'Transportasi',
      deskripsi: 'Sistem parkir pintar berbasis sensor IoT untuk meningkatkan efisiensi parkir dengan dashboard monitoring',
      harga: 'Rp 25.000.000',
      status: 'verified',
      tanggalVerifikasi: '2025-01-14',
      catatanAdmin: 'Inovasi sangat baik dan sesuai kebutuhan daerah',
      kontak: 'info@smartparking.com'
    },
    {
      id: 3,
      nama: 'E-Learning Platform',
      kategori: 'Pendidikan',
      deskripsi: 'Platform pembelajaran online terpadu untuk mendukung pendidikan jarak jauh dengan sistem terintegrasi',
      harga: 'Rp 30.000.000',
      status: 'verified',
      tanggalVerifikasi: '2025-01-10',
      catatanAdmin: 'Sistem terintegrasi dengan baik',
      kontak: 'admin@elearning.id'
    },
    {
      id: 4,
      nama: 'Sistem Monitoring Banjir',
      kategori: 'Lingkungan',
      deskripsi: 'Sistem monitoring ketinggian air sungai real-time dengan early warning system untuk pencegahan banjir',
      harga: 'Rp 20.000.000',
      status: 'pending',
      tanggalSubmit: '2025-01-20',
      catatanAdmin: 'Sedang dalam proses review',
      kontak: 'tech@floodmonitor.id'
    },
    {
      id: 5,
      nama: 'Telemedicine App',
      kategori: 'Kesehatan',
      deskripsi: 'Aplikasi kesehatan untuk monitoring dan konsultasi kesehatan masyarakat secara digital',
      harga: 'Rp 22.000.000',
      status: 'pending',
      tanggalSubmit: '2025-01-22',
      catatanAdmin: 'Menunggu verifikasi dari admin',
      kontak: 'support@telemedicine.id'
    },
    {
      id: 6,
      nama: 'Virtual Tour Wisata',
      kategori: 'Pariwisata',
      deskripsi: 'Platform virtual tour untuk destinasi wisata daerah dengan teknologi 360 derajat',
      harga: 'Rp 18.000.000',
      status: 'rejected',
      tanggalReview: '2025-01-18',
      catatanAdmin: 'Perlu perbaikan pada fitur keamanan dan performa',
      kontak: 'hello@virtualtour.id'
    }
  ]);

  const categories = ['semua', 'Pendidikan', 'Kesehatan', 'Lingkungan', 'Transportasi', 'Pariwisata', 'Perikanan', 'Industri Kreatif'];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.nama.toLowerCase().includes(searchQuery.toLowerCase()) || product.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'semua' || product.kategori === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: products.length,
    verified: products.filter((p) => p.status === 'verified').length,
    pending: products.filter((p) => p.status === 'pending').length,
    rejected: products.filter((p) => p.status === 'rejected').length
  };

  const handleDelete = (productId) => {
    const product = products.find(p => p.id === productId);
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${product.nama}"?`)) {
      setProducts(products.filter(p => p.id !== productId));
      alert(`Produk "${product.nama}" berhasil dihapus!`);
    }
  };

  const handleVerify = (status) => {
    if (!verificationNote.trim()) {
      alert('Mohon isi catatan verifikasi!');
      return;
    }

    const updatedProducts = products.map(p => {
      if (p.id === selectedProduct.id) {
        return {
          ...p,
          status: status,
          catatanAdmin: verificationNote,
          tanggalVerifikasi: status === 'verified' ? new Date().toISOString().split('T')[0] : undefined,
          tanggalReview: status === 'rejected' ? new Date().toISOString().split('T')[0] : undefined
        };
      }
      return p;
    });

    setProducts(updatedProducts);
    alert(`Produk berhasil ${status === 'verified' ? 'diverifikasi' : 'ditolak'}!`);
    setSelectedProduct(null);
    setVerificationNote('');
  };

  const Sidebar = () => (
    <div style={{ width: '256px', display: 'flex', flexDirection: 'column', backgroundColor: '#1F4E73', position: 'fixed', height: '100vh', zIndex: 1000, transition: 'transform 0.3s ease' }} className={sidebarOpen ? 'sidebar sidebar-open' : 'sidebar'}>
      <div style={{ padding: '16px', borderBottom: '1px solid rgba(59, 130, 246, 0.3)' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: 0 }}>SINOVA</h1>
        <p style={{ fontSize: '12px', color: '#BFDBFE', marginTop: '4px', marginBottom: 0 }}>Sistem Informasi dan Inovasi Riset Daerah</p>
      </div>
      <nav style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { name: 'Dashboard', icon: <Home size={20} /> },
            { name: 'Katalog Produk', icon: <Package size={20} /> },
            { name: 'Usulan Kebutuhan', icon: <Lightbulb size={20} /> },
            { name: 'Profil', icon: <User size={20} /> }
          ].map((item) => (
            <li key={item.name}>
              <button onClick={() => { setActiveMenu(item.name); setSidebarOpen(false); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', borderRadius: '8px', fontSize: '14px', backgroundColor: activeMenu === item.name ? '#1e40af' : 'transparent', color: activeMenu === item.name ? 'white' : '#BFDBFE', borderLeft: activeMenu === item.name ? '4px solid #FCD34D' : '4px solid transparent', border: 'none', cursor: 'pointer' }}>
                {item.icon}
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div style={{ padding: '16px', borderTop: '1px solid rgba(59, 130, 246, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '14px' }}>DY</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '14px', fontWeight: '500', color: 'white', margin: 0 }}>Dr. Ahmad Yani</p>
            <p style={{ fontSize: '12px', color: '#BFDBFE', margin: 0 }}>Admin</p>
          </div>
        </div>
        <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px 16px', fontSize: '14px', color: '#FCA5A5', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </div>
  );

  if (selectedProduct) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: '256px', padding: '32px', backgroundColor: '#F8F9FA' }} className="main-content">
          <button onClick={() => setSelectedProduct(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: 'white', border: '2px solid #E5E7EB', borderRadius: '8px', color: '#1F4E73', fontWeight: '500', cursor: 'pointer', marginBottom: '24px' }}>
            <ArrowLeft size={20} />
            Kembali
          </button>

          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F4E73', margin: 0 }}>Detail Produk</h1>
              <div style={{ padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', backgroundColor: selectedProduct.status === 'verified' ? '#10B981' : selectedProduct.status === 'pending' ? '#F59E0B' : '#EF4444', color: 'white' }}>
                {selectedProduct.status === 'verified' ? '✓ Terverifikasi' : selectedProduct.status === 'pending' ? '⏳ Pending' : '✗ Ditolak'}
              </div>
            </div>

            <div style={{ display: 'grid', gap: '24px', marginBottom: '32px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Nama Produk</label>
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#1F4E73', margin: 0 }}>{selectedProduct.nama}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Kategori</label>
                  <p style={{ fontSize: '16px', color: '#374151', margin: 0 }}>📂 {selectedProduct.kategori}</p>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Harga</label>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#1F4E73', margin: 0 }}>{selectedProduct.harga}</p>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Kontak</label>
                  <p style={{ fontSize: '16px', color: '#374151', margin: 0 }}>{selectedProduct.kontak}</p>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Deskripsi</label>
                <p style={{ fontSize: '16px', color: '#374151', lineHeight: '1.6', margin: 0 }}>{selectedProduct.deskripsi}</p>
              </div>

              {selectedProduct.catatanAdmin && (
                <div style={{ backgroundColor: selectedProduct.status === 'verified' ? '#D1FAE5' : selectedProduct.status === 'pending' ? '#FEF3C7' : '#FEE2E2', padding: '16px', borderRadius: '8px', borderLeft: `4px solid ${selectedProduct.status === 'verified' ? '#10B981' : selectedProduct.status === 'pending' ? '#F59E0B' : '#EF4444'}` }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: selectedProduct.status === 'verified' ? '#059669' : selectedProduct.status === 'pending' ? '#D97706' : '#DC2626', marginBottom: '8px' }}>Catatan Admin Sebelumnya</label>
                  <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>{selectedProduct.catatanAdmin}</p>
                </div>
              )}
            </div>

            <div style={{ borderTop: '2px solid #E5E7EB', paddingTop: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F4E73', marginBottom: '16px' }}>Verifikasi Produk</h2>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Catatan Verifikasi <span style={{ color: '#EF4444' }}>*</span></label>
                <textarea value={verificationNote} onChange={(e) => setVerificationNote(e.target.value)} placeholder="Tulis catatan verifikasi di sini..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #E5E7EB', fontSize: '14px', minHeight: '120px', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }} />
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button onClick={() => handleVerify('verified')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: '#10B981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
                  <CheckCircle size={20} />
                  Verifikasi & Setujui
                </button>
                <button onClick={() => handleVerify('rejected')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
                  <XCircle size={20} />
                  Tolak Produk
                </button>
                <button onClick={() => { setSelectedProduct(null); setVerificationNote(''); }} style={{ padding: '12px 24px', backgroundColor: 'white', color: '#6B7280', border: '2px solid #E5E7EB', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F9FA', position: 'relative' }}>
      <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ position: 'fixed', top: '16px', left: '16px', zIndex: 1001, padding: '10px', backgroundColor: '#1F4E73', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'none' }} className="mobile-menu-btn">
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'none' }} className="sidebar-overlay" />}

      <Sidebar />

      <div style={{ flex: 1, padding: '32px', backgroundColor: '#F8F9FA', marginLeft: '256px' }} className="main-content">
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1F4E73', margin: 0, marginBottom: '8px' }}>Katalog Produk</h1>
          <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>Kelola dan verifikasi produk inovasi dan riset</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <StatCard label="Total Produk" value={stats.total} color="#1F4E73" />
          <StatCard label="Terverifikasi" value={stats.verified} color="#10B981" />
          <StatCard label="Pending Review" value={stats.pending} color="#F59E0B" />
          <StatCard label="Perlu Perbaikan" value={stats.rejected} color="#EF4444" />
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: '8px 16px', borderRadius: '20px', border: selectedCategory === cat ? 'none' : '2px solid #E5E7EB', backgroundColor: selectedCategory === cat ? '#1F4E73' : 'white', color: selectedCategory === cat ? 'white' : '#6B7280', cursor: 'pointer', fontWeight: '500', fontSize: '13px' }}>
                {cat}
              </button>
            ))}
          </div>
          <input type="text" placeholder="🔍 Cari produk..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '2px solid #E5E7EB', fontSize: '14px', outline: 'none' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '12px', right: '12px', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', backgroundColor: product.status === 'verified' ? '#10B981' : product.status === 'pending' ? '#F59E0B' : '#EF4444', color: 'white', zIndex: 10 }}>
                {product.status === 'verified' ? '✓ Terverifikasi' : product.status === 'pending' ? '⏳ Pending' : '✗ Perlu Perbaikan'}
              </div>
              <div style={{ width: '100%', height: '180px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>
                {product.kategori === 'Pendidikan' ? '📚' : product.kategori === 'Kesehatan' ? '🏥' : product.kategori === 'Lingkungan' ? '🌿' : product.kategori === 'Transportasi' ? '🚗' : product.kategori === 'Pariwisata' ? '🏖️' : product.kategori === 'Perikanan' ? '🐟' : product.kategori === 'Industri Kreatif' ? '🎨' : '📦'}
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F4E73', marginBottom: '4px' }}>{product.nama}</h3>
                <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>📂 {product.kategori}</p>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F4E73', marginBottom: '12px' }}>{product.harga}</p>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px', lineHeight: '1.6' }}>{product.deskripsi}</p>
                <div style={{ backgroundColor: product.status === 'verified' ? '#D1FAE5' : product.status === 'pending' ? '#FEF3C7' : '#FEE2E2', padding: '12px', borderRadius: '8px', marginBottom: '16px', borderLeft: `4px solid ${product.status === 'verified' ? '#10B981' : product.status === 'pending' ? '#F59E0B' : '#EF4444'}` }}>
                  <p style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: product.status === 'verified' ? '#059669' : product.status === 'pending' ? '#D97706' : '#DC2626' }}>
                    {product.status === 'verified' ? '✓ Status Verifikasi Admin' : product.status === 'pending' ? '⏳ Status Review' : '✗ Catatan Admin'}
                  </p>
                  <p style={{ fontSize: '13px', color: '#374151', margin: 0 }}>{product.catatanAdmin}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleDelete(product.id)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '2px solid #EF4444', backgroundColor: 'white', color: '#EF4444', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}>🗑️ Hapus</button>
                  <button onClick={() => setSelectedProduct(product)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#1F4E73', color: 'white', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}>👁️ Detail</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px', color: '#9CA3AF' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📦</div>
            <div style={{ fontSize: '18px', fontWeight: '500' }}>Tidak ada produk ditemukan</div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          .sidebar { transform: translateX(-100%); }
          .sidebar-open { transform: translateX(0) !important; }
          .sidebar-overlay { display: block !important; }
          .main-content { margin-left: 0 !important; padding: 80px 16px 32px 16px !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .main-content { margin-left: 256px !important; padding: 24px !important; }
        }
      `}</style>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div style={{ fontSize: '32px', fontWeight: 'bold', color, marginBottom: '4px' }}>{value}</div>
      <div style={{ fontSize: '14px', color: '#555' }}>{label}</div>
    </div>
  );
}