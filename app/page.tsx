
"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ErrorAlert from "./components/ErrorAlert";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";

interface MovieData {
  success: boolean;
  title: string;
  year: string;
  rating: string;
  plot: string;
  posterUrl: string;
  cast: string[];
  audienceSentimentSummary: string;
  overallSentiment: string;
  errorMessage?: string;
}

export default function Home() {
  const [imdbId, setImdbId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const suggestions = [
    { id: "tt0133093", name: "The Matrix" },
    { id: "tt0468569", name: "The Dark Knight" },
    { id: "tt0816692", name: "Interstellar" },
    { id: "tt4154796", name: "Avengers: Endgame" },
  ];

  const handleSuggestionClick = (id: string) => {
    setImdbId(id);
    executeSearch(id);
  };

  const executeSearch = async (searchId: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedId = searchId.trim();
    if (!trimmedId) {
      setError("Please enter a valid IMDb ID.");
      return;
    }
    if (!/^tt\d{7,8}$/.test(trimmedId)) {
      setError("Invalid format. IMDb ID must start with 'tt' (e.g., tt0133093).");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imdbId: trimmedId }),
      });
      const data: MovieData = await response.json();
      if (!data.success) {
        setError(data.errorMessage || "Movie not found. Please verify the IMDb ID.");
        setMovieData(null);
      } else {
        setMovieData(data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the server. Please try again later.");
      setMovieData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    executeSearch(imdbId, e);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F1A] to-[#111827] text-[#F9FAFB] selection:bg-[#22D3EE]/30 overflow-x-hidden font-inter">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-24 relative">
        <section className="max-w-2xl mx-auto text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight" style={{fontFamily: 'var(--font-orbitron)'}}>
            Discover <span className="text-[#22D3EE]">Movie Insights</span>
          </h2>
          <p className="text-[#94A3B8] mb-10 text-lg md:text-xl font-light leading-relaxed" style={{fontFamily: 'var(--font-inter)'}}>
            Enter an IMDb ID (e.g., <span className="font-orbitron bg-[#22D3EE]/10 px-2 py-1 rounded-md border border-[#22D3EE]/20 shadow-sm">tt0133093</span>) to unlock AI-powered plot rewrites, deep character profiles, cultural impact analysis, and interactive movie trivia & quizzes.
          </p>
          <SearchBar
            imdbId={imdbId}
            setImdbId={setImdbId}
            loading={loading}
            onSubmit={handleFormSubmit}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
          <ErrorAlert error={error} />
        </section>
        <MovieDetails movieData={movieData} loading={loading} />
      </main>
      <Footer />
    </div>
  );
}