'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  // Reusable animation settings for smooth scrolling
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-200 overflow-x-hidden">
      
      {/* Hero Section with Background Image */}
      <div className="relative min-h-screen flex flex-col">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-gray-900/70"></div> {/* Dark overlay for text readability */}
        </div>

        {/* Transparent Glass Navigation */}
        <nav className="relative z-10 max-w-7xl w-full mx-auto px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-white/5 border-b border-white/10">
          <div className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span className="text-4xl">☀️</span> Surya Setu <span className="text-orange-500">AI</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <button className="text-gray-200 font-semibold hover:text-white transition px-4 py-2">
                Log In
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition shadow-lg">
                Get Started
              </button>
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-6 pt-12 pb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block bg-white/10 backdrop-blur-md text-orange-400 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-white/20 shadow-sm"
          >
            🚀 Built for the PM Surya Ghar Scheme
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8 max-w-5xl"
          >
            Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Solar Potential</span> <br className="hidden md:block" /> in Seconds.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Upload your electricity bill and let our AI calculate your perfect rooftop solar setup, exact government subsidies, and total ROI.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto"
          >
            <Link href="/login">
              <button className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition shadow-xl w-full sm:w-auto">
                Start Free Assessment ✨
              </button>
            </Link>
          </motion.div>
        </main>
      </div>

      {/* "We're Surya Setu" Split Section (Inspired by Video) */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <h4 className="text-orange-500 font-bold uppercase tracking-wider mb-2">Who We Are</h4>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              We're <br/> SURYA SETU AI
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              India's top solar transition platform. We leverage artificial intelligence to make the switch to clean energy seamless, transparent, and highly profitable for homeowners across the nation.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              With integrated support for the latest government subsidy schemes, achieving a greener tomorrow is now just a click away.
            </p>
            <Link href="/login">
              <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition">
                Discover Our Platform
              </button>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center hover:scale-105 transition duration-700"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=2070&auto=format&fit=crop')" }}
            ></div>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights with Scroll Animations */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Platform Features</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.1 }} className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-left hover:shadow-xl transition">
              <div className="text-4xl mb-6">📸</div>
              <h3 className="font-bold text-2xl text-gray-900 mb-3">Smart Assessment</h3>
              <p className="text-gray-600 leading-relaxed">Upload your bill and roof photo. We analyze your exact energy needs instantly with high precision.</p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.3 }} className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-left hover:shadow-xl transition">
              <div className="text-4xl mb-6">💰</div>
              <h3 className="font-bold text-2xl text-gray-900 mb-3">Govt Subsidy Logic</h3>
              <p className="text-gray-600 leading-relaxed">Integrated with real PM Surya Ghar formulas to calculate your maximum ₹78,000 benefit.</p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.5 }} className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-left hover:shadow-xl transition">
              <div className="text-4xl mb-6">☁️</div>
              <h3 className="font-bold text-2xl text-gray-900 mb-3">Cloud Synced</h3>
              <p className="text-gray-600 leading-relaxed">Securely backed by Firebase. Access your personalized reports and dashboard from any device.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
    </div>
  );
}