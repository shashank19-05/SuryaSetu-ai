'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ROI() {
  const [roi, setRoi] = useState({cost:0, savings:0, payback:0, subsidy:0, netCost:0})

  useEffect(() => {
    const saved = localStorage.getItem('assessment')
    if (saved) {
      const a = JSON.parse(saved)
      const areaM2 = parseFloat(a.roofArea) * 0.0929
      const kw = +(areaM2 * 0.15 * 5.3 / 5.3).toFixed(1)
      const cost = Math.round(kw * 45000)
      const savings = Math.round(areaM2 * 0.15 * 5.3 * 365 * 7)
      const subsidy = kw <= 3 ? kw * 30000 : (3 * 30000) + ((kw - 3) * 18000)
      const netCost = cost - subsidy
      const payback = +(netCost / savings).toFixed(1)
      setRoi({cost, savings, payback, subsidy: Math.round(subsidy), netCost: Math.round(netCost)})
    }
  }, [])

  return (
    <div style={{minHeight:'100vh', background:'#f8fafc'}}>
      <div style={{background:'white', padding:'16px 32px', boxShadow:'0 1px 4px rgba(0,0,0,0.1)', display:'flex', justifyContent:'space-between'}}>
        <div style={{fontWeight:'bold', color:'#F97316', fontSize:'20px'}}>☀️ Surya Setu AI</div>
        <Link href="/solar-report"><button style={{color:'#6b7280', background:'none', border:'none', cursor:'pointer'}}>← Back</button></Link>
      </div>

      <div style={{maxWidth:'600px', margin:'0 auto', padding:'40px 16px'}}>
        <h1 style={{fontSize:'28px', fontWeight:'bold', color:'#1f2937', marginBottom:'8px'}}>💰 ROI Calculator</h1>
        <p style={{color:'#6b7280', marginBottom:'32px'}}>Your complete financial breakdown</p>

        {[
          {label:'Total System Cost', value:`₹${roi.cost.toLocaleString()}`, color:'#FEE2E2'},
          {label:'Government Subsidy (PM Surya Ghar)', value:`- ₹${roi.subsidy.toLocaleString()}`, color:'#D1FAE5'},
          {label:'Your Net Cost', value:`₹${roi.netCost.toLocaleString()}`, color:'#DBEAFE'},
          {label:'Annual Savings', value:`₹${roi.savings.toLocaleString()}`, color:'#FEF3C7'},
          {label:'Payback Period', value:`${roi.payback} years`, color:'#F3E8FF'},
        ].map((item,i) => (
          <div key={i} style={{background:item.color, borderRadius:'12px', padding:'20px 24px', marginBottom:'12px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <span style={{color:'#374151', fontWeight:'500'}}>{item.label}</span>
            <span style={{fontWeight:'bold', fontSize:'18px', color:'#1f2937'}}>{item.value}</span>
          </div>
        ))}

        <Link href="/subsidy">
          <button style={{width:'100%', background:'#F97316', color:'white', fontWeight:'600', padding:'16px', borderRadius:'12px', border:'none', cursor:'pointer', fontSize:'16px', marginTop:'16px'}}>
            Check Subsidies →
          </button>
        </Link>
      </div>
    </div>
  )
}