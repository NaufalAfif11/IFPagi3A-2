"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/ui/navbar";
import Footer from "@/components/ui/footer"; 

// Definisi interface untuk struktur data formulir
interface FormData {
    nama: string;
    alamat: string;
    email: string;
    telp: string;
    jabatan: string;
    namaperusahaan: string;
    emailPerusahaan: string;
    alamatPerusahaan: string;
    telpPerusahaan: string;
    jenisProduk: string;
    tanggal: string;
    deskripsi: string;
    dokumen: File | null;
}

// =================================================================
// 1. KOMPONEN MEMOIZED UNTUK INPUT FIELD (MENCEGAH RE-RENDER)
// =================================================================

interface InputFieldProps {
    label: string;
    name: keyof FormData;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    className?: string;
    required?: boolean;
}

// Input Field yang di-memoized
const MemoizedInputField: React.FC<InputFieldProps> = React.memo(({
    label, name, type = "text", placeholder, value, onChange, className = "", required = false,
}) => (
    <div> 
        <label htmlFor={name} className="block text-sm font-medium mb-1">
            {label} {required && <span className="text-red-400">*</span>}
        </label>
        <input
            id={name as string}
            type={type}
            name={name as string}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`w-full p-2 rounded bg-white text-[#1F4E73] border border-transparent focus:border-green-400 focus:ring-2 focus:ring-green-300 outline-none transition-all duration-200 ${className}`}
        />
    </div>
));

// TextArea Field yang di-memoized
const MemoizedTextAreaField: React.FC<Omit<InputFieldProps, 'type'>> = React.memo(({
    label, name, placeholder, value, onChange, required = false,
}) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium mb-1">
            {label} {required && <span className="text-red-400">*</span>}
        </label>
        <textarea
            id={name as string}
            name={name as string}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={4}
            className="w-full p-2 rounded bg-white text-[#1F4E73] border border-transparent focus:border-green-400 focus:ring-2 focus:ring-green-300 outline-none transition-all duration-200"
        />
    </div>
));

// =================================================================
// 2. KOMPONEN UTAMA
// =================================================================

export default function LayananPage() {
    const [formData, setFormData] = useState<FormData>({
        nama: "", alamat: "", email: "", telp: "", jabatan: "", namaperusahaan: "", 
        emailPerusahaan: "", alamatPerusahaan: "", telpPerusahaan: "", jenisProduk: "", 
        tanggal: "", deskripsi: "", dokumen: null,
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Menggunakan useCallback untuk memastikan handleChange tidak berubah pada setiap render
    const handleChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    }, []); // Dependency array kosong, fungsi ini hanya dibuat sekali

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    
    // Solusi 1: Mengandalkan struktur if/else yang kuat
    const files = e.target.files;

    if (files && files.length > 0) {
        setFormData(prevFormData => ({ 
            ...prevFormData, 
            // Ambil file pertama dari FileList
            dokumen: files[0] 
        }));
    } else {
        setFormData(prevFormData => ({ ...prevFormData, dokumen: null }));
    }
}, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        // Buat FormData untuk mengirim data teks dan file
        const submitFormData = new FormData();
        // Menggunakan loop untuk efisiensi dan memastikan semua field terkirim
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'dokumen' && value instanceof File) {
                submitFormData.append(key, value);
            } else if (key !== 'dokumen' && value !== null) {
                submitFormData.append(key, String(value));
            }
        });
        
        try {
            // KIRIM REQUEST DENGAN FormData (termasuk file)
            const response = await fetch('/api/layanan', {
                method: 'POST',
                body: submitFormData,
            });

            // Jika status response bukan 2xx, throw error agar masuk ke block catch berikutnya
            if (!response.ok) {
                 // Coba baca respons sebagai teks (mungkin HTML 500)
                const errorText = await response.text(); 
                // Jika errorText adalah HTML, kita tidak bisa mem-parsing JSON.
                // Oleh karena itu, kita buat Error baru.
                if (errorText.startsWith('<!DOCTYPE')) {
                    throw new Error(`Server Error (${response.status}): Endpoint API gagal. Cek log server.`);
                }
                
                // Jika bukan HTML, coba parsing sebagai JSON
                const data = JSON.parse(errorText); 
                setMessage({ type: 'error', text: data.message || 'Gagal mengajukan usulan. Silakan coba lagi.' });
                return;
            }

            // Jika response.ok, lanjutkan parsing JSON
            const data = await response.json();

            setMessage({ type: 'success', text: data.message || 'Usulan berhasil diajukan!' });
            // Reset formulir setelah sukses
            setFormData({
                nama: "", alamat: "", email: "", telp: "", jabatan: "", namaperusahaan: "", 
                emailPerusahaan: "", alamatPerusahaan: "", telpPerusahaan: "", jenisProduk: "", 
                tanggal: "", deskripsi: "", dokumen: null,
            });
            // Reset input file secara manual
            (document.getElementById('dokumen') as HTMLInputElement).value = '';
            
        } catch (error) {
            console.error("Error submitting form:", error);
            // Menampilkan pesan error yang lebih informatif jika didapat dari server
            setMessage({ 
                type: 'error', 
                text: (error as Error).message.includes('Endpoint API gagal') 
                    ? (error as Error).message 
                    : 'Terjadi kesalahan koneksi atau kesalahan JSON. Cek console browser.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-gray-50 py-10 flex justify-center items-start">
                <motion.div
                    // Container utama tetap di-animasi
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-[#1F4E73] text-white w-full max-w-2xl rounded-2xl shadow-2xl p-8"
                >
                    <motion.h1
                        // Judul tetap di-animasi
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-3xl font-extrabold mb-8 text-center text-green-300"
                    >
                        Layanan Usulan Produk Baru
                    </motion.h1>

                    {message && (
                        <motion.div 
                            // Pesan status tetap di-animasi
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`p-3 mb-6 rounded-lg font-semibold ${message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                        >
                            {message.text}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <p className="text-xl font-bold border-b-2 border-green-400 pb-2">
                            Data Pribadi
                        </p>

                        {/* MENGGUNAKAN KOMPONEN MEMOIZED */}
                        <MemoizedInputField
                            label="Nama Lengkap" name="nama" value={formData.nama} onChange={handleChange} placeholder="Masukkan nama Anda" required
                        />

                        <MemoizedInputField
                            label="Alamat Lengkap" name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Jalan, kota, provinsi"
                        />

                        <MemoizedInputField
                            label="Email Pribadi" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="contoh@domain.com" required
                        />

                        <MemoizedInputField
                            label="Nomor Telepon" name="telp" value={formData.telp} onChange={handleChange} placeholder="Contoh: 0812xxxx"
                        />

                        <MemoizedInputField
                            label="Jabatan" name="jabatan" value={formData.jabatan} onChange={handleChange} placeholder="Contoh: Manajer Pemasaran"
                        />

                        <p className="text-xl font-bold border-b-2 border-green-400 pb-2 pt-4">
                            Data Perusahaan
                        </p>

                        <MemoizedInputField
                            label="Nama Perusahaan" name="namaperusahaan" value={formData.namaperusahaan} onChange={handleChange} placeholder="Contoh: PT Jaya Abadi" required
                        />

                        <MemoizedInputField
                            label="Email Perusahaan" name="emailPerusahaan" type="email" value={formData.emailPerusahaan} onChange={handleChange} placeholder="hrd@perusahaan.com"
                        />

                        <MemoizedInputField
                            label="Alamat Perusahaan" name="alamatPerusahaan" value={formData.alamatPerusahaan} onChange={handleChange} placeholder="Alamat kantor pusat"
                        />

                        <MemoizedInputField
                            label="Nomor Telepon Perusahaan" name="telpPerusahaan" value={formData.telpPerusahaan} onChange={handleChange} placeholder="Contoh: (021) xxxxxxx"
                        />
                        
                        <p className="text-xl font-bold border-b-2 border-green-400 pb-2 pt-4">
                            Detail Usulan
                        </p>

                        <MemoizedInputField
                            label="Jenis Produk yang Diusulkan" name="jenisProduk" value={formData.jenisProduk} onChange={handleChange} placeholder="Contoh: Aplikasi Mobile, Platform Web, Smart Device" required
                        />

                        <MemoizedInputField
                            label="Tanggal Rencana Mulai (Perkiraan)" name="tanggal" type="date" value={formData.tanggal} onChange={handleChange}
                        />

                        <MemoizedTextAreaField
                            label="Deskripsi Singkat Usulan (Kebutuhan & Manfaat)" name="deskripsi" value={formData.deskripsi} onChange={handleChange} placeholder="Jelaskan kebutuhan, fitur utama, dan manfaat produk yang diusulkan" required
                        />
                        
                        {/* Input File - Tidak perlu memo karena handleFileChange di-memoized */}
                        <div> 
                            <label htmlFor="dokumen" className="block text-sm font-medium mb-1">
                                Dokumen Pendukung (Opsional)
                            </label>
                            <input
                                id="dokumen"
                                type="file"
                                name="dokumen"
                                onChange={handleFileChange} // Menggunakan fungsi yang di-memoized
                                className="w-full p-2 rounded bg-white text-[#1F4E73] border border-transparent focus:border-green-400 focus:ring-2 focus:ring-green-300 outline-none transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                            />
                        </div>


                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            className={`w-full py-3 mt-8 text-lg font-bold rounded-xl transition-colors duration-300 ${
                                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                            }`}
                        >
                            {loading ? 'Mengajukan...' : 'Ajukan Usulan Produk'}
                        </motion.button>
                    </form>
                </motion.div>
            </main>

            <Footer />
        </>
    );
}