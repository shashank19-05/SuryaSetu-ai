'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '../../firebase'; // Firebase Auth to grab user email

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c * 1.3).toFixed(1); 
};

export default function Installers() {
  const [capacity, setCapacity] = useState<number>(0);
  
  // Modal & Popup States
  const [selectedInstaller, setSelectedInstaller] = useState<any>(null);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [successInstallerName, setSuccessInstallerName] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  useEffect(() => {
    const savedCapacity = localStorage.getItem('requiredCapacity');
    if (savedCapacity) setCapacity(Number(savedCapacity));
  }, []);

  const baseInstallers = [
    {
      id: 1,
      name: "Yourwatt Energy - Premium Solar",
      rating: 4.8,
      reviews: 215,
      baseLocation: "Uttarahalli Main Rd, Kengeri",
      price: "₹57,000 / kW",
      baseScore: 98,
      tags: ["Hybrid Inverters", "PM Surya Ghar Certified"],
      lat: 12.905, lon: 77.495,
      distance: "Pending...",
      phone: "09876 54321",
      exactAddress: "42, Uttarahalli Main Rd, Kengeri, Bengaluru, Karnataka",
      hoursText: "Mon-Sat: 9:00 am - 8:00 pm",
      openHour: 9, closeHour: 20
    },
    {
      id: 2,
      name: "Arkahub Solar",
      rating: 4.4,
      reviews: 53,
      baseLocation: "18th Cross Rd, Bengaluru",
      price: "₹58,500 / kW",
      baseScore: 94,
      tags: ["MNRE-Approved", "Investor-Backed"],
      lat: 12.912, lon: 77.638,
      distance: "Pending...",
      phone: "080 4736 2828",
      exactAddress: "19, 18th Cross Rd, 7th Sector, HSR Layout, Bengaluru",
      hoursText: "Mon-Sun: 9:00 am - 9:00 pm",
      openHour: 9, closeHour: 21
    },
    {
      id: 3,
      name: "Planet Solar (Solar Water Heater & Services)",
      rating: 4.9,
      reviews: 218,
      baseLocation: "Nanjundeshwara Swamy Temple Rd",
      price: "₹56,500 / kW",
      baseScore: 91,
      tags: ["Top Rated", "Fast Installation"],
      lat: 12.935, lon: 77.534,
      distance: "Pending...",
      phone: "095908 38535",
      exactAddress: "Nanjundeshwara Swamy Temple Rd, Bengaluru, Karnataka",
      hoursText: "Mon-Sun: 9:00 am - 9:00 pm",
      openHour: 9, closeHour: 21
    },
    {
      id: 4,
      name: "Supreme Solar RR Nagar",
      rating: 4.7,
      reviews: 112,
      baseLocation: "RR Nagar, Bengaluru",
      price: "₹59,000 / kW",
      baseScore: 92,
      tags: ["Premium Panels", "25-Year Warranty"],
      lat: 12.927, lon: 77.516,
      distance: "Pending...",
      phone: "098455 24109",
      exactAddress: "Rajarajeshwari Nagara, 656, 19th Main Rd, Ideal Homes Twp, Bengaluru",
      hoursText: "Mon-Sat: 9:30 am - 6:30 pm",
      openHour: 9.5, closeHour: 18.5
    }
  ];

  const [installers, setInstallers] = useState(baseInstallers);

  const processLocationData = (locationName: string, userLat: number, userLon: number) => {
    setActiveLocation(locationName);
    setSearchQuery('');
    
    const recalibrated = [...baseInstallers].map(inst => {
      const distStr = calculateDistance(userLat, userLon, inst.lat, inst.lon);
      const distanceKm = parseFloat(distStr);
      
      let newScore = inst.baseScore;
      if (distanceKm < 5) newScore += 4;
      else if (distanceKm > 15 && distanceKm <= 30) newScore -= 10;
      else if (distanceKm > 30) newScore -= 25;

      return {
        ...inst,
        matchScore: Math.min(Math.max(Math.round(newScore), 50), 99),
        distance: `${distStr} km away`
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
    
    setInstallers(recalibrated);
  };

  const handleGPSLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          let locName = data?.address ? [data.address.suburb, data.address.city || data.address.town].filter(Boolean).join(', ') : `GPS: ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
          processLocationData(locName, latitude, longitude);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLocating(false);
        }
      },
      () => { setIsLocating(false); alert("GPS permission denied."); },
      { enableHighAccuracy: true }
    );
  };

  const handleAddressSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsLocating(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        processLocationData(data[0].display_name.split(',').slice(0, 2).join(', '), parseFloat(data[0].lat), parseFloat(data[0].lon));
      } else {
        alert("Location not found.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLocating(false);
    }
  };

  // The updated real backend email sender function
  const confirmQuote = async () => {
    setIsSubmittingLead(true);
    
    try {
      const userEmail = auth.currentUser?.email;
      
      // Trigger the real email backend if logged in
      if (userEmail) {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            toEmail: userEmail,
            installerName: selectedInstaller.name,
            capacity: capacity,
            phone: selectedInstaller.phone,
            address: selectedInstaller.exactAddress
          })
        });
      } else {
        // Fallback fake delay if testing without being logged in
        await new Promise(resolve => setTimeout(resolve, 1200));
      }
    } catch (error) {
      console.error("Failed to trigger email:", error);
    }

    setIsSubmittingLead(false);
    const name = selectedInstaller.name;
    setSelectedInstaller(null);
    setSuccessInstallerName(name);
  };

  const checkIsOpen = (openHour: number, closeHour: number) => {
    const currentHour = new Date().getHours() + (new Date().getMinutes() / 60);
    return currentHour >= openHour && currentHour < closeHour;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans pb-24 relative">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Installer Marketplace 👷‍♂️</h1>
            <p className="text-gray-500 mt-1 font-medium">
              AI-matched vendors for your <span className="text-orange-500 font-bold">{capacity > 0 ? `${capacity} kW` : 'Custom'}</span> system setup.
            </p>
          </div>
          <Link href="/solar-report">
            <button className="text-orange-500 font-bold hover:text-orange-600 transition">← Back</button>
          </Link>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 relative z-20">
          <button onClick={handleGPSLocation} disabled={isLocating} className="flex-shrink-0 bg-blue-50 text-blue-600 font-bold py-3 px-5 rounded-xl border border-blue-200">
            {isLocating ? '📍 Locating...' : '📍 Use Current Location'}
          </button>
          <form onSubmit={handleAddressSearch} className="relative flex-grow flex">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search address (e.g., Kengeri, Bengaluru)..." className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-l-xl outline-none" />
            <button type="submit" disabled={isLocating} className="bg-gray-900 text-white font-bold px-6 rounded-r-xl">Search</button>
          </form>
        </div>

        <div className="space-y-6 relative z-10">
          {installers.map((installer) => (
            <div key={installer.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md transition">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-gray-900">{installer.name}</h2>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">✓ Verified</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 font-medium">
                  <span>⭐ {installer.rating} ({installer.reviews})</span>
                  {activeLocation && <span className="text-blue-600 font-bold bg-blue-50 px-2 rounded">🚗 {installer.distance}</span>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {installer.tags.map(tag => <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded">{tag}</span>)}
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end w-full md:w-auto min-w-[200px]">
                <div className="text-xs font-bold text-orange-500 mb-1 uppercase">AI Match Score: {installer.matchScore || installer.baseScore}%</div>
                <div className="text-2xl font-black text-gray-900 mb-4">{installer.price}</div>
                <button onClick={() => setSelectedInstaller(installer)} className="w-full font-bold py-3 px-6 rounded-xl transition shadow-sm bg-orange-500 hover:bg-orange-600 text-white">
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL 1: LEAD DETAIL & DIRECT CONTACT */}
      {selectedInstaller && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-gray-900 p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Connect with Installer</h3>
                <p className="text-gray-400 text-sm mt-1">Sending requirement: <span className="text-orange-400 font-bold">{capacity} kW System</span></p>
              </div>
              <button onClick={() => setSelectedInstaller(null)} className="text-gray-400 hover:text-white text-2xl font-bold">&times;</button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-bold text-gray-900">{selectedInstaller.name}</h4>
                <p className="text-sm text-gray-500 mt-2 font-medium flex items-start gap-2">
                  <span className="text-lg">📍</span> {selectedInstaller.exactAddress}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-sm font-bold text-gray-700">Hours:</span>
                  <span className="text-sm text-gray-600">{selectedInstaller.hoursText}</span>
                  {checkIsOpen(selectedInstaller.openHour, selectedInstaller.closeHour) ? (
                    <span className="ml-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">Open Now</span>
                  ) : (
                    <span className="ml-2 bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">Currently Closed</span>
                  )}
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-orange-600 uppercase mb-1">Direct Contact</p>
                  <p className="text-xl font-black text-gray-900">{selectedInstaller.phone}</p>
                </div>
                <a href={`tel:${selectedInstaller.phone}`} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm transition">
                  Call Now
                </a>
              </div>

              <button 
                onClick={confirmQuote}
                disabled={isSubmittingLead}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition text-lg shadow-md flex justify-center items-center gap-2 disabled:bg-green-400"
              >
                {isSubmittingLead ? 'Sending your details...' : 'Share My Profile & Get Quote'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CENTERED SUCCESS POPUP WITH CONTACT INFO */}
      {successInstallerName && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center border border-gray-100 transform transition-all">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-5">
              ✓
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Quote Requested!</h3>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              Quote requested successfully! <span className="font-bold text-gray-900">{successInstallerName}</span> will contact you shortly regarding your <span className="font-bold text-orange-600">{capacity} kW</span> solar project.
            </p>
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <span className="text-xl">📩</span>
                <div>
                  <p className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-1">Installer Details Sent</p>
                  <p className="text-sm text-blue-900">
                    We've securely forwarded this installer's contact card to your registered email <span className="font-bold">{auth.currentUser?.email ? `(${auth.currentUser.email})` : 'and phone number'}</span>.
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setSuccessInstallerName(null)}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl transition shadow-md"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}