"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "@/components/ui/footer";

export default function LayananPage() {
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    email: "",
    telp: "",
    jabatan: "",
    namaperusahaan: "",
    emailPerusahaan: "",
    alamatPerusahaan: "",
    telpPerusahaan: "",
    jenisProduk: "",
    tanggal: "",
    deskripsi: "",
    dokumen: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, dokumen: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data Usulan:", formData);
    alert("Usulan berhasil diajukan!");
  };

  const InputField = ({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    className = "",
  }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2 rounded bg-white text-[#2B5235] border border-transparent focus:border-green-400 focus:ring-2 focus:ring-green-300 outline-none transition-all duration-200 ${className}`}
      />
    </motion.div>
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#C6E5B3] py-10 flex justify-center items-start">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#2B5235] text-white w-full max-w-2xl rounded-2xl shadow-2xl p-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl font-bold mb-6 text-center"
          >
            Layanan Usulan Produk
          </motion.h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-lg font-semibold border-b border-[#C6E5B3] pb-2">
              Data Pribadi
            </p>

            <InputField
              label="Nama Lengkap"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Masukkan nama Anda"
            />

            <InputField
              label="Alamat Lengkap"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              placeholder="Jalan, kota, provinsi"
            />

            <InputField
              label="Email Pribadi"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contoh@domain.com"
            />

            <InputField
              label="Nomor Telepon"
              name="telp"
              value={formData.telp}
              onChange={handleChange}
              placeholder="Contoh: 0812xxxx"
            />

            <InputField
              label="Jabatan"
              name="jabatan"
              value={formData.jabatan}
              onChange={handleChange}
              placeholder="Contoh: Manajer Pemasaran"
            />

            <p className="text-lg font-semibold border-b border-white/50 pb-2 pt-4">
              Data Perusahaan
            </p>

            <InputField
              label="Nama Perusahaan"
              name="namaperusahaan"
              value={formData.namaperusahaan}
              onChange={handleChange}
              placeholder="Contoh: PT Jaya Abadi"
            />

            <InputField
              label="Email Perusahaan"
              name="emailPerusahaan"
              type="email"
              value={formData.emailPerusahaan}
              onChange={handleChange}
              placeholder="hrd@perusahaan.com"
            />

            <InputField
              label="Alamat Perusahaan"
              name="alamatPerusahaan"
              value={formData.alamatPerusahaan}
              onChange={handleChange}
              placeholder="Alamat kantor pusat"
            />

            <InputField
              label="Nomor Telepon Perusahaan"
              name="telpPerusahaan"
              value={formData.telpPerusahaan}
              onChange={handleChange}
              placeholder="Nomor kontak perusahaan"
            />

            <p className="text-lg font-semibold border-b border-white/50 pb-2 pt-4">
              Detail Usulan Produk
            </p>

            <InputField
              label="Jenis Produk yang Diusulkan"
              name="jenisProduk"
              value={formData.jenisProduk}
              onChange={handleChange}
              placeholder="Contoh: Aplikasi Mobile/Sistem Pembayaran"
            />

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <label
                htmlFor="tanggal"
                className="block text-sm font-medium mb-1"
              >
                Tanggal Rencana Pelaksanaan
              </label>
              <input
                id="tanggal"
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-[#2B5235] border border-transparent focus:border-green-400 focus:ring-2 focus:ring-green-300 outline-none transition-all duration-200"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <label
                htmlFor="deskripsi"
                className="block text-sm font-medium mb-1"
              >
                Deskripsi Kebutuhan/Usulan
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                onChange={handleChange}
                placeholder="Jelaskan secara singkat latar belakang, tujuan, dan fitur utama dari usulan Anda."
                className="w-full p-2 rounded bg-white text-[#2B5235] border border-transparent focus:border-green-400 focus:ring-2 focus:ring-green-300 outline-none transition-all duration-200"
                rows={4}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <label className="block text-sm font-medium mb-1">
                Dokumen Pendukung (opsional)
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 rounded bg-white text-[#2B5235] file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-[#2B5235] hover:file:bg-green-200"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-white text-[#2B5235] font-bold rounded-lg hover:bg-gray-200 transition duration-150 shadow-md"
            >
              AJUKAN USULAN
            </motion.button>
          </form>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
