"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Navbar from "../../components/ui/navbar";
import Footer from "@/components/ui/footer";
import InovasiCard from "../../components/ui/InovasiCard";
import StatsSection from "../../components/ui/StatsSection";

export default function KatalogPage() {
  const inovasiList = [
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

  const [selected, setSelected] = useState<any>(null);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen flex flex-col bg-white overflow-hidden">
      <Navbar />

      {/* Judul Section */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center py-12"
      >
        <h1 className="text-4xl font-bold text-[#1F4E73] mb-2">
          Katalog Inovasi Terbaru
        </h1>
        <p className="text-gray-600">
          Jelajahi beragam hasil inovasi kreatif dan inspiratif!
        </p>
      </motion.section>

      {/* Daftar Inovasi */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 py-10">
        {inovasiList.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.2,
              ease: "easeOut",
            }}
          >
            <div
              onClick={() => setSelected(item)}
              className="cursor-pointer hover:scale-[1.03] transition-transform"
            >
              <div className="border border-[#1F4E73]/20 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <InovasiCard
                  title={item.title}
                  desc={item.desc}
                  image={item.images[0]}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <StatsSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Footer />
      </motion.div>

      {/* 🔹 Modal Detail Inovasi */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-[90%] max-w-3xl shadow-2xl relative border-t-8 border-[#1F4E73]"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-[#1F4E73]"
              >
                ✕
              </button>

              {/* Gambar */}
              <div
                className={`grid ${
                  selected.images.length > 1
                    ? "grid-cols-2 grid-rows-2 gap-3"
                    : "grid-cols-1"
                } mb-4`}
              >
                {selected.images.slice(0, 4).map((img: string, index: number) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${selected.title} ${index + 1}`}
                    onClick={() => setZoomImage(img)}
                    className="rounded-lg w-full h-48 object-cover border border-[#1F4E73]/20 cursor-pointer hover:opacity-80 transition"
                  />
                ))}
              </div>

              {/* Info Detail */}
              <h2 className="text-2xl font-semibold text-[#1F4E73] mb-2">
                {selected.title}
              </h2>
              <p className="text-gray-700 mb-2">{selected.desc}</p>
              <p className="text-sm text-gray-500 mb-1">
                Kategori:{" "}
                <span className="font-medium text-[#1F4E73]">
                  {selected.kategori}
                </span>
              </p>
              <p className="text-lg font-bold text-[#1F4E73] mb-4">
                {selected.harga}
              </p>

              {/* 🔹 Tambahan Informasi Penyedia */}
              <div className="border-t border-gray-200 pt-3 mt-3 text-sm">
                <p className="text-gray-600">
                  <span className="font-semibold text-[#1F4E73]">Penyedia:</span>{" "}
                  {selected.penyedia}
                </p>
                <p className="text-gray-600 mb-3">
                  <span className="font-semibold text-[#1F4E73]">No. Telp:</span>{" "}
                  {selected.telp}
                </p>

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#1F4E73] text-white px-4 py-2 rounded-lg hover:bg-[#163a56] transition"
                >
                  💬 Hubungi Penyedia
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Zoom Preview Gambar */}
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
              alt="Preview"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-[90%] max-h-[85%] rounded-xl shadow-2xl border border-white/30 cursor-zoom-out"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
