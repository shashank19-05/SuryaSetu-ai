'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ROICalculator() {
  const [capacity, setCapacity] = useState<number>(3); // Default 3kW
  const costPerKW = 60000; // Average cost ₹60,000 per kW

  // Real PM Surya Ghar Scheme Math
  const calculateSubsidy = (kw: number) => {
    if (kw <= 2) return kw * 30000;
    if (kw > 2 && kw <= 3) return (2 * 30000) + ((kw - 2) * 18000);
    return 78000; // Capped at 78,000 for > 3kW
  };

  const totalCost = capacity * costPerKW;
  const subsidyAmount = calculateSubsidy(capacity);
  const netCost = totalCost - subsidyAmount;
  
  // Assuming 1kW generates ~120 units/month, saving ₹8 per unit
  const monthlySavings = capacity * 120 * 8;
  const paybackMonths = netCost / monthlySavings;
  const paybackYears = (paybackMonths / 12).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ROI & Subsidy Calculator 💰</h1>
          <Link href="/dashboard">
            <button className="text-orange-500 font-semibold hover:text-orange-700 transition">← Back</button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 col-span-1">
            <h3 className="text-lg font-bold text-gray-800 mb-4">System Size</h3>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Capacity (kW)</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              step="0.5"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600 mb-4"
            />
            <div className="text-center font-bold text-2xl text-orange-600">
              {capacity} kW
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Suitable for {capacity * 100} sq.ft roof area
            </p>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Financial Breakdown</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-gray-600">Estimated Total Cost</span>
                <span className="font-semibold text-gray-800">₹{totalCost.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-gray-600 flex items-center gap-2">
                  PM Surya Ghar Subsidy <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Govt Scheme</span>
                </span>
                <span className="font-bold text-green-600">- ₹{subsidyAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-gray-800">Net Payable Amount</span>
                <span className="text-2xl font-bold text-orange-600">₹{netCost.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                <div className="text-sm text-blue-600 font-semibold mb-1">Monthly Savings</div>
                <div className="text-xl font-bold text-blue-800">₹{monthlySavings.toLocaleString('en-IN')}</div>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 text-center">
                <div className="text-sm text-purple-600 font-semibold mb-1">Payback Period</div>
                <div className="text-xl font-bold text-purple-800">{paybackYears} Years</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}