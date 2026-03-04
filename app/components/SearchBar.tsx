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
    <form onSubmit={onSubmit} className="flex flex-col items-center w-full max-w-xl mx-auto mb-10 gap-4">
      <div className="card w-full flex items-center gap-2 border border-[#1F2937]">
        <input
          type="text"
          value={imdbId}
          onChange={(e) => setImdbId(e.target.value)}
          placeholder="Enter IMDb ID (e.g. tt0133093)"
          className="w-full bg-transparent py-3 px-4 text-[#F9FAFB] placeholder-[#64748B] focus:outline-none font-inter text-lg rounded-md"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="modern-btn min-w-[120px] ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="animate-pulse">Analyzing...</span>
          ) : (
            'Analyze'
          )}
        </button>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-2 w-full">
        <span className="text-xs text-[#94A3B8] font-inter">Quick test:</span>
        {suggestions.map((movie) => (
          <button
            key={movie.id}
            type="button"
            onClick={() => onSuggestionClick(movie.id)}
            disabled={loading}
            className="modern-btn px-3 py-1 text-xs font-inter disabled:opacity-50"
            style={{padding: '6px 14px', fontWeight: 500, fontSize: '0.95rem'}}
          >
            {movie.name}
          </button>
        ))}
      </div>
    </form>
  );
}