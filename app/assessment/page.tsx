'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { db, auth } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Assessment() {
  const [billAmount, setBillAmount] = useState('');
  const [roofArea, setRoofArea] = useState('');
  const [billFile, setBillFile] = useState<File | null>(null);
  const [roofFile, setRoofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // If user is logged in, save to Firestore
      if (auth.currentUser) {
        await addDoc(collection(db, 'assessments'), {
          uid: auth.currentUser.uid,
          bill: Number(billAmount),
          area: Number(roofArea),
          timestamp: new Date().toISOString()
        });
      } else {
        // Fallback for guests
        localStorage.setItem('solarData', JSON.stringify({ bill: billAmount, area: roofArea }));
      }
      router.push('/solar-report');
    } catch (error) {
      console.error("Error saving to database:", error);
      router.push('/solar-report');
    }
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
            <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition">
              <span className="text-3xl mb-2">📄</span>
              <span className="text-sm font-semibold text-gray-700">Upload Electricity Bill</span>
              <span className="text-xs text-gray-400 mt-1">{billFile ? billFile.name : 'PDF, JPG, or PNG'}</span>
              <input type="file" className="hidden" onChange={(e) => setBillFile(e.target.files?.[0] || null)} />
            </label>

            <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition">
              <span className="text-3xl mb-2">🏠</span>
              <span className="text-sm font-semibold text-gray-700">Upload Roof Photo</span>
              <span className="text-xs text-gray-400 mt-1">{roofFile ? roofFile.name : 'JPG or PNG'}</span>
              <input type="file" className="hidden" onChange={(e) => setRoofFile(e.target.files?.[0] || null)} />
            </label>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition text-lg shadow-md disabled:bg-orange-300"
          >
            {isSubmitting ? 'Saving to Cloud...' : 'Analyze Solar Potential ✨'}
          </button>
        </form>
      </div>
    </div>
  );
}