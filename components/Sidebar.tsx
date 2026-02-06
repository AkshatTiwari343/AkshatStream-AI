
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: AppView.HOME, label: 'Home', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { id: AppView.EXPLORE, label: 'Explore', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )},
    { id: AppView.LIBRARY, label: 'Library', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    )},
    { id: AppView.STUDIO, label: 'AI Studio', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ), highlight: true },
  ];

  return (
    <aside className="hidden md:flex w-64 bg-slate-950/40 backdrop-blur-sm border-r border-slate-800 flex-col pt-4">
      <nav className="flex-1 space-y-1 px-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
              currentView === item.id 
                ? 'bg-indigo-600/10 text-indigo-400 font-semibold' 
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <span className={`${currentView === item.id ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
              {item.icon}
            </span>
            <span className="text-sm">{item.label}</span>
            {item.highlight && (
              <span className="ml-auto px-1.5 py-0.5 rounded bg-indigo-500 text-[10px] text-white font-bold uppercase tracking-wider">New</span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-xl p-4 shadow-xl">
          <h4 className="text-xs font-bold text-indigo-300 uppercase mb-2">Pro Access</h4>
          <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">Get unlimited Veo 3.1 generations and 4K edge streaming.</p>
          <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold rounded-lg transition-colors shadow-lg shadow-indigo-600/20">Upgrade Now</button>
        </div>

        <div className="px-2 py-3 border-t border-slate-800">
           <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Edge Status</span>
              <span className="text-[10px] text-emerald-500 font-bold">100% UP</span>
           </div>
           <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="w-full h-full bg-emerald-500/50"></div>
           </div>
           <p className="text-[9px] text-slate-600 mt-2">v3.1.2-stable-release</p>
        </div>
      </div>
    </aside>
  );
};
