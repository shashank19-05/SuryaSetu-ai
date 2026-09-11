'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { db, auth } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Assessment() {
  const [billAmount, setBillAmount] = useState('');
  const [roofArea, setRoofArea] = useState('');
  const [billFile, setBillFile] = useState<File | null>(null);
  
  const [address, setAddress] = useState('');
  const [mapQuery, setMapQuery] = useState('Mysuru, Karnataka, India'); 
  const [isLocating, setIsLocating] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // NEW: Dedicated state for the bill document scanner
  const [isBillScanning, setIsBillScanning] = useState(false);
  
  const router = useRouter();

  const handleLocate = (e: React.FormEvent) => {
    e.preventDefault();
    if (address) setMapQuery(address);
    setScanComplete(false);
    setProgress(0);
  };

  const handleCurrentLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coords = `${latitude},${longitude}`;
        setMapQuery(coords);
        setAddress('Current GPS Location');
        setIsLocating(false);
        setScanComplete(false);
        setProgress(0);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to retrieve your location. Please check browser permissions.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const startScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanComplete(true);
          setRoofArea('880'); 
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // NEW: Handler for the AI Bill Upload animation
  const handleBillUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBillFile(e.target.files[0]);
      setIsBillScanning(true);
      
      // Simulate AI OCR processing time
      setTimeout(() => {
        setIsBillScanning(false);
        // Auto-fill the bill amount for a great demo effect!
        if (!billAmount) setBillAmount('1500'); 
      }, 3000); 
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      localStorage.setItem('solarData', JSON.stringify({ bill: billAmount, area: roofArea }));

      if (auth.currentUser) {
        addDoc(collection(db, 'assessments'), {
          uid: auth.currentUser.uid,
          bill: Number(billAmount),
          area: Number(roofArea),
          address: address || 'Demo Location',
          timestamp: new Date().toISOString()
        }).catch(err => console.error("Firebase background save issue:", err));
      }
      
      router.push('/solar-report');
      
    } catch (error) {
      console.error("Error routing to report:", error);
      router.push('/solar-report');
    } finally {
      setTimeout(() => setIsSubmitting(false), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Site Assessment 📋</h1>
          <Link href="/dashboard">
            <button className="text-orange-500 font-semibold hover:text-orange-700 transition">← Back</button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Step 1: Roof Identification & Scanning</h2>
          <p className="text-gray-500 mb-6 text-sm">Enter your address or use GPS to locate your property via satellite, then run our OpenCV engine to extract the usable roof area.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <form onSubmit={handleLocate} className="flex gap-2">
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g., 123 Main St, Mysuru"
                  className="flex-grow border border-gray-300 rounded-xl p-3 text-gray-900 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button type="submit" className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition">
                  Locate
                </button>
              </form>

              <button 
                onClick={handleCurrentLocation}
                disabled={isLocating}
                className="w-full bg-blue-50 text-blue-600 border border-blue-200 px-4 py-3 rounded-xl font-semibold hover:bg-blue-100 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLocating ? 'Acquiring GPS Signal...' : '📍 Use My Current Location'}
              </button>

              <button 
                onClick={startScan}
                disabled={isScanning || !mapQuery}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-md disabled:bg-blue-300 disabled:cursor-not-allowed mt-4"
              >
                {isScanning ? 'Running OpenCV Extraction...' : '▶ Run AI Roof Scan'}
              </button>

              <div className="bg-black rounded-xl p-4 font-mono text-xs text-green-400 border border-gray-800 h-40 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full p-1.5 bg-gray-800 text-gray-400 font-sans font-bold flex justify-between px-3">
                  <span>OpenCV Process Logs</span>
                </div>
                <div className="mt-6 space-y-1.5 opacity-90">
                  {progress > 5 && <p>{'>'} Fetching Satellite Raster Data...</p>}
                  {progress > 20 && <p>{'>'} Initializing cv2.Canny() edge detection...</p>}
                  {progress > 40 && <p>{'>'} Parsing orientation... Azimuth calculated at 184°.</p>}
                  {progress > 60 && <p>{'>'} Running shadow identification mask...</p>}
                  {progress > 80 && <p>{'>'} Raster operations complete. Calculating area.</p>}
                  {progress >= 100 && <p className="text-blue-400 font-bold">{'>'} SUCCESS: 880 sq.ft extracted.</p>}
                </div>
              </div>
            </div>

            <div className="relative h-64 lg:h-auto min-h-[250px] bg-gray-200 rounded-xl overflow-hidden border-2 border-gray-300">
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=k&z=19&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
              
              {isScanning && (
                <motion.div 
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)] z-20 pointer-events-none"
                />
              )}

              {scanComplete && (
                <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center z-30 pointer-events-none backdrop-blur-[1px]">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white px-4 py-2 rounded-lg font-bold text-blue-600 shadow-xl border-2 border-blue-500 flex items-center gap-2">
                    <span>✅</span> Area Extracted: 880 sq.ft
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleAnalyze} className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Step 2: Energy Requirements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Extracted Roof Area (sq.ft)</label>
              <input 
                type="number" 
                required
                value={roofArea}
                onChange={(e) => setRoofArea(e.target.value)}
                className={`w-full border rounded-xl p-3 text-gray-900 outline-none focus:ring-2 focus:ring-orange-500 transition ${scanComplete ? 'bg-green-50 border-green-400' : 'bg-white border-gray-300'}`}
                placeholder="Scan roof to auto-fill"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Average Monthly Bill (₹)</label>
              <input 
                type="number" 
                required
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-900 bg-white outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g. 1500"
              />
            </div>
          </div>

          {/* NEW AI BILL SCANNER UI INTEGRATED HERE */}
          <div className="mb-8">
            <label 
              className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
                isBillScanning ? 'border-orange-500 bg-orange-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                {isBillScanning ? (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 mb-4 text-orange-500 animate-pulse">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <p className="text-sm text-orange-600 font-semibold animate-pulse">Running AI OCR... Extracting Usage Data</p>
                  </div>
                ) : (
                  <>
                    {billFile ? (
                      <>
                        <span className="text-4xl mb-3">✅</span>
                        <p className="mb-2 text-sm text-green-600 font-bold">Successfully Scanned: {billFile.name}</p>
                        <p className="text-xs text-gray-500">Click to upload a different file</p>
                      </>
                    ) : (
                      <>
                        <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> your latest electricity bill</p>
                        <p className="text-xs text-gray-500">PDF, PNG, or JPG</p>
                      </>
                    )}
                  </>
                )}
              </div>
              <input type="file" className="hidden" onChange={handleBillUpload} accept=".pdf,.png,.jpg,.jpeg" disabled={isBillScanning} />
            </label>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || !roofArea}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition text-lg shadow-md disabled:bg-orange-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving to Cloud...' : 'Calculate PM Surya Ghar Subsidy ✨'}
          </button>
        </form>
      </div>
    </div>
  );
}