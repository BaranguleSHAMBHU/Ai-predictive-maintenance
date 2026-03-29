import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070B14] text-slate-300 font-sans selection:bg-cyan-500/30">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-[#070B14]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-[#070B14]">AI</div>
            Predictive<span className="text-cyan-400">Maintenance</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#models" className="hover:text-cyan-400 transition-colors">AI Models</a>
            <a href="#alerts" className="hover:text-cyan-400 transition-colors">Alert System</a>
          </div>
          <Link href="/dashboard" className="bg-cyan-500 hover:bg-cyan-400 text-[#070B14] px-6 py-2 rounded-full font-semibold transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            AI-Driven <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Predictive Maintenance
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            Transition from reactive to proactive maintenance. Our AI-driven platform tracks service intervals, forecasts expected lifespans, and prevents catastrophic industrial equipment failures before they happen.
          </p>
          <div className="flex gap-4">
            <Link href="/register" className="bg-cyan-500 hover:bg-cyan-400 text-[#070B14] px-8 py-3 rounded-lg font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              Get Started
            </Link>
            <a href="#features" className="border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 px-8 py-3 rounded-lg font-bold transition-all bg-cyan-500/5 hover:bg-cyan-500/10">
              Learn More
            </a>
          </div>
          <div className="flex gap-12 pt-8 border-t border-white/5">
            <div>
              <div className="text-3xl font-bold text-white">3</div>
              <div className="text-sm text-slate-500">Alert Levels</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-slate-500">Automated Tracking</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-slate-500">Monitoring</div>
            </div>
          </div>
        </div>
        
        {/* Hero Graphic / Abstract Element */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full"></div>
          <div className="relative w-full aspect-square max-w-md mx-auto border border-cyan-500/20 rounded-full flex items-center justify-center p-8 bg-gradient-to-b from-white/5 to-transparent">
            <div className="w-full h-full border border-cyan-400/30 rounded-full animate-spin-slow flex items-center justify-center border-dashed">
                <div className="w-1/2 h-1/2 bg-cyan-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#0A0E1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-2">System Objectives</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">Automated Industrial Health</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Predict Failures", desc: "Forecasts potential breakdowns based on manufacturing and lifespan data before they occur." },
              { title: "Minimize Downtime", desc: "Reduces unplanned halts and cuts down on emergency repair expenses." },
              { title: "Optimize Schedules", desc: "Customizes maintenance timings based on actual equipment lifespan rather than guesswork." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#0F1523] border border-white/5 hover:border-cyan-500/30 transition-all group">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-all">
                  <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithms Section */}
      <section id="models" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-2">Core Intelligence</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">Machine Learning Models</h3>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">Our system leverages advanced AI algorithms to predict the Remaining Useful Life (RUL) of components.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0F1523] to-[#070B14] border border-white/5">
            <h4 className="text-2xl font-bold text-white mb-2">LSTM</h4>
            <p className="text-slate-400 mb-4 text-sm">Long Short-Term Memory Neural Networks</p>
            <p className="text-slate-300 leading-relaxed">Capable of learning long-term dependencies in time series data. Used to predict RUL based on historical usage data.</p>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0F1523] to-[#070B14] border border-white/5">
            <h4 className="text-2xl font-bold text-white mb-2">Random Forest</h4>
            <p className="text-slate-400 mb-4 text-sm">Ensemble Learning Algorithm</p>
            <p className="text-slate-300 leading-relaxed">Builds multiple decision trees and merges their outputs. Highly effective for regression tasks and robust against overfitting.</p>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0F1523] to-[#070B14] border border-white/5">
            <h4 className="text-2xl font-bold text-white mb-2">XGBoost</h4>
            <p className="text-slate-400 mb-4 text-sm">Extreme Gradient Boosting</p>
            <p className="text-slate-300 leading-relaxed">A powerful implementation of gradient-boosted decision trees designed for speed, performance, and accurate predictions.</p>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0F1523] to-[#070B14] border border-white/5 border-l-cyan-500">
            <h4 className="text-2xl font-bold text-white mb-2">Rule-Based Classification</h4>
            <p className="text-slate-400 mb-4 text-sm">Notification Engine</p>
            <p className="text-slate-300 leading-relaxed">Classifies component health status into Green, Yellow, and Red zones based on the AI-predicted days remaining.</p>
          </div>
        </div>
      </section>

      {/* Alert System Section */}
      <section id="alerts" className="py-24 bg-[#0A0E1A]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-2">Monitoring</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">Intelligent Alert System</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-6 p-6 rounded-xl bg-[#0F1523] border border-emerald-500/20">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                <div className="w-6 h-6 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Green Status</h4>
                <p className="text-slate-400">Safe Zone. More than 25 days remaining before maintenance is required.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 p-6 rounded-xl bg-[#0F1523] border border-amber-500/20">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                <div className="w-6 h-6 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Yellow Status</h4>
                <p className="text-slate-400">Warning. Between 10 and 24 days remaining. Plan maintenance soon.</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 rounded-xl bg-[#0F1523] border border-rose-500/20">
              <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0">
                <div className="w-6 h-6 rounded-full bg-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.5)]"></div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Red Status</h4>
                <p className="text-slate-400">Critical. Less than 10 days remaining. Immediate maintenance required.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center text-slate-500 text-sm bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center text-[#070B14] font-bold text-xs">AI</div>
            <span className="text-slate-300">Predictive Maintenance</span>
          </div>
          <p>© 2026 Mentor: Dr. Subhash G. Rathod. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}