"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const BASE_URL = "http://localhost:5000"; // ubah kalau backend port beda

/* -------------------------
   Reusable Input component
   ------------------------- */
interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const InputField = ({ label, name, type = "text", placeholder = "", value, onChange }: InputFieldProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="block text-sm font-medium mb-1 text-white/90">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 rounded bg-white text-[#1F4E73] border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
      />
    </div>
  );
};

/* -------------------------
   Bidang type
   ------------------------- */
interface Bidang {
  bidang_id: number | string;
  nama_bidang: string;
}

/* -------------------------
   Main page
   ------------------------- */
export default function LayananPage() {
  const [bidangList, setBidangList] = useState<Bidang[]>([]);
  const [loadingBidang, setLoadingBidang] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // state harus sesuai nama kolom DB / model
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    email: "",
    telp: "",
    jabatan: "",

    nama_perusahaan: "",
    email_perusahaan: "",
    alamat_perusahaan: "",
    telp_perusahaan: "",

    jenis_produk: "",
    tanggal_kebutuhan: "",
    estimasi_budget: "",
    deskripsi: "",

    bidang_id: "",
    dokumen: null as File | null,
  });

  /* ================= FETCH BIDANG ================= */
  useEffect(() => {
    const fetchBidang = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/bidang`);
        if (!res.ok) throw new Error("Gagal fetch bidang");
        const data = await res.json();
        setBidangList(data);
      } catch (err) {
        console.error("fetch bidang error:", err);
        setBidangList([]);
      } finally {
        setLoadingBidang(false);
      }
    };

    fetchBidang();
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, dokumen: file }));
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    // bidang wajib
    if (!formData.bidang_id) {
      alert("Pilih bidang terlebih dahulu.");
      return false;
    }
    // minimal: jenis produk & deskripsi
    if (!formData.jenis_produk.trim()) {
      alert("Isi jenis produk.");
      return false;
    }
    if (!formData.deskripsi.trim()) {
      alert("Isi deskripsi kebutuhan.");
      return false;
    }
    return true;
  };

  /* ================== SUBMIT ================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;

    setSubmitting(true);

    try {
      const fd = new FormData();

      // append only fields backend expects (names match DB fields)
      fd.append("nama", formData.nama);
      fd.append("alamat", formData.alamat);
      fd.append("email", formData.email);
      fd.append("telp", formData.telp);
      fd.append("jabatan", formData.jabatan);

      fd.append("nama_perusahaan", formData.nama_perusahaan);
      fd.append("email_perusahaan", formData.email_perusahaan);
      fd.append("alamat_perusahaan", formData.alamat_perusahaan);
      fd.append("telp_perusahaan", formData.telp_perusahaan);

      fd.append("jenis_produk", formData.jenis_produk);
      fd.append("tanggal_kebutuhan", formData.tanggal_kebutuhan);
      fd.append("estimasi_budget", formData.estimasi_budget);
      fd.append("deskripsi", formData.deskripsi);

      fd.append("bidang_id", String(formData.bidang_id));

      if (formData.dokumen) {
        fd.append("dokumen", formData.dokumen);
      }

      // debug: inspect payload before sending
      console.log("=== FormData payload ===");
      for (const pair of fd.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Optional: get token from localStorage (if you use JWT auth)
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${BASE_URL}/api/kebutuhan`, {
        method: "POST",
        body: fd,
        headers, // don't set Content-Type: browser will set multipart boundary
      });

      const data = await res.json().catch(() => ({}));
      console.log("SERVER RESPONSE", res.status, data);

      if (!res.ok) {
        // show message from server if ada
        const msg = (data && (data.message || data.error)) || `Server returned ${res.status}`;
        throw new Error(msg);
      }

      alert("✅ Usulan berhasil diajukan!");
      // reset form
      setFormData({
        nama: "",
        alamat: "",
        email: "",
        telp: "",
        jabatan: "",

        nama_perusahaan: "",
        email_perusahaan: "",
        alamat_perusahaan: "",
        telp_perusahaan: "",

        jenis_produk: "",
        tanggal_kebutuhan: "",
        estimasi_budget: "",
        deskripsi: "",

        bidang_id: "",
        dokumen: null,
      });
    } catch (err: any) {
      console.error("submit error:", err);
      alert("❌ Gagal kirim usulan: " + (err.message || "unknown error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-10 flex justify-center">
        <div className="bg-[#1F4E73] text-white w-full max-w-2xl rounded-2xl shadow-2xl p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Layanan Usulan Produk</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* DATA PRIBADI */}
            <section>
              <p className="text-lg font-semibold border-b border-white pb-2">Data Pribadi</p>

              <InputField label="Nama Lengkap" name="nama" value={formData.nama} onChange={handleChange} placeholder="Masukkan nama Anda" />
              <InputField label="Alamat Lengkap" name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Jalan, kota, provinsi" />
              <InputField label="Email Pribadi" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="contoh@domain.com" />
              <InputField label="Nomor Telepon" name="telp" value={formData.telp} onChange={handleChange} placeholder="Contoh: 0812xxxx" />
              <InputField label="Jabatan" name="jabatan" value={formData.jabatan} onChange={handleChange} placeholder="Contoh: Manajer Pemasaran" />
            </section>

            {/* DATA PERUSAHAAN */}
            <section>
              <p className="text-lg font-semibold border-b border-white/50 pb-2 pt-4">Data Perusahaan</p>

              <InputField label="Nama Perusahaan" name="nama_perusahaan" value={formData.nama_perusahaan} onChange={handleChange} placeholder="PT Jaya Abadi" />
              <InputField label="Email Perusahaan" name="email_perusahaan" type="email" value={formData.email_perusahaan} onChange={handleChange} placeholder="hrd@perusahaan.com" />
              <InputField label="Alamat Perusahaan" name="alamat_perusahaan" value={formData.alamat_perusahaan} onChange={handleChange} placeholder="Alamat kantor pusat" />
              <InputField label="Nomor Telepon Perusahaan" name="telp_perusahaan" value={formData.telp_perusahaan} onChange={handleChange} placeholder="Nomor kontak perusahaan" />
            </section>

            {/* DETAIL USAHA */}
            <section>
              <p className="text-lg font-semibold border-b border-white/50 pb-2 pt-4">Detail Usulan Produk</p>

              <InputField label="Jenis Produk" name="jenis_produk" value={formData.jenis_produk} onChange={handleChange} placeholder="Contoh: Aplikasi Mobile" />

              {/* BIDANG */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1 text-white/90">Bidang</label>
                <select name="bidang_id" value={formData.bidang_id} onChange={handleChange} className="w-full p-2 rounded bg-white text-[#1F4E73] outline-none">
                  <option value="">-- Pilih bidang --</option>
                  {loadingBidang ? <option disabled>Loading...</option> : bidangList.map((b) => (
                    <option key={b.bidang_id} value={b.bidang_id}>{b.nama_bidang}</option>
                  ))}
                </select>
              </div>

              {/* TANGGAL */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1 text-white/90">Tanggal Pelaksanaan</label>
                <input type="date" name="tanggal_kebutuhan" value={formData.tanggal_kebutuhan} onChange={handleChange} className="w-full p-2 rounded bg-white text-[#1F4E73]" />
              </div>

              <InputField label="Estimasi Budget" name="estimasi_budget" value={formData.estimasi_budget} onChange={handleChange} placeholder="Contoh: 50-100 juta" />

              <div>
                <label className="block text-sm font-medium mb-1 text-white/90">Deskripsi Kebutuhan</label>
                <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} rows={4} placeholder="Jelaskan detail kebutuhan..." className="w-full p-2 rounded bg-white text-[#1F4E73]"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white/90">Dokumen Pendukung (opsional)</label>
                <input type="file" onChange={handleFileChange} className="w-full p-2 rounded bg-white text-[#1F4E73]" />
              </div>
            </section>

            <button type="submit" disabled={submitting} className="w-full py-3 bg-white text-[#1F4E73] font-bold rounded-lg hover:bg-gray-200 transition">
              {submitting ? "Mengirim..." : "AJUKAN USULAN"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
