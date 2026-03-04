import React, { useState } from "react";

interface PlotRewrite {
  genre: string;
  audience: string;
  rewrittenPlot: string;
}

interface CharacterProfile {
  name: string;
  profile: string;
  motivation: string;
  backstory: string;
}

interface TriviaQuestion {
  question: string;
  options: string[];
  answer: string;
}

interface MovieData {
  success: boolean;
  title: string;
  year: string;
  rating: string;
  plot: string;
  posterUrl: string;
  cast: string[];
  plotRewrites?: PlotRewrite[];
  characterProfiles?: CharacterProfile[];
  culturalImpact?: string;
  triviaQuiz?: TriviaQuestion[];
  errorMessage?: string;
}

interface Props {
  movieData: MovieData | null;
  loading: boolean;
}


function getSentimentClass(sentiment: string) {
  switch (sentiment?.toLowerCase()) {
    case 'positive': return 'sentiment-badge sentiment-positive';
    case 'negative': return 'sentiment-badge sentiment-negative';
    default: return 'sentiment-badge sentiment-mixed';
  }
}




export default function MovieDetails({ movieData, loading }: Props) {
  // Collapsible state for each AI feature section
  const [openSections, setOpenSections] = useState({
    plot: true,
    characters: false,
    impact: false,
    trivia: false,
    summary: false,
    cast: false,
  });

  // Trivia state: selected option and reveal answer per question
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

  return (
    <section className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 transition-opacity duration-500 relative mt-20 ${loading ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pt-20">
          <div className="w-16 h-16 border-4 border-[#8B5CF6]/30 border-t-[#22D3EE] rounded-full animate-spin mb-4"></div>
          <p className="text-[#8B5CF6] font-bold animate-pulse" style={{fontFamily: 'var(--font-orbitron)'}}>Loading AI features...</p>
        </div>
      )}
      <div className="md:col-span-4 lg:col-span-3 space-y-6">
        <div className="card flex flex-col items-center">
          <img 
            src={movieData.posterUrl} 
            alt={`${movieData.title} poster`}
            className="poster w-full h-auto object-cover aspect-2/3 mb-4"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=400&h=600';
            }}
          />
          <div className="flex justify-center w-full">
            <span className="text-lg font-bold text-[#8B5CF6]" style={{fontFamily: 'var(--font-orbitron)'}}>{movieData.rating}</span>
          </div>
        </div>
        <div className="card">
          <h3 className="text-sm font-bold text-[#8B5CF6] uppercase tracking-widest mb-4" style={{fontFamily: 'var(--font-orbitron)'}}>Quick Facts</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between border-b border-[#1F2937] pb-3">
              <span className="text-[#94A3B8]" style={{fontFamily: 'var(--font-inter)'}}>Release Year</span>
              <span className="font-semibold text-[#22D3EE] bg-[#22D3EE]/10 px-3 py-1 rounded-md" style={{fontFamily: 'var(--font-orbitron)'}}>{movieData.year}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="md:col-span-8 lg:col-span-9 space-y-4">
        <div className="card">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{fontFamily: 'var(--font-orbitron)'}}>{movieData.title}</h2>
        </div>
        {/* Collapsible AI Features */}
        <div className="space-y-4">
          {/* Plot Rewriter */}
          <div className="card">
            <button className="w-full flex justify-between items-center px-2 py-3 focus:outline-none" onClick={() => toggleSection('plot')}>
              <span className="text-xl font-bold text-[#22D3EE]" style={{fontFamily: 'var(--font-orbitron)'}}>AI-Powered Plot Rewriter</span>
              <span className="text-[#8B5CF6]">{openSections.plot ? '−' : '+'}</span>
            </button>
            {openSections.plot && (
              <div className="space-y-4 mt-2">
                {movieData.plotRewrites && movieData.plotRewrites.length > 0 ? (
                  movieData.plotRewrites.map((rewrite, idx) => (
                    <div key={idx} className="bg-[#111827] rounded-lg p-4 border border-[#1F2937]">
                      <div className="text-sm text-[#8B5CF6] font-bold mb-1">{rewrite.genre} {rewrite.audience ? `| ${rewrite.audience}` : ""}</div>
                      <div className="text-[#94A3B8]" style={{fontFamily: 'var(--font-inter)'}}>{rewrite.rewrittenPlot}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-[#64748B]">No plot rewrites available.</p>
                )}
              </div>
            )}
          </div>
          {/* Character Deep-Dive */}
          <div className="card">
            <button className="w-full flex justify-between items-center px-2 py-3 focus:outline-none" onClick={() => toggleSection('characters')}>
              <span className="text-sm font-bold text-[#8B5CF6] uppercase tracking-widest" style={{fontFamily: 'var(--font-orbitron)'}}>Character Deep-Dive</span>
              <span className="text-[#8B5CF6]">{openSections.characters ? '−' : '+'}</span>
            </button>
            {openSections.characters && (
              <div className="space-y-4 mt-2">
                {movieData.characterProfiles && movieData.characterProfiles.length > 0 ? (
                  movieData.characterProfiles.map((char, idx) => (
                    <div key={idx} className="bg-[#111827] rounded-lg p-4 border border-[#1F2937]">
                      <div className="text-[#22D3EE] font-bold mb-1">{char.name}</div>
                      <div className="text-[#94A3B8] text-sm mb-1"><span className="font-bold">Profile:</span> {char.profile}</div>
                      <div className="text-[#94A3B8] text-sm mb-1"><span className="font-bold">Motivation:</span> {char.motivation}</div>
                      <div className="text-[#94A3B8] text-sm"><span className="font-bold">Backstory:</span> {char.backstory}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-[#64748B]">No character profiles available.</p>
                )}
              </div>
            )}
          </div>
          {/* Cultural Impact Analysis */}
          <div className="card">
            <button className="w-full flex justify-between items-center px-2 py-3 focus:outline-none" onClick={() => toggleSection('impact')}>
              <span className="text-sm font-bold text-[#8B5CF6] uppercase tracking-widest" style={{fontFamily: 'var(--font-orbitron)'}}>Cultural Impact Analysis</span>
              <span className="text-[#8B5CF6]">{openSections.impact ? '−' : '+'}</span>
            </button>
            {openSections.impact && (
              <div className="mt-2">
                {movieData.culturalImpact ? (
                  <p className="text-[#94A3B8]" style={{fontFamily: 'var(--font-inter)'}}>{movieData.culturalImpact}</p>
                ) : (
                  <p className="text-[#64748B]">No cultural impact analysis available.</p>
                )}
              </div>
            )}
          </div>
          {/* AI-Generated Trivia & Quizzes */}
          <div className="card">
            <button className="w-full flex justify-between items-center px-2 py-3 focus:outline-none" onClick={() => toggleSection('trivia')}>
              <span className="text-sm font-bold text-[#8B5CF6] uppercase tracking-widest" style={{fontFamily: 'var(--font-orbitron)'}}>AI-Generated Trivia & Quizzes</span>
              <span className="text-[#8B5CF6]">{openSections.trivia ? '−' : '+'}</span>
            </button>
            {openSections.trivia && (
              <div className="space-y-4 mt-2">
                {movieData.triviaQuiz && movieData.triviaQuiz.length > 0 ? (
                  movieData.triviaQuiz.map((q, idx) => {
                    const state = triviaState[idx] || {};
                    return (
                      <div key={idx} className="bg-[#111827] rounded-lg p-4 border border-[#1F2937]">
                        <div className="text-[#22D3EE] font-bold mb-1">Q{idx + 1}: {q.question}</div>
                        <ul className="list-disc ml-6 text-[#94A3B8] mb-1">
                          {q.options.map((opt, oidx) => (
                            <li key={oidx}>
                              <button
                                className={`px-3 py-1 rounded-md border ${state.selected === oidx ? 'bg-[#22D3EE]/20 border-[#22D3EE] text-[#22D3EE]' : 'bg-[#111827] border-[#1F2937] text-[#94A3B8]'} font-medium transition-colors duration-150`}
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
                            className="mt-2 px-4 py-1 rounded-md bg-[#8B5CF6] text-white font-bold hover:bg-[#22D3EE] transition-colors"
                            onClick={() => handleTriviaReveal(idx)}
                          >
                            Reveal Answer
                          </button>
                        )}
                        {state.showAnswer && (
                          <div className={`mt-2 text-sm font-bold ${q.options[state.selected!] === q.answer ? 'text-[#22D3EE]' : 'text-[#F87171]'}`}>
                            Correct Answer: <span className="underline">{q.answer}</span><br/>
                            {q.options[state.selected!] === q.answer ? 'You got it right!' : 'Try again next time!'}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-[#64748B]">No trivia or quizzes available.</p>
                )}
              </div>
            )}
          </div>
          {/* Plot Summary */}
          <div className="card">
            <button className="w-full flex justify-between items-center px-2 py-3 focus:outline-none" onClick={() => toggleSection('summary')}>
              <span className="text-sm font-bold text-[#8B5CF6] uppercase tracking-widest" style={{fontFamily: 'var(--font-orbitron)'}}>Plot Summary</span>
              <span className="text-[#8B5CF6]">{openSections.summary ? '−' : '+'}</span>
            </button>
            {openSections.summary && (
              <p className="text-[#94A3B8] leading-relaxed text-base mt-2" style={{fontFamily: 'var(--font-inter)'}}>
                {movieData.plot}
              </p>
            )}
          </div>
          {/* Main Cast */}
          <div className="card">
            <button className="w-full flex justify-between items-center px-2 py-3 focus:outline-none" onClick={() => toggleSection('cast')}>
              <span className="text-sm font-bold text-[#8B5CF6] uppercase tracking-widest" style={{fontFamily: 'var(--font-orbitron)'}}>Main Cast</span>
              <span className="text-[#8B5CF6]">{openSections.cast ? '−' : '+'}</span>
            </button>
            {openSections.cast && (
              <div className="flex flex-wrap gap-3 mt-2">
                {movieData.cast?.map((actor, index) => (
                  <span 
                    key={index} 
                    className="bg-[#111827] text-[#F9FAFB] px-4 py-2 rounded-xl text-sm font-bold border border-[#1F2937]" style={{fontFamily: 'var(--font-inter)'}}
                  >
                    {actor}
                  </span>
                ))}
                {(!movieData.cast || movieData.cast.length === 0) && (
                  <span className="text-[#64748B] text-sm italic" style={{fontFamily: 'var(--font-inter)'}}>Cast information unavailable</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
