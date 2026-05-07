"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

function WelcomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [profile, setProfile] = useState({ name: '', gender: 'male', age: '10' });
  const [isRepeat, setIsRepeat] = useState(false);

  useEffect(() => {
    const rawName = searchParams.get('name') || 'Kai';
    const name = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();
    
    // --- LOGIKA NORMALISASI (KUNCI DATA DISINI) ---
    // Biar data Nuna gak nyampur ke Kai atau sebaliknya
    let finalAge = "10";
    let finalGender = "male";

    if (name.toLowerCase() === 'nuna') {
      finalAge = "6";
      finalGender = "female";
    } else if (name.toLowerCase() === 'kai') {
      finalAge = "10";
      finalGender = "male";
    }

    setProfile({ name, gender: finalGender, age: finalAge });

    // Cek Sesi Ulang
    const sessionVal = localStorage.getItem(`session_${name}`);
    if (sessionVal && parseInt(sessionVal) > 1) setIsRepeat(true);
  }, [searchParams]);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', maxWidth: '600px' }}>
      <div style={{ fontSize: '50px', marginBottom: '20px' }}>👋</div>
      <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '30px', color: '#1A1A1A' }}>Halo, {profile.name}!</h1>
      <p style={{ fontStyle: 'italic', color: '#555', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '50px' }}>
        "Senang sekali kamu datang lagi. Siap jadi versi terbaik dirimu?"
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <button 
          onClick={() => router.push(`/adventure?name=${profile.name}&gender=${profile.gender}&age=${profile.age}`)}
          style={{ backgroundColor: '#6366F1', color: 'white', padding: '22px 65px', borderRadius: '60px', fontSize: '1.1rem', fontWeight: '900', border: 'none', cursor: 'pointer', boxShadow: '0 15px 30px rgba(99, 102, 241, 0.3)' }}
        >
          {isRepeat ? "KITA MULAI LAGI!" : "AYO MULAI!"} <span>→</span>
        </button>
        <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '14px', fontWeight: '600', textDecoration: 'underline' }}>KELUAR</button>
      </div>
    </motion.div>
  );
}

export default function WelcomePage() {
  return (
    <main style={{ backgroundColor: '#F5F2EA', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'serif', backgroundImage: `radial-gradient(#d1d1d1 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }}>
      <Suspense fallback={null}><WelcomeContent /></Suspense>
    </main>
  );
}
