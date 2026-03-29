import { useState } from 'react';

export default function AddComponentModal({ closeModal, refreshData, userId }) {
  // Added expectedLifespanDays to our state (defaulting to 365)
  const [formData, setFormData] = useState({
    name: '',
    manufactureDate: '',
    startUseDate: '',
    expectedLifespanDays: 365 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/components/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, userId })
    });
    refreshData();
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-[#070B14]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#0F1523] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Add Component</h2>
          <button onClick={closeModal} className="text-slate-500 hover:text-white transition-colors text-xl">✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Component Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Heavy Duty Engine"
              className="w-full bg-[#070B14] border border-white/10 rounded-lg p-2.5 text-white placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Mfg Date</label>
              <input 
                type="date" 
                required
                className="w-full bg-[#070B14] border border-white/10 rounded-lg p-2.5 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all [color-scheme:dark]"
                onChange={(e) => setFormData({...formData, manufactureDate: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Start of Use</label>
              <input 
                type="date" 
                required
                className="w-full bg-[#070B14] border border-white/10 rounded-lg p-2.5 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all [color-scheme:dark]"
                onChange={(e) => setFormData({...formData, startUseDate: e.target.value})} 
              />
            </div>
          </div>
          
          {/* NEW FIELD: Maintenance Interval Input */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Maintenance Interval (Days)</label>
            <input 
              type="number" 
              min="1"
              required
              value={formData.expectedLifespanDays}
              className="w-full bg-[#070B14] border border-white/10 rounded-lg p-2.5 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
              onChange={(e) => setFormData({...formData, expectedLifespanDays: parseInt(e.target.value) || 0})} 
            />
          </div>

          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-white/5">
            <button 
              type="button" 
              onClick={closeModal} 
              className="px-5 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors font-medium">
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2.5 bg-cyan-500 text-[#070B14] font-bold rounded-lg hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
              Initialize Tracker
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}