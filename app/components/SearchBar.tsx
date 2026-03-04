import React from "react";

interface Props {
  imdbId: string;
  setImdbId: (id: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  suggestions: { id: string; name: string }[];
  onSuggestionClick: (id: string) => void;
}

export default function SearchBar({ imdbId, setImdbId, loading, onSubmit, suggestions, onSuggestionClick }: Props) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center w-full max-w-xl mx-auto gap-3 md:gap-4">
      <div className="card w-full flex items-center gap-2 border border-[#242424] bg-[#181818] px-4 py-3" style={{boxShadow: '0 2px 16px rgba(0,0,0,0.18)'}}>
        <span className="flex items-center justify-center mr-2 text-[#F4C542]">
          {/* Search icon */}
          <svg width="22" height="22" fill="none" stroke="#F4C542" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </span>
        <input
          type="text"
          value={imdbId}
          onChange={(e) => setImdbId(e.target.value)}
          placeholder="Enter IMDb ID (e.g. tt0133093)"
          className="w-full bg-transparent py-2 px-3 text-[#F5F5F5] placeholder-[#6B6B6B] focus:outline-none font-inter text-base md:text-lg rounded-md"
          disabled={loading}
          inputMode="text"
          style={{fontFamily: 'var(--font-inter)', letterSpacing: '0.02em'}}
        />
        <button
          type="submit"
          disabled={loading}
          className="modern-btn min-w-25 md:min-w-30 ml-2 disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg"
          style={{background: 'linear-gradient(90deg, #F4C542, #D4AF37)', color: '#151515', fontWeight: 700, fontFamily: 'var(--font-inter)', boxShadow: '0 2px 8px rgba(244,197,66,0.08)'}}
        >
          {loading ? (
            <span className="animate-pulse">Analyzing...</span>
          ) : (
            'Analyze'
          )}
        </button>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-2 w-full mt-2">
        <span className="text-xs uppercase tracking-widest text-[#B3B3B3] font-inter">Quick test:</span>
        {suggestions.map((movie) => (
          <button
            key={movie.id}
            type="button"
            onClick={() => onSuggestionClick(movie.id)}
            disabled={loading}
            className="modern-btn px-2 md:px-3 py-1 text-xs md:text-sm font-inter disabled:opacity-50"
            style={{padding: '6px 12px', fontWeight: 500, fontSize: '0.95rem', background: 'linear-gradient(90deg, #F4C542, #D4AF37)', color: '#151515', fontFamily: 'var(--font-inter)'}}
          >
            {movie.name}
          </button>
        ))}
      </div>
    </form>
  );
}