'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// 1. We import your new accurate subsidy math here
import { calculateSubsidy } from '../utils/subsidy'; 

export default function SolarReport() {
  const [roofArea, setRoofArea] = useState(850);
  const [capacity, setCapacity] = useState(8.5); // "capacity" is your kW variable
  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem('solarData');
    if (savedData) {
      const { area } = JSON.parse(savedData);
      const parsedArea = Number(area);
      if (parsedArea) {
        setRoofArea(parsedArea);
        setCapacity(Math.min(parsedArea / 100, 10)); 
      }
    }
  }, []);

  const totalCost = capacity * 60000; 
  // 2. We pass your 'capacity' variable into the new function here
  const subsidy = calculateSubsidy(capacity); 
  const netPayable = totalCost - subsidy;
  const monthlySavings = capacity * 960; 
  const paybackYears = netPayable / (monthlySavings * 12);

  const handleFindInstallers = () => {
    localStorage.setItem('requiredCapacity', capacity.toString());
    router.push('/installers');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 font-sans pb-24">
      <div className="max-w-4xl w-full">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            ROI & Subsidy Calculator 💰
          </h1>
          <Link href="/dashboard">
            <button className="text-orange-500 font-bold hover:text-orange-600 transition">← Back</button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-8 w-full text-left">System Size</h2>
            
            <div className="w-full mb-6">
              <div className="flex justify-between text-sm text-gray-500 font-semibold mb-2">
                <span>Capacity (kW)</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                step="0.5"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>
            
            <div className="text-4xl font-extrabold text-orange-500 mb-2">{capacity.toFixed(1)} kW</div>
            <p className="text-sm text-gray-400">Suitable for {(capacity * 100).toFixed(0)} sq.ft roof area</p>
            
            {capacity * 100 > roofArea && (
              <p className="text-xs text-red-500 mt-4 font-semibold bg-red-50 p-2 rounded">
                Warning: Exceeds your scanned roof area ({roofArea} sq.ft)
              </p>
            )}
          </div>

          <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Financial Breakdown</h2>
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4 text-gray-600">
              <span className="font-medium">Estimated Total Cost</span>
              <span className="font-bold text-gray-900">₹{totalCost.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-600">PM Surya Ghar Subsidy</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">Govt Scheme</span>
              </div>
              {/* 3. The calculated format is injected here automatically */}
              <span className="font-bold text-green-600">- ₹{subsidy.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-extrabold text-gray-900">Net Payable Amount</span>
              <span className="text-2xl font-extrabold text-orange-500">₹{netPayable.toLocaleString('en-IN')}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center">
                <p className="text-blue-600 font-bold text-sm mb-1">Monthly Savings</p>
                <p className="text-2xl font-extrabold text-blue-900">₹{monthlySavings.toLocaleString('en-IN')}</p>
              </div>
              
              <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl text-center">
                <p className="text-purple-600 font-bold text-sm mb-1">Payback Period</p>
                <p className="text-2xl font-extrabold text-purple-900">{paybackYears.toFixed(1)} Years</p>
              </div>
            </div>

            <button 
              onClick={handleFindInstallers}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition text-lg shadow-md mt-auto flex items-center justify-center gap-2"
            >
              Find Verified Installers Near Me <span>→</span>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}