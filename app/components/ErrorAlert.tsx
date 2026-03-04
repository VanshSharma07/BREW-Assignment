import React from "react";

interface Props {
  error: string | null;
}

const ErrorAlert: React.FC<Props> = ({ error }) => {
  if (!error) return null;
  return (
    <div className="mt-8 flex items-center justify-center gap-3 card border border-[#EF4444]/40 max-w-lg mx-auto animate-in fade-in slide-in-from-top-4 duration-500">
      <svg className="w-6 h-6 flex-shrink-0 animate-pulse text-[#EF4444]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <p className="text-sm font-bold text-[#EF4444]" style={{fontFamily: 'var(--font-inter)'}}>{error}</p>
    </div>
  );
};

export default ErrorAlert;