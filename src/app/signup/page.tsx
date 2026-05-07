"use client";

import { useEffect, useState } from "react";

export default function SignupPage() {
  const [lang, setLang] = useState<"id" | "en">("id");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nick, setNick] = useState("");
  const [fullname, setFullname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");

  const [payment, setPayment] = useState("");

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
      password: "Password (4-12, huruf & angka)",
      nick: "Nama Panggilan",
      fullname: "Nama Lengkap",
      age: "Usia",
      male: "Laki-laki",
      female: "Perempuan",
      payment: "Metode Pembayaran",
      choose: "Pilih",
      button: "Daftar",
    },
    en: {
      title: "Decision Lab",
      subtitle:
        "A quiet space to observe how small choices shape a child's thinking.",
      email: "Parent Email",
      password: "Password (4-12, letters & numbers)",
      nick: "Nick Name",
      fullname: "Full Name",
      age: "Age",
      male: "Male",
      female: "Female",
      payment: "Payment Method",
      choose: "Select",
      button: "Sign Up",
    },
  };

  function handleSignup() {
    const user = {
      email,
      password,
      child: { nick, fullname, age, gender },
      payment,
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("parentEmail", email);

    window.location.href = "/children";
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f0f0f",
        color: "#fff",
        padding: 20,
      }}
    >
      <div style={{ width: "100%", maxWidth: 700 }}>
        {/* 🔥 HEADER */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h1 style={{ fontSize: 38, marginBottom: 4 }}>
            {t[lang].title}
          </h1>

          <p
            style={{
              fontSize: "clamp(11px, 1.2vw, 14px)",
              opacity: 0.7,
              marginBottom: 10,
            }}
          >
            {t[lang].subtitle}
          </p>
        </div>

        {/* 🔥 FORM GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          <input
            placeholder={t[lang].email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder={t[lang].password}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder={t[lang].nick}
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder={t[lang].fullname}
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder={t[lang].age}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={inputStyle}
          />

          {/* GENDER */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setGender("male")}
              style={{
                ...genderBtn,
                background: gender === "male" ? "#3B82F6" : "#333",
              }}
            >
              {t[lang].male}
            </button>

            <button
              onClick={() => setGender("female")}
              style={{
                ...genderBtn,
                background: gender === "female" ? "#EC4899" : "#333",
              }}
            >
              {t[lang].female}
            </button>
          </div>

          {/* PAYMENT FULL */}
          <div style={{ gridColumn: "1 / -1" }}>
            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              style={inputStyle}
            >
              <option value="">{t[lang].choose}</option>
              <option value="gopay">GoPay</option>
              <option value="ovo">OVO</option>
              <option value="dana">DANA</option>
            </select>
          </div>
        </div>

        {/* 🔥 CTA */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button onClick={handleSignup} style={ctaStyle}>
            {t[lang].button}
          </button>
        </div>
      </div>
    </main>
  );
}

// 🎨 STYLE
const inputStyle = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "none",
};

const genderBtn = {
  flex: 1,
  padding: 12,
  borderRadius: 10,
  border: "none",
  color: "#fff",
  cursor: "pointer",
};

const ctaStyle = {
  padding: 16,
  fontSize: 18,
  borderRadius: 12,
  border: "none",
  background: "#fff",
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer",
  width: "60%",
};