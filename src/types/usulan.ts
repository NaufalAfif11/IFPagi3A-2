export type StatusType =
  | "Tersedia"
  | "Sedang Dikerjakan"
  | "Selesai"
  | string;

// export interface PenyediaDikerjakan {
//   id: string;
//   nama: string;
//   tanggal_ambil: string;
//   estimasi_selesai: string;
// }

export interface Usulan {
   id: number;
  nama: string;
  alamat: string;
  email: string;
  noTelp: string;
  jabatan: string;

  namaPerusahaan: string;
  emailPerusahaan: string;
  noTelpPerusahaan: string;
  alamatPerusahaan: string;

  jenisProdukanDiusulkan: string;
  deskripsiKebutuhan: string;
  kapanDigunakan: string;
  estimasiBudget: string | number;
  tanggal: string;

  status: string;
  statusDetail: string;

  kategori_id: number | null;
  nama_kategori: string;

  peminat: number;
  dokumen: string | null;
  penyediaDikerjakan?: {
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
