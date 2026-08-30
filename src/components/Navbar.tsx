import React from 'react';
import { Shield, FileCheck, History, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

interface NavbarProps {
  currentTab: 'dashboard' | 'verify' | 'history' | 'result';
  setCurrentTab: (tab: 'dashboard' | 'verify' | 'history' | 'result') => void;
  onLoadDemo: (demoId: 'demo1' | 'demo2' | 'demo3') => void;
  geminiConnected?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onLoadDemo,
  geminiConnected = true,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0f172a] text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div 
          className="flex cursor-pointer items-center space-x-3" 
          onClick={() => setCurrentTab('dashboard')}
          id="brand-logo"
        >
          <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center shadow-md shadow-emerald-500/20">
            <div className="w-4 h-4 border-2 border-white rounded-xs rotate-45 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">VerDoc <span className="text-emerald-400 font-light">AI</span></span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-1 sm:space-x-6 text-sm font-medium">
          <button
            id="nav-dashboard-btn"
            onClick={() => setCurrentTab('dashboard')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              currentTab === 'dashboard'
                ? 'text-white font-semibold bg-slate-800/80 border border-slate-700/80 shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Dashboard
          </button>

          <button
            id="nav-verify-btn"
            onClick={() => setCurrentTab('verify')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              currentTab === 'verify'
                ? 'text-white font-semibold bg-emerald-600 shadow-sm shadow-emerald-600/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <FileCheck className="h-4 w-4" />
            <span>Verify Document</span>
          </button>

          <button
            id="nav-history-btn"
            onClick={() => setCurrentTab('history')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              currentTab === 'history'
                ? 'text-white font-semibold bg-slate-800/80 border border-slate-700/80 shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <History className="h-4 w-4" />
            <span>History</span>
          </button>
        </nav>

        {/* Right Section: Demo Menu & Agent Status */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Demo Dropdown */}
          <div className="relative group">
            <button
              id="demo-mode-menu-btn"
              className="flex items-center space-x-1.5 rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden sm:inline">Demos</span>
            </button>

            <div className="invisible group-hover:visible group-focus-within:visible opacity-0 group-hover:opacity-100 transition-all duration-150 absolute right-0 mt-1 w-64 rounded-xl border border-slate-700 bg-[#1e293b] p-2 shadow-2xl z-50 text-slate-200">
              <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Preset Evaluation Cases
              </div>
              <button
                onClick={() => onLoadDemo('demo1')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700/60 text-xs text-slate-200 flex items-center justify-between group/item cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-emerald-400">Demo 1: Genuine Passport</div>
                  <div className="text-[10px] text-slate-400">Low Risk (Score 12/100)</div>
                </div>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </button>

              <button
                onClick={() => onLoadDemo('demo2')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700/60 text-xs text-slate-200 flex items-center justify-between group/item cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-rose-400">Demo 2: Tampered Marksheet</div>
                  <div className="text-[10px] text-slate-400">High Risk (Score 87/100)</div>
                </div>
                <AlertTriangle className="h-4 w-4 text-rose-400" />
              </button>

              <button
                onClick={() => onLoadDemo('demo3')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700/60 text-xs text-slate-200 flex items-center justify-between group/item cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-emerald-400">Demo 3: Conferred Degree</div>
                  <div className="text-[10px] text-slate-400">Low Risk (Score 14/100)</div>
                </div>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </button>
            </div>
          </div>

          {/* Sleek Agent Status & Avatar */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-slate-200 leading-tight">Agent_742</p>
              <p className="text-[10px] text-emerald-400 font-medium leading-tight flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
                <span>System Online</span>
              </p>
            </div>
            <div className="w-9 h-9 bg-slate-700 rounded-full border border-slate-600 flex items-center justify-center font-bold text-xs text-emerald-400 shadow-inner">
              742
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
