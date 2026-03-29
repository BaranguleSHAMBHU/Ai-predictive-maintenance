import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function AnalyticsDashboard({ components }) {
  // Calculate our stats
  const total = components.length;
  const green = components.filter(c => c.status === 'Green').length;
  const yellow = components.filter(c => c.status === 'Yellow').length;
  const red = components.filter(c => c.status === 'Red').length;

  // Data for our Donut Chart
  const data = [
    { name: 'Healthy (Green)', value: green, color: '#10B981' }, // Emerald-500
    { name: 'Warning (Yellow)', value: yellow, color: '#F59E0B' }, // Amber-500
    { name: 'Critical (Red)', value: red, color: '#E11D48' }, // Rose-600
  ];

  return (
    <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Stat Cards Column */}
      <div className="md:col-span-2 grid grid-cols-2 gap-4">
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-center">
          <p className="text-slate-400 text-sm font-medium mb-1">Total Equipment</p>
          <p className="text-4xl font-bold text-white">{total}</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 shadow-[0_0_15px_rgba(16,185,129,0.1)] flex flex-col justify-center">
          <p className="text-emerald-400 text-sm font-medium mb-1">Optimized</p>
          <p className="text-4xl font-bold text-emerald-500">{green}</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 shadow-[0_0_15px_rgba(245,158,11,0.1)] flex flex-col justify-center">
          <p className="text-amber-400 text-sm font-medium mb-1">Attention Needed</p>
          <p className="text-4xl font-bold text-amber-500">{yellow}</p>
        </div>
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 shadow-[0_0_15px_rgba(225,29,72,0.1)] flex flex-col justify-center">
          <p className="text-rose-400 text-sm font-medium mb-1">Critical Action</p>
          <p className="text-4xl font-bold text-rose-500">{red}</p>
        </div>
      </div>

      {/* Chart Column */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center h-64">
        <h3 className="text-slate-300 font-semibold mb-2 w-full text-left">Fleet Health Overview</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#070B14', borderColor: '#1E293B', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}