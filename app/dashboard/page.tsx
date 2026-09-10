import Link from 'next/link'

const cards = [
  { icon: '📋', title: 'Start Assessment', desc: 'Tell us about your home', href: '/assessment', color: 'bg-blue-50 border-blue-200' },
  { icon: '☀️', title: 'Solar Report', desc: 'See your solar potential', href: '/solar-report', color: 'bg-yellow-50 border-yellow-200' },
  { icon: '💰', title: 'ROI Calculator', desc: 'Calculate your savings', href: '/roi', color: 'bg-green-50 border-green-200' },
  { icon: '🏛️', title: 'Subsidy Info', desc: 'Check government schemes', href: '/subsidy', color: 'bg-purple-50 border-purple-200' },
  { icon: '🔧', title: 'Find Installers', desc: 'Verified vendors near you', href: '/installers', color: 'bg-orange-50 border-orange-200' },
  { icon: '📄', title: 'Get Quotation', desc: 'Download your solar quote', href: '/quotation', color: 'bg-pink-50 border-pink-200' },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <div className="font-bold text-orange-500 text-xl">☀️ Surya Setu AI</div>
        <Link href="/login">
          <button className="text-sm text-gray-500 hover:text-red-500">Logout</button>
        </Link>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome back! 👋</h1>
        <p className="text-gray-500 mb-8">What would you like to do today?</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => (
            <Link href={card.href} key={card.title}>
              <div className={`border-2 ${card.color} rounded-2xl p-6 hover:shadow-md transition cursor-pointer`}>
                <div className="text-4xl mb-3">{card.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1">{card.title}</h3>
                <p className="text-sm text-gray-500">{card.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}