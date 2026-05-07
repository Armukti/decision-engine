"use client";
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LandingContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode'); 
  const isChildMode = mode === 'child';

  // --- CONFIGURATION PER MODE ---
  const config = {
    text: isChildMode 
      ? "“Dalam 5 menit sehari, latih dirimu mengambil keputusan yang lebih baik melalui petualangan seru.”"
      : "“Dalam 5 menit sehari, lihat bagaimana anak Anda membuat keputusan — dan arahkan dengan lebih sadar.”",
    buttonLabel: isChildMode ? "AYO MULAI! →" : "MASUK KE LAB →",
    primaryColor: isChildMode ? "#6366f1" : "#1a1a1a", // Indigo vs Black
    borderRadius: isChildMode ? "50px" : "2px",      // Bulat vs Kotak
    shadow: isChildMode ? "0 10px 30px rgba(99, 102, 241, 0.3)" : "0 10px 30px rgba(0,0,0,0.1)"
  };

  const canvasStyle = {
    minHeight: '100vh',
    backgroundColor: '#f4f1ea',
    backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 0), linear-gradient(rgba(0,0,0,.03) 1px, transparent 0)`,
    backgroundSize: '3px 3px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'serif',
    padding: '20px',
    textAlign: 'center' as const
  };

  return (
    <div style={canvasStyle}>
      <div style={{ maxWidth: '650px' }}>
        {/* Judul tetap konsisten sebagai branding Lab */}
        <h1 style={{ 
          fontSize: '56px', 
          fontWeight: '900', 
          color: '#1a1a1a', 
          marginBottom: '20px', 
          letterSpacing: '-2px' 
        }}>
          Decision Lab
        </h1>
        
        {/* Garis pemisah yang ikut berubah warna di mode bocil */}
        <div style={{ 
          width: '40px', 
          height: '3px', 
          background: config.primaryColor, 
          margin: '0 auto 30px',
          transition: '0.5s'
        }}></div>
        
        <p style={{ 
          fontSize: '22px', 
          color: isChildMode ? '#312e81' : '#444', // Lebih deep blue buat bocil
          fontStyle: 'italic', 
          lineHeight: '1.6', 
          marginBottom: '50px',
          fontWeight: isChildMode ? '500' : 'normal'
        }}>
          {config.text}
        </p>
        
        <button 
          onClick={() => window.location.href = isChildMode ? '/children?mode=child' : '/children'}
          style={{ 
            padding: isChildMode ? '25px 60px' : '22px 50px', 
            fontSize: '16px', 
            backgroundColor: config.primaryColor, 
            color: '#fff', 
            border: 'none', 
            borderRadius: config.borderRadius, 
            cursor: 'pointer', 
            fontWeight: 'bold', 
            letterSpacing: '2px',
            boxShadow: config.shadow,
            transition: '0.3s all'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {config.buttonLabel}
        </button>

        {/* Status Tagging */}
        <p style={{ 
          marginTop: '40px', 
          fontSize: '10px', 
          color: isChildMode ? '#6366f1' : '#aaa', 
          letterSpacing: '3px',
          fontWeight: 'bold',
          opacity: 0.6
        }}>
          {isChildMode ? "CHILD_DISCOVERY_MODE" : "PARENT_INSIGHT_PORTAL"}
        </p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#f4f1ea', minHeight: '100vh' }} />}>
      <LandingContent />
    </Suspense>
  );
}
