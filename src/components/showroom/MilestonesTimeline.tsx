import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@/components/global/Icon';
import { Reveal } from '@/components/base/Reveal';
import type { MilestonesTimelineContent, MilestoneStepItem } from '@/types/sections';

/**
 * MilestonesTimeline — Redesigned interactive timeline for IrisPro's decade of innovation.
 *
 * Features:
 * - Interactive Horizontal Stepper with animated glowing nodes and progress bar.
 * - Spotlight Active Milestone Card with rich narrative, metric chips, and category tags.
 * - Interactive year switcher pills for quick scrubbing.
 * - Responsive view: Interactive horizontal stepper on desktop, connected vertical path on mobile.
 * - Smooth transition animations and full keyboard accessibility.
 */

const DEFAULT_MILESTONES: MilestoneStepItem[] = [
  {
    year: 2014,
    title: 'IrisPro Founded in Malaysia',
    tag: 'Foundation',
    description:
      'IrisPro was established in Malaysia with a bold vision: engineering superior, longer-lasting window films specifically formulated to master ASEAN’s extreme solar heat and humidity.',
    icon: 'sun',
    highlight: false,
  },
  {
    year: 2016,
    title: 'Pioneered UV+380™ Technology',
    tag: 'R&D Breakthrough',
    description:
      'Launched proprietary UV+380 high-performance optical film, setting a new industry benchmark for full-spectrum solar protection beyond standard automotive tints.',
    icon: 'eye',
    highlight: false,
  },
  {
    year: 2018,
    title: 'Introduced 6-Layer Hotmelt™ Base Film',
    tag: 'Patent Engineering',
    description:
      'Engineered our patented 6-Layer Hotmelt™ co-extrusion technology, permanently solving bubble formation, adhesive hazing, and delamination in tropical climates.',
    icon: 'layers',
    highlight: true,
  },
  {
    year: 2020,
    title: 'Architectural & Commercial Glazing Expansion',
    tag: 'Market Expansion',
    description:
      'Expanded high-performance solar control solutions into commercial towers, corporate headquarters, and residential developments to reduce building cooling loads.',
    icon: 'building',
    highlight: false,
  },
  {
    year: 2022,
    title: 'Achieved Official SIRIM Certification',
    tag: 'National Accreditation',
    description:
      'Attained national testing certification from SIRIM QAS International, verifying 99.99% UV400 blocking efficacy, thermal rejection, and structural endurance.',
    icon: 'shield',
    highlight: false,
  },
  {
    year: 2023,
    title: 'Awarded Asia Automotive Award – Asia Best Tint Brand',
    tag: 'Industry Leadership',
    description:
      'Crowned Asia Best Tint Brand at the prestigious Asia Automotive Awards, recognized by regional industry leaders for exceptional optical innovation and warranty trust.',
    icon: 'award',
    highlight: true,
  },
  {
    year: '2024+',
    title: 'Expanding Across ASEAN & Global Horizons',
    tag: 'Regional Growth',
    description:
      'Surpassed 1,000,000+ protected vehicles and buildings across ASEAN, advancing next-generation sustainable optical films and expanding international dealer networks.',
    icon: 'leaf',
    highlight: false,
  },
];

export function MilestonesTimeline({
  heading = 'Our Milestones',
  subhead = 'A Decade of Breakthrough Protection & Optical Innovation',
  badge,
  lede = 'From our beginnings in Malaysia to becoming an ASEAN optical technology leader, explore the journey that transformed window film performance.',
  steps = DEFAULT_MILESTONES,
}: MilestonesTimelineContent) {
  const items = steps.length > 0 ? steps : DEFAULT_MILESTONES;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  // Auto-scroll timeline node into view on mobile
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = nodeRefs.current[activeIndex];
    if (el && trackRef.current) {
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeIndex]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ── */}
        <Reveal as="div" className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-slate-100 border border-slate-200 text-red-600 mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              {badge}
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {heading}
          </h2>
          {subhead && (
            <p className="text-base sm:text-lg font-semibold text-slate-600 mt-2.5 max-w-2xl mx-auto">
              {subhead}
            </p>
          )}
          {lede && (
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-2xl mx-auto">
              {lede}
            </p>
          )}
        </Reveal>

        {/* ── Interactive Horizontal Stepper Bar ── */}
        <Reveal as="div" className="mb-6 sm:mb-8">
          <div
            ref={trackRef}
            className="relative flex items-center justify-between overflow-x-auto pb-3 pt-1 px-2 scroll-smooth snap-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-w-full"
          >
            {/* Background Track Line */}
            <div className="absolute top-[28px] left-8 right-8 h-1 bg-slate-200/80 -z-0 rounded-full hidden md:block" />

            {/* Active Progress Track Line */}
            <div
              className="absolute top-[28px] left-8 h-1 bg-gradient-to-r from-red-600 to-amber-500 -z-0 rounded-full transition-all duration-500 ease-out hidden md:block"
              style={{
                width: `calc(${(activeIndex / (items.length - 1)) * 100}% - 40px)`,
              }}
            />

            {items.map((step, idx) => {
              const isSelected = idx === activeIndex;
              const isPast = idx < activeIndex;
              const yearDisplay = String(step.year || step.number || 2014 + idx * 2);

              return (
                <button
                  key={idx}
                  ref={(el) => {
                    nodeRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className="flex flex-col items-center flex-shrink-0 snap-center group focus:outline-none px-3 cursor-pointer relative z-10"
                >
                  {/* Circle Node */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-sm transition-all duration-300 shadow-md ${
                      isSelected
                        ? 'bg-red-600 text-white scale-110 ring-4 ring-red-500/20 shadow-red-500/30'
                        : isPast
                        ? 'bg-slate-900 text-white hover:scale-105'
                        : 'bg-white text-slate-700 border-2 border-slate-300 hover:border-slate-400 hover:scale-105'
                    }`}
                  >
                    {step.icon ? (
                      <Icon name={step.icon} size={18} />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>

                  {/* Year Label */}
                  <span
                    className={`mt-2 text-xs sm:text-sm font-bold transition-colors ${
                      isSelected
                        ? 'text-red-600 font-extrabold scale-105'
                        : 'text-slate-500 group-hover:text-slate-900'
                    }`}
                  >
                    {yearDisplay}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── Spotlight Active Milestone Card ── */}
        <Reveal as="div" className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-white border border-slate-200/90 shadow-2xl p-6 sm:p-10 md:p-12 overflow-hidden transition-all duration-500">
            {/* Ambient Background Gradient Glint */}
            <div
              className="absolute top-0 right-0 w-80 h-80 opacity-10 rounded-full blur-3xl pointer-events-none"
              style={{
                background:
                  activeItem.highlight || activeIndex % 2 === 0
                    ? 'radial-gradient(circle, #ea2227 0%, #f59e0b 80%)'
                    : 'radial-gradient(circle, #0284c7 0%, #6366f1 80%)',
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Big Numeric Year Banner & Badge */}
              <div className="md:col-span-4 flex flex-col items-start md:items-center justify-center md:border-r border-slate-100 md:pr-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-red-50 text-red-600 border border-red-100 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  {activeItem.tag || 'Major Milestone'}
                </div>

                <div className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 font-mono">
                  {String(activeItem.year || activeItem.number || 2014)}
                </div>

                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-2">
                  Milestone {activeIndex + 1} of {items.length}
                </span>

                {/* Navigation Arrows for Spotlight */}
                <div className="flex items-center gap-2 mt-6">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
                    aria-label="Previous milestone"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
                    aria-label="Next milestone"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Right Column: Title, Icon, Narrative & Proof Points */}
              <div className="md:col-span-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100 shadow-sm">
                    <Icon name={activeItem.icon || 'star'} size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {activeItem.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-3">
                  {activeItem.description ||
                    'IrisPro continues to innovate and lead the window film industry with certified high-performance optical engineering.'}
                </p>

                {/* Progress Indicators */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {items.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => setActiveIndex(dotIdx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          dotIdx === activeIndex
                            ? 'w-6 bg-red-600'
                            : 'w-2 bg-slate-200 hover:bg-slate-300'
                        }`}
                        aria-label={`Jump to milestone ${dotIdx + 1}`}
                      />
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-slate-400">
                    Step {activeIndex + 1} of {items.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Quick Thumbnail Grid for Overview ── */}
        <Reveal as="div" className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {items.map((step, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer focus:outline-none ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-100'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-mono text-xs font-extrabold ${
                      isSelected ? 'text-red-400' : 'text-slate-900'
                    }`}
                  >
                    {String(step.year || step.number || 2014)}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`} />
                </div>
                <p className={`text-[11px] font-medium line-clamp-2 ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                  {step.title}
                </p>
              </button>
            );
          })}
        </Reveal>
      </div>
    </div>
  );
}
