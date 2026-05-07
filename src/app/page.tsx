export default function Home() {
  return (
    <main style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      backgroundColor: '#F3F3F3'
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>DecisionLab.</h1>
      <hr style={{ width: '100px', border: '2px solid black', margin: '20px 0' }} />
      <p style={{ fontStyle: 'italic', color: '#555' }}>Landing Page is Ready!</p>
    </main>
  )
}
