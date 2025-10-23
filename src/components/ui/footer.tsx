export default function Footer() {
  return (
    <footer className="bg-[#2B5235] text-[#bg-white] py-10 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-2">SINOVA</h3>
          <p className="text-sm">
            Sistem Informasi Inovasi Daerah Kepulauan Riau
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Alamat</h3>
          <p className="text-sm">
            Politeknik Negeri Batam <br />
            & BAPPEDA Provinsi Kepulauan Riau
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Hubungi Kami</h3>
          <p className="text-sm">Email: info@sinova-kepri.go.id</p>
        </div>
      </div>
      <div className="text-center text-lg mt-6 border-t border-[#2B5235] pt-4">
        © Politeknik Negeri Batam & BAPPEDA Kepri
      </div>
    </footer>
  );
}
