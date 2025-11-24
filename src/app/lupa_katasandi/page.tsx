"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 1: Simulasi Kirim OTP
  const handleSendOTP = () => {
    if (!email) {
      alert("Email wajib diisi!");
      return;
    }

    alert("Kode OTP telah dikirim ke email Anda! (Simulasi)");
    setStep(2);
  };

  // Step 2: Simulasi Verifikasi OTP
  const handleVerifyOTP = () => {
    if (!otp) {
      alert("Kode OTP wajib diisi!");
      return;
    }

    if (otp === "123456") {
      alert("Kode OTP berhasil diverifikasi! (Simulasi)");
      setStep(3);
    } else {
      alert("OTP salah! Gunakan kode: 123456 (Simulasi)");
    }
  };

  // Step 3: Simulasi Reset Password
  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password minimal 6 karakter!");
      return;
    }

    alert("Password berhasil direset! (Simulasi)");
    goToLogin();
  };

  // Navigasi ke Login
  const goToLogin = () => {
    window.location.href = "/login"; // Navigasi langsung
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>

        {/* Step 1: Input Email */}
        {step === 1 && (
          <div style={contentStyle}>
            <h2 style={titleStyle}>Lupa Kata Sandi</h2>
            <p style={subtitleStyle}>
              Masukkan email Anda untuk menerima kode OTP
            </p>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <button onClick={handleSendOTP} style={buttonStyle}>
              Kirim Kode OTP
            </button>

            <button onClick={goToLogin} style={linkButtonStyle}>
              Kembali ke Login
            </button>
          </div>
        )}

        {/* Step 2: Input OTP */}
        {step === 2 && (
          <div style={contentStyle}>
            <h2 style={titleStyle}>Verifikasi Kode OTP</h2>
            <p style={subtitleStyle}>
              Masukkan kode OTP yang dikirim ke {email}
            </p>

            <input
              type="text"
              placeholder="Kode OTP"
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value)}
              style={inputStyle}
            />

            <button onClick={handleVerifyOTP} style={buttonStyle}>
              Verifikasi
            </button>

            <button onClick={() => setStep(1)} style={linkButtonStyle}>
              Kirim Ulang Kode
            </button>
          </div>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <div style={contentStyle}>
            <h2 style={titleStyle}>Reset Kata Sandi</h2>
            <p style={subtitleStyle}>Masukkan kata sandi baru Anda</p>

            <input
              type="password"
              placeholder="Kata Sandi Baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Konfirmasi Kata Sandi Baru"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={inputStyle}
            />

            <button onClick={handleResetPassword} style={buttonStyle}>
              Reset Kata Sandi
            </button>
          </div>
        )}

        {/* Progress Indicator */}
        <div style={progressContainerStyle}>
          <div style={{ ...progressDotStyle, ...(step >= 1 ? progressDotActiveStyle : {}) }}>1</div>
          <div style={progressLineStyle} />
          <div style={{ ...progressDotStyle, ...(step >= 2 ? progressDotActiveStyle : {}) }}>2</div>
          <div style={progressLineStyle} />
          <div style={{ ...progressDotStyle, ...(step >= 3 ? progressDotActiveStyle : {}) }}>3</div>
        </div>
      </div>
    </div>
  );
}

/* --- Styles --- */

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f3f4f6",
};

const cardStyle: React.CSSProperties = {
  width: 450,
  backgroundColor: "white",
  borderRadius: 24,
  padding: 40,
  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
};

const contentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const titleStyle: React.CSSProperties = {
  fontSize: 28,
  fontWeight: "bold",
  marginBottom: 8,
  color: "#1e40af",
  textAlign: "center",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#6b7280",
  marginBottom: 24,
  textAlign: "center",
};

const inputStyle: React.CSSProperties = {
  border: "1px solid #d1d5db",
  borderRadius: 6,
  padding: "12px 16px",
  marginBottom: 16,
  width: "100%",
  backgroundColor: "#eff6ff",
  outline: "none",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#1e40af",
  color: "white",
  fontWeight: 600,
  padding: "12px 24px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  marginBottom: 12,
  fontSize: 14,
};

const linkButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#1e40af",
  fontSize: 14,
  cursor: "pointer",
  textDecoration: "underline",
  padding: 8,
};

const progressContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 32,
  gap: 8,
};

const progressDotStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: "50%",
  backgroundColor: "#e5e7eb",
  color: "#9ca3af",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 14,
  fontWeight: 600,
};

const progressDotActiveStyle: React.CSSProperties = {
  backgroundColor: "#1e40af",
  color: "white",
};

const progressLineStyle: React.CSSProperties = {
  width: 40,
  height: 2,
  backgroundColor: "#e5e7eb",
};
