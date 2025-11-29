"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
// Menggunakan path relatif yang lebih aman jika file ini di level /app/katalogpage/page.tsx
// Jika file Anda berada di src/app/katalogpage/page.tsx, maka path harus seperti ini:
import Navbar from "../../components/ui/navbar"; 
import Footer from "../../components/ui/footer"; // Disesuaikan dari "@/components/ui/footer"
import InovasiCard from "../../components/ui/InovasiCard";
import StatsSection from "../../components/ui/StatsSection";

// Definisi Tipe Data (Interface) untuk objek Inovasi
interface Inovasi {
  title: string;
  desc: string;
  images: string[];
  harga: string;
  kategori: string;
  penyedia: string;
  telp: string;
}

export default function KatalogPage() {
  // 1. Terapkan tipe Inovasi[] pada list data
  const inovasiList: Inovasi[] = [
    {
      title: "Smart Bike",
      desc: "Sepeda pintar dengan sistem navigasi digital yang dapat memantau kecepatan, arah, dan jarak tempuh.",
      images: ["/katalog 1.jpg", "/katalog2.jpg", "/katalog3.jpg", "/katalog4.png"],
      harga: "Rp 4.500.000",
      kategori: "Transportasi Pintar",
      penyedia: "PT Inovasi Transportasi Cerdas",
      telp: "081234567890",
    },
    {
      title: "Kendaraan Listrik",
      desc: "Kendaraan listrik hemat energi dengan baterai berdaya tahan tinggi dan ramah lingkungan.",
      images: ["/mobil1.jpg", "/mobil2.jpg", "/mobil3.jpeg", "/mobil4.jpg"],
      harga: "Rp 28.000.000",
      kategori: "Otomotif",
      penyedia: "PT Energi Hijau Nusantara",
      telp: "081298765432",
    },
    {
      title: "Drone Mini",
      desc: "Drone mini multifungsi untuk pemetaan wilayah dan pengiriman barang ringan dengan presisi tinggi.",
      images: ["/drone1.jpg", "/drone2.jpg", "/drone3.jpg", "/drone4.jpg"],
      harga: "Rp 7.500.000",
      kategori: "Teknologi Udara",
      penyedia: "AeroTech Solutions",
      telp: "082112223334",
    },
    {
      title: "Smart Home System",
      desc: "Sistem rumah pintar yang mengintegrasikan pencahayaan, keamanan, dan suhu ruangan berbasis IoT.",
      images: ["/home1.jpg", "/home2.jpg", "/home3.jpg", "/home4.jpg"],
      harga: "Rp 12.000.000",
      kategori: "Teknologi Rumah",
      penyedia: "HomeSmart Indonesia",
      telp: "085677889900",
    },
    {
      title: "Purifier Air Nano",
      desc: "Alat pembersih udara dengan teknologi nano filter yang efektif membunuh bakteri dan virus di ruangan.",
      images: ["/air1.jpg", "/air2.jpg", "/air3.jpg", "/air4.jpg"],
      harga: "Rp 2.800.000",
      kategori: "Kesehatan",
      penyedia: "PT Nano Clean Tech",
      telp: "085345678901",
    },
    {
      title: "Robot Pembersih Lantai",
      desc: "Robot otomatis untuk membersihkan lantai dengan sensor navigasi canggih dan daya tahan tinggi.",
      images: ["/robot1.jpg", "/robot2.jpg", "/robot3.jpg", "/robot4.jpg"],
      harga: "Rp 6.300.000",
      kategori: "Robotika",
      penyedia: "RoboHome ID",
      telp: "081233445566",
    },
  ];

  // 2. Ganti <any> dengan <Inovasi | null>
  const [selected, setSelected] = useState<Inovasi | null>(null);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <main className="min-h-screen flex flex-col bg-white overflow-hidden">
      <Navbar />

      {/* Judul */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12"
      >
        <h1 className="text-4xl font-bold text-[#1F4E73] mb-2">Katalog Inovasi Terbaru</h1>
        <p className="text-gray-600">Jelajahi beragam hasil inovasi kreatif dan inspiratif!</p>
      </motion.section>

      {/* Daftar Katalog */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 py-10">
        {inovasiList.map((item, i) => (
          <motion.div
            key={i}
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
      </section>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <StatsSection />
      </motion.div>

      {/* Footer */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <Footer />
      </motion.div>

      {/* ============================
          Modal Detail Inovasi
      ============================= */}
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
            className="absolute right-4 top-4 bg-white/20 hover:bg-white/40 w-10 h-10 rounded-lg flex items-center justify-center"
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
          <div className="w-full flex items-center justify-center bg-white rounded-xl p-4">
  <img
    src={selected.images[currentImageIndex]}
    alt={selected.title}
    className="max-h-[75vh] w-auto object-contain"
  />




            {/* Prev */}
            <button
              disabled={currentImageIndex === 0}
              onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 w-11 h-11 rounded-full shadow hidden group-hover:flex items-center justify-center text-lg"
            >
              ←
            </button>

            {/* Next */}
            <button
              disabled={currentImageIndex === selected.images.length - 1}
              onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 w-11 h-11 rounded-full shadow hidden group-hover:flex items-center justify-center text-lg"
            >
              →
            </button>
          </div>

          {/* Dot Indicator */}
          <div className="flex justify-center mt-3 gap-2">
            {selected.images.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  currentImageIndex === i ? "bg-[#1F4E73]" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-5 overflow-x-auto pb-2">
            {selected.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`min-w-[80px] h-[80px] rounded-lg overflow-hidden border ${
                  currentImageIndex === index ? "border-[#1F4E73]" : "border-transparent opacity-70"
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="p-6 space-y-6">

          {/* Harga */}
          <div className="bg-gradient-to-br from-[#1F4E73]/10 to-[#2c6a99]/20 border-l-4 border-[#1F4E73] p-4 rounded-xl">
            <p className="text-gray-600 text-sm">Harga</p>
            <p className="text-3xl font-bold text-[#1F4E73]">{selected.harga}</p>
          </div>

          {/* Penyedia */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-lg mb-3">Informasi Penyedia</h3>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-500">Perusahaan</p>
                <p className="font-medium">{selected.penyedia}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Nomor Telepon</p>
                <p className="font-medium">{selected.telp}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <a
                href={`https://wa.me/${selected.telp.replace(/^0/, "62")}`}
                target="_blank"
                className="flex-1 bg-[#25D366] text-white py-3 rounded-lg text-center font-medium"
              >
                WhatsApp
              </a>
              <a
                href={`tel:${selected.telp}`}
                className="flex-1 bg-[#1F4E73] text-white py-3 rounded-lg text-center font-medium"
              >
                Telepon
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


      {/* Zoom Image */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
          >
            <motion.img
              src={zoomImage}
              alt="Zoomed Image"
              className="max-w-[90%] max-h-[85%] rounded-xl shadow-xl cursor-zoom-out"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}