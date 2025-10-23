import React from "react";
import  Image from "next/image";

export default function profileBrida() {
    return (
    <>
    <div className="min-h-screen" style={{ backgroundColor: '#C6E5B3' }}>
      <section className="max-w-7xl mx-15 px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-7" style={{ color: '#2B5235' }}>SINOVA</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white m-2 p-11 rounded-3xl" style={{ backgroundColor: '#2B5235' }}>
            <p className="text-sm leading-relaxed text-justify">
              Platform digital yang dirancang untuk menghimpun, mengelola, dan mempublikasikan hasil riset serta 
              inovasi yang lahir dari daerah Kepulauan Riau. Melalui SINOVA Kepri, inovasi yang berkembang di provinsi ini 
              dapat terdala secara lebih sistematis, mudah diakses, dan dapat dimanfaatkan untuk mendukung 
              pembangunan daerah maritim, industri, dan pariwisata yang menjadi potensi unggulan Kepulauan Riau. 
              Platform ini juga menjadi sarana hilirisasi hasil riset agar tidak hanya berhenti di ranah akademik, tetapi 
              benar-benar dapat digunakan oleh masyarakat luas dan memberi dampak nyata bagi pembangunan daerah.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-80 rounded-full flex items-center justify-center shadow-2xl" style={{ backgroundColor: '#2B5235' }}>
              <div className="text-center text-white">
                <div className="text-lg font-semibold">logo SINOVA
                  <Image src="" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16" style={{ backgroundColor: '#2B5235' }}>
        <div className="max-w-7xl mx-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-7">BRIDA KEPRI</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm p-10 rounded-2xl">
                <div className="text-center">
                  <Image src="" alt="" />
                  <div className="text-6xl mb-4">🏛️</div>
                  <div className="text-3xl font-bold text-white mb-2">gambar bappeda</div>
                  <div className="text-xl" style={{ color: '#C6E5B3' }}>Bappeda</div>
                </div>
              </div>
            </div>
            <div className="text-white">
              <p className="text-sm leading-relaxed text-justify ">
                <span className="font-semibold">Badan Riset dan Inovasi Daerah yang selanjutnya disingkat BRIDA</span> adalah 
                perangkat daerah yang menyelenggarakan penelitian, pengembangan, pengkajian, dan penerapan, serta invensi dan inovasi yang 
                terintegrasi di daerah. Pembentukan Badan ini Mempedoman Peraturan Presiden Nomor 78 Tahun 2021 tentang Badan Riset dan 
                Inovasi Nasional (BRIN).
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16" style={{ backgroundColor: '#C6E5B3' }}>
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-15">
          <h2 className="text-4xl font-bold text-center mb-7" style={{ color: '#2B5235' }}>VISI & MISI</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl text-white" style={{ backgroundColor: '#2B5235' }}>
              <h3 className="text-3xl font-bold text-center mb-6 ">VISI</h3>
              <p className="text-sm leading-relaxed text-justify ">
                Badan Riset dan Inovasi Daerah yang selanjutnya disingkat BRIDA adalah perangkat daerah yang 
                menyelenggarakan penelitian, pengembangan, pengkajian, dan penerapan, serta invensi dan inovasi yang 
                terintegrasi di daerah.
              </p>
            </div>
            <div className="p-8 rounded-3xl text-white" style={{ backgroundColor: '#2B5235' }}>
              <h3 className="text-3xl font-bold text-center mb-6 ">MISI</h3>
              <p className="text-sm leading-relaxed text-justify ">
                Badan Riset dan Inovasi Daerah yang selanjutnya disingkat BRIDA adalah perangkat daerah yang 
                menyelenggarakan penelitian, pengembangan, pengkajian, dan penerapan, serta invensi dan inovasi yang 
                terintegrasi di daerah.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>   
    );
}