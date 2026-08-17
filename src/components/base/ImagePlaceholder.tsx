import React from 'react';

interface ImagePlaceholderProps {
  label: string;
  subtext?: string;
  dimensions?: string;
  aspect?: '16/9' | '4/3' | '3/2' | '1/1' | '21/9' | 'auto';
  src?: string;
  alt?: string;
  className?: string;
  accent?: 'red' | 'blue' | 'purple' | 'amber' | 'emerald' | 'slate';
}

const ASPECT_CLASSES = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '1/1': 'aspect-square',
  '21/9': 'aspect-[21/9]',
  auto: '',
};

const ACCENT_GLOWS = {
  red: 'from-red-500/10 via-transparent to-red-500/5 border-red-500/30 text-red-400',
  blue: 'from-blue-500/10 via-transparent to-blue-500/5 border-blue-500/30 text-blue-400',
  purple: 'from-purple-500/10 via-transparent to-purple-500/5 border-purple-500/30 text-purple-400',
  amber: 'from-amber-500/10 via-transparent to-amber-500/5 border-amber-500/30 text-amber-400',
  emerald: 'from-emerald-500/10 via-transparent to-emerald-500/5 border-emerald-500/30 text-emerald-400',
  slate: 'from-slate-800/40 via-transparent to-slate-900/60 border-slate-700/60 text-slate-400',
};

export function ImagePlaceholder({
  label,
  subtext,
  dimensions = '1200 × 675',
  aspect = '16/9',
  src,
  alt,
  className = '',
  accent = 'red',
}: ImagePlaceholderProps) {
  // If a real image src is provided (not placeholder), render standard img with fallback
  if (src && !src.includes('placeholder') && !src.startsWith('_')) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${ASPECT_CLASSES[aspect]} ${className}`}>
        <img
          src={src}
          alt={alt || label}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  const aspectClass = ASPECT_CLASSES[aspect];
  const accentClass = ACCENT_GLOWS[accent] || ACCENT_GLOWS.red;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br bg-slate-950/90 flex flex-col items-center justify-center p-6 text-center group transition-all duration-300 hover:border-slate-600 ${aspectClass} ${accentClass} ${className}`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 80%),
          linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 24px 24px, 24px 24px',
      }}
    >
      {/* Corner Registration Crosshairs */}
      <div className="absolute top-3 left-3 text-slate-600 text-[10px] font-mono select-none">+</div>
      <div className="absolute top-3 right-3 text-slate-600 text-[10px] font-mono select-none">+</div>
      <div className="absolute bottom-3 left-3 text-slate-600 text-[10px] font-mono select-none">+</div>
      <div className="absolute bottom-3 right-3 text-slate-600 text-[10px] font-mono select-none">+</div>

      {/* Center Icon & Badge */}
      <div className="relative z-10 flex flex-col items-center max-w-md px-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-700 flex items-center justify-center mb-3 shadow-lg group-hover:scale-105 transition-transform duration-300">
          <svg
            className="w-6 h-6 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 mb-2">
          Image Asset Placeholder
        </span>

        <p className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
          {label}
        </p>

        {subtext && (
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {subtext}
          </p>
        )}

        <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-slate-500">
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
            {aspect}
          </span>
          {dimensions && (
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
              {dimensions}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
