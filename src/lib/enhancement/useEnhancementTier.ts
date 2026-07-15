import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $tier, initEnhancement } from './store';
import {
  SSR_TIER_STATE,
  TIER_0_STATIC,
  TIER_2_CINEMATIC,
  type EnhancementTier,
  type TierState,
} from './tiers';

export interface EnhancementTierResult extends TierState {
  /** TIER_0 — instant opacity only. */
  isStatic: boolean;
  /** TIER_2 — autoplay/pinning/scrubbing allowed. */
  isCinematic: boolean;
}

/**
 * Read the current enhancement tier.
 *
 * During SSR and the first client render this returns the TIER_1 baseline
 * with `detected: false`; the real tier lands after mount. (Islands hydrate
 * independently and at different times, so the store may already hold the
 * detected tier before a late island's first render — the baseline is held
 * until this component's own mount to keep SSR/client markup identical.)
 * Use it to gate BEHAVIOUR (autoplay, parallax listeners, pinning) — never
 * to gate CONTENT. Content renders identically at every tier.
 */
export function useEnhancementTier(): EnhancementTierResult {
  const stored = useStore($tier);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initEnhancement();
    setMounted(true);
  }, []);

  const state = mounted ? stored : SSR_TIER_STATE;
  return {
    ...state,
    isStatic: state.tier === TIER_0_STATIC,
    isCinematic: state.tier === TIER_2_CINEMATIC,
  };
}

export type { EnhancementTier, TierState };
