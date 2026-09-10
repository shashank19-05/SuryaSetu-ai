'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SolarReport() {
  const [data, setData] = useState({ bill: 0, systemSize: 0, cost: 0 });

  useEffect(() => {
    // Read the data Kesav saved in the previous step
    const saved = JSON.parse(localStorage.getItem('solarData') || '{"bill": 0}');
    // Hackathon Math: Approx 1kW system saves ₹1000/month. Cost is ₹50,000 per kW.
    const systemSize = Math.max(1, Math.round(saved.bill / 1000)); 
    const cost = systemSize * 50000;
    
    setData({ bill: saved.bill, systemSize, cost });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">Your Solar Potential ☀️</h1>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <div className="text-sm text-gray-500">Recommended System</div>
            <div className="text-2xl font-bold text-gray-900">{data.systemSize} kW</div>
          </div>
          <div className="bg-green-50 p-4 rounded-xl border border-green-100">
            <div className="text-sm text-gray-500">Estimated Cost</div>
            <div className="text-2xl font-bold text-gray-900">₹{data.cost.toLocaleString()}</div>
          </div>
        </div>
        <Link href="/roi">
          <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg mb-3">View ROI & Savings</button>
        </Link>
        <Link href="/dashboard">
          <button className="w-full bg-gray-100 text-gray-700 font-bold py-3 rounded-lg">Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}