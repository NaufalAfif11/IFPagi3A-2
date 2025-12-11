"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/ui/navbar"; 
import Footer from "../../components/ui/footer"; 
import InovasiCard from "../../components/ui/InovasiCard";
import StatsSection from "../../components/ui/StatsSection";

// Definisi Tipe Data (Interface) untuk objek Inovasi
interface Inovasi {
    id: number;
    title: string;
    desc: string;
    images: string[];
    harga: string;
    kategori: string;
    penyedia: string;
    telp: string;
}

const ALL_CATEGORIES = [
    "Transportasi Pintar", "Otomotif", "Teknologi Udara", 
    "Teknologi Rumah", "Kesehatan", "Robotika"
];

// URL Backend API - Ubah sesuai dengan konfigurasi Anda
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function KatalogPage() {
    const [inovasiList, setInovasiList] = useState<Inovasi[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selected, setSelected] = useState<Inovasi | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // State untuk Search dan Filter
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Fetch Data dari Express Backend
    const fetchInovasi = useCallback(async () => {
        setLoading(true);
        setError(null);

        // Buat URL dengan query parameter
        const queryParams = new URLSearchParams();
        if (searchTerm) {
            queryParams.append('search', searchTerm);
        }
        if (selectedCategory) {
            queryParams.append('kategori', selectedCategory);
        }

        const url = `${API_BASE_URL}/api/katalog?${queryParams.toString()}`;
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Gagal memuat data inovasi dari server.');
            }

            const data: Inovasi[] = await response.json();
            setInovasiList(data);
        } catch (err) {
            console.error('Error fetching inovasi:', err);
            setError((err as Error).message);
            setInovasiList([]);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, selectedCategory]);

    useEffect(() => {
        fetchInovasi();
    }, [fetchInovasi]);

    // Fungsi handler untuk navigasi gambar modal
    const handlePrev = () => setCurrentImageIndex(prev => Math.max(0, prev - 1));
    const handleNext = () => selected && setCurrentImageIndex(prev => Math.min(selected.images.length - 1, prev + 1));

    return (
        <main className="min-h-screen flex flex-col bg-white overflow-hidden">
            <Navbar />

            {/* Judul & Search/Filter */}
            <motion.section
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12 px-8"
            >
                <h1 className="text-4xl font-bold text-[#1F4E73] mb-2">Katalog Inovasi Terbaru</h1>
                <p className="text-gray-600 mb-6">Jelajahi beragam hasil inovasi kreatif dan inspiratif!</p>

                {/* Search and Filter Inputs */}
                <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Cari berdasarkan judul atau deskripsi..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:border-[#1F4E73] outline-none transition-all"
                    />
                    
                    {/* Category Filter Dropdown */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg bg-white focus:border-[#1F4E73] outline-none transition-all sm:w-1/3"
                    >
                        <option value="">Semua Kategori</option>
                        {ALL_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </motion.section>

            {/* Daftar Katalog */}
            <section className="px-8 py-10 flex-1">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F4E73]"></div>
                        <p className="text-[#1F4E73] font-medium mt-4">Memuat data inovasi...</p>
                    </div>
                )}
                
                {error && !loading && (
                    <div className="text-center text-red-500 font-medium p-4 bg-red-50 rounded-lg max-w-md mx-auto">
                        ⚠️ Error: {error}
                        <button 
                            onClick={fetchInovasi}
                            className="block mx-auto mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Coba Lagi
                        </button>
                    </div>
                )}
                
                {!loading && !error && inovasiList.length === 0 && (
                    <div className="text-center text-gray-500 font-medium py-20">
                        <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>Tidak ada inovasi yang ditemukan untuk kriteria pencarian ini.</p>
                    </div>
                )}
                
                {!loading && inovasiList.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {inovasiList.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                            >
                                <div
                                    onClick={() => {
                                        setSelected(item);
                                        setCurrentImageIndex(0);
                                    }}
                                    className="cursor-pointer hover:scale-[1.03] transition-transform"
                                >
                                    <div className="border border-[#1F4E73]/20 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                        <InovasiCard title={item.title} desc={item.desc} image={item.images[0]} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* Stats & Footer */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <StatsSection />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                <Footer />
            </motion.div>

            {/* Modal Detail Inovasi */}
            <AnimatePresence>
            {selected && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50 p-4 overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelected(null)}
                >
                    <motion.div
                        className="bg-white w-full md:w-[85%] lg:w-[70%] rounded-2xl shadow-2xl overflow-hidden relative"
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.85, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="relative p-6 bg-[#1F4E73] text-white">
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute right-4 top-4 bg-white/20 hover:bg-white/40 w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                            >
                                ✕
                            </button>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div>
                                    <span className="bg-white/20 px-3 py-1 text-xs rounded-full">
                                        {selected.kategori}
                                    </span>
                                    <h2 className="text-3xl font-bold mt-2">{selected.title}</h2>
                                </div>

                                <div className="bg-white/20 px-4 py-2 rounded-xl text-sm backdrop-blur-md">
                                    <p className="opacity-80">Penyedia:</p>
                                    <p className="font-semibold">{selected.penyedia}</p>
                                </div>
                            </div>
                        </div>

                        {/* Carousel */}
                        <div className="bg-gray-50 p-6">
                            <div className="w-full flex items-center justify-center bg-white rounded-xl p-4 relative group">
                                <img
                                    src={selected.images[currentImageIndex]}
                                    alt={selected.title}
                                    className="max-h-[75vh] w-auto object-contain"
                                />

                                {/* Prev Button */}
                                <button
                                    disabled={currentImageIndex === 0}
                                    onClick={handlePrev}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 w-11 h-11 rounded-full shadow hover:bg-white flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    ←
                                </button>

                                {/* Next Button */}
                                <button
                                    disabled={currentImageIndex === selected.images.length - 1}
                                    onClick={handleNext}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 w-11 h-11 rounded-full shadow hover:bg-white flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    →
                                </button>
                            </div>

                            {/* Dot Indicator */}
                            <div className="flex justify-center mt-3 gap-2">
                                {selected.images.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                                            currentImageIndex === i ? "bg-[#1F4E73]" : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                        onClick={() => setCurrentImageIndex(i)}
                                    />
                                ))}
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-3 mt-5 overflow-x-auto pb-2">
                                {selected.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`min-w-[80px] h-[80px] rounded-lg overflow-hidden border transition-all ${
                                            currentImageIndex === index ? "border-4 border-[#1F4E73]" : "border-transparent opacity-80 hover:opacity-100"
                                        }`}
                                    >
                                        <img src={img} alt={`${selected.title} Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Detail */}
                        <div className="p-6 space-y-6">
                            {/* Deskripsi */}
                            <div>
                                <h3 className="font-bold text-xl text-[#1F4E73] mb-2">Deskripsi Produk</h3>
                                <p className="text-gray-700 leading-relaxed">{selected.desc}</p>
                            </div>

                            {/* Harga */}
                            <div className="bg-gradient-to-br from-[#1F4E73]/10 to-[#2c6a99]/20 border-l-4 border-[#1F4E73] p-4 rounded-xl">
                                <p className="text-gray-600 text-sm">Harga</p>
                                <p className="text-3xl font-bold text-[#1F4E73]">{selected.harga}</p>
                            </div>

                            {/* Penyedia */}
                            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                                <h3 className="font-semibold text-lg mb-3 text-[#1F4E73]">Informasi Kontak</h3>

                                <div className="grid sm:grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Perusahaan</p>
                                        <p className="font-medium text-gray-800">{selected.penyedia}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Nomor Telepon</p>
                                        <p className="font-medium text-gray-800">{selected.telp}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-5">
                                    <a
                                        href={`https://wa.me/${selected.telp.replace(/^0/, "62")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-[#25D366] hover:bg-[#1DA851] text-white py-3 rounded-lg text-center font-medium transition-colors"
                                    >
                                        Hubungi via WhatsApp
                                    </a>
                                    <a
                                        href={`tel:${selected.telp}`}
                                        className="flex-1 bg-[#1F4E73] hover:bg-[#183a54] text-white py-3 rounded-lg text-center font-medium transition-colors"
                                    >
                                        Telepon Langsung
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>
        </main>
    );
}