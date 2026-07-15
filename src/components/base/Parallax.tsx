/**
 * <Parallax> — depth-token-driven parallax layer. CHEAP tier-1 cinema:
 * ships everywhere, including mobile.
 *
 *   - transform: translate3d only — compositor work, no layout, no paint
 *   - Prefers CSS scroll-driven animation (animation-timeline: view());
 *     the JS fallback only attaches where that's unsupported
 *   - JS fallback: passive scroll listener, rAF-throttled, writes a single
 *     CSS custom property (--parallax-shift)
 *   - No-ops entirely at TIER_0 (and --parallax-scale: 0 kills both paths
 *     in CSS even before hydration)
 *   - NEVER intercepts or re-times native scroll
 *
 * Depth tokens: far moves least. near 0.24 · mid 0.12 · far 0.05.
 */

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';
import { useEnhancementTier } from '@/lib/enhancement/useEnhancementTier';

export type ParallaxDepth = 'near' | 'mid' | 'far';

const DEPTH_MULTIPLIER: Record<ParallaxDepth, number> = {
  near: 0.24,
  mid: 0.12,
  far: 0.05,
};

interface ParallaxProps {
  children: ReactNode;
  depth?: ParallaxDepth;
  as?: ElementType;
  className?: string;
}

export function Parallax({
  children,
  depth = 'mid',
  as: Tag = 'div',
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { tier, detected, isStatic } = useEnhancementTier();

  useEffect(() => {
    const node = ref.current;
    if (!node || !detected || isStatic) return;
    // CSS scroll-driven animations available → zero-JS path, nothing to do.
    if (document.documentElement.getAttribute('data-parallax') === 'css') return;

    const multiplier = DEPTH_MULTIPLIER[depth];
    let rafId = 0;
    let scheduled = false;

    const update = () => {
      scheduled = false;
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      // Distance from viewport centre drives the shift; far layers barely move.
      const shift = (viewportCenter - elementCenter) * multiplier;
      node.style.setProperty('--parallax-shift', `${shift.toFixed(1)}px`);
    };

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
      node.style.removeProperty('--parallax-shift');
    };
  }, [depth, detected, isStatic, tier]);

  const style = {
    '--parallax-depth': `var(--parallax-${depth})`,
  } as CSSProperties;

  return (
    <Tag
      ref={ref}
      className={`parallax-layer${className ? ` ${className}` : ''}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
