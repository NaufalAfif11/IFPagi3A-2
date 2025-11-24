"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../../components/ui/navbar";
import Footer from "@/components/ui/footer";

export default function Profil() {
  const [activeTab, setActiveTab] = useState("brida");

  return (
    <>
      <Navbar></Navbar>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <section className="relative py-5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative z-10">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-2">
                    🚀 Platform Inovasi Digital
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                    SINOVA
                    <span className="block text-[#1F4E73] mt-2">
                      Platform Inovasi Daerah
                    </span>
                  </h1>

                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Platform digital yang dirancang untuk mengelola, menyimpan,
                    dan mengembangkan hasil riset serta inovasi. Memberikan
                    solusi komprehensif bagi peneliti, akademisi, dan inovator
                    dalam mendukung pembelajaran dengan metode modern.
                  </p>
                </div>

                {/* Hero Visual */}
                <div className="relative mb-5">
                  <Image
                    src="/ilustrasi-riset.png"
                    alt="Ilustrasi riset dan inovasi"
                    width={450}
                    height={400}
                    className="rounded-xl"/>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap gap-2 mb-12 justify-center">
                {[
                  { id: "brida", label: "Tentang BRIDA" },
                  { id: "tentang", label: "Tentang SINOVA" },
                  { id: "visi", label: "Visi & Misi" },
                  
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-[#1F4E73] text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-blue-50 hover:text-[#1F4E73] shadow-sm"
                    }`}>
                    {tab.label}
                  </button>
                ))}
              </div>

            <div className="bg-white rounded-2xl shadow-xl md:p-5">
                {activeTab === "brida" && (
              <div className="bg-gradient-to-br from-[#1F4E73] to-[#3e81aa]  rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold ">BRIDA KEPRI</h3>
                      <p className="text-blue-100 ">
                        Badan Riset dan Inovasi Daerah (BRIDA) adalah perangkat
                        daerah yang mengoordinasikan penelitian, pengembangan,
                        pengkajian, dan penerapan, serta invensi dan inovasi
                        yang terintegrasi di daerah.
                      </p>
                    <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                      <p className="text-sm">
                          Berdasarkan Peraturan Presiden Nomor 78 Tahun 2021
                          tentang Badan Riset dan Inovasi Nasional (BRIN)
                      </p>
                    </div>
                  </div>
                </div>
              )}

                {activeTab === "tentang" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                      Tentang Platform SINOVA
                    </h3>
                    <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                      <p>
                        <strong>SINOVA</strong> adalah Platform digital yang dirancang untuk menghimpun, 
                        mengelola, dan mempublikasikan hasil riset serta inovasi yang lahir dari 
                        daerah Kepulauan Riau. Melalui SINOVA Kepri, inovasi yang berkembang di 
                        provinsi ini dapat terdata secara lebih sistematis, mudah diakses, dan 
                        dapat dimanfaatkan untuk mendukung pembangunan daerah maritim, industri, 
                        dan pariwisata yang menjadi potensi unggulan Kepulauan Riau.
                      </p>
                      <p>
                        Dengan teknologi terkini, SINOVA memastikan bahwa data
                        dan informasi riset dapat diakses, dikelola, dan
                        dikembangkan secara efisien. Platform ini juga menjadi
                        wadah kolaborasi bagi berbagai pemangku kepentingan
                        dalam ekosistem riset dan inovasi.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "visi" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                      Visi & Misi SINOVA
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-blue-50 rounded-xl p-6">
                        <h4 className="text-xl font-semibold text-blue-900 mb-4">
                          Visi
                        </h4>
                        <p className="text-blue-800 leading-relaxed">
                          Menjadi pusat unggulan riset dan inovasi daerah yang
                          mendorong kemajuan ekonomi dan kesejahteraan
                          masyarakat Kepulauan Riau.
                        </p>
                      </div>
                      <div className="bg-blue-100 rounded-xl p-6">
                        <h4 className="text-xl font-semibold text-blue-800 mb-4">
                          Misi
                        </h4>
                        <ul className="text-blue-700 leading-relaxed space-y-2">
                          <li>
                            • Mengkoordinasikan kegiatan riset dan inovasi
                          </li>
                          <li>
                            • Membangun ekosistem inovasi yang berkelanjutan
                          </li>
                          <li>
                            • Memfasilitasi kolaborasi antar pemangku
                            kepentingan
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
        <Footer/>
    </>
  );
}
