"use client";

import React from "react";
import Navbar from '../components/navbar';
import Footer from '@/components/ui/footer';



export default function HubungiKamiPage() {
  return (
    <>
    <Navbar />
    
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <div className="min-h-screen bg-[#C6E5B3] flex flex-col items-center px-4 py-8">
        {/* Map Section */}
        <div className="w-full max-w-6xl mb-8" style={{ animation: 'fadeIn 1s ease-in' }}>
          <div className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <iframe
              title="Kantor Walikota Batam"
              src="https://www.openstreetmap.org/export/embed.html?bbox=104.0272%2C1.1154%2C104.0472%2C1.1354&amp;layer=mapnik&amp;marker=1.1254,104.0372"
              className="w-full h-96 rounded-lg border-2 border-[#2B5235] shadow-lg"
            />
          </div>
        </div>

        {/* Info Cards */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Alamat */}
          <div className="bg-[#2B5235] text-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center" style={{ animation: 'slideUp 0.6s ease-out' }}>
            <h2 className="text-lg font-semibold mb-2">Alamat</h2>
            <p className="text-sm">
              Kantor Walikota Batam,<br />
              Jl. Engku Putri No.1 Lt. 6,<br />
              Teluk Tering, Batam Kota,<br />
              Kota Batam, Kepulauan Riau
            </p>
          </div>

          {/* Kontak */}
          <div className="bg-[#2B5235] text-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center" style={{ animation: 'slideUp 0.8s ease-out' }}>
            <h2 className="text-lg font-semibold mb-2">Kontak</h2>
            <p className="text-sm">0811-6945-679</p>
          </div>

          {/* Jam Operasional */}
          <div className="bg-[#2B5235] text-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center" style={{ animation: 'slideUp 1s ease-out' }}>
            <h2 className="text-lg font-semibold mb-2">Jam Operasional</h2>
            <p className="text-sm">
              Senin – Kamis : 07.00 – 15.30 WIB <br />
              Jumat : 07.00 – 14.00 WIB
            </p>
          </div>
        </div>
      </div>
                <Footer />
      
    </>
  );
}