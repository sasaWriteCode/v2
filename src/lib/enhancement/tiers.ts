/**
 * IrisPro V2 — Enhancement tier model (single source of truth, JS side).
 *
 * ██ Cinematic changes HOW content appears, never WHETHER it exists. ██
 * A tier decides which *behaviours* run (parallax, autoplay, pinning) —
 * never which content renders. Any component rendering content only at
 * TIER_2 is a bug.
 *
 * TIER_0_STATIC     reduced-motion OR saveData OR slow-2g/2g
 *                   → instant opacity only; no parallax, no sequences.
 * TIER_1_MOTION     DEFAULT (including all mobile)
 *                   → parallax, scroll reveals, stagger, scroll progress.
 *                     Media = poster + tap-to-play. Native scroll always.
 * TIER_2_CINEMATIC  TIER_1 conditions AND fine pointer AND ≥1024px AND
 *                   effectiveType 4g/unknown
 *                   → + autoplay video, pinned sections, image-sequence
 *                     scrubbing, multi-layer composition.
 *
 * The CSS mirror of these rules lives in tokens/motion.css (media queries
 * for reduced-motion and pointer/width), so first paint is tier-appropriate
 * before this code ever runs. CSS cannot observe saveData/effectiveType;
 * this module refines the decision on mount via html[data-tier].
 */

export const TIER_0_STATIC = 0;
export const TIER_1_MOTION = 1;
export const TIER_2_CINEMATIC = 2;

export type EnhancementTier = 0 | 1 | 2;

export interface TierState {
  tier: EnhancementTier;
  /** Human-readable explanation of why this tier was chosen (QA aid). */
  reason: string;
  /** True once client-side detection has run (false during SSR/first paint). */
  detected: boolean;
}

/** SSR baseline — the server always renders TIER_1 assumptions. */
export const SSR_TIER_STATE: TierState = {
  tier: TIER_1_MOTION,
  reason: 'SSR baseline (detection runs on mount)',
  detected: false,
};

/** sessionStorage key for the one-shot runtime FPS downgrade. */
export const TIER_CAP_STORAGE_KEY = 'irispro:tier-cap';

interface NetworkInformationLike {
  saveData?: boolean;
  effectiveType?: string;
}

function connection(): NetworkInformationLike | undefined {
  if (typeof navigator === 'undefined') return undefined;
  return (navigator as Navigator & { connection?: NetworkInformationLike })
    .connection;
}

/** Parse a ?tier=0|1|2 QA/demo override from a query string. */
export function parseTierOverride(search: string): EnhancementTier | null {
  const raw = new URLSearchParams(search).get('tier');
  if (raw === '0' || raw === '1' || raw === '2') {
    return Number(raw) as EnhancementTier;
  }
  return null;
}

/** Read a persisted runtime-guard downgrade cap, if any. */
export function readTierCap(): EnhancementTier | null {
  try {
    const raw = window.sessionStorage.getItem(TIER_CAP_STORAGE_KEY);
    if (raw === '0' || raw === '1') return Number(raw) as EnhancementTier;
  } catch {
    /* storage unavailable (private mode etc.) — no cap */
  }
  return null;
}

export function persistTierCap(cap: EnhancementTier): void {
  try {
    window.sessionStorage.setItem(TIER_CAP_STORAGE_KEY, String(cap));
  } catch {
    /* non-fatal */
  }
}

/**
 * Detect the enhancement tier. Client-only; call on mount.
 * Precedence: URL override > TIER_0 conditions > TIER_2 conditions > TIER_1.
 * A persisted FPS-guard cap bounds the result (never raises it).
 */
export function detectTier(): TierState {
  const override = parseTierOverride(window.location.search);
  if (override !== null) {
    return {
      tier: override,
      reason: `URL override ?tier=${override}`,
      detected: true,
    };
  }

  const conn = connection();

  // TIER_0 gates
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return { tier: TIER_0_STATIC, reason: 'prefers-reduced-motion: reduce', detected: true };
  }
  if (conn?.saveData) {
    return { tier: TIER_0_STATIC, reason: 'Data Saver enabled (navigator.connection.saveData)', detected: true };
  }
  if (conn?.effectiveType === 'slow-2g' || conn?.effectiveType === '2g') {
    return { tier: TIER_0_STATIC, reason: `Connection effectiveType: ${conn.effectiveType}`, detected: true };
  }

  const cap = readTierCap();

  // TIER_2 gates
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const wideEnough = window.matchMedia('(min-width: 1024px)').matches;
  const fastEnough = conn?.effectiveType === undefined || conn.effectiveType === '4g';

  if (finePointer && wideEnough && fastEnough) {
    if (cap !== null && cap < TIER_2_CINEMATIC) {
      return {
        tier: cap,
        reason: `TIER_2 conditions met, capped at ${cap} by runtime frame-rate guard`,
        detected: true,
      };
    }
    return {
      tier: TIER_2_CINEMATIC,
      reason: `fine pointer + ≥1024px + effectiveType ${conn?.effectiveType ?? 'unknown'}`,
      detected: true,
    };
  }

  if (cap !== null && cap < TIER_1_MOTION) {
    return {
      tier: cap,
      reason: `TIER_1 default, capped at ${cap} by runtime frame-rate guard`,
      detected: true,
    };
  }

  const why: string[] = [];
  if (!finePointer) why.push('coarse pointer');
  if (!wideEnough) why.push('viewport < 1024px');
  if (!fastEnough) why.push(`effectiveType ${conn?.effectiveType}`);
  return {
    tier: TIER_1_MOTION,
    reason: `default motion tier (${why.join(', ')})`,
    detected: true,
  };
}
