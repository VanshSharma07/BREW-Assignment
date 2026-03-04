import React from "react";

export default function Footer() {
  return (
    <footer className="w-full mt-24 py-8 px-4 border-t border-[#1F2937] bg-gradient-to-b from-transparent to-[#0B0F1A]/80 text-center">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[#94A3B8] text-sm" style={{fontFamily: 'var(--font-inter)'}}>
        <span>
          &copy; {new Date().getFullYear()} CineAI Explorer. All rights reserved.
        </span>
        <span>
          Developed by <a href="https://www.linkedin.com/in/vansh-bargotra-895371261/" target="_blank" rel="noopener" className="underline hover:text-[#22D3EE]">Vansh Bargotra</a> |
          <a href="https://github.com/VanshSharma07" target="_blank" rel="noopener" className="underline hover:text-[#22D3EE] ml-1">GitHub</a>
        </span>
      </div>
    </footer>
  );
}