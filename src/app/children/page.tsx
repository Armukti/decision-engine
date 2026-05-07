"use client";
export default function ChildrenPage() {
  const children = [
    { name: "Kai", age: 10, gender: "Laki-laki" },
    { name: "Nuna", age: 6, gender: "Perempuan" }
  ];

  const canvasStyle = {
    minHeight: '100vh', backgroundColor: '#f4f1ea',
    backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 0), linear-gradient(rgba(0,0,0,.03) 1px, transparent 0)`,
    backgroundSize: '3px 3px', display: 'flex', flexDirection: 'column' as const,
    alignItems: 'center', justifyContent: 'center', fontFamily: 'serif', padding: '20px'
  };

  return (
    <div style={canvasStyle}>
      <h2 style={{ fontSize: '28px', color: '#1a1a1a', marginBottom: '40px', fontWeight: '900' }}>Siapa yang akan bertualang?</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', maxWidth: '400px' }}>
        {children.map((child, i) => (
          <button 
            key={i}
            onClick={() => window.location.href = `/welcome?name=${child.name}`}
            style={{ padding: '25px', backgroundColor: 'rgba(255,255,255,0.4)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '15px', cursor: 'pointer', textAlign: 'left' }}
          >
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a1a' }}>{child.name}</span>
            <p style={{ fontSize: '14px', color: '#666', margin: '5px 0 0' }}>{child.age} Tahun • {child.gender}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
