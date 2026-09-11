import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white font-sans selection:bg-orange-200">
      {/* Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
          <span className="text-4xl">☀️</span> Surya Setu <span className="text-orange-500">AI</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <button className="text-gray-600 font-semibold hover:text-gray-900 transition px-4 py-2">
              Log In
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-gray-900 text-white px-6 py-2 rounded-full font-bold hover:bg-gray-800 transition shadow-lg">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-block bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-orange-200 shadow-sm">
          🚀 Built for the PM Surya Ghar Muft Bijli Yojana
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-8">
          Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Solar Potential</span> <br className="hidden md:block" /> in Seconds.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload your electricity bill and let our AI calculate your perfect rooftop solar setup, exact government subsidies, and total ROI. Transitioning to clean energy has never been this easy.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/login">
            <button className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition shadow-xl hover:shadow-orange-200 hover:-translate-y-1 w-full sm:w-auto">
              Start Free Assessment ✨
            </button>
          </Link>
          <button className="bg-white text-gray-800 px-8 py-4 rounded-full font-bold text-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition shadow-sm w-full sm:w-auto">
            View Live Demo
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-left">
            <div className="text-3xl mb-4">📸</div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">Smart Assessment</h3>
            <p className="text-gray-500">Upload your bill and roof photo. We analyze your exact energy needs instantly.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-left">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">Govt Subsidy Logic</h3>
            <p className="text-gray-500">Integrated with real PM Surya Ghar formulas to calculate your ₹78,000 maximum benefit.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-left">
            <div className="text-3xl mb-4">☁️</div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">Cloud Synced</h3>
            <p className="text-gray-500">Securely backed by Firebase. Access your personalized reports from any device.</p>
          </div>
        </div>
      </main>
    </div>
  );
}