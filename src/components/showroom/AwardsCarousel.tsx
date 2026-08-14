import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Reveal } from '@/components/base/Reveal';
import type { AwardsCarouselContent, AwardItem } from '@/types/sections';
import { resolveUrl } from '@/lib/paths';

/**
 * AwardsCarousel — Interactive Carousel with Progressive Blur effect on upcoming/adjacent awards.
 * 
 * Features:
 * - Progressive Gaussian blur & depth scaling on non-active/next awards.
 * - Smooth transition when navigating (swipe, click, or arrow keys).
 * - High-res certificate image preview with lightbox modal.
 * - Autoplay with pause-on-hover & visual progress bar.
 * - Touch swipe & mouse drag support.
 * - Accessible keyboard navigation & ARIA landmarks.
 */

const DEFAULT_AWARDS: AwardItem[] = [
  {
    id: 'aaa-2025',
    title: 'Asia Automotive Award',
    subtitle: 'Asia Best Tint Brand 2025',
    organization: 'Asia Automotive Awards Council',
    year: '2025',
    badge: 'Automotive Excellence',
    category: 'Industry Leadership',
    description:
      'Awarded the prestigious Asia Best Tint Brand in recognition of IrisPro’s patented optical protection, ASEAN climate durability, and market-leading heat rejection technology.',
    image: '/images/awards/AsiaAutomotiveAward2025.jpg',
    accent: '#ef4444',
  },
  {
    id: 'sirim-certified',
    title: 'SIRIM QAS Certified',
    subtitle: 'National Standards & Quality Compliance',
    organization: 'SIRIM QAS International',
    year: 'Certified',
    badge: 'Standard Compliance',
    category: 'Quality & Safety',
    description:
      'Rigorous independent laboratory verification confirming 99.99% UV400 blocking efficacy, visible light transmittance compliance, and thermal aging stability.',
    image: '/images/awards/Sirim-IrisPro.jpg',
    accent: '#38bdf8',
  },
  {
    id: 'archidex-award',
    title: 'ARCHIDEX Award',
    subtitle: 'Architectural Innovation & Best Product',
    organization: 'ARCHIDEX International Building Exhibition',
    year: 'Excellence',
    badge: 'Building Innovation',
    category: 'Architectural Glazing',
    description:
      'Honored by architects and property developers for significant cooling energy savings, carbon reduction, and zero-haze optical performance in architectural glass.',
    image: '/images/awards/archdex.jpg',
    accent: '#fbbf24',
  },
  {
    id: 'mtpn-award',
    title: 'MTPN Consumer Trust',
    subtitle: 'National Consumer Action Council Award',
    organization: 'Majlis Tindakan Pengguna Negara',
    year: 'Consumer Choice',
    badge: 'Consumer Protection',
    category: 'Authenticity & Trust',
    description:
      'Recognized for exceptional customer advocacy, transparent product testing, and verified 10-year manufacturer warranty fulfillment across ASEAN.',
    image: '/images/awards/mtpn.jpg',
    accent: '#a855f7',
  },
];

export function AwardsCarousel({
  heading = 'Awards & Recognition',
  subhead = 'Certified Excellence & ASEAN Industry Leadership',
  lede = 'Our patented optical technologies and high-tensile film structures are rigorously tested and certified by premier automotive and architectural authorities across the region.',
  awards = DEFAULT_AWARDS,
}: AwardsCarouselContent) {
  const items = awards.length > 0 ? awards : DEFAULT_AWARDS;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Thumbnail strip refs & auto-scroll
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const thumbnailStripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const activeEl = thumbnailRefs.current[activeIndex];
    if (activeEl && thumbnailStripRef.current) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeIndex]);

  // Swipe / Drag state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isDragging = useRef(false);

  // Auto-rotation timer (6.5s)
  useEffect(() => {
    if (isPaused || lightboxImage !== null) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, lightboxImage, items.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxImage !== null) {
        if (e.key === 'Escape') setLightboxImage(null);
        return;
      }
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, lightboxImage]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    touchStartX.current = clientX;
    touchEndX.current = clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    touchEndX.current = clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current || touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    isDragging.current = false;
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activeAward = items[activeIndex];

  return (
    <section
      className="relative py-10 sm:py-14 md:py-16 overflow-hidden bg-zinc-950 text-white"
      aria-label="Awards & Recognition Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic Background Halos */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${activeAward.accent || '#ef4444'} 0%, #000000 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <Reveal as="div" className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-zinc-900 border border-zinc-800 text-red-400 mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Verified Accreditation
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {heading}
          </h2>
          {subhead && (
            <p className="text-base sm:text-lg font-medium text-zinc-400 mt-2 max-w-2xl mx-auto">
              {subhead}
            </p>
          )}
          {lede && (
            <p className="text-xs sm:text-sm text-zinc-500 mt-1.5 max-w-2xl mx-auto">
              {lede}
            </p>
          )}
        </Reveal>

        {/* ── Progressive Blur Carousel Container ── */}
        <div
          className="relative select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
        >
          {/* Main Stage: Carousel Strip */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Active Award Certificate Preview (Direct Full Image) */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div
                className="relative group cursor-pointer w-full max-w-[560px] flex items-center justify-center transition-transform duration-500 hover:scale-[1.02]"
                onClick={() => setLightboxImage(resolveUrl(activeAward.image))}
                title="Click to view full certificate"
              >
                {/* Ambient Soft Glow Behind Image */}
                <div
                  className="absolute -inset-4 opacity-30 blur-2xl transition-all duration-700 pointer-events-none rounded-3xl"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${activeAward.accent || '#ef4444'} 0%, transparent 75%)`,
                  }}
                />

                {/* Direct Full Image */}
                <img
                  src={resolveUrl(activeAward.image)}
                  alt={activeAward.title}
                  className="relative z-10 w-full h-auto max-h-[500px] object-contain rounded-2xl shadow-2xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-500"
                  loading="lazy"
                />

                {/* Hover Zoom Hint */}
                <div className="absolute inset-0 z-20 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center backdrop-blur-[1px]">
                  <span className="px-4 py-2 rounded-full bg-black/80 text-xs font-bold text-white border border-white/20 shadow-xl flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                    Click to View Full Size
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Active Award Details & Progressive Blur Next Cards */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              {/* Active Award Information Card */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-500">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: activeAward.accent || '#ef4444' }}
                  />
                  <span className="text-xs font-bold tracking-widest uppercase text-zinc-400">
                    {activeAward.category || 'Official Accreditation'}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {activeAward.title}
                </h3>
                {activeAward.subtitle && (
                  <p className="text-sm sm:text-base font-semibold text-red-400 mt-1">
                    {activeAward.subtitle}
                  </p>
                )}

                <p className="text-sm sm:text-[15px] text-zinc-300 leading-relaxed mt-4">
                  {activeAward.description}
                </p>

                {/* Organization & Year Tag */}
                <div className="mt-6 pt-5 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 font-medium">Issuing Authority:</span>
                    <span className="text-zinc-200 font-bold">{activeAward.organization}</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-zinc-800/80 text-zinc-300 font-bold text-[11px] border border-zinc-700">
                    {activeAward.year}
                  </div>
                </div>
              </div>

              {/* ── Progressive Blur Upcoming Awards Scrollable Carousel ── */}
              <div className="relative">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span>Up Next</span>
                    <span className="text-[10px] text-zinc-500 font-normal lowercase">(scroll or swipe)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 font-mono">
                      {activeIndex + 1} / {items.length}
                    </span>
                    {/* Mini Strip Nav */}
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="p-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition-colors"
                        aria-label="Scroll to previous award"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="p-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition-colors"
                        aria-label="Scroll to next award"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Horizontal Scrollable Carousel Strip */}
                <div
                  ref={thumbnailStripRef}
                  className="flex flex-nowrap overflow-x-auto gap-3.5 pb-2 pt-1 px-1 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {items.map((award, idx) => {
                    const isCurrent = idx === activeIndex;
                    return (
                      <button
                        key={award.id}
                        ref={(el) => {
                          thumbnailRefs.current[idx] = el;
                        }}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        className={`flex-shrink-0 w-[145px] sm:w-[160px] snap-center relative rounded-2xl overflow-hidden border p-2.5 text-left transition-all duration-500 focus:outline-none cursor-pointer ${
                          isCurrent
                            ? 'bg-zinc-800/95 border-red-500 ring-2 ring-red-500/40 scale-100 opacity-100 shadow-xl'
                            : 'bg-zinc-900/60 border-zinc-800/70 hover:border-zinc-700 hover:opacity-85 hover:blur-0 scale-95 opacity-50 backdrop-blur-md'
                        }`}
                        style={{
                          filter: isCurrent ? 'blur(0px)' : 'blur(2.5px)',
                        }}
                      >
                        {/* Thumbnail Image */}
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black/60 mb-2 flex items-center justify-center p-1 border border-zinc-800/50">
                          <img
                            src={resolveUrl(award.image)}
                            alt={award.title}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>

                        {/* Title & Organization */}
                        <p className="text-[11px] font-bold text-white truncate leading-tight">
                          {award.title}
                        </p>
                        <p className="text-[9px] text-zinc-400 truncate mt-0.5 font-medium">
                          {award.year}
                        </p>

                        {/* Subtle Overlay Shield for Non-active */}
                        {!isCurrent && (
                          <div className="absolute inset-0 bg-black/15 hover:bg-transparent transition-colors rounded-2xl pointer-events-none" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── Carousel Controls & Progress Bar ── */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-zinc-800/80 pt-6">
            {/* Dots / Indicators */}
            <div className="flex items-center gap-2">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? 'w-8 bg-red-500'
                      : 'w-2 bg-zinc-700 hover:bg-zinc-600'
                  }`}
                  aria-label={`Go to award ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
                aria-label="Previous Award"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
                aria-label="Next Award"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── High-Res Lightbox Modal ── */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white transition-colors"
              aria-label="Close Preview"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* High Res Certificate Image */}
            <div className="max-h-[80vh] flex items-center justify-center overflow-auto rounded-xl bg-black/50 p-2">
              <img
                src={lightboxImage}
                alt="Award Certificate Full View"
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
