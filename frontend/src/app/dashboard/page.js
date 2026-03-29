'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ComponentTable from '@/components/ComponentTable';
import AddComponentModal from '@/components/AddComponentModal';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import Link from 'next/link';

export default function Dashboard() {
  const [components, setComponents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null); // Real user state
  const router = useRouter();

  useEffect(() => {
    // 1. Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login'); // Kick them out if not logged in!
      return;
    }
    
    // 2. Set the real user and fetch their specific components
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchComponents(parsedUser.id);
  }, []);

  const fetchComponents = async (userId) => {
    // Use the dynamic ID
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/components/${userId}`);
    const data = await res.json();
    setComponents(data);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  // Don't render until user is loaded to prevent hydration errors
  if (!user) return null; 

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-300 font-sans selection:bg-cyan-500/30">
      <nav className="border-b border-white/5 bg-[#0F1523]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-[#070B14]">AI</div>
            Predictive<span className="text-cyan-400">Maintenance</span>
          </Link>
          
          {/* Real User Profile Area */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col text-right">
              <span className="text-sm font-bold text-white">{user.email}</span>
              <span className="text-xs text-cyan-400 uppercase tracking-widest">{user.role}</span>
            </div>
            <button onClick={handleLogout} className="text-sm text-slate-400 hover:text-rose-400 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Equipment Dashboard</h1>
            <p className="text-slate-400">Monitor and manage your industrial assets in real-time.</p>
          </div>
          
          {/* REAL RBAC CHECK */}
         
            <button onClick={() => setIsModalOpen(true)} className="bg-cyan-500 hover:bg-cyan-400 text-[#070B14] px-6 py-2.5 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              + Add Component
            </button>
         
        </div>

        <AnalyticsDashboard components={components} />
        
        {/* Pass the real role and dynamic fetch function */}
        <ComponentTable components={components} refreshData={() => fetchComponents(user.id)} userRole={user.role} />
        
        {isModalOpen && (
          <AddComponentModal closeModal={() => setIsModalOpen(false)} refreshData={() => fetchComponents(user.id)} userId={user.id} />
        )}
      </div>
    </div>
  );
}