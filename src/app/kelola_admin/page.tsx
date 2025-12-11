"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Eye, EyeOff } from 'lucide-react';
import SidebarAdmin from '@/components/ui/sidebar_admin';

const API_URL = "http://localhost:5000/api/admin";

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
  });

  // ======================================================
  //                  GET ALL ADMIN
  // ======================================================
  const fetchAdmins = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // ======================================================
  //                  OPEN / CLOSE MODAL
  // ======================================================
  const handleOpenModal = (mode, admin = null) => {
    setModalMode(mode);

    if (mode === 'edit' && admin) {
      setFormData({
        name: admin.name,
        email: admin.email,
        password: '',
        role: admin.role,
      });
      setSelectedAdmin(admin);
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'admin',
      });
    }
    setShowModal(true);
    setShowPassword(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAdmin(null);
    setShowPassword(false);
  };

  // ======================================================
  //                      SUBMIT FORM (ADD / EDIT)
  // ======================================================
  const handleSubmit = async () => {
    try {
      if (modalMode === "add") {
        // CREATE admin
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const error = await res.json();
          alert(error.message);
          return;
        }

      } else {
        // UPDATE admin
        const res = await fetch(`${API_URL}/${selectedAdmin.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const error = await res.json();
          alert(error.message);
          return;
        }
      }

      fetchAdmins(); // refresh data
      handleCloseModal();

    } catch (err) {
      console.error("Error submitting:", err);
    }
  };

  // ======================================================
  //                        DELETE ADMIN
  // ======================================================
  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus admin ini?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.message);
        return;
      }

      fetchAdmins();

    } catch (err) {
      console.error("Error deleting admin:", err);
    }
  };

  // ======================================================
  //                 FILTER SEARCH
  // ======================================================
  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ======================================================
  //                    RENDER UI (TIDAK DIUBAH)
  // ======================================================

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />

      <div className="flex-1 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Kelola Admin</h1>
            <p className="text-sm text-gray-600 mt-2">Tambah dan kelola akun admin sistem</p>
          </div>

          {/* Action Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Cari admin..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <button
                onClick={() => handleOpenModal('add')}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Plus size={20} /> Tambah Admin Baru
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Nama</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmins.map(admin => (
                  <tr key={admin.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{admin.name}</td>
                    <td className="px-6 py-4">{admin.email}</td>
                    <td className="px-6 py-4">{admin.role}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenModal('edit', admin)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(admin.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD */}
          <div className="md:hidden space-y-4">
            {filteredAdmins.map(admin => (
              <div key={admin.id} className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold">{admin.name}</h3>
                <p className="text-gray-600">{admin.email}</p>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => handleOpenModal('edit', admin)} className="text-blue-600">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(admin.id)} className="text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>


      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">
                {modalMode === 'add' ? "Tambah Admin Baru" : "Edit Admin"}
              </h2>
              <button onClick={handleCloseModal}><X size={24} /></button>
            </div>

            <div className="space-y-4">

              {/* Nama */}
              <div>
                <label className="text-sm font-medium">Nama Lengkap</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium">
                  Password {modalMode === "edit" && "(Optional)"}
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              {/* Role */}
              <div>
                <label className="text-sm font-medium">Role</label>
                <select
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  className="w-full border px-3 py-2 rounded-lg"
                >
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={handleCloseModal} className="flex-1 border px-4 py-2 rounded-lg">
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  {modalMode === "add" ? "Tambah Admin" : "Simpan Perubahan"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
