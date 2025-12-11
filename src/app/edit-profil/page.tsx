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

  // GET PROFILE BY USERNAME
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/admin/username/${username}`
        );

        const data = await res.json();
        console.log(data);

        if (data.success) {
          setFormData({
            namaLengkap: data.data.name,
            email: data.data.email,
            noTelepon: data.data.no_handphone || "",
          });

          if (data.data.foto_profil) {
            setPhotoPreview(`http://localhost:5000${data.data.foto_profil}`);
          }
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
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));

    const username = localStorage.getItem("username");
    const formData = new FormData();
    formData.append("photo", file);

    const res = await fetch(
      `http://localhost:5000/api/admin/upload/${username}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Upload berhasil!");
      console.log("Foto URL:", data.data.photo);
    }
  };

  // SUBMIT UPDATE PROFIL
  const handleSubmit = async () => {
    const username = localStorage.getItem("username");
    if (!username) return;

    try {
      // UPDATE DATA TEXT
      let res = await fetch(
        `http://localhost:5000/api/admin/username/${username}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.namaLengkap,
            email: formData.email,
            noTelepon: formData.noTelepon,
          }),
        }
      );

      let data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      // UPDATE FOTO
      if (photoFile) {
        const form = new FormData();
        form.append("photo", photoFile);

        await fetch(
          `http://localhost:5000/api/admin/username/${username}/photo`,
          {
            method: "PUT",
            body: form,
          }
        );
      }

      alert("Profil berhasil diperbarui!");

      // Perbarui localStorage jika username berubah
      localStorage.setItem("username", formData.namaLengkap);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    }
  };

  if (loading) {
    return <p className="text-center p-8">Memuat...</p>;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">

      {/* BUTTON BACK */}
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

          {/* HEADER */}
          <div className="relative mb-8 sm:mb-12 md:mb-16">
            <div className="h-16 sm:h-20 md:h-24 rounded-t-2xl bg-[#1F4E73]"></div>

            {/* FOTO PROFIL */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 sm:-bottom-14 md:-bottom-16">
              <div className="relative">
                <label htmlFor="photo-upload">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 bg-white border-[#1F4E73] overflow-hidden cursor-pointer hover:border-[#295f8c] transition-colors flex items-center justify-center">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1F4E73"
                        strokeWidth="2"
                      >
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                        <circle cx="12" cy="13" r="3"></circle>
                      </svg>
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
          </div>

          {/* NAME */}
          <div className="text-center mt-16 sm:mt-20 md:mt-24 mb-6 sm:mb-8">
            <h2 className="text-2xl font-semibold text-[#1F4E73]">
              {formData.namaLengkap || "Nama Pengguna"}
            </h2>
          </div>

          {/* FORM */}
          <div className="flex flex-col gap-5 sm:gap-6">

            <div className="border-b-2 border-[#1F4E73] pb-2">
              <h3 className="text-base font-semibold italic text-[#1F4E73]">
                Informasi Pribadi
              </h3>
            </div>

            {/* NAMA */}
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

            {/* EMAIL */}
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

            {/* NO TELP */}
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

            {/* SUBMIT */}
            <div className="pt-4 sm:pt-6">
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
    </div>
  );
}
