import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/global/Icon';
import type { TechPillarGridContent } from '@/types/sections';
import { resolveUrl } from '@/lib/paths';

const DEFAULT_PLACEHOLDER_IMAGES = [
  '/images/hero-sunlight.png',
  '/images/tinted_film_roll.png',
  '/images/sputtered_film_roll.png',
  '/images/commercial-building-2.png',
  '/images/history_page_hero.png',
];

/* Curated Solution Accent Themes for Dark Zone (#0a0a0a / #1a1a1e base) */
const CARD_THEME_COLORS = [
  {
    bg: 'from-red-950/80 via-zinc-900/90 to-zinc-950/95',
    accent: '#ef2929',
    border: 'rgba(239, 41, 41, 0.25)',
  },
  {
    bg: 'from-amber-950/80 via-zinc-900/90 to-zinc-950/95',
    accent: '#dbb06a',
    border: 'rgba(219, 176, 106, 0.25)',
  },
  {
    bg: 'from-blue-950/80 via-zinc-900/90 to-zinc-950/95',
    accent: '#5ba3e8',
    border: 'rgba(91, 163, 232, 0.25)',
  },
  {
    bg: 'from-purple-950/80 via-zinc-900/90 to-zinc-950/95',
    accent: '#9d8ffa',
    border: 'rgba(157, 143, 250, 0.25)',
  },
  {
    bg: 'from-emerald-950/80 via-zinc-900/90 to-zinc-950/95',
    accent: '#56d695',
    border: 'rgba(86, 214, 149, 0.25)',
  },
];

/**
 * TechPillarGrid — Sticky Process Card Stack section for Dark Showroom Zone.
 * Features sticky left intro panel, sticky stacking right cards with covered state scaling/dimming,
 * pinned progress rail, intersection reveal animations, and full reduced-motion accessibility.
 */
export function TechPillarGrid({
  heading = 'Powered by Advanced Optical Technology',
  lede = 'Protecting People, Property and Our Future through proprietary optical science and multi-layer sputtering technology.',
  description,
  link,
  pillars = [],
}: TechPillarGridContent) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [coveredCards, setCoveredCards] = useState<boolean[]>([]);
  const [progress, setProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [revealedCards, setRevealedCards] = useState<boolean[]>([]);

  // 1. Accessibility: prefers-reduced-motion check
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 2. IntersectionObserver for Content Reveal (once)
  useEffect(() => {
    if (isReducedMotion || !pillars.length) return;

    const observers: IntersectionObserver[] = [];

    cardsRef.current.forEach((cardEl, index) => {
      if (!cardEl) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setRevealedCards((prev) => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(cardEl);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [pillars.length, isReducedMotion]);

  // 3. Passive Scroll Listener (rAF) for Covered State & Progress Rail
  useEffect(() => {
    if (isReducedMotion || !containerRef.current) return;

    let animationFrameId: number;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate progress through container (0 to 100%)
        const totalScrollableDistance = rect.height - windowHeight;
        if (totalScrollableDistance > 0) {
          const currentScroll = -rect.top;
          const rawProgress = (currentScroll / totalScrollableDistance) * 100;
          const clampedProgress = Math.min(100, Math.max(0, rawProgress));
          setProgress(clampedProgress);
        }

        // Calculate covered state for each card
        const isMobile = window.innerWidth < 768;
        const baseTop = isMobile ? 64 : 88;
        const step = isMobile ? 10 : 16;

        const newCovered = cardsRef.current.map((cardEl, idx) => {
          if (!cardEl || idx === cardsRef.current.length - 1) return false;

          const nextCardEl = cardsRef.current[idx + 1];
          if (!nextCardEl) return false;

          const nextCardRect = nextCardEl.getBoundingClientRect();
          const nextTargetStickyTop = baseTop + (idx + 1) * step;

          // Covered when next card reaches or passes its assigned sticky top position
          return nextCardRect.top <= nextTargetStickyTop + 6;
        });

        setCoveredCards(newCovered);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [pillars.length, isReducedMotion]);

  if (!pillars || pillars.length === 0) return null;

  // Helper for brand red highlight on optical technology heading
  const renderHeading = () => {
    if (!heading) return null;

    if (heading.includes('Optical Technology')) {
      const parts = heading.split('Optical Technology');
      return (
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-[#fafaf8]">
          {parts[0]}
          <span style={{ color: 'var(--color-red-bright, #ef2929)' }}>
            Optical Technology
          </span>
          {parts[1]}
        </h2>
      );
    }

    return (
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-[#fafaf8]">
        {heading}
      </h2>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full py-8 lg:py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* ── Left Column (Sticky Introduction Panel) ── */}
        <div className="md:col-span-5 md:sticky md:top-28 self-start h-fit space-y-6 z-10">
          <div className="space-y-4">
            <span
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border"
              style={{
                backgroundColor: 'rgba(239, 41, 41, 0.12)',
                color: 'var(--color-red-bright, #ef2929)',
                borderColor: 'rgba(239, 41, 41, 0.3)',
              }}
            >
              Process & Technology
            </span>

            {renderHeading()}

            {(lede || description) && (
              <p
                className="text-base sm:text-lg leading-relaxed font-normal"
                style={{ color: 'var(--text-secondary, #c8c8d0)' }}
              >
                {lede || description}
              </p>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={resolveUrl(link?.href || '/technologies')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm sm:text-base shadow-lg transition-all hover:scale-105"
              style={{
                backgroundColor: 'var(--color-red, #d20f18)',
                color: 'var(--color-white, #fafaf8)',
                boxShadow: '0 10px 25px -5px rgba(210, 15, 24, 0.3)',
              }}
            >
              <span>{link?.label || 'Explore Technologies'}</span>
              <svg
                className="w-4 h-4"
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

        {/* ── Right Column (Sticky Process Card Stack) ── */}
        <div className="md:col-span-7 relative space-y-6 md:space-y-8">
          {/* Progress Rail Pinned to top of Right Column */}
          {!isReducedMotion && (
            <div className="sticky top-16 md:top-20 z-40 w-full mb-4 bg-zinc-800/80 h-1 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="h-full transition-all duration-150 ease-out"
                style={{
                  backgroundColor: 'var(--color-red-bright, #ef2929)',
                  width: `${progress}%`,
                }}
              />
            </div>
          )}

          {/* Process Card Array */}
          {pillars.map((pillar, idx) => {
            const rawImage =
              typeof pillar.image === 'object'
                ? pillar.image.src
                : pillar.image || DEFAULT_PLACEHOLDER_IMAGES[idx % DEFAULT_PLACEHOLDER_IMAGES.length];
            const imgSrc = rawImage ? resolveUrl(rawImage) : null;
            const linkHref = pillar.link?.href ? resolveUrl(pillar.link.href) : null;
            const theme = CARD_THEME_COLORS[idx % CARD_THEME_COLORS.length];
            const formattedNum = String(idx + 1).padStart(2, '0');

            const isCovered = coveredCards[idx];
            const isRevealed = revealedCards[idx] || isReducedMotion;

            // Sticky Top Formula: top = 88px + idx * 16px (Mobile: 64px + idx * 10px)
            const stickyStyle: React.CSSProperties = isReducedMotion
              ? {}
              : {
                  position: 'sticky',
                  top: `calc(var(--sticky-base, 88px) + ${idx} * var(--sticky-step, 16px))`,
                  zIndex: 10 + idx,
                };

            return (
              <div
                key={pillar.title}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className={`pillar-card group relative w-full overflow-hidden rounded-2xl md:rounded-[28px] shadow-2xl transition-all duration-500 ease-out min-h-[40vh] md:min-h-[60vh] flex flex-col justify-end ${
                  isCovered ? 'scale-[0.95] brightness-[0.88]' : 'scale-100 brightness-100'
                }`}
                style={{
                  ...stickyStyle,
                  marginBottom: '24px',
                  backgroundColor: '#1a1a1e',
                  border: `1px solid ${theme.border}`,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                  transition:
                    'transform 0.45s cubic-bezier(.22, .8, .3, 1), filter 0.45s cubic-bezier(.22, .8, .3, 1), opacity 0.7s ease-out',
                }}
              >
                {/* CSS Variables for Responsive Sticky Top Formula */}
                <style>{`
                  @media (max-width: 767px) {
                    .pillar-card {
                      --sticky-base: 64px;
                      --sticky-step: 10px;
                    }
                  }
                  @media (min-width: 768px) {
                    .pillar-card {
                      --sticky-base: 88px;
                      --sticky-step: 16px;
                    }
                  }
                `}</style>

                {/* Background Image & Theme Tint Overlay */}
                {imgSrc && (
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <img
                      src={imgSrc}
                      alt={pillar.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-35"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${theme.bg} opacity-90 transition-opacity duration-500`} />
                  </div>
                )}

                {/* Large Faded Process Number in Upper-Right Area */}
                <div className="absolute top-4 right-6 md:top-6 md:right-8 z-10 pointer-events-none select-none">
                  <span className="text-6xl sm:text-7xl md:text-8xl font-black text-white/20 tracking-tighter">
                    {formattedNum}
                  </span>
                </div>

                {/* Internal Content Reveal Animated Container */}
                <div
                  className={`relative z-10 w-full transition-all duration-700 ease-out ${
                    isRevealed
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-[30px]'
                  }`}
                  style={{
                    padding: 'clamp(1.25rem, 4vw, 2.5rem)',
                  }}
                >
                  <div className="space-y-4 max-w-xl">
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full shadow-lg border border-white/30 backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${theme.accent}35`,
                          color: theme.accent,
                          borderColor: `${theme.accent}60`,
                        }}
                      >
                        <Icon name={pillar.icon} size={24} />
                      </span>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#fafaf8] tracking-tight">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base md:text-lg text-[#c8c8d0] leading-relaxed font-normal">
                      {pillar.description}
                    </p>

                    {linkHref && (
                      <div className="pt-2">
                        <a
                          href={linkHref}
                          className="inline-flex items-center gap-2 text-sm sm:text-base font-bold transition-colors group/link"
                          style={{ color: theme.accent }}
                        >
                          <span className="underline decoration-2 underline-offset-4">
                            {pillar.link?.label || 'Learn More'}
                          </span>
                          <svg
                            className="w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Play / Media Button Overlay (Bottom Right) */}
                <div
                  className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full backdrop-blur-md border shadow-xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderColor: 'rgba(255, 255, 255, 0.35)',
                    color: '#fafaf8',
                  }}
                >
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7 fill-current ml-0.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
