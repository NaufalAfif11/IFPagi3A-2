"use client";

import React, { useState } from "react";
import { Trash2, Eye, AlertCircle } from "lucide-react";
import SidebarAdmin from "@/components/ui/sidebar_admin";  // ← PENTING: pakai sidebar dari foldermu




// Komponen Detail Produk
function DetailProdukPage({ product, onBack, onVerify, onReject }) {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleReject = () => {
    if (rejectReason.trim()) {
      onReject(product.id, rejectReason);
      setShowRejectForm(false);
      setRejectReason("");
    }
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      >
        ← Kembali
      </button>

      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Detail Produk</h1>

        <div className="flex gap-8">
          <div className="flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-80 h-80 rounded-xl object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-3">{product.name}</h2>
            
            <div className="space-y-3 mb-6">
              <div>
                <span className="text-gray-600">Kategori:</span>
                <span className="ml-2 font-semibold">{product.category}</span>
              </div>
              
              <div>
                <span className="text-gray-600">Harga:</span>
                <span className="ml-2 text-2xl font-bold text-blue-600">
                  Rp {product.price.toLocaleString("id-ID")}
                </span>
              </div>
              
              <div>
                <span className="text-gray-600">Stok:</span>
                <span className="ml-2 font-semibold">{product.stock} unit</span>
              </div>

              <div>
                <span className="text-gray-600">Status:</span>
                <span
                  className={`ml-2 inline-block px-3 py-1 text-sm rounded-full ${
                    product.verified === true
                      ? "bg-green-200 text-green-700"
                      : product.verified === false
                      ? "bg-red-200 text-red-700"
                      : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {product.verified === true
                    ? "Terverifikasi"
                    : product.verified === false
                    ? "Ditolak"
                    : "Menunggu"}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-gray-600 font-semibold mb-2">Deskripsi:</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {product.rejectReason && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="text-red-600 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">Alasan Penolakan:</h3>
                    <p className="text-red-700">{product.rejectReason}</p>
                  </div>
                </div>
              </div>
            )}

            {product.verified === null && (
              <div className="space-y-3">
                <button
                  onClick={() => onVerify(product.id)}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                >
                  ✓ Verifikasi Produk
                </button>

                {!showRejectForm ? (
                  <button
                    onClick={() => setShowRejectForm(true)}
                    className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                  >
                    ✗ Tolak Produk
                  </button>
                ) : (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Alasan Penolakan:
                    </label>
                    <textarea
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Tuliskan alasan penolakan produk..."
                      className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-blue-500"
                      rows={4}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleReject}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                        disabled={!rejectReason.trim()}
                      >
                        Konfirmasi Tolak
                      </button>
                      <button
                        onClick={() => {
                          setShowRejectForm(false);
                          setRejectReason("");
                        }}
                        className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen Utama
export default function KatalogProdukAdminPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Elektronik" },
    { id: 2, name: "Fashion" },
    { id: 3, name: "Aksesoris" },
    { id: 4, name: "Peralatan Rumah" },
    { id: 5, name: "Gaming" },
    { id: 6, name: "Pendidikan" },
    { id: 7, name: "Kesehatan" },
    { id: 8, name: "Lingkungan" },
    { id: 9, name: "Transportasi" },
    { id: 10, name: "Pariwisata" },
    { id: 11, name: "Perikanan" },
    { id: 12, name: "Industri Kreatif" },
  ]);

  const dummyProducts = [
    {
      id: 1,
      name: "Keyboard Mechanical RX Pro",
      category: "Gaming",
      price: 850000,
      stock: 12,
      description: "Keyboard mechanical RGB dengan switch Blue. Dilengkapi dengan LED RGB yang dapat dikustomisasi dan build quality premium.",
      image: "https://via.placeholder.com/150",
      verified: null,
      rejectReason: null,
    },
    {
      id: 2,
      name: "Headset Surround Sound X5",
      category: "Elektronik",
      price: 650000,
      stock: 20,
      description: "Headset gaming dengan surround sound 7.1. Nyaman digunakan untuk gaming marathon dengan mic noise cancelling.",
      image: "https://via.placeholder.com/150",
      verified: true,
      rejectReason: null,
    },
    {
      id: 3,
      name: "Gelang Titanium Premium",
      category: "Aksesoris",
      price: 350000,
      stock: 8,
      description: "Gelang titanium anti karat desain elegan. Cocok untuk gaya kasual maupun formal.",
      image: "https://via.placeholder.com/150",
      verified: null,
      rejectReason: null,
    },
  ];

  const [products, setProducts] = useState(dummyProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    setShowDeleteConfirm(null);
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
    }
  };

  const handleVerify = (id) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, verified: true, rejectReason: null } : p
    );
    setProducts(updated);
    
    const updatedProduct = updated.find(p => p.id === id);
    setSelectedProduct(null);
    setTimeout(() => alert("Produk berhasil diverifikasi!"), 100);
  };

  const handleReject = (id, reason) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, verified: false, rejectReason: reason } : p
    );
    setProducts(updated);
    
    setSelectedProduct(null);
    setTimeout(() => alert("Produk ditolak!"), 100);
  };

  const handleViewDetail = (product) => {
    setSelectedProduct(product);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.find(c => c.name.toLowerCase() === newCategory.toLowerCase())) {
      const newId = Math.max(...categories.map(c => c.id)) + 1;
      setCategories([...categories, { id: newId, name: newCategory.trim() }]);
      setNewCategory("");
      setShowAddCategory(false);
      alert("Kategori berhasil ditambahkan!");
    }
  };

  const handleDeleteCategory = (id) => {
    const categoryName = categories.find(c => c.id === id)?.name;
    const hasProducts = products.some(p => p.category === categoryName);
    
    if (hasProducts) {
      alert("Tidak dapat menghapus kategori yang masih memiliki produk!");
      return;
    }
    
    setCategories(categories.filter(c => c.id !== id));
    alert("Kategori berhasil dihapus!");
  };

  // Filter produk berdasarkan pencarian dan kategori
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === "Semua" || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  if (selectedProduct) {
    return (
      <div className="flex h-screen bg-gray-100">
        <SidebarAdmin />
        <DetailProdukPage
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onVerify={handleVerify}
          onReject={handleReject}
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />

      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Katalog Produk Admin</h1>

        {/* STATISTIK */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-5 bg-white shadow rounded-xl">
            <h3 className="text-gray-600">Jumlah Produk</h3>
            <p className="text-3xl font-bold">{products.length}</p>
          </div>
          <div className="p-5 bg-white shadow rounded-xl">
            <h3 className="text-gray-600">Kategori</h3>
            <p className="text-3xl font-bold">{categories.length}</p>
          </div>
          <div className="p-5 bg-white shadow rounded-xl">
            <h3 className="text-gray-600">Menunggu Verifikasi</h3>
            <p className="text-3xl font-bold">
              {products.filter((p) => p.verified === null).length}
            </p>
          </div>
        </div>

        {/* LIST PRODUK */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Daftar Produk</h2>

          {/* FILTER & SEARCH */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div>
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-semibold text-gray-700">Kategori:</span>
              <button
                onClick={() => setSelectedCategory("Semua")}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === "Semua"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Semua
              </button>
              {categories.map((cat) => (
                <div key={cat.id} className="relative group">
                  <button
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-4 py-2 rounded-lg transition ${
                      selectedCategory === cat.name
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {cat.name}
                  </button>
                  {cat.id > 5 && (
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setShowAddCategory(!showAddCategory)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                + Tambah Kategori
              </button>
            </div>

            {/* Add Category Form */}
            {showAddCategory && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nama kategori baru..."
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleAddCategory}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => {
                      setShowAddCategory(false);
                      setNewCategory("");
                    }}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}

            {/* Result Count */}
            <p className="text-sm text-gray-600">
              Menampilkan {filteredProducts.length} dari {products.length} produk
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="p-4 border rounded-xl shadow hover:shadow-lg transition"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-bold">{p.name}</h3>
                <p className="text-sm text-gray-600">{p.category}</p>
                <p className="font-semibold mt-1">
                  Rp {p.price.toLocaleString("id-ID")}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                    p.verified === true
                      ? "bg-green-200 text-green-700"
                      : p.verified === false
                      ? "bg-red-200 text-red-700"
                      : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {p.verified === true
                    ? "Terverifikasi"
                    : p.verified === false
                    ? "Ditolak"
                    : "Menunggu"}
                </span>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleViewDetail(p)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm"
                  >
                    <Eye size={16} />
                    Detail
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(p.id)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {showDeleteConfirm === p.id && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800 mb-2">
                      Hapus produk ini?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="flex-1 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                      >
                        Ya, Hapus
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="flex-1 px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}