"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ParentLogin() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Ambil parameter nama biar gak hilang pas redirect
  const name = searchParams.get('name') || '';
  const age = searchParams.get('age') || '';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password === "1234") {
      // Simpan status login
      localStorage.setItem("parent_authenticated", "true");
      
      // Kirim balik ke reflection dengan parameter yang sama
      router.push(`/parent/reflection?name=${name}&age=${age}`);
    } else {
      alert("Passcode salah, Ayah/Bunda.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8] p-6 font-serif">
      <div className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 w-full max-w-md text-center">
        <div className="mb-10">
          <div className="w-12 h-12 bg-black rounded-xl mx-auto mb-6 flex items-center justify-center text-white text-xl">🔒</div>
          <h1 className="text-3xl font-medium mb-2">Akses Orang Tua</h1>
          <p className="text-gray-400 text-sm uppercase tracking-widest">Decision Lab</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2 text-left">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-4">Masukkan Passcode</label>
            <input
              type="password"
              placeholder="••••"
              className="w-full p-5 rounded-2xl border border-gray-100 bg-gray-50 text-center text-3xl tracking-[0.5em] focus:ring-2 focus:ring-black outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white p-5 rounded-2xl font-bold hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-black/10"
          >
            {isLoading ? "MEMBUKA..." : "LIHAT RESUME ANAK"}
          </button>
        </form>
      </div>
    </div>
  );
}
