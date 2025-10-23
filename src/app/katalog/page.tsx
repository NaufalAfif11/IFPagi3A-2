"use client";

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
    <main className="min-h-screen flex flex-col bg-[#C6E5B3]">
      {/* Tempat Navbar */}

      {/* Ni Judul Section */}

      {/* Daftar Inovasi */}
      <section className="flex flex-col gap-6 px-8 py-10">
        {inovasiList.map((item, i) => (
          <InovasiCard key={i} {...item} />
        ))}
      </section>

      {/* Statistik */}
      <StatsSection />

      {/* Footer */}
    </main>
  );
}
