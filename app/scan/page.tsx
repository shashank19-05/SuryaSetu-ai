'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function OpenCVScanner() {
  const [address, setAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const startScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;
    
    setIsScanning(true);
    setScanComplete(false);
    setProgress(0);

    // Simulate the OpenCV processing time
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
      <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900 z-10 relative">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-orange-500">☀️</span> Surya Setu AI <span className="text-sm bg-blue-500/20 text-blue-400 px-2 py-1 rounded">CV Engine</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Google Maps Static API + OpenCV Edge Processing</p>
        </div>
        <Link href="/dashboard">
          <button className="text-gray-400 hover:text-white transition">← Exit</button>
        </Link>
      </div>

      <div className="flex-grow flex flex-col md:flex-row">
        {/* Left Side: Input & Logs */}
        <div className="w-full md:w-1/3 p-8 border-r border-gray-800 flex flex-col bg-gray-900/50">
          <h2 className="text-xl font-bold mb-6">Target Property</h2>
          
          <form onSubmit={startScan} className="mb-8">
            <label className="block text-sm font-semibold text-gray-400 mb-2">Search Address for Extraction</label>
            <input 
              type="text" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g., 123 Tech Park, Bengaluru"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white outline-none focus:border-blue-500 mb-4"
              required
            />
            <button 
              type="submit"
              disabled={isScanning}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition disabled:bg-blue-800 disabled:cursor-not-allowed"
            >
              {isScanning ? 'Initializing OpenCV...' : 'Run Extraction Pipeline'}
            </button>
          </form>

          {/* Terminal Logs for Tech Flex */}
          <div className="flex-grow bg-black rounded-xl p-4 font-mono text-xs text-green-400 border border-gray-800 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full p-2 bg-gray-800 text-gray-400 font-sans font-bold flex justify-between">
              <span>Terminal output</span>
              <span>bash</span>
            </div>
            <div className="mt-8 space-y-2 opacity-80">
              {progress > 5 && <p>{'>'} Fetching Google Maps Static API [Sat_Image_HQ]...</p>}
              {progress > 20 && <p>{'>'} Image loaded. Initializing cv2.Canny() edge detection...</p>}
              {progress > 40 && <p>{'>'} Parsing orientation... Azimuth calculated at 184° (South-facing).</p>}
              {progress > 60 && <p>{'>'} Running shadow identification mask... excluding 12% of area.</p>}
              {progress > 80 && <p>{'>'} Raster operations complete. Calculating usable grid.</p>}
              {progress >= 100 && <p className="text-blue-400 font-bold">{'>'} SUCCESS: Optimal panel layout generated.</p>}
            </div>
          </div>
        </div>

        {/* Right Side: The Visualizer */}
        <div className="w-full md:w-2/3 bg-gray-800 relative overflow-hidden flex items-center justify-center">
          
          {/* Base Satellite Image (Placeholder) */}
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${progress > 5 ? 'opacity-100' : 'opacity-10'}`}
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=2070&auto=format&fit=crop')" }}
          >
            <div className="absolute inset-0 bg-gray-900/40"></div>
          </div>

          {/* The OpenCV Scanning Laser Effect */}
          {isScanning && (
            <motion.div 
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)] z-20"
            />
          )}

          {/* The Extracted Blueprint Overlay */}
          {scanComplete && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-20 bg-blue-900/60 backdrop-blur-sm border-2 border-blue-400 p-8 rounded-lg shadow-[0_0_50px_rgba(59,130,246,0.3)] flex flex-col items-center"
            >
              <div className="w-64 h-48 border border-blue-300/50 relative grid grid-cols-4 grid-rows-3 gap-1 p-1">
                {/* Simulated Panel Layout */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: i * 0.1 }}
                    className="bg-blue-500/80 border border-blue-300 rounded-sm"
                  />
                ))}
              </div>
              
              <div className="mt-6 w-full space-y-2">
                <div className="flex justify-between text-sm text-blue-100 border-b border-blue-400/30 pb-1">
                  <span>Detected Roof Area</span>
                  <span className="font-mono font-bold">1,240 sq.ft</span>
                </div>
                <div className="flex justify-between text-sm text-blue-100 border-b border-blue-400/30 pb-1">
                  <span>Usable Area (Shadow Adjusted)</span>
                  <span className="font-mono font-bold text-green-300">880 sq.ft</span>
                </div>
                <div className="flex justify-between text-sm text-blue-100 pb-1">
                  <span>Calculated Capacity</span>
                  <span className="font-mono font-bold text-orange-400">4.2 kW</span>
                </div>
              </div>

              <Link href="/roi" className="mt-6 w-full">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition shadow-lg">
                  Calculate PM Surya Ghar Subsidy →
                </button>
              </Link>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}