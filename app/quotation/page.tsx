'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { jsPDF } from 'jspdf';

export default function Quotation() {
  const [data, setData] = useState({ bill: 0, area: 0, systemSize: 0, cost: 0 });

  useEffect(() => {
    // Grab the data saved by Kesav's Assessment form
    const saved = JSON.parse(localStorage.getItem('solarData') || '{"bill": 2500, "area": 500}');
    const systemSize = Math.max(1, Math.round(saved.bill / 1000));
    const cost = systemSize * 50000;
    setData({ ...saved, systemSize, cost });
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // PDF Header
    doc.setFontSize(22);
    doc.setTextColor(234, 88, 12); // Orange color
    doc.text('Surya Setu AI - Official Quotation', 20, 20);
    
    // PDF Body
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
    
    doc.setFontSize(14);
    doc.text('Customer Requirements:', 20, 50);
    doc.setFontSize(12);
    doc.text(`- Monthly Electricity Bill: Rs. ${data.bill}`, 30, 60);
    doc.text(`- Available Roof Area: ${data.area} sq.ft`, 30, 70);
    
    doc.setFontSize(14);
    doc.text('System Recommendation:', 20, 90);
    doc.setFontSize(12);
    doc.text(`- Recommended Solar Plant Size: ${data.systemSize} kW`, 30, 100);
    doc.text(`- Estimated Total Cost: Rs. ${data.cost.toLocaleString()}`, 30, 110);
    
    // PDF Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Note: This is an AI-generated estimate. Final costs may vary based on installer.', 20, 270);
    
    // Download command
    doc.save('Surya-Setu-Quotation.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Quotation is Ready</h2>
        <p className="text-gray-500 mb-8">Based on your assessment, we have generated a detailed cost breakdown and system specification.</p>
        
        <button onClick={generatePDF} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg shadow-lg transition mb-4">
          Download PDF Quotation ↓
        </button>
        
        <Link href="/dashboard">
          <button className="w-full bg-gray-100 text-gray-700 font-bold py-3 rounded-lg">Return to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}