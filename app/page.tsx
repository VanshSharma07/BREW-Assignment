"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ErrorAlert from "./components/ErrorAlert";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

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

  // Scroll reveal animation for main content
  const mainRef = useRef<HTMLDivElement>(null);
  const [mainVisible, setMainVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        const rect = mainRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setMainVisible(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B0B0C] to-[#111111] text-[#F5F5F5] selection:bg-[#F4C542]/20 overflow-x-hidden font-inter">
      <Header />
      <main ref={mainRef} className="max-w-6xl mx-auto px-4 py-16 md:py-24 relative">
        {/* Hero Section */}
        <section className="max-w-2xl mx-auto text-center mb-16 md:mb-24">
          <h1
            className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight hover:scale-105 hover:text-[#E6B325] transition-transform duration-400"
            style={{fontFamily: 'var(--font-playfair)', color: '#F4C542', letterSpacing: '0.02em'}}>
            Discover Movie Insights
          </h1>
          <p
            className="text-[#B3B3B3] mb-8 text-lg md:text-xl font-light leading-relaxed hover:scale-[1.02] hover:text-[#F4C542] transition-all duration-400"
            style={{fontFamily: 'var(--font-inter)'}}>
            Build cinematic intelligence dashboards for any film. Enter an IMDb ID (e.g., <span className="font-playfair bg-[#151515] px-2 py-1 rounded-md border border-[#D4AF37]/40 shadow-sm text-[#F4C542] hover:bg-[#232323] hover:text-[#E6B325] transition-colors duration-400">tt0133093</span>) to unlock AI-powered plot rewrites, audience analysis, and more.
          </p>
          <div className="flex flex-col items-center w-full max-w-xl mx-auto mb-6">
            <SearchBar
              imdbId={imdbId}
              setImdbId={setImdbId}
              loading={loading}
              onSubmit={handleFormSubmit}
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
            />
            <ErrorAlert error={error} />
          </div>
        </section>
        {/* Results Section with Animation */}
        <AnimatePresence mode="wait">
          {movieData && !loading && (
            <motion.div
              key={'main'}
              initial={{ opacity: 0, y: 40 }}
              animate={mainVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <MovieDetails movieData={movieData} loading={loading} />
            </motion.div>
          )}
        </AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center pt-20"
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 border-4 border-[#F4C542]/30 border-t-[#D4AF37] rounded-full animate-spin mb-4"></div>
            <p className="text-[#F4C542] font-bold animate-pulse" style={{fontFamily: 'var(--font-playfair)'}}>Loading AI features...</p>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}