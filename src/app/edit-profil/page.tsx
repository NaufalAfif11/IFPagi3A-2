"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileEdit() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    namaLengkap: "",
    email: "",
    noTelepon: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;
  const username =
    typeof window !== "undefined" ? localStorage.getItem("username") : null;

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/profile/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await res.json();

      setFormData({
        namaLengkap: data.name ?? "",
        email: data.email ?? "",
        noTelepon: data.no_handphone ?? "",
      });

      // 🔥 FIX FOTO
      if (data.foto_profil) {
        setPhotoPreview("http://localhost:5000/" + data.foto_profil);
      }

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  fetchProfile();
}, []);


  // INPUT HANDLER
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // UPLOAD FOTO
  const handleUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setPhotoFile(file);
  setPhotoPreview(URL.createObjectURL(file));
};

  // SUBMIT UPDATE PROFILE
  const handleSubmit = async () => {
    const form = new FormData();
    form.append("name", formData.namaLengkap);
    form.append("no_handphone", formData.noTelepon);

    // 🔥 FIX: backend menerima foto_profil (bukan foto_profile)
    if (photoFile) {
      form.append("foto_profil", photoFile);
    }

    try {
      const res = await fetch("http://localhost:5000/api/profile/update", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: form,
      });

      const data = await res.json();

      if (data.user) {
        alert("Profil berhasil diperbarui!");
      } else {
        alert("Gagal update profil");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    }
  };

  if (loading) {
    return <p className="text-center p-8">Memuat...</p>;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="p-4">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          ← Kembali
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
          <div className="relative mb-8 sm:mb-12 md:mb-16">
            <div className="h-16 sm:h-20 md:h-24 rounded-t-2xl bg-[#1F4E73]"></div>

            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 sm:-bottom-14 md:-bottom-16">
              <label htmlFor="photo-upload">
                <div className="w-28 h-28 rounded-full border-4 bg-white border-[#1F4E73] overflow-hidden cursor-pointer flex items-center justify-center">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>Foto</span>
                  )}
                </div>
              </label>

              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
            </div>
          </div>

          <div className="text-center mt-16 sm:mt-20 md:mt-24 mb-6 sm:mb-8">
            <h2 className="text-2xl font-semibold text-[#1F4E73]">
              {formData.namaLengkap}
            </h2>
            <p className="text-sm text-gray-500 capitalize">Role: {role}</p>
          </div>

          <div className="flex flex-col gap-5 sm:gap-6">
            <div className="border-b-2 border-[#1F4E73] pb-2">
              <h3 className="text-base font-semibold italic text-[#1F4E73]">
                Informasi Pribadi
              </h3>
            </div>

            <div>
              <label className="block mb-2 text-[#1F4E73] font-medium">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="namaLengkap"
                value={formData.namaLengkap}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#1F4E73] text-white outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 text-[#1F4E73] font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#1F4E73] text-white outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 text-[#1F4E73] font-medium">
                No. Telepon
              </label>
              <input
                type="tel"
                name="noTelepon"
                value={formData.noTelepon}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#1F4E73] text-white outline-none"
              />
            </div>

            <button
              className="w-full py-3 rounded-lg bg-[#1F4E73] text-white font-semibold shadow-sm hover:bg-[#295f8c]"
              onClick={handleSubmit}
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
