import React from "react";

export default function Header() {
  return (
    <header className="max-w-4xl mx-auto mt-10 mb-16 px-8 py-6 card flex items-center gap-6">
      <div className="flex items-center gap-4 flex-1">
        <div className="p-2 rounded-lg bg-[#22D3EE]/20 flex items-center justify-center">
          {/* Minimal logo */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="16" stroke="#22D3EE" strokeWidth="2" />
            <rect x="11" y="11" width="14" height="14" rx="4" fill="#8B5CF6" opacity="0.7" />
            <circle cx="18" cy="18" r="5" fill="#22D3EE" opacity="0.8" />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight" style={{fontFamily: 'var(--font-orbitron)'}}> BREW CineAI Explorer</h1>
          <span className="block text-[#94A3B8] text-base font-semibold mt-1" style={{fontFamily: 'var(--font-inter)'}}>AI-powered Movie Analyzer</span>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2 text-sm font-bold text-[#22D3EE] bg-[#22D3EE]/10 px-4 py-2 rounded-lg border border-[#22D3EE]/30 shadow-md" style={{fontFamily: 'var(--font-inter)'}}>
        <span>Powered by GPT-4o</span>
      </div>
    </header>
  );
}