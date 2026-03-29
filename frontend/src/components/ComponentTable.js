export default function ComponentTable({ components, refreshData }) {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Green': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]';
      case 'Yellow': return 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]';
      case 'Red': return 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_10px_rgba(225,29,72,0.1)]';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const handleResolve = async (id) => {
    if (!confirm("Confirm maintenance completion? This will reset the tracking cycle.")) return;
    
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/components/resolve/${id}`, {
      method: 'PUT',
    });
    
    refreshData(); // Refresh the table to see it turn Green!
  };

  return (
    <div className="bg-[#0F1523] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="p-5 font-semibold text-slate-300 whitespace-nowrap">Component Name</th>
              <th className="p-5 font-semibold text-slate-300 whitespace-nowrap">Start of Use</th>
              <th className="p-5 font-semibold text-slate-300 whitespace-nowrap">Next Maintenance</th>
              <th className="p-5 font-semibold text-slate-300 whitespace-nowrap">Health Status</th>
              {/* NEW HEADER */}
              <th className="p-5 font-semibold text-slate-300 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {components?.length > 0 ? (
              components.map((comp) => (
                <tr key={comp._id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-5 font-medium text-white">{comp.name}</td>
                  <td className="p-5 text-slate-400">{new Date(comp.startUseDate).toLocaleDateString()}</td>
                  <td className="p-5 font-medium text-cyan-400">
                    {comp.predictedMaintenanceDate ? new Date(comp.predictedMaintenanceDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center w-max gap-2 ${getStatusStyles(comp.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${comp.status === 'Green' ? 'bg-emerald-400' : comp.status === 'Yellow' ? 'bg-amber-400' : 'bg-rose-400'}`}></span>
                      {comp.status}
                    </span>
                  </td>
                  {/* NEW ACTIONS COLUMN */}
                  <td className="p-5 text-right">
                    {(comp.status === 'Red' || comp.status === 'Yellow') ? (
                      <button 
                        onClick={() => handleResolve(comp._id)}
                        className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                        Resolve ✓
                      </button>
                    ) : (
                      <span className="text-emerald-500/50 text-sm font-medium pr-4">Optimized</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-16 text-center text-slate-500">
                  <p>No components found. Click "Add Component" to initialize tracking.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}