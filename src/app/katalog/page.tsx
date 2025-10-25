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
      title: "Hasil Inovasi Smart Bike",
      desc: "Sebuah sepeda pintar dengan sistem navigasi digital yang memantau kecepatan dan arah secara otomatis.",
      image: "/images/bike.jpg",
      harga: "Rp 4.500.000",
      kategori: "Transportasi Pintar",
    },
    {
      title: "Hasil Inovasi Kendaraan Listrik",
      desc: "Kendaraan listrik hemat energi dengan baterai tahan lama yang ramah lingkungan.",
      image: "/images/bike.jpg",
      harga: "Rp 28.000.000",
      kategori: "Otomotif",
    },
    {
      title: "Hasil Inovasi Drone Mini",
      desc: "Drone mini multifungsi untuk pemetaan dan pengiriman paket ringan.",
      image: "/images/bike.jpg",
      harga: "Rp 7.500.000",
      kategori: "Teknologi Udara",
    },
  ];

  const [selected, setSelected] = useState<any>(null);

  return (
    <main className="min-h-screen flex flex-col bg-white overflow-hidden">
      {/* Navbar */}
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
                <InovasiCard {...item} />
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Statistik Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <StatsSection />
      </motion.div>

      {/* Footer */}
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
              className="bg-white rounded-2xl p-6 w-[90%] max-w-lg shadow-2xl relative border-t-8 border-[#1F4E73]"
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

              <img
                src={selected.image}
                alt={selected.title}
                className="rounded-lg mb-4 w-full h-52 object-cover border border-[#1F4E73]/20"
              />
              <h2 className="text-2xl font-semibold text-[#1F4E73] mb-2">
                {selected.title}
              </h2>
              <p className="text-gray-700 mb-2">{selected.desc}</p>
              <p className="text-sm text-gray-500 mb-2">
                Kategori:{" "}
                <span className="font-medium text-[#1F4E73]">
                  {selected.kategori}
                </span>
              </p>
              <p className="text-lg font-bold text-[#1F4E73]">
                {selected.harga}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
