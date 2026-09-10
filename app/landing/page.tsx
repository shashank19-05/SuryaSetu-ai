import Link from 'next/link'

export default function Landing() {
  return (
    <div style={{minHeight:'100vh', background:'linear-gradient(135deg, #FACC15, #F97316, #EF4444)'}}>
      <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 32px'}}>
        <div style={{color:'white', fontWeight:'bold', fontSize:'20px'}}>☀️ Surya Setu AI</div>
        <Link href="/login">
          <button style={{background:'white', color:'#F97316', fontWeight:'600', padding:'8px 20px', borderRadius:'999px', border:'none', cursor:'pointer'}}>
            Login
          </button>
        </Link>
      </nav>

      <div style={{display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', padding:'80px 16px'}}>
        <div style={{fontSize:'72px', marginBottom:'24px'}}>☀️</div>
        <h1 style={{fontSize:'48px', fontWeight:'bold', color:'white', marginBottom:'16px', lineHeight:'1.2'}}>
          Smart Solar for<br />Every Indian Home
        </h1>
        <p style={{color:'rgba(255,255,255,0.85)', fontSize:'20px', marginBottom:'40px', maxWidth:'560px'}}>
          Find out how much you can save with solar energy. Get personalized reports, ROI calculations and connect with verified installers.
        </p>
        <Link href="/login">
          <button style={{background:'white', color:'#F97316', fontWeight:'bold', padding:'16px 40px', borderRadius:'999px', fontSize:'18px', border:'none', cursor:'pointer', boxShadow:'0 10px 30px rgba(0,0,0,0.2)'}}>
            Get Started Free →
          </button>
        </Link>

        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'32px', marginTop:'80px', color:'white'}}>
          <div style={{background:'rgba(255,255,255,0.2)', borderRadius:'16px', padding:'24px'}}>
            <div style={{fontSize:'32px', fontWeight:'bold'}}>₹0</div>
            <div style={{fontSize:'14px', marginTop:'4px'}}>Cost to check</div>
          </div>
          <div style={{background:'rgba(255,255,255,0.2)', borderRadius:'16px', padding:'24px'}}>
            <div style={{fontSize:'32px', fontWeight:'bold'}}>5 min</div>
            <div style={{fontSize:'14px', marginTop:'4px'}}>Assessment time</div>
          </div>
          <div style={{background:'rgba(255,255,255,0.2)', borderRadius:'16px', padding:'24px'}}>
            <div style={{fontSize:'32px', fontWeight:'bold'}}>₹78k</div>
            <div style={{fontSize:'14px', marginTop:'4px'}}>Avg yearly savings</div>
          </div>
        </div>
      </div>
    </div>
  )
}