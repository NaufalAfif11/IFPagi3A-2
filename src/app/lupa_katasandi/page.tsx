"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOTP = () => {
    if (!email) return alert("Email wajib diisi!");
    alert("Kode OTP dikirim (Simulasi)");
    setStep(2);
  };

  const handleVerifyOTP = () => {
    if (!otp) return alert("OTP wajib diisi!");
    if (otp === "123456") {
      alert("OTP benar! (Simulasi)");
      setStep(3);
    } else {
      alert("OTP salah! Gunakan: 123456");
    }
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword)
      return alert("Semua field wajib diisi!");
    if (newPassword !== confirmPassword)
      return alert("Password tidak cocok!");
    if (newPassword.length < 6)
      return alert("Password minimal 6 karakter!");

    alert("Password berhasil direset (Simulasi)");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F3F7FB]">
      <div className="w-[430px] bg-white p-10 rounded-3xl shadow-xl border border-[#1F4E73]">

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-[#1F4E73] text-center">
              Lupa Kata Sandi
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Masukkan email Anda untuk menerima kode OTP
            </p>

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-md bg-[#E3ECF5] border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-[#1F4E73]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleSendOTP}
              className="w-full bg-[#1F4E73] text-white py-2 rounded-md font-semibold hover:bg-[#163954] transition mb-3"
            >
              Kirim Kode OTP
            </button>

            <button
              onClick={() => (window.location.href = "/login")}
              className="w-full text-[#1F4E73] text-sm underline"
            >
              Kembali ke Login
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-[#1F4E73] text-center">
              Verifikasi Kode OTP
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Masukkan kode OTP yang dikirim ke: <br />
              <span className="font-semibold">{email}</span>
            </p>

            <input
              type="text"
              placeholder="Kode OTP"
              maxLength={6}
              className="w-full px-4 py-2 rounded-md bg-[#E3ECF5] border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-[#1F4E73]"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={handleVerifyOTP}
              className="w-full bg-[#1F4E73] text-white py-2 rounded-md font-semibold hover:bg-[#163954] transition mb-3"
            >
              Verifikasi
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full text-[#1F4E73] text-sm underline"
            >
              Kirim Ulang Kode
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-[#1F4E73] text-center">
              Reset Kata Sandi
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Masukkan kata sandi baru Anda
            </p>

            <input
              type="password"
              placeholder="Kata Sandi Baru"
              className="w-full px-4 py-2 rounded-md bg-[#E3ECF5] border border-gray-300 mb-3 focus:outline-none focus:ring-2 focus:ring-[#1F4E73]"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Konfirmasi Kata Sandi Baru"
              className="w-full px-4 py-2 rounded-md bg-[#E3ECF5] border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-[#1F4E73]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={handleResetPassword}
              className="w-full bg-[#1F4E73] text-white py-2 rounded-md font-semibold hover:bg-[#163954] transition"
            >
              Reset Kata Sandi
            </button>
          </div>
        )}

        {/* Progress */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-8 h-8 rounded-full flex justify-center items-center font-semibold text-sm ${
                step >= num
                  ? "bg-[#1F4E73] text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
