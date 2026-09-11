'use client';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase'; // Adjust path to your firebase config
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AssessmentData {
  id: string;
  address: string;
  bill: number;
  area: number;
  timestamp: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [assessments, setAssessments] = useState<AssessmentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push('/login');
        return;
      }
      
      setUser(currentUser);
      
      try {
        // Fetch real history from Firebase for the logged-in user
        const q = query(
          collection(db, 'assessments'), 
          where('uid', '==', currentUser.uid)
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedData: AssessmentData[] = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({ id: doc.id, ...doc.data() } as AssessmentData);
        });
        
        // Sort newest first on the client side to avoid needing complex Firestore indexes for a hackathon
        fetchedData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setAssessments(fetchedData);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-pulse text-orange-500 font-bold text-xl">Loading Dashboard...</div></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <Link href="/">
          <div className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2 cursor-pointer">
            <span>☀️</span> Surya Setu <span className="text-orange-500">AI</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-600 hidden md:block">
            {user?.email}
          </span>
          <button onClick={handleLogout} className="text-sm font-bold text-red-500 hover:text-red-700 transition bg-red-50 px-4 py-2 rounded-lg">
            Log Out
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome, {user?.displayName?.split(' ')[0] || 'User'}! 👋</h1>
            <p className="text-gray-500">Manage your solar assessments and track your PM Surya Ghar applications.</p>
          </div>
          <Link href="/assessment">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2">
              <span>+</span> New Roof Assessment
            </button>
          </Link>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Assessments</h2>
        
        {assessments.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">No Assessments Yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">You haven't scanned any roofs or uploaded any electricity bills yet. Start your first scan to see your custom solar ROI.</p>
            <Link href="/assessment">
              <button className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl shadow-md transition">
                Start My First Scan
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessments.map((data) => (
              <div key={data.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition group">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                    {new Date(data.timestamp).toLocaleDateString('en-IN')}
                  </div>
                  <span className="text-2xl opacity-50 group-hover:opacity-100 transition">⚡</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1 truncate" title={data.address}>{data.address}</h3>
                <div className="text-sm text-gray-500 mb-6 flex gap-4">
                  <span>Bill: ₹{data.bill}</span>
                  <span>Roof: {data.area} sq.ft</span>
                </div>
                <Link href="/solar-report">
                  <button className="w-full bg-orange-50 text-orange-600 hover:bg-orange-100 font-bold py-2.5 rounded-lg transition border border-orange-200">
                    View Full Report
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}