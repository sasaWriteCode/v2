/**
 * <Reveal> — scroll-driven entrance, tier-aware.
 *
 * CONTENT SAFETY (non-negotiable rule #1): children are always in the DOM
 * and crawler-visible at every tier. The hidden state is opacity/transform
 * only, and it applies exclusively under html[data-enhanced] (set by
 * initEnhancement() after mount) — no JS, no hiding. Never conditional
 * rendering, never display/visibility toggles.
 *
 * Tier behaviour (all via CSS custom properties in tokens/motion.css):
 *   TIER_0 — --motion-duration: 0ms, --motion-scale: 0 → instant opacity.
 *   TIER_1/2 — opacity + translateY over --motion-duration.
 *
 * Stagger: pass `index` to sequence siblings; the delay collapses to 0 at
 * TIER_0 automatically.
 */

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';
import { initEnhancement } from '@/lib/enhancement/store';

interface RevealProps {
  children: ReactNode;
  /** Stagger position among siblings (delay = index × --reveal-stagger-step). */
  index?: number;
  /** IntersectionObserver rootMargin — default reveals slightly before entry. */
  rootMargin?: string;
  threshold?: number;
  as?: ElementType;
  className?: string;
}

export function Reveal({
  children,
  index = 0,
  rootMargin = '0px 0px -10% 0px',
  threshold = 0.1,
  as: Tag = 'div',
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Reveal doesn't read the tier store, but its hidden state only exists
    // under html[data-enhanced] — make sure the engine is running even on
    // pages whose only islands are Reveals.
    initEnhancement();
    const node = ref.current;
    if (!node || revealed) return;

    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true); // ancient browser: show everything, animate nothing
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(node);

    // Safety net for rule #1 (content may never be permanently hidden):
    // some embedded webviews and prerender contexts suppress IO callbacks
    // entirely. If nothing has fired within the window, reveal anyway —
    // below-fold elements simply appear without the entrance.
    const fallback = window.setTimeout(() => setRevealed(true), 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [revealed, rootMargin, threshold]);

  const style = { '--stagger-index': index } as CSSProperties;

  return (
    <Tag
      ref={ref}
      className={`reveal${revealed ? ' is-revealed' : ''}${className ? ` ${className}` : ''}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
