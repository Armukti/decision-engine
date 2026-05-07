"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';

export default function ScenarioPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Anak';
  
  const [scenario, setScenario] = useState<any>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [step, setStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const canvasStyle = {
    minHeight: '100vh', 
    backgroundColor: '#f4f1ea',
    backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.02) 1px, transparent 0), linear-gradient(rgba(0,0,0,.02) 1px, transparent 0)`,
    backgroundSize: '4px 4px', 
    fontFamily: 'serif', 
    overflow: 'hidden'
  };

  useEffect(() => {
    generateScenario();
  }, []);

  async function generateScenario() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/ai-scenario", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name })
      });
      const data = await res.json();
      
      setTimeout(() => {
        setScenario(data);
        setStartTime(Date.now());
        setIsAnimating(true);
        setIsLoading(false);
      }, 100);
    } catch (err) {
      console.error("Gagal memuat skenario", err);
    }
  }

  async function handleChoice(choice: any) {
    const duration = Date.now() - startTime;
    setIsAnimating(false);
    
    setTimeout(async () => {
      try {
        await fetch("/api/behavior", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            name, 
            trait: choice.trait, 
            scenarioText: scenario.description, 
            duration 
          })
        });

        if (step >= 5) {
          setIsFinished(true);
        } else {
          setStep(s => s + 1);
          generateScenario();
        }
      } catch (err) {
        console.error("Gagal menyimpan interaksi", err);
      }
    }, 400);
  }

  // --- TAMPILAN AKHIR (Personal & Aman) ---
  if (isFinished) return (
    <div style={{ ...canvasStyle, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'20px' }}>
      <div style={{ fontSize:'80px', marginBottom:'20px' }}>🌟</div>
      <h2 style={{ fontSize:'32px', fontWeight:'800', color:'#1a1a1a', marginBottom:'20px' }}>
        Petualangan Selesai
      </h2>
      
      {/* Teks salam hangat sesuai permintaan lo */}
      <p style={{ fontSize:'22px', color:'#444', fontStyle:'italic', maxWidth:'450px', lineHeight:'1.6', marginBottom:'60px' }}>
        "Terima kasih sudah menjadi bagian dari cerita hari ini. <br/> 
        <b>Sampai ketemu lagi, {name}!</b>"
      </p>

      {/* Button yang mengarah ke login orang tua (Parental Gate) */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '40px', width: '100%', maxWidth: '350px' }}>
        <button 
          onClick={() => window.location.href = `/parent/login?target=reflection&name=${name}`} 
          style={{ 
            padding:'20px 40px', 
            backgroundColor:'#1a1a1a', 
            color:'white', 
            border:'none', 
            borderRadius:'2px', 
            cursor:'pointer', 
            fontWeight:'bold', 
            fontSize:'14px',
            letterSpacing:'1px',
            width: '100%'
          }}
        >
          BUKA CATATAN REFLEKSI →
        </button>
        <p style={{ marginTop: '15px', fontSize: '10px', color: '#aaa', letterSpacing: '2px' }}>
          PARENTAL_AUTH_REQUIRED
        </p>
      </div>
    </div>
  );

  if (!scenario) return <div style={canvasStyle}></div>;

  return (
    <div style={canvasStyle}>
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeOutDown { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(20px); } }
        .animate-in { animation: fadeInUp 0.5s ease-out forwards; }
        .animate-out { animation: fadeOutDown 0.4s ease-in forwards; }
      `}</style>
      
      <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '50px' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i} 
              style={{ 
                height: '4px', 
                width: '40px', 
                backgroundColor: i <= step ? '#1a1a1a' : '#d1d5db', 
                transition: '0.4s' 
              }} 
            />
          ))}
        </div>

        <div className={isAnimating ? "animate-in" : "animate-out"} style={{ backgroundColor: 'rgba(255,255,255,0.4)', padding: '60px 40px', border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center', borderRadius:'2px' }}>
          <h2 style={{ fontSize: '28px', color: '#1a1a1a', lineHeight: '1.4', marginBottom: '50px', fontWeight: '800' }}>
            {scenario.description}
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {scenario.choices.map((c: any, i: number) => (
              <button 
                key={i} 
                onClick={() => handleChoice(c)} 
                disabled={isLoading || !isAnimating}
                style={{ 
                  padding: '22px', fontSize: '18px', fontWeight: 'bold', color: 'white', 
                  backgroundColor: '#6366f1', border: 'none', borderRadius: '2px', 
                  cursor:'pointer', boxShadow: '0 6px 0 #4338ca'
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
