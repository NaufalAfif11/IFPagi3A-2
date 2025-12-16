export type StatusType = "Tersedia" | "Sedang Dikerjakan" | "Selesai"| string;

export interface Usulan {
  id: number;
  nama: string;
  alamat: string;
  email: string;
  telp: string;
  jabatan: string;

  nama_perusahaan: string;
  email_perusahaan: string;
  alamat_perusahaan: string;
  telp_perusahaan: string;
  jenis_produk: string;
  tanggal_kebutuhan: string;
  deskripsi: string;
  dokumen: string | null;
  status: string;
  status_detail: string;
  kategori_id: number | null;
  nama_kategori: string;
  user_id: number | null;
  kategori: string | null;
  estimasi_budget: string | null;
  peminat: number;
  created_at: string;
  user_dikerjakan?: Peminat | null;
    penyedia_dikerjakan?: {
        id: string;
        nama: string;
        tanggal_ambil: string;
        estimasi_selesai: string;
    } | null;
}

export interface Peminat {
  minat_id?: number;
  user_id: number;
  nama: string;
  email: string;
  no_telp: string;
  alamat: string;
  instansi: string;
  role: string;
  proposal?: string;
  estimasi_biaya?: string;
  estimasi_waktu?: string;
  tanggal_minat?: string;
}
