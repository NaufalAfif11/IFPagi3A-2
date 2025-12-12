"use client";

import { X, Save } from "lucide-react";
import { useState, useEffect } from "react";

interface Kategori {
  kategori_id: number | string;
  nama_kategori: string;
}

interface Usulan {
  id: number | string;
  nama: string;
  email: string;
  telp?: string;
  jabatan?: string;
  alamat?: string;
  nama_perusahaan?: string;
  email_perusahaan?: string;
  telp_perusahaan?: string;
  alamat_perusahaan?: string;
  jenis_produk: string;
  kategori_id: number | string;
  tanggal_kebutuhan?: string;
  estimasi_budget?: string;
  deskripsi: string;
}

export default function EditUsulanModal({
  usulan,
  onClose,
  onSuccess,
}: {
  usulan: Usulan;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState<Usulan>(usulan);
  const [loading, setLoading] = useState(false);
  const [kategoriList, setKategoriList] = useState<Kategori[]>([]);
  const [loadingKategori, setLoadingKategori] = useState(true);

  useEffect(() => {
    if (usulan) {
      setForm({
        ...usulan,
        kategori_id: usulan.kategori_id ?? "",
      });
    }
  }, [usulan]);

  // Fetch kategori
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/kategori");
        const data = await res.json();
        setKategoriList(data);
      } catch (err) {
        console.error("fetch kategori error:", err);
        setKategoriList([]);
      } finally {
        setLoadingKategori(false);
      }
    };

    fetchKategori();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const kategoriID = Number(form.kategori_id);

    if (!kategoriID) {
      alert("Kategori wajib dipilih!");
      setLoading(false);
      return;
    }

    const payload = {
      nama: form.nama,
      email: form.email,
      telp: form.telp,
      jabatan: form.jabatan,
      alamat: form.alamat,
      nama_perusahaan: form.nama_perusahaan,
      email_perusahaan: form.email_perusahaan,
      telp_perusahaan: form.telp_perusahaan,
      alamat_perusahaan: form.alamat_perusahaan,
      jenis_produk: form.jenis_produk,
      kategori_id: kategoriID,
      tanggal_kebutuhan: form.tanggal_kebutuhan,
      estimasi_budget: form.estimasi_budget,
      deskripsi: form.deskripsi,
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/kebutuhan/${form.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Gagal update");

      alert("Usulan berhasil diperbarui!");
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Gagal update usulan");
    } finally {
      setLoading(false);
    }
  };

  const formatDateForInput = (dateString: string | undefined) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* HEADER */}
        <div className="bg-[#1F4E73] text-white p-4 flex justify-between">
          <h2 className="text-lg font-bold">Edit Usulan</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ===== DATA PRIBADI ===== */}
            <section>
              <p className="font-semibold text-lg border-b pb-2 mb-3">Data Pribadi</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Nama Lengkap</label>
                  <input name="nama" value={form.nama} onChange={handleChange} className="input" />
                </div>

                <div>
                  <label>Email Pribadi</label>
                  <input name="email" value={form.email} onChange={handleChange} className="input" />
                </div>

                <div>
                  <label>Telepon</label>
                  <input name="telp" value={form.telp || ""} onChange={handleChange} className="input" />
                </div>

                <div>
                  <label>Jabatan</label>
                  <input name="jabatan" value={form.jabatan || ""} onChange={handleChange} className="input" />
                </div>

                <div className="col-span-2">
                  <label>Alamat</label>
                  <textarea name="alamat" value={form.alamat || ""} onChange={handleChange} className="input" />
                </div>
              </div>
            </section>

            {/* ===== DATA PERUSAHAAN ===== */}
            <section>
              <p className="font-semibold text-lg border-b pb-2 mb-3">Data Perusahaan</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Nama Perusahaan</label>
                  <input name="nama_perusahaan" value={form.nama_perusahaan || ""} onChange={handleChange} className="input" />
                </div>

                <div>
                  <label>Email Perusahaan</label>
                  <input name="email_perusahaan" value={form.email_perusahaan || ""} onChange={handleChange} className="input" />
                </div>

                <div>
                  <label>Telepon Perusahaan</label>
                  <input name="telp_perusahaan" value={form.telp_perusahaan || ""} onChange={handleChange} className="input" />
                </div>

                <div className="col-span-2">
                  <label>Alamat Perusahaan</label>
                  <textarea name="alamat_perusahaan" value={form.alamat_perusahaan || ""} onChange={handleChange} className="input" />
                </div>
              </div>
            </section>

            {/* ===== DETAIL PRODUK ===== */}
            <section>
              <p className="font-semibold text-lg border-b pb-2 mb-3">Detail Produk</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Jenis Produk</label>
                  <input name="jenis_produk" value={form.jenis_produk} onChange={handleChange} className="input" />
                </div>

                <div>
                  <label>Kategori</label>
                  <select
                    name="kategori_id"
                    value={form.kategori_id}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">-- pilih kategori --</option>
                    {loadingKategori ? (
                      <option>Loading...</option>
                    ) : (
                      kategoriList.map((k) => (
                        <option key={k.kategori_id} value={k.kategori_id}>
                          {k.nama_kategori}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div>
                  <label>Tanggal Kebutuhan</label>
                  <input
                    type="date"
                    name="tanggal_kebutuhan"
                    value={formatDateForInput(form.tanggal_kebutuhan)}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div>
                  <label>Estimasi Budget</label>
                  <input name="estimasi_budget" value={form.estimasi_budget || ""} onChange={handleChange} className="input" />
                </div>

                <div className="col-span-2">
                  <label>Deskripsi</label>
                  <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} className="input" />
                </div>
              </div>
            </section>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                Batal
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                <Save size={16} /> Simpan
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

/* Tailwind helper */
const input = "w-full p-2 border rounded border-gray-300";
