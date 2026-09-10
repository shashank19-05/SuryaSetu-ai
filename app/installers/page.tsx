import Link from 'next/link';

const vendors = [
  { name: 'EcoSolar Solutions', rating: '4.8 ⭐', distance: '2.5 km', phone: '+91 98765 43210' },
  { name: 'SunPower Tech', rating: '4.9 ⭐', distance: '4.1 km', phone: '+91 91234 56789' },
  { name: 'GreenEnergy Installers', rating: '4.6 ⭐', distance: '5.0 km', phone: '+91 99887 76655' },
];

export default function Installers() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Verified Installers Near You 🔧</h1>
          <Link href="/dashboard"><button className="text-orange-500 font-semibold">← Dashboard</button></Link>
        </div>
        <div className="grid gap-4">
          {vendors.map((vendor, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{vendor.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{vendor.rating} • {vendor.distance} away</p>
              </div>
              <button className="bg-orange-100 text-orange-600 font-bold px-6 py-2 rounded-lg hover:bg-orange-200 transition">
                Contact: {vendor.phone}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}