import React, { useState } from 'react';
import { Icon } from '@/components/global/Icon';
import type { CtaAction } from '@/types/content';
import { resolveUrl } from '@/lib/paths';

interface BranchLocation {
  id: string;
  name: string;
  region: string;
  dealersCount: string;
  x: number;
  y: number;
}

const BRANCH_LOCATIONS: BranchLocation[] = [
  { id: 'penang', name: 'Penang Hub', region: 'Penang', dealersCount: '6 Dealers', x: 65, y: 70 },
  { id: 'ipoh', name: 'Ipoh Centre', region: 'Perak', dealersCount: '4 Dealers', x: 82, y: 105 },
  { id: 'kl', name: 'Kuala Lumpur HQ', region: 'W.P. Kuala Lumpur', dealersCount: '15 Dealers', x: 92, y: 140 },
  { id: 'klang', name: 'Klang Valley Branch', region: 'Selangor', dealersCount: '8 Dealers', x: 88, y: 152 },
  { id: 'seremban', name: 'Seremban Outlet', region: 'Negeri Sembilan', dealersCount: '3 Dealers', x: 104, y: 165 },
  { id: 'melaka', name: 'Melaka Branch', region: 'Melaka', dealersCount: '4 Dealers', x: 118, y: 180 },
  { id: 'jb', name: 'Johor Bahru Flagship', region: 'Johor', dealersCount: '9 Dealers', x: 152, y: 215 },
  { id: 'kb', name: 'Kota Bharu Branch', region: 'Kelantan', dealersCount: '3 Dealers', x: 112, y: 45 },
  { id: 'kuching', name: 'Kuching Hub', region: 'Sarawak', dealersCount: '5 Dealers', x: 295, y: 182 },
  { id: 'kk', name: 'Kota Kinabalu Hub', region: 'Sabah', dealersCount: '4 Dealers', x: 435, y: 88 },
];

export function MalaysiaBranchMap() {
  const [activeBranch, setActiveBranch] = useState<BranchLocation | null>(null);

  return (
    <div className="relative w-full h-full min-h-[260px] flex flex-col justify-between rounded-xl bg-zinc-950/90 border border-zinc-800 p-4 sm:p-5 shadow-2xl overflow-hidden group">
      {/* Top Header Row inside Map Box */}
      <div className="flex items-center justify-between mb-2 border-b border-zinc-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">
            Live Dealer Network
          </span>
        </div>
        <span className="text-[11px] font-semibold text-red-500 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20">
          50+ Branches
        </span>
      </div>

      {/* SVG Map Container */}
      <div className="relative w-full flex-1 flex items-center justify-center aspect-[22/11] my-auto">
        <svg
          viewBox="0 0 500 240"
          className="w-full h-full select-none"
          style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))' }}
        >
          {/* Subtle Grid Pattern Background */}
          <defs>
            <pattern id="cta-map-grid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.8" />
            </pattern>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.04)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.01)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-map-grid)" />

          {/* Peninsular Malaysia Outline */}
          <path
            d="M 60 25 
               C 54 38, 50 55, 58 70 
               C 64 82, 70 95, 74 110 
               C 78 125, 82 140, 86 155 
               C 92 170, 102 182, 114 195 
               C 126 208, 140 220, 155 225 
               C 165 222, 172 210, 170 195 
               C 168 175, 164 150, 158 130 
               C 150 105, 138 75, 126 50 
               C 114 30, 85 20, 60 25 
               Z"
            fill="url(#mapGradient)"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1.2"
            strokeLinejoin="round"
            className="transition-colors duration-300 hover:stroke-red-500/50"
          />

          {/* Sarawak & Sabah Outline */}
          <path
            d="M 270 190 
               C 260 178, 285 168, 315 158 
               C 345 148, 375 125, 400 90 
               C 420 62, 448 45, 472 65 
               C 485 80, 478 108, 460 135 
               C 438 168, 385 188, 335 198 
               C 295 205, 275 200, 270 190 
               Z"
            fill="url(#mapGradient)"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1.2"
            strokeLinejoin="round"
            className="transition-colors duration-300 hover:stroke-red-500/50"
          />

          {/* Region Text Labels matching reference screenshot */}
          <text
            x="48"
            y="235"
            fill="rgba(255, 255, 255, 0.35)"
            fontSize="8.5"
            fontWeight="700"
            letterSpacing="1.2"
            className="font-mono uppercase select-none"
          >
            PENINSULAR MALAYSIA
          </text>

          <text
            x="338"
            y="210"
            fill="rgba(255, 255, 255, 0.35)"
            fontSize="8.5"
            fontWeight="700"
            letterSpacing="1.2"
            className="font-mono uppercase select-none"
          >
            SARAWAK & SABAH
          </text>

          {/* Pulsing Red Branch Location Dots */}
          {BRANCH_LOCATIONS.map((b) => {
            const isActive = activeBranch?.id === b.id;
            return (
              <g
                key={b.id}
                className="cursor-pointer group/dot"
                onMouseEnter={() => setActiveBranch(b)}
                onMouseLeave={() => setActiveBranch(null)}
              >
                {/* Outer Ping Wave Animation */}
                <circle
                  cx={b.x}
                  cy={b.y}
                  r="8"
                  fill="rgba(239, 41, 41, 0.45)"
                  className="animate-ping origin-center"
                  style={{
                    animationDuration: '2.4s',
                    transformOrigin: `${b.x}px ${b.y}px`,
                  }}
                />

                {/* Outer Translucent Ring */}
                <circle
                  cx={b.x}
                  cy={b.y}
                  r={isActive ? '7' : '5.5'}
                  fill="rgba(239, 41, 41, 0.2)"
                  stroke="rgba(239, 41, 41, 0.7)"
                  strokeWidth="1.2"
                  className="transition-all duration-300"
                />

                {/* Main Bright Red Core Dot */}
                <circle
                  cx={b.x}
                  cy={b.y}
                  r={isActive ? '3.5' : '2.8'}
                  fill="#ef2929"
                  className="transition-all duration-300"
                />

                {/* Center White Pin Dot */}
                <circle cx={b.x} cy={b.y} r="1" fill="#ffffff" />
              </g>
            );
          })}
        </svg>

        {/* Hover Floating Tooltip */}
        {activeBranch && (
          <div
            className="absolute z-20 pointer-events-none transition-all duration-200 -translate-x-1/2 -translate-y-full mb-3"
            style={{
              left: `${(activeBranch.x / 500) * 100}%`,
              top: `${(activeBranch.y / 240) * 100}%`,
            }}
          >
            <div className="bg-zinc-900/95 border border-red-500/40 text-white px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-md text-center whitespace-nowrap">
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {activeBranch.name}
              </p>
              <p className="text-[10px] text-zinc-400">
                {activeBranch.region} · <span className="text-red-400 font-semibold">{activeBranch.dealersCount}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * CTABar — bottom conversion band with interactive Malaysia branch network map
 * on the left panel and 4 feature action cards on the right.
 */
export function CTABar({
  headline = 'Nationwide Coverage',
  subhead = 'Over 50+ Authorized IrisPro Dealer Branches & Installers Across Malaysia',
  actions = [],
  variant,
}: {
  headline?: string;
  subhead?: string;
  actions?: CtaAction[];
  variant?: 'showroom' | 'workshop';
}) {
  return (
    <section className="w-full py-10 sm:py-14 md:py-16">
      <div className="container">
        <aside
          data-zone={variant}
          aria-label={headline || 'Nationwide Dealer Network & Support'}
          className="rounded-3xl p-6 sm:p-8 md:p-10 border border-white/20 relative overflow-hidden"
          style={{
            backgroundColor: '#0c0c0e',
            boxShadow:
              '0 0 50px -5px rgba(255, 255, 255, 0.16), 0 20px 40px -15px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.14)',
          }}
        >
          {/* Subtle Ambient White Light Glow Effect */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-white/[0.08] rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            {/* Top Header Row: Title & Subhead without pill */}
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#fafaf8]">
                {headline || 'Nationwide Coverage'}
              </h2>
              {subhead && (
                <p className="text-base sm:text-lg text-[#c8c8d0] font-normal leading-relaxed">
                  {subhead}
                </p>
              )}
            </div>

            {/* Main Section Grid: Left Map Container + Right 2x2 Card Grid aligned top to bottom */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
              {/* Left Column: Interactive Pulsing Map */}
              <div className="lg:col-span-5 flex flex-col">
                <MalaysiaBranchMap />
              </div>

              {/* Right Column: 4 Action Cards 2x2 Grid Matching Map Container Height */}
              <div className="lg:col-span-7 flex flex-col">
                <ul className="grid gap-4 sm:grid-cols-2 h-full">
                  {actions.map((action) => (
                    <li key={action.title} className="h-full">
                      <a
                        href={resolveUrl(action.cta.href)}
                        className="group flex h-full flex-col justify-between rounded-xl p-5 sm:p-6 border border-white/10 bg-[#1a1a1e] hover:border-red-500/40 hover:bg-zinc-900 transition-all duration-300 shadow-lg hover:scale-[1.02]"
                      >
                        <div className="flex items-start gap-4">
                          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                            <Icon name={action.icon} size={22} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <span className="text-base sm:text-lg font-bold text-[#fafaf8] block group-hover:text-white transition-colors">
                              {action.title}
                            </span>
                            {action.description && (
                              <span className="text-xs sm:text-sm text-[#c8c8d0] block mt-1 leading-relaxed font-normal">
                                {action.description}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-red-500 block mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          {action.cta.label}
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
