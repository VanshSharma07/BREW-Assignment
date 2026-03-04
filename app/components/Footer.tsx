import React from "react";

export default function Footer() {
  return (
    <footer className="w-full mt-16 md:mt-24 py-6 md:py-8 px-2 md:px-4 border-t border-[#242424] bg-gradient-to-b from-transparent to-[#0B0B0C]/80 text-center">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 text-[#B3B3B3] text-xs md:text-sm" style={{fontFamily: 'var(--font-inter)'}}>
        <span style={{fontFamily: 'var(--font-playfair)', color: '#F4C542', fontWeight: 700}}>
          &copy; {new Date().getFullYear()} BREW CineAI Explorer. All rights reserved.
        </span>
        <span>
          Developed by <a href="https://www.linkedin.com/in/vansh-bargotra-895371261/" target="_blank" rel="noopener" className="underline hover:text-[#F4C542]">Vansh Bargotra</a> |
          <a href="https://github.com/VanshSharma07" target="_blank" rel="noopener" className="underline hover:text-[#F4C542] ml-1">GitHub</a>
        </span>
      </div>
    </footer>
  );
}