import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="text-[#1F4E73]">
      {/* Konten utama */}
      <div className="bg-[#F3F7FB] pt-12 pb-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* SINOVA */}
          <div>
            <h3 className="font-bold text-xl mb-4 uppercase">SINOVA</h3>
            <p className="text-sm leading-relaxed">
              Sistem Informasi Riset dan Inovasi Daerah (SINOVA) Kepulauan Riau
              adalah platform berbasis web yang menampilkan produk riset, inovasi,
              dan Teknologi Tepat Guna (TTG) dari akademisi, peneliti, komunitas,
              dan pelaku usaha. Platform ini mempermudah publik mengakses informasi
              dan pemasaran hasil riset dan inovasi.
            </p>
          </div>

          {/* BRIDA */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-xl mb-4 uppercase">BRIDA/BAPPEDA</h3>
            <ul className="text-sm space-y-2">
              {["BERANDA", "PROFIL", "RISET", "INFORMASI", "LAYANAN"].map((item) => (
                <li
                  key={item}
                  className="hover:text-[#163954] hover:underline cursor-pointer transition-colors duration-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div>
            <h3 className="font-bold text-xl mb-4 uppercase">HUBUNGI KAMI</h3>
            <p className="text-sm mb-1">
              Alamat : Jl. Ahmad Yani Batam Kota, Kota Batam, Kepulauan Riau, Indonesia
            </p>
            <p className="text-sm mb-1">Tel : +62-778-469858 Ext.1017</p>
            <p className="text-sm mb-1">Fax : +62-778-463620</p>
            <p className="text-sm mb-3">Email : info@polibatam.ac.id</p>

            {/* Social Media */}
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="bg-[#F3F7FB] border border-[#1F4E73] text-[#1F4E73] p-2 rounded-full hover:bg-[#1F4E73] hover:text-white transition-colors duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#1F4E73] text-white text-center text-sm py-4">
        © 2025 Politeknik Negeri Batam & BAPPEDA Kepri. All rights reserved.
      </div>
    </footer>
  );
}
