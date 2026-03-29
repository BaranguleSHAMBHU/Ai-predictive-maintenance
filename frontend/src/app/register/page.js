'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Technician'); // Default to Technician
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess('Registration successful! Redirecting to login...');
      // Wait 2 seconds so they can read the success message, then send to login
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center p-4 selection:bg-cyan-500/30">
      <div className="bg-[#0F1523] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-cyan-500 rounded-xl mx-auto flex items-center justify-center text-[#070B14] font-bold text-xl mb-4 shadow-[0_0_15px_rgba(6,182,212,0.5)]">AI</div>
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-slate-400 mt-2">Join the Predictive Maintenance Platform</p>
        </div>

        {error && <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-lg mb-6 text-sm text-center">{error}</div>}
        {success && <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-lg mb-6 text-sm text-center">{success}</div>}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
            <input 
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="technician@factory.com"
              className="w-full bg-[#070B14] border border-white/10 rounded-lg p-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
            <input 
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#070B14] border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Account Role</label>
            <select 
              value={role} onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#070B14] border border-white/10 text-white rounded-lg p-3 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all cursor-pointer appearance-none"
            >
              <option value="Technician">Technician (Resolve Maintenance Only)</option>
              <option value="Admin">Admin (Full Equipment Control)</option>
            </select>
          </div>

          <button type="submit" className="w-full py-3 bg-cyan-500 text-[#070B14] font-bold rounded-lg hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all mt-4">
            Register Account
          </button>
        </form>
        
        <p className="text-center text-slate-500 text-sm mt-6">
          Already have an account? <Link href="/login" className="text-cyan-400 hover:underline">Log in here</Link>
        </p>
      </div>
    </div>
  );
}