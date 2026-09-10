'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Assessment() {
  const router = useRouter();
  const [bill, setBill] = useState('');
  const [area, setArea] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to browser memory instantly - no database needed for the demo!
    localStorage.setItem('solarData', JSON.stringify({ bill: Number(bill), area: Number(area) }));
    router.push('/solar-report'); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form onSubmit={handleCalculate} className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-orange-600 mb-6">Home Assessment</h2>
        
        <label className="block text-sm font-medium text-gray-700 mb-1">Average Monthly Bill (₹)</label>
        <input type="number" required value={bill} onChange={(e) => setBill(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 text-black focus:border-orange-500 outline-none" placeholder="e.g. 2500" />
          
        <label className="block text-sm font-medium text-gray-700 mb-1">Available Roof Area (sq. ft)</label>
        <input type="number" required value={area} onChange={(e) => setArea(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 text-black focus:border-orange-500 outline-none" placeholder="e.g. 500" />
          
        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition">
          Generate Solar Report →
        </button>
      </form>
    </div>
  );
}