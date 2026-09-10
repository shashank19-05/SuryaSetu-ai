import Link from 'next/link'

const schemes = [
  { name:'PM Surya Ghar Muft Bijli Yojana', body:'Central Government', slab:'Up to 3 kW', amount:'₹30,000/kW', color:'#FEF3C7' },
  { name:'PM Surya Ghar Muft Bijli Yojana', body:'Central Government', slab:'3 kW to 10 kW', amount:'₹18,000/kW', color:'#D1FAE5' },
  { name:'Karnataka Solar Policy', body:'Karnataka State', slab:'All capacities', amount:'₹10,000/kW', color:'#DBEAFE' },
  { name:'MNRE Rooftop Solar', body:'Ministry of New & Renewable Energy', slab:'Residential', amount:'Up to 40% cost', color:'#F3E8FF' },
]

export default function Subsidy() {
  return (
    <div style={{minHeight:'100vh', background:'#f8fafc'}}>
      <div style={{background:'white', padding:'16px 32px', boxShadow:'0 1px 4px rgba(0,0,0,0.1)', display:'flex', justifyContent:'space-between'}}>
        <div style={{fontWeight:'bold', color:'#F97316', fontSize:'20px'}}>☀️ Surya Setu AI</div>
        <Link href="/roi"><button style={{color:'#6b7280', background:'none', border:'none', cursor:'pointer'}}>← Back</button></Link>
      </div>

      <div style={{maxWidth:'700px', margin:'0 auto', padding:'40px 16px'}}>
        <h1 style={{fontSize:'28px', fontWeight:'bold', color:'#1f2937', marginBottom:'8px'}}>🏛️ Government Subsidies</h1>
        <p style={{color:'#6b7280', marginBottom:'32px'}}>Available solar schemes for Indian homeowners</p>

        {schemes.map((s,i) => (
          <div key={i} style={{background:s.color, borderRadius:'16px', padding:'24px', marginBottom:'16px'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
              <div>
                <div style={{fontWeight:'bold', fontSize:'16px', color:'#1f2937', marginBottom:'4px'}}>{s.name}</div>
                <div style={{fontSize:'13px', color:'#6b7280', marginBottom:'8px'}}>By {s.body}</div>
                <div style={{fontSize:'13px', color:'#374151'}}>Slab: {s.slab}</div>
              </div>
              <div style={{background:'white', borderRadius:'10px', padding:'8px 16px', fontWeight:'bold', color:'#F97316', fontSize:'16px', whiteSpace:'nowrap'}}>
                {s.amount}
              </div>
            </div>
          </div>
        ))}

        <Link href="/installers">
          <button style={{width:'100%', background:'#F97316', color:'white', fontWeight:'600', padding:'16px', borderRadius:'12px', border:'none', cursor:'pointer', fontSize:'16px', marginTop:'8px'}}>
            Find Installers Near You →
          </button>
        </Link>
      </div>
    </div>
  )
}