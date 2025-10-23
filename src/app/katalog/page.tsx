"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "@/components/ui/footer";
import InovasiCard from "../../components/ui/InovasiCard";
import StatsSection from "../../components/ui/StatsSection";

export default function KatalogPage() {
  const inovasiList = [
    {
      title: "Hasil Inovasi Smart Bike",
      desc: "Sebuah sepeda pintar dengan sistem navigasi digital yang memantau kecepatan dan arah secara otomatis.",
      image: "/images/bike.jpg",
    },
    {
      title: "Hasil Inovasi Kendaraan Listrik",
      desc: "Kendaraan listrik hemat energi dengan baterai tahan lama yang ramah lingkungan.",
      image: "/images/bike.jpg",
    },
    {
      title: "Hasil Inovasi Drone Mini",
      desc: "Drone mini multifungsi untuk pemetaan dan pengiriman paket ringan.",
      image: "/images/bike.jpg",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#C6E5B3] overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Judul Section */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center py-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
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
            <InovasiCard {...item} />
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
    </main>
  );
}
