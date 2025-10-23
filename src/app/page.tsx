import Navbar from './components/navbar';
import Footer from '../components/ui/footer'; 
import Image from 'next/image';
import { FaLightbulb, FaHandPointRight, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function Beranda() {
  return (
    <div className="bg-[#C6E5B3] min-h-screen text-[#2B5235]">
      <Navbar />

      {/* Banner */}
      <section className="relative w-full">
        <Image
          src="/baner.jpg"
          alt="Banner SINOVA"
          width={1200}
          height={400}
          className="w-full object-cover"
        />
      </section>

      {/* Fitur */}
      <section className="flex flex-col md:flex-row justify-center gap-10 py-12">
        {/* Katalog Produk */}
        <div className="bg-[#2B5235] text-white rounded-2xl p-6 w-80 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform">
          <FaLightbulb className="text-[#C6E5B3] text-4xl mb-3" />
          <h3 className="text-lg font-semibold mb-2">Katalog Produk</h3>
          <p className="text-sm leading-relaxed">
            Usulan Penelitian digunakan sebagai media untuk guru, peneliti
            mengajukan usulan penelitiannya.
          </p>
        </div>

        {/* Usulan Kebutuhan Produk Inovasi */}
        <div className="bg-[#2B5235] text-white rounded-2xl p-6 w-80 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform">
          <FaHandPointRight className="text-[#C6E5B3] text-4xl mb-3" />
          <h3 className="text-lg font-semibold mb-2">
            Usulan Kebutuhan Produk Inovasi
          </h3>
          <p className="text-sm leading-relaxed">
            Usulan Penelitian digunakan sebagai media untuk aparatur peneliti
            untuk mengajukan usulan penelitiannya.
          </p>
        </div>
      </section>

      {/* Berita */}
      <section className="bg-[#C6E5B3] py-12 px-8 text-center">
        <h2 className="text-3xl font-bold text-[#2B5235] mb-8">BERITA</h2>
        <div className="flex justify-center flex-wrap gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-72 bg-white rounded-xl overflow-hidden shadow-md"
            >
              <Image
                src={`/berita${i}.jpg`}
                alt={`Berita ${i}`}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-[#2B5235] font-medium">
                  Dalam rangka memperingati Hari Statistik Nasional (HSN) 2025...
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </section>
      <section className="bg-[#C6E5B3] py-12 px-8 text-center">
       
        <div className="flex justify-center flex-wrap gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-72 bg-white rounded-xl overflow-hidden shadow-md"
            >
              <Image
                src={`/berita${i}.jpg`}
                alt={`Berita ${i}`}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-[#2B5235] font-medium">
                  Dalam rangka memperingati Hari Statistik Nasional (HSN) 2025...
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </section>

      {/* Riset & Inovasi */}
      <section className="bg-[#C6E5B3] py-16 px-8">
        <h2 className="text-3xl font-extrabold text-center mb-10">
          RISET DAN INOVASI DAERAH <br /> KEPULAUAN RIAU
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <Image
            src="/ilustrasi-riset.png"
            alt="Ilustrasi riset dan inovasi"
            width={350}
            height={300}
            className="rounded-xl"
          />
          <div className="max-w-lg">
            <h3 className="text-2xl font-semibold mb-3">INOVASI & RISET</h3>
            <p className="text-sm mb-6">
              Inovasi adalah proses menghadirkan ide baru yang memberi manfaat nyata bagi
              masyarakat dan daerah. Tujuannya untuk memecahkan masalah, meningkatkan
              kualitas hidup, serta memperkuat daya saing. Manfaat inovasi meliputi efisiensi,
              pelayanan yang lebih baik, hingga peluang usaha baru.
            </p>

            {/* Kategori Inovasi */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {['Pendidikan', 'Kesehatan', 'Lingkungan', 'Transportasi', 'Pariwisata', 'Perikanan', 'Industri kreatif'].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#2B5235] text-white text-center py-3 rounded-md font-medium"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Statistik */}
            <div className="flex justify-between bg-white rounded-xl py-3 px-6 shadow-md text-center">
              <div>
                <p className="text-xl font-bold text-[#2B5235]">108</p>
                <p className="text-sm text-gray-700">Uji Coba</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#2B5235]">138</p>
                <p className="text-sm text-gray-700">Sudah Diterapkan</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#2B5235]">223</p>
                <p className="text-sm text-gray-700">Penerapan/Terimplementasi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hubungi Kami */}
      <section className="bg-[#C6E5B3] py-16 text-center">
        <h3 className="text-2xl font-semibold mb-2 text-[#2B5235]">Hubungi Kami</h3>
        <p className="text-sm mb-12 text-[#2B5235]">
          Jika ada pertanyaan, hubungi kami di bawah ini:
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8 px-6">
          {/* Alamat */}
          <div className="bg-[#2B5235] text-white rounded-2xl p-6 w-80 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform">
            <FaMapMarkerAlt className="text-[#C6E5B3] text-4xl mb-3" />
            <p className="text-sm leading-relaxed">
              Gedung Sultan Mahmud Riayat Syah Gedung L lantai I dan IV, Kompleks
              Perkantoran Pemerintah Provinsi Kepulauan Riau, Dompak, Bukit Bestari,
              Kota Tanjung Pinang, Kepulauan Riau, Indonesia
            </p>
          </div>

          {/* Email */}
          <div className="bg-[#2B5235] text-white rounded-2xl p-6 w-80 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform">
            <FaEnvelope className="text-[#C6E5B3] text-4xl mb-3" />
            <p className="text-sm">bappeda@batam.go.id</p>
          </div>

          {/* Telepon */}
          <div className="bg-[#2B5235] text-white rounded-2xl p-6 w-80 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform">
            <FaPhoneAlt className="text-[#C6E5B3] text-4xl mb-3" />
            <p className="text-sm">0778-463045</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer /> {/* <-- Tambahkan footer di sini */}
    </div>
  );
}
