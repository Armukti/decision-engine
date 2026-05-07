"use client";

import { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lang, setLang] = useState<"id" | "en">("id");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as "id" | "en";
    if (savedLang) setLang(savedLang);
  }, []);

  const t = {
    id: {
      title: "Decision Lab",
      subtitle:
        "Sebuah ruang tenang untuk mengamati bagaimana pilihan kecil membentuk cara anak berpikir.",
      email: "Email Orang Tua",
      password: "Password",
      button: "Masuk",
      notFound: "User belum terdaftar",
      success: "Login berhasil!",
      error: "Email atau password salah",
    },
    en: {
      title: "Decision Lab",
      subtitle:
        "A quiet space to observe how small choices shape a child's thinking.",
      email: "Parent Email",
      password: "Password",
      button: "Login",
      notFound: "User not found",
      success: "Login successful!",
      error: "Invalid email or password",
    },
  };

  function handleLogin() {
    const userData = localStorage.getItem("user");

    if (!userData) {
      alert(t[lang].notFound);
      return;
    }

    const user = JSON.parse(userData);

    if (email === user.email && password === user.password) {
      localStorage.setItem("parentEmail", email);
      alert(t[lang].success);
      window.location.href = "/children";
    } else {
      alert(t[lang].error);
    }
  }

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f0f0f",
        color: "#fff",
        textAlign: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 🔥 HEADER */}
        <h1 style={{ fontSize: 40, marginBottom: 10 }}>
          {t[lang].title}
        </h1>

        <p
          style={{
            fontSize: "clamp(10px, 1.2vw, 14px)",
            opacity: 0.7,
            marginBottom: 30,
            whiteSpace: "nowrap",
            letterSpacing: 0.2,
          }}
        >
          {t[lang].subtitle}
        </p>

        {/* 🔥 FORM */}
        <input
          placeholder={t[lang].email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 12,
            borderRadius: 10,
            border: "none",
            outline: "none",
          }}
        />

        <input
          type="password"
          placeholder={t[lang].password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 20,
            borderRadius: 10,
            border: "none",
            outline: "none",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 12,
            border: "none",
            background: "#fff",
            color: "#000",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {t[lang].button}
        </button>
      </div>
    </main>
  );
}