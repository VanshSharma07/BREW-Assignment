import React, { useState } from "react";
import { motion } from "framer-motion";

function getSentimentClass(sentiment: string) {
  switch (sentiment?.toLowerCase()) {
    case 'positive': return 'sentiment-badge sentiment-positive';
    case 'negative': return 'sentiment-badge sentiment-negative';
    default: return 'sentiment-badge sentiment-mixed';
  }
}

export default function MovieDetails({ movieData, loading }: any) {
  const [openSections, setOpenSections] = useState({
    plot: true,
    characters: false,
    impact: false,
    trivia: false,
    summary: false,
    cast: false,
  });

  const [triviaState, setTriviaState] = useState<{ [key: number]: { selected?: number; showAnswer?: boolean } }>({});

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTriviaSelect = (qIdx: number, optIdx: number) => {
    setTriviaState((prev) => ({
      ...prev,
      [qIdx]: { selected: optIdx, showAnswer: false },
    }));
  };

  const handleTriviaReveal = (qIdx: number) => {
    setTriviaState((prev) => ({
      ...prev,
      [qIdx]: { ...prev[qIdx], showAnswer: true },
    }));
  };

  if (!movieData) return null;

  const positivePercent = 70;
  const criticalPercent = 30;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 transition-opacity duration-500 relative mt-10 md:mt-20 px-2 md:px-0 ${loading ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}
    >
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pt-20">
          <div className="w-16 h-16 border-4 border-[#F4C542]/30 border-t-[#D4AF37] rounded-full animate-spin mb-4"></div>
          <p className="text-[#F4C542] font-bold animate-pulse" style={{ fontFamily: 'var(--font-playfair)' }}>Loading AI features...</p>
        </div>
      )}

      {/* Poster and Quick Facts */}
      <div className="md:col-span-4 lg:col-span-3 space-y-4 md:space-y-6">
        <motion.div
          whileHover={{ scale: 1.03, boxShadow: "0 4px 32px #E6B32533" }}
          className="card flex flex-col items-center w-full bg-[#151515] border border-[#242424]"
          style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.18)' }}
        >
          <img
            src={movieData.posterUrl}
            alt={`${movieData.title} poster`}
            className="poster w-full h-auto object-cover aspect-2/3 mb-3 md:mb-4 max-h-100 md:max-h-130"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=400&h=600';
            }}
          />
          <div className="flex justify-center w-full mt-2">
            <span className="text-lg font-bold text-[#F4C542]" style={{ fontFamily: 'var(--font-playfair)' }}>
              {movieData.rating} <span style={{ color: '#F4C542', marginLeft: 4 }}>★</span>
            </span>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02, borderColor: "#E6B325" }} className="card bg-[#151515] border border-[#242424]">
          <h3 className="text-xs font-bold text-[#F4C542] uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-inter)', letterSpacing: '0.12em' }}>Quick Facts</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between border-b border-[#242424] pb-3">
              <span className="text-[#B3B3B3]" style={{ fontFamily: 'var(--font-inter)' }}>Release Year</span>
              <span className="font-semibold text-[#F4C542] bg-[#232323] px-3 py-1 rounded-md" style={{ fontFamily: 'var(--font-playfair)' }}>{movieData.year}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Details and AI Features */}
      <div className="md:col-span-8 lg:col-span-9 space-y-3 md:space-y-4">
        <motion.div whileHover={{ scale: 1.01, borderColor: "#E6B325" }} className="card bg-[#151515] border border-[#242424]">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: '#F4C542' }}>{movieData.title}</h2>
          {movieData.audienceSentimentSummary && (
            <div className="mt-2">
              <h3 className="text-base font-bold text-[#F4C542] mb-2" style={{ fontFamily: 'var(--font-inter)' }}>AI Audience Analysis</h3>
              <span className={getSentimentClass(movieData.overallSentiment)}>
                {movieData.overallSentiment} Sentiment
              </span>
              <div className="progress-bar mt-3 mb-2">
                <div className="progress-bar-inner" style={{ width: `${positivePercent}%` }}></div>
              </div>
              <div className="flex justify-between text-xs text-[#B3B3B3] mb-2">
                <span>Positive ({positivePercent}%)</span>
                <span>Critical ({criticalPercent}%)</span>
              </div>
              <p className="text-[#B3B3B3] italic mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
                "{movieData.audienceSentimentSummary}"
              </p>
            </div>
          )}
        </motion.div>

        {/* Collapsible AI Features */}
        <div className="space-y-3 md:space-y-4">

          {/* Plot Rewriter */}
          <motion.div whileHover={{ scale: 1.01, borderColor: "#E6B325" }} className="card bg-[#151515] border border-[#242424]">
            <button className="w-full flex justify-between items-center px-2 py-3 focus:outline-none touch-manipulation" onClick={() => toggleSection('plot')}>
              <span className="text-lg font-bold text-[#F4C542]" style={{ fontFamily: 'var(--font-playfair)' }}>AI-Powered Plot Rewriter</span>
              <span className="text-[#F4C542]">{openSections.plot ? '−' : '+'}</span>
            </button>
            {openSections.plot && (
              <div className="space-y-4 mt-2">
                {movieData.plotRewrites && movieData.plotRewrites.length > 0 ? (
                  movieData.plotRewrites.map((rewrite: { genre: string; audience?: string; rewrittenPlot: string }, idx: number) => (
                    <div key={idx} className="bg-[#181818] rounded-lg p-4 border border-[#232323]">
                      <div className="text-xs pill-tag mb-2">{rewrite.genre} {rewrite.audience ? `| ${rewrite.audience}` : ""}</div>
                      <div className="text-[#B3B3B3]" style={{ fontFamily: 'var(--font-inter)' }}>{rewrite.rewrittenPlot}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-[#6B6B6B]">No plot rewrites available.</p>
                )}
              </div>
            )}
          </motion.div>

          {/* Character Deep-Dive */}
          <motion.div whileHover={{ scale: 1.01, borderColor: "#E6B325" }} className="card bg-[#151515] border border-[#242424]">
            <button className="w-full flex justify-between items-center px-2 py-3 focus:outline-none touch-manipulation" onClick={() => toggleSection('characters')}>
              <span className="text-xs font-bold text-[#F4C542] uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>Character Deep-Dive</span>
              <span className="text-[#F4C542]">{openSections.characters ? '−' : '+'}</span>
            </button>
            {openSections.characters && (
              <div className="space-y-4 mt-2">
                {movieData.characterProfiles && movieData.characterProfiles.length > 0 ? (
                  movieData.characterProfiles.map((char: any, idx: number) => (
                    <div key={idx} className="bg-[#181818] rounded-lg p-4 border border-[#232323]">
                      <div className="text-[#F4C542] font-bold mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>{char.name}</div>
                      <div className="text-[#B3B3B3] text-sm mb-1"><span className="font-bold">Profile:</span> {char.profile}</div>
                      <div className="text-[#B3B3B3] text-sm mb-1"><span className="font-bold">Motivation:</span> {char.motivation}</div>
                      <div className="text-[#B3B3B3] text-sm"><span className="font-bold">Backstory:</span> {char.backstory}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-[#6B6B6B]">No character profiles available.</p>
                )}
              </div>
            )}
          </motion.div>

          {/* Cultural Impact Analysis */}
          <motion.div whileHover={{ scale: 1.01, borderColor: "#E6B325" }} className="card bg-[#151515] border border-[#242424]">
            <button className="w-full flex justify-between items-center px-2 py-3 focus:outline-none touch-manipulation" onClick={() => toggleSection('impact')}>
              <span className="text-xs font-bold text-[#F4C542] uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>Cultural Impact Analysis</span>
              <span className="text-[#F4C542]">{openSections.impact ? '−' : '+'}</span>
            </button>
            {openSections.impact && (
              <div className="mt-2">
                {movieData.culturalImpact ? (
                  <p className="text-[#B3B3B3]" style={{ fontFamily: 'var(--font-inter)' }}>{movieData.culturalImpact}</p>
                ) : (
                  <p className="text-[#6B6B6B]">No cultural impact analysis available.</p>
                )}
              </div>
            )}
          </motion.div>

          {/* AI-Generated Trivia & Quizzes */}
          <motion.div whileHover={{ scale: 1.01, borderColor: "#E6B325" }} className="card bg-[#151515] border border-[#242424]">
            <button className="w-full flex justify-between items-center px-2 py-3 focus:outline-none touch-manipulation" onClick={() => toggleSection('trivia')}>
              <span className="text-xs font-bold text-[#F4C542] uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>AI-Generated Trivia & Quizzes</span>
              <span className="text-[#F4C542]">{openSections.trivia ? '−' : '+'}</span>
            </button>
            {openSections.trivia && (
              <div className="space-y-4 mt-2">
                {movieData.triviaQuiz && movieData.triviaQuiz.length > 0 ? (
                  movieData.triviaQuiz.map((q: any, idx: number) => {
                    const state = triviaState[idx] || {};
                    return (
                      <div key={idx} className="bg-[#181818] rounded-lg p-4 border border-[#232323]">
                        <div className="text-[#F4C542] font-bold mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>Q{idx + 1}: {q.question}</div>
                        <ul className="list-disc ml-6 text-[#B3B3B3] mb-1">
                          {q.options.map((opt: string, oidx: number) => (
                            <li key={oidx}>
                              <button
                                className={`px-3 py-1 rounded-md border ${state.selected === oidx ? 'bg-[#F4C542]/20 border-[#F4C542] text-[#F4C542]' : 'bg-[#181818] border-[#232323] text-[#B3B3B3]'} font-medium transition-colors duration-150`}
                                onClick={() => handleTriviaSelect(idx, oidx)}
                                disabled={state.showAnswer}
                              >
                                {opt}
                              </button>
                            </li>
                          ))}
                        </ul>
                        {!state.showAnswer && typeof state.selected === 'number' && (
                          <button
                            className="mt-2 px-4 py-1 rounded-md bg-[#F4C542] text-[#151515] font-bold hover:bg-[#D4AF37] transition-colors"
                            onClick={() => handleTriviaReveal(idx)}
                          >
                            Reveal Answer
                          </button>
                        )}
                        {state.showAnswer && (
                          <div className={`mt-2 text-sm font-bold ${q.options[state.selected!] === q.answer ? 'text-[#F4C542]' : 'text-[#F87171]'}`}>
                            Correct Answer: <span className="underline">{q.answer}</span><br />
                            {q.options[state.selected!] === q.answer ? 'You got it right!' : 'Try again next time!'}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-[#6B6B6B]">No trivia or quizzes available.</p>
                )}
              </div>
            )}
          </motion.div>

          {/* Plot Summary */}
          <motion.div whileHover={{ scale: 1.01, borderColor: "#E6B325" }} className="card bg-[#151515] border border-[#242424]">
            <button className="w-full flex justify-between items-center px-2 py-3 focus:outline-none touch-manipulation" onClick={() => toggleSection('summary')}>
              <span className="text-xs font-bold text-[#F4C542] uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>Plot Summary</span>
              <span className="text-[#F4C542]">{openSections.summary ? '−' : '+'}</span>
            </button>
            {openSections.summary && (
              <p className="text-[#B3B3B3] leading-relaxed text-base mt-2" style={{ fontFamily: 'var(--font-inter)' }}>
                {movieData.plot}
              </p>
            )}
          </motion.div>

          {/* Main Cast */}
          <motion.div whileHover={{ scale: 1.01, borderColor: "#E6B325" }} className="card bg-[#151515] border border-[#242424]">
            <button className="w-full flex justify-between items-center px-2 py-3 focus:outline-none touch-manipulation" onClick={() => toggleSection('cast')}>
              <span className="text-xs font-bold text-[#F4C542] uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>Main Cast</span>
              <span className="text-[#F4C542]">{openSections.cast ? '−' : '+'}</span>
            </button>
            {openSections.cast && (
              <div className="flex flex-wrap gap-3 mt-2">
                {movieData.cast?.map((actor: any, index: number) => (
                  <span key={index} className="pill-tag text-xs font-bold" style={{ fontFamily: 'var(--font-inter)' }}>
                    {actor}
                  </span>
                ))}
                {(!movieData.cast || movieData.cast.length === 0) && (
                  <span className="text-[#6B6B6B] text-sm italic" style={{ fontFamily: 'var(--font-inter)' }}>Cast information unavailable</span>
                )}
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}