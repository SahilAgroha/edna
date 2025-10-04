import React from 'react';

const Navbar = ({ toggleDrawer }) => {
  return (
    // Header with a fixed position and z-index to stay on top
    <div className="bg-transparent backdrop-blur-sm border-b border-white/10 p-4 flex items-center justify-between sticky top-0 z-50">
      {/* Mobile menu toggle */}
      <button
        onClick={toggleDrawer}
        className="lg:hidden p-2 rounded-md text-white hover:bg-white/10"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>

      {/* Animated Logo */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          {/* Orbital rings around logo */}
          <div className="absolute inset-0 rounded-2xl border border-cyan-400/30 animate-ping"></div>
          <div className="absolute inset-0 rounded-2xl border border-blue-400/20 animate-pulse"></div>
        </div>
        <div>
          <h1 className="text-white text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            E-dna
          </h1>
          <p className="text-cyan-300 text-xs uppercase tracking-widest font-semibold">AI/ML Platform</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;