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
      images: ["/katalog1.jpg", "/katalog2.jpg", "/katalog3.jpg", "/katalog4.png"],
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
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white rounded-2xl w-[90%] max-w-4xl shadow-2xl relative my-8 overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#1F4E73] to-[#2c6a99] p-6 text-white relative">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                >
                  ✕
                </button>

                <div className="bg-white/20 px-3 py-1 rounded-full text-xs inline-block mb-2">
                  {selected.kategori}
                </div>

                <h2 className="text-3xl font-bold">{selected.title}</h2>
                <p className="text-white/90 mt-2">{selected.desc}</p>
              </div>

              {/* Carousel */}
              <div className="p-6 bg-gray-50">
                <div className="relative group">
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={selected.images[currentImageIndex]}
                      className="w-full h-96 object-cover cursor-pointer hover:scale-105 transition"
                      onClick={() => setZoomImage(selected.images[currentImageIndex])}
                    />
                  </div>

                  {/* Prev */}
                  {currentImageIndex > 0 && (
                    <button
                      onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 w-10 h-10 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
                    >
                      ←
                    </button>
                  )}

                  {/* Next */}
                  {currentImageIndex < selected.images.length - 1 && (
                    <button
                      onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 w-10 h-10 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
                    >
                      →
                    </button>
                  )}

                  {/* Thumbnails */}
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {selected.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden ${
                          currentImageIndex === index ? "ring-2 ring-[#1F4E73]" : "opacity-60"
                        }`}
                      >
                        <img src={img} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detail Info */}
              <div className="p-6 space-y-4">
                <div className="bg-gradient-to-br from-[#1F4E73]/5 to-[#2c6a99]/10 border-l-4 border-[#1F4E73] p-4 rounded">
                  <p className="text-sm text-gray-600">Harga</p>
                  <p className="text-3xl font-bold text-[#1F4E73]">{selected.harga}</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-semibold text-lg mb-3">Informasi Penyedia</h3>
                  <p className="text-sm text-gray-500">Perusahaan</p>
                  <p className="font-medium mb-3">{selected.penyedia}</p>

                  <p className="text-sm text-gray-500">Nomor Telepon</p>
                  <p className="font-medium mb-4">{selected.telp}</p>

                  <div className="flex gap-3">
                    <a
                      href={`https://wa.me/${selected.telp.replace(/^0/, "62")}`}
                      target="_blank"
                      className="flex-1 bg-[#25D366] text-white py-3 rounded-lg text-center"
                    >
                      WhatsApp
                    </a>
                    <a href={`tel:${selected.telp}`} className="flex-1 bg-[#1F4E73] text-white py-3 rounded-lg text-center">
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
