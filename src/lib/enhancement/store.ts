/**
 * Enhancement-tier store — nanostores port of the Next.js
 * <EnhancementProvider>. Same decisions, no React context: each island
 * reads $tier directly and calls initEnhancement() on mount (idempotent).
 *
 * SSR safety: the atom starts at SSR_TIER_STATE (TIER_1). Detection runs
 * only when initEnhancement() is called from a client effect, after
 * hydration, so server and client markup are identical — no hydration
 * mismatch. Tier changes only flip CSS custom properties that drive
 * opacity/transform, so upgrading/downgrading causes zero layout shift.
 *
 * On init this store stamps the <html> element:
 *   data-enhanced        JS is alive → reveal hidden-states may apply
 *                        (no JS = attribute absent = all content visible)
 *   data-tier="0|1|2"    overrides the CSS media-query fallback
 *   data-parallax="css"  browser supports animation-timeline: view()
 *
 * Runtime frame-rate guard (optional, on by default): one measurement
 * window shortly after init; if sustained FPS is below threshold, the tier
 * drops by one and the cap persists for the session. One window, one
 * decision — no thrashing, no re-upgrades.
 */

import { atom } from 'nanostores';
import {
  detectTier,
  persistTierCap,
  parseTierOverride,
  SSR_TIER_STATE,
  TIER_0_STATIC,
  type EnhancementTier,
  type TierState,
} from './tiers';

export const $tier = atom<TierState>(SSR_TIER_STATE);

const FPS_GUARD_THRESHOLD = 50; // budget: never sustain below 50fps
const FPS_GUARD_DELAY_MS = 1500; // let hydration/first paint settle
const FPS_GUARD_WINDOW_MS = 2000; // one measurement window

function applyTierToDocument(tier: EnhancementTier) {
  const root = document.documentElement;
  root.setAttribute('data-enhanced', '');
  root.setAttribute('data-tier', String(tier));
  const cssParallax =
    tier > TIER_0_STATIC &&
    typeof CSS !== 'undefined' &&
    CSS.supports('animation-timeline: view()');
  if (cssParallax) root.setAttribute('data-parallax', 'css');
  else root.removeAttribute('data-parallax');
}

function runFrameRateGuard() {
  const state = $tier.get();
  if (state.tier === TIER_0_STATIC) return;
  if (parseTierOverride(window.location.search) !== null) return; // QA pin

  let rafId = 0;
  let frames = 0;
  let windowStart = 0;
  let cancelled = false;

  const tick = (now: number) => {
    if (cancelled) return;
    // rAF is throttled/paused in hidden tabs — a measurement taken there
    // reads ~0fps and would wrongly downgrade. Abort without a decision;
    // the guard is one-shot, so a hidden-at-load tab simply goes unguarded.
    if (document.visibilityState !== 'visible') return;
    if (windowStart === 0) windowStart = now;
    frames += 1;
    const elapsed = now - windowStart;
    if (elapsed < FPS_GUARD_WINDOW_MS) {
      rafId = requestAnimationFrame(tick);
      return;
    }
    const fps = (frames / elapsed) * 1000;
    if (fps < FPS_GUARD_THRESHOLD) {
      const prev = $tier.get();
      if (prev.tier === TIER_0_STATIC) return;
      const capped = (prev.tier - 1) as EnhancementTier;
      persistTierCap(capped);
      applyTierToDocument(capped);
      $tier.set({
        tier: capped,
        reason: `${prev.reason}; downgraded once by frame-rate guard (${fps.toFixed(0)}fps < ${FPS_GUARD_THRESHOLD})`,
        detected: true,
      });
    }
    // One window, one decision — never runs again this session.
  };

  // Hiding the tab mid-window pauses rAF; on return the elapsed gap would
  // read as low fps. Abort the measurement instead — no decision.
  const onVisibilityChange = () => {
    if (document.visibilityState !== 'visible') {
      cancelled = true;
      cancelAnimationFrame(rafId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    }
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  window.setTimeout(() => {
    rafId = requestAnimationFrame(tick);
  }, FPS_GUARD_DELAY_MS);
}

let initialized = false;

/**
 * Detect the tier, stamp <html>, publish to $tier, and arm the one-shot
 * frame-rate guard. Idempotent — every island calls it on mount; only the
 * first call does work. Client-only.
 */
export function initEnhancement(runtimeGuard = true): void {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  const detected = detectTier();
  applyTierToDocument(detected.tier);
  $tier.set(detected);

  if (runtimeGuard) runFrameRateGuard();
}
