'use client';
import { useState } from 'react';
import { auth } from '../../firebase'; // Adjust path to your firebase config if needed
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Instantly redirect to the dashboard upon successful login
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-sans selection:bg-orange-200">
      <Link href="/">
        <div className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2 mb-8 hover:opacity-80 transition cursor-pointer">
          <span className="text-4xl">☀️</span> Surya Setu <span className="text-orange-500">AI</span>
        </div>
      </Link>

      <div className="bg-white max-w-md w-full rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-sm mb-8">Sign in to view your personalized solar reports and government subsidy details.</p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 font-semibold">
            {error}
          </div>
        )}

        <button 
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-white border-2 border-gray-200 text-gray-800 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isLoading ? (
            <span className="animate-pulse">Connecting securely...</span>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </>
          )}
        </button>
      </div>
    </div>
  );
}