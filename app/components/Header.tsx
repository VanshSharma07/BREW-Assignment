import React from "react";

export default function Header() {
  return (
    <header className="max-w-4xl mx-auto mt-4 md:mt-8 mb-8 md:mb-16 px-2 md:px-8 py-4 md:py-6 card flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-[#151515] border border-[#242424]" style={{boxShadow: '0 2px 16px rgba(0,0,0,0.18)'}}>
      <div className="flex items-center gap-3 md:gap-4 flex-1 w-full">
        <div className="p-2 rounded-lg bg-[#232323] flex items-center justify-center">
          {/* Cinematic logo */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="16" stroke="#F4C542" strokeWidth="2" />
            <rect x="11" y="11" width="14" height="14" rx="4" fill="#D4AF37" opacity="0.7" />
            <circle cx="18" cy="18" r="5" fill="#F4C542" opacity="0.8" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight" style={{fontFamily: 'var(--font-playfair)', color: '#F4C542', letterSpacing: '0.02em'}}>BREW CineAI Explorer</h1>
          <span className="block text-[#B3B3B3] text-sm md:text-base font-semibold mt-1" style={{fontFamily: 'var(--font-inter)', letterSpacing: '0.08em'}}>Your personal AI-powered movie dashboard.</span>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2 text-sm font-bold text-[#F4C542] bg-[#232323] px-4 py-2 rounded-lg border border-[#D4AF37]/30 shadow-md" style={{fontFamily: 'var(--font-inter)'}}>
        <span>Powered by GPT-4o</span>
      </div>
    </header>
  );
}