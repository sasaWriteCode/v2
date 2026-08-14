import React, { useState } from 'react';
import { Icon } from '@/components/global/Icon';
import { Reveal } from '@/components/base/Reveal';
import type { PatentedTechFlowContent } from '@/types/sections';
import { resolveUrl } from '@/lib/paths';

/**
 * PatentedTechFlow — Patented technology section designed to match the reference layout:
 *
 * 1. Top Centered Headline: Multi-line large, elegant statement.
 * 2. Left Column:
 *    - Vertical accent bar
 *    - Bold uppercase heading: "INNOVATION"
 *    - Uppercase muted subtitle: "THE FIRST DUAL-PATENT SYSTEM OF ITS KIND ON THE MARKET"
 *    - Clean bulleted list with detailed technology proof points
 *    - Interactive patent selector (Patent 01: UV+420™ vs Patent 02: 6-Layer Hotmelt™)
 * 3. Right Column:
 *    - Architectural window frame showcasing the 2.5D isometric IRISPRO geometric block core
 *      with animated circuits and colorful terminal cubes.
 */

/* ── 2.5D Isometric 3D Cube Helper ── */
function IsoCube({
  x,
  y,
  size = 16,
  topColor = '#ffffff',
  leftColor = '#e2e8f0',
  rightColor = '#cbd5e1',
  stroke = '#0f172a',
  strokeWidth = 2,
  className = '',
}: {
  x: number;
  y: number;
  size?: number;
  topColor?: string;
  leftColor?: string;
  rightColor?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}) {
  const dx = size * 0.866;
  const dy = size * 0.5;
  const h = size;

  const topFace = `${x},${y - dy} ${x + dx},${y} ${x},${y + dy} ${x - dx},${y}`;
  const leftFace = `${x - dx},${y} ${x},${y + dy} ${x},${y + dy + h} ${x - dx},${y + h}`;
  const rightFace = `${x},${y + dy} ${x + dx},${y} ${x + dx},${y + h} ${x},${y + dy + h}`;

  return (
    <g className={className}>
      <polygon points={leftFace} fill={leftColor} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <polygon points={rightFace} fill={rightColor} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <polygon points={topFace} fill={topColor} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </g>
  );
}

/**
 * 2.5D Isometric IRISPRO Geometric Sculpture inside the Architectural Frame.
 */
function WindowFrameCenterpiece({ activePatent }: { activePatent: 'uv420' | 'hotmelt' | 'all' }) {
  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* Dynamic ambient backdrop glow */}
      <div
        className="absolute inset-0 -m-6 pointer-events-none rounded-3xl opacity-40 blur-3xl transition-all duration-700"
        style={{
          background:
            activePatent === 'uv420'
              ? 'radial-gradient(circle, rgba(6,182,212,0.45) 0%, rgba(99,102,241,0.2) 60%, transparent 80%)'
              : activePatent === 'hotmelt'
                ? 'radial-gradient(circle, rgba(234,34,39,0.45) 0%, rgba(245,158,11,0.2) 60%, transparent 80%)'
                : 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(234,34,39,0.25) 50%, transparent 80%)',
        }}
      />

      {/* SVG Isometric Graphic */}
      <svg
        viewBox="0 0 560 440"
        className="w-full h-auto drop-shadow-2xl overflow-visible"
        aria-label="IRISPRO 2.5D Geometric Typography Matrix"
      >
        <defs>
          <linearGradient id="wfIsoTopWhite" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>

          <linearGradient id="wfIsoLeftSlate" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          <linearGradient id="wfIsoRightSlate" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          <linearGradient id="wfUvConduit" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          <linearGradient id="wfHotmeltConduit" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#ea2227" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          <pattern id="wfIsoGrid" width="30" height="17.32" patternUnits="userSpaceOnUse">
            <path
              d="M 0,0 L 15,8.66 L 30,0 M 15,8.66 L 15,26 L 30,17.32 M 0,17.32 L 15,26"
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>

        {/* Blueprint Grid Disc */}
        <ellipse
          cx="280"
          cy="260"
          rx="250"
          ry="150"
          fill="url(#wfIsoGrid)"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />

        {/* Left Conduit (UV+420 Branch) */}
        <g className="transition-opacity duration-500">
          <path
            d="M 20,200 L 75,200 L 115,175 L 150,175"
            fill="none"
            stroke="rgba(6, 182, 212, 0.25)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M 20,200 L 75,200 L 115,175 L 150,175"
            fill="none"
            stroke="url(#wfUvConduit)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 20,200 L 75,200 L 115,175 L 150,175"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeDasharray="16 60"
            strokeLinecap="round"
            className="animate-pulse-flow-left"
          />
          <circle cx="75" cy="200" r="4.5" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="115" cy="175" r="4.5" fill="#6366f1" stroke="#ffffff" strokeWidth="1.5" />
        </g>

        {/* Right Conduit (6-Layer Hotmelt Branch) */}
        <g className="transition-opacity duration-500">
          <path
            d="M 420,275 L 455,275 L 495,210 L 540,210"
            fill="none"
            stroke="rgba(234, 34, 39, 0.25)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M 420,275 L 455,275 L 495,210 L 540,210"
            fill="none"
            stroke="url(#wfHotmeltConduit)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 420,275 L 455,275 L 495,210 L 540,210"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeDasharray="16 60"
            strokeLinecap="round"
            className="animate-pulse-flow-right"
          />
          <circle cx="455" cy="275" r="4.5" fill="#ea2227" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="495" cy="210" r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
        </g>

        {/* ── 2.5D ISOMETRIC LETTERS: I - R - I - S (Top) & P - R - O (Bottom) ── */}

        {/* Letter 'I' */}
        <g className="transition-transform duration-300 hover:-translate-y-1">
          <polygon points="150,75 162,82 162,185 150,178" fill="url(#wfIsoLeftSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="162,82 174,75 174,178 162,185" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="162,185 190,201 190,213 162,197" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="150,178 162,185 190,201 178,194" fill="url(#wfIsoTopWhite)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <IsoCube x={162} y={60} size={14} topColor="#fb923c" leftColor="#ea580c" rightColor="#c2410c" />
        </g>

        {/* Letter 'R' */}
        <g className="transition-transform duration-300 hover:-translate-y-1">
          <polygon points="202,70 214,77 214,188 202,181" fill="url(#wfIsoLeftSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="214,77 226,70 226,181 214,188" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="214,77 248,57 260,64 226,84" fill="url(#wfIsoTopWhite)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="248,57 260,64 260,115 248,108" fill="url(#wfIsoLeftSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="260,64 272,57 272,108 260,115" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="214,122 260,115 260,127 214,134" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="202,115 214,122 260,115 248,108" fill="url(#wfIsoTopWhite)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="230,126 268,168 268,180 230,138" fill="url(#wfIsoLeftSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="268,168 280,161 280,173 268,180" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="230,126 242,119 280,161 268,168" fill="url(#wfIsoTopWhite)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <IsoCube x={278} y={168} size={12} topColor="#f87171" leftColor="#ef4444" rightColor="#b91c1c" />
        </g>

        {/* Letter 'I' */}
        <g className="transition-transform duration-300 hover:-translate-y-1">
          <polygon points="300,70 312,77 312,175 300,168" fill="url(#wfIsoLeftSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="312,77 324,70 324,175 312,182" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <IsoCube x={312} y={57} size={14} topColor="#38bdf8" leftColor="#0284c7" rightColor="#0369a1" />
        </g>

        {/* Letter 'S' */}
        <g className="transition-transform duration-300 hover:-translate-y-1">
          <polygon points="350,65 390,45 402,52 362,72" fill="url(#wfIsoTopWhite)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="350,65 362,72 362,84 350,77" fill="url(#wfIsoLeftSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="362,72 402,52 402,64 362,84" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <IsoCube x={402} y={48} size={12} topColor="#c084fc" leftColor="#a855f7" rightColor="#7e22ce" />
          <polygon points="350,65 362,72 362,118 350,111" fill="url(#wfIsoLeftSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="350,111 385,131 397,124 362,104" fill="url(#wfIsoTopWhite)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="350,111 385,131 385,143 350,123" fill="url(#wfIsoLeftSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="385,131 397,124 397,175 385,182" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="355,195 385,182 397,189 367,202" fill="url(#wfIsoTopWhite)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="355,195 367,202 367,214 355,207" fill="url(#wfIsoLeftSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="367,202 397,189 397,201 367,214" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <IsoCube x={355} y={202} size={12} topColor="#4ade80" leftColor="#22c55e" rightColor="#15803d" />
        </g>

        {/* Letter 'P' */}
        <g className="transition-transform duration-300 hover:-translate-y-1">
          <polygon points="190,240 202,247 202,360 190,353" fill="url(#wfIsoLeftSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="202,247 214,240 214,353 202,360" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="202,247 238,227 250,234 214,254" fill="url(#wfIsoTopWhite)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="238,227 250,234 250,285 238,278" fill="url(#wfIsoLeftSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="250,234 262,227 262,278 250,285" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="202,285 250,285 250,297 202,297" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="190,278 202,285 250,285 238,278" fill="url(#wfIsoTopWhite)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <IsoCube x={250} y={224} size={12} topColor="#c084fc" leftColor="#9333ea" rightColor="#6b21a8" />
        </g>

        {/* Letter 'R' */}
        <g className="transition-transform duration-300 hover:-translate-y-1">
          <polygon points="275,240 287,247 287,360 275,353" fill="url(#wfIsoLeftSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="287,247 299,240 299,353 287,360" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="287,247 322,227 334,234 299,254" fill="url(#wfIsoTopWhite)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="322,227 334,234 334,285 322,278" fill="url(#wfIsoLeftSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="334,234 346,227 346,278 334,285" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="287,285 334,285 334,297 287,297" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="305,290 345,338 345,350 305,302" fill="url(#wfIsoLeftSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="345,338 357,331 357,343 345,350" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="305,290 317,283 357,331 345,338" fill="url(#wfIsoTopWhite)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <IsoCube x={355} y={338} size={12} topColor="#f87171" leftColor="#dc2626" rightColor="#991b1b" />
        </g>

        {/* Letter 'O' */}
        <g className="transition-transform duration-300 hover:-translate-y-1">
          <polygon points="375,260 405,242 417,249 387,267" fill="url(#wfIsoTopWhite)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="417,249 447,267 435,274 405,256" fill="url(#wfIsoTopWhite)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="435,274 447,267 447,325 435,332" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="405,350 435,332 447,339 417,357" fill="url(#wfIsoTopWhite)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="375,332 405,350 405,362 375,344" fill="url(#wfIsoLeftSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="375,260 387,267 387,325 375,332" fill="url(#wfIsoLeftSlate)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="387,267 417,249 417,261 387,279" fill="url(#wfIsoRightSlate)" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
          <IsoCube x={417} y={230} size={12} topColor="#38bdf8" leftColor="#0284c7" rightColor="#075985" />
          <IsoCube x={447} y={328} size={13} topColor="#fde047" leftColor="#eab308" rightColor="#ca8a04" />
        </g>

        {/* Floating Mini-Cubes */}
        <IsoCube x={115} y={130} size={10} topColor="#f472b6" leftColor="#db2777" rightColor="#9d174d" className="animate-float-slow" />
        <IsoCube x={450} y={145} size={9} topColor="#4ade80" leftColor="#16a34a" rightColor="#15803d" className="animate-float-delayed" />
        <IsoCube x={280} y={395} size={10} topColor="#a78bfa" leftColor="#7c3aed" rightColor="#5b21b6" className="animate-float-slow" />
      </svg>

      {/* Frame Bottom Feature Pills */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 px-2">
        <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 shadow-sm">
          Patent 01: UV+420™ (380–420nm)
        </span>
        <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-red-950/80 text-red-300 border border-red-700/60 shadow-sm">
          Patent 02: 6-Layer Hotmelt™
        </span>
      </div>
    </div>
  );
}

/* ── Main PatentedTechFlow Component ── */

export function PatentedTechFlow({
  headlineLines = [
    'The first window film innovation on the market',
  ],
  categoryTitle = 'INNOVATION',
  categorySubtitle = 'THE FIRST DUAL-PATENT WINDOW FILM OF ITS KIND ON THE MARKET',
  bullets = [
    'The first optical construction on the market cutting 100% of UV400 and high-energy visible (HEV) blue light (380–420nm) for complete ocular and skin cellular defense',
    'Patented 6-Layer Hotmelt™ base film structure engineered to eliminate adhesive bubbling, hazing, and peeling in extreme ASEAN tropical heat',
    'Advanced multi-layer sputter integration providing superior infrared heat rejection without radio or GPS electronic signal attenuation',
    'Crystal-clear optical night clarity with zero haze or optical distortion for enhanced driving safety and visibility',
    'Backed by a 10-Year manufacturer warranty and certified by SIRIM & Asia Automotive Award',
  ],
  ctaHref = '/technologies',
  ctaLabel = 'Discover Our Technology',
}: PatentedTechFlowContent) {
  const [activeTab, setActiveTab] = useState<'all' | 'uv420' | 'hotmelt'>('all');

  return (
    <div className="w-full">
      {/* ── 1. Top Centered Headline (Matches Screenshot Layout) ── */}
      <Reveal as="div" className="text-center max-w-5xl mx-auto mb-8 sm:mb-10 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-slate-900 leading-tight">
          {headlineLines.map((line, idx) => (
            <span key={idx} className="inline-block whitespace-normal">
              {line}
              {idx < headlineLines.length - 1 && <br className="hidden sm:inline" />}
            </span>
          ))}
        </h2>
      </Reveal>

      {/* ── 2. Two-Column Asymmetric Innovation Layout ── */}
      <Reveal as="div" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Vertical Bar + INNOVATION Title + Subtitle + Bullets */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
          {/* Header Block with Vertical Accent Bar */}
          <div className="flex items-start gap-4 mb-6 sm:mb-8">
            {/* Vertical Accent Line (Purple / Brand Accent matching reference) */}
            <div
              className="w-1.5 self-stretch rounded-full shrink-0"
              style={{
                background: 'linear-gradient(180deg, #7b68ee 0%, #ea2227 100%)',
                minHeight: '3.25rem',
              }}
              aria-hidden="true"
            />
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
                {categoryTitle}
              </h3>
              <p className="text-xs sm:text-sm font-semibold tracking-wider text-slate-400 uppercase mt-1">
                {categorySubtitle}
              </p>
            </div>
          </div>

          {/* Bulleted Points List */}
          <ul className="space-y-4 text-slate-700 text-sm sm:text-[15px] leading-relaxed pl-1">
            {bullets.map((bullet, idx) => {
              // Highlight introductory key terms in bold
              const parts = bullet.split(':');
              return (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-slate-900 font-bold text-base leading-tight select-none mt-0.5">•</span>
                  <span>
                    {parts.length > 1 ? (
                      <>
                        <strong className="font-bold text-slate-900">{parts[0]}:</strong>
                        {parts.slice(1).join(':')}
                      </>
                    ) : (
                      bullet
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Discover Our Technology Link */}
          <div className="mt-8">
            <a
              href={resolveUrl(ctaHref)}
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-red-600 hover:text-red-700 transition-colors group"
              style={{ textDecoration: 'none' }}
            >
              <span>{ctaLabel}</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Architectural Window Frame Technology Viewport */}
        <div className="lg:col-span-6 xl:col-span-6 flex justify-center">
          <div className="w-full max-w-[560px] bg-slate-950 border-[10px] sm:border-[16px] border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 relative">
            {/* Top Frame Glass Reflection Effect */}
            <div className="absolute top-0 right-0 left-0 h-28 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

            {/* Corner Badge */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-slate-300 uppercase">
                  IRISPRO PATENT MATRIX
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                PROPRIETARY R&amp;D
              </span>
            </div>

            {/* Isometric 2.5D Sculpture */}
            <WindowFrameCenterpiece activePatent={activeTab} />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
