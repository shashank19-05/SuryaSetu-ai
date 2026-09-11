'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Profile() {
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [savedReport, setSavedReport] = useState<{bill: number, area: number} | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({ 
          name: currentUser.email?.split('@')[0] || 'Solar User', 
          email: currentUser.email || '' 
        });

        // Pull the user's specific assessment from Firestore
        const q = query(collection(db, 'assessments'), where("uid", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setSavedReport({ bill: data.bill, area: data.area });
        }
      } else {
        router.push('/login'); // Kick them out if not logged in
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Profile 👤</h1>
          <Link href="/dashboard"><button className="text-orange-500 font-semibold hover:text-orange-700 transition">← Back to Dashboard</button></Link>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-3xl font-bold uppercase">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 capitalize">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-100 bg-gray-50 p-4 rounded-xl">
              <div className="text-sm text-gray-500 mb-1">Account Status</div>
              <div className="font-semibold text-green-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Verified
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4">Saved Cloud Assessments</h3>
        {savedReport ? (
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex justify-between items-center hover:shadow-md transition">
            <div>
              <p className="font-bold text-gray-800 text-lg">Home Rooftop Solar</p>
              <p className="text-gray-500">Bill: ₹{savedReport.bill} | Area: {savedReport.area} sq.ft</p>
            </div>
            <Link href="/solar-report">
              <button className="bg-orange-50 text-orange-600 px-6 py-2 rounded-lg font-bold hover:bg-orange-100 transition">
                View Report
              </button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 text-center text-gray-500">
            No assessments saved yet. Head to the dashboard to start one!
          </div>
        )}
      </div>
    </div>
  );
}