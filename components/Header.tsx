
import React, { useState } from 'react';
import { AppView } from '../types';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onLogoClick: () => void;
  currentView: AppView;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, onLogoClick, currentView }) => {
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 h-16 flex items-center justify-between px-4 md:px-6">
      {/* Logo Section */}
      {!isMobileSearchVisible && (
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer group flex-shrink-0" 
            onClick={onLogoClick}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-600/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight text-white">AkshatStream <span className="text-indigo-500">AI</span></span>
          </div>
          
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse-live"></span>
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Global CDN Live</span>
          </div>
        </div>
      )}

      {/* Desktop Search Bar / Mobile Overlay Search */}
      <div className={`${isMobileSearchVisible ? 'flex absolute inset-0 bg-slate-950 px-4 items-center z-50' : 'hidden md:flex'} flex-1 max-w-2xl mx-4 md:mx-12`}>
        <div className="relative w-full flex items-center gap-2">
          {isMobileSearchVisible && (
            <button onClick={() => setIsMobileSearchVisible(false)} className="p-2 text-slate-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search cinematic universe..."
              value={searchQuery}
              autoFocus={isMobileSearchVisible}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-full py-2 px-10 md:px-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm placeholder:text-slate-600"
            />
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Actions */}
      {!isMobileSearchVisible && (
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setIsMobileSearchVisible(true)}
            className="md:hidden p-2 hover:bg-slate-800 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="hidden sm:block p-2 hover:bg-slate-800 rounded-full transition-colors relative">
            <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border border-slate-950"></span>
          </button>
          <div className="w-8 h-8 md:w-9 md:h-9 bg-slate-800 rounded-full border border-slate-700 p-0.5 flex items-center justify-center cursor-pointer hover:border-indigo-500 transition-all overflow-hidden flex-shrink-0 ring-2 ring-transparent hover:ring-indigo-500/20">
            <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" className="w-full h-full object-cover rounded-full" />
          </div>
        </div>
      )}
    </header>
  );
};
