'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (email && password) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">☀️</div>
          <h1 className="text-2xl font-bold text-orange-600">Surya Setu AI</h1>
          <p className="text-gray-500 text-sm mt-1">Smart Solar for Every Indian Home</p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-md text-sm font-medium ${isLogin ? 'bg-white shadow text-orange-600' : 'text-gray-500'}`}>
            Login
          </button>
          <button onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-md text-sm font-medium ${!isLogin ? 'bg-white shadow text-orange-600' : 'text-gray-500'}`}>
            Sign Up
          </button>
        </div>
        {!isLogin && (
          <input type="text" placeholder="Full Name"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3 text-sm focus:outline-none focus:border-orange-400" />
        )}
        <input type="email" placeholder="Email Address" value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3 text-sm focus:outline-none focus:border-orange-400" />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-6 text-sm focus:outline-none focus:border-orange-400" />
        <button onClick={handleSubmit}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition">
          {isLogin ? 'Login' : 'Create Account'}
        </button>
      </div>
    </div>
  )
}