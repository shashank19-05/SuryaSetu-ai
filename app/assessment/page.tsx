'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Assessment() {
  const [billAmount, setBillAmount] = useState('');
  const [roofArea, setRoofArea] = useState('');
  const [billFile, setBillFile] = useState<File | null>(null);
  const [roofFile, setRoofFile] = useState<File | null>(null);
  const router = useRouter();

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    // Temporarily saving locally - Shashank will connect this to Firestore later!
    localStorage.setItem('solarData', JSON.stringify({ bill: billAmount, area: roofArea }));
    router.push('/solar-report');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Site Assessment 📋</h1>
          <Link href="/dashboard">
            <button className="text-orange-500 font-semibold hover:text-orange-700 transition">← Back</button>
          </Link>
        </div>

        <form onSubmit={handleAnalyze} className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Average Monthly Bill (₹)</label>
              <input 
                type="number" 
                required
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g. 1500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Available Roof Area (sq.ft)</label>
              <input 
                type="number" 
                required
                value={roofArea}
                onChange={(e) => setRoofArea(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g. 800"
              />
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-4">Document Upload</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Electricity Bill Dropzone */}
            <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition">
              <span className="text-3xl mb-2">📄</span>
              <span className="text-sm font-semibold text-gray-700">Upload Electricity Bill</span>
              <span className="text-xs text-gray-400 mt-1">{billFile ? billFile.name : 'PDF, JPG, or PNG'}</span>
              <input 
                type="file" 
                className="hidden" 
                accept=".pdf,image/*"
                onChange={(e) => setBillFile(e.target.files?.[0] || null)}
              />
            </label>

            {/* Roof Photo Dropzone */}
            <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition">
              <span className="text-3xl mb-2">🏠</span>
              <span className="text-sm font-semibold text-gray-700">Upload Roof Photo</span>
              <span className="text-xs text-gray-400 mt-1">{roofFile ? roofFile.name : 'JPG or PNG'}</span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => setRoofFile(e.target.files?.[0] || null)}
              />
            </label>

          </div>

          <button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition text-lg shadow-md"
          >
            Analyze Solar Potential ✨
          </button>
        </form>
      </div>
    </div>
  );
}