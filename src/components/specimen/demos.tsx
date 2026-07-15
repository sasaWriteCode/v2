/**
 * Client-side demos for the /design-system specimen:
 * tier indicator, live parallax, reveal/stagger, duration & easing demos.
 */

import { useState, type CSSProperties } from 'react';
import { Parallax } from '@/components/base/Parallax';
import { Reveal } from '@/components/base/Reveal';
import { useEnhancementTier } from '@/lib/enhancement/useEnhancementTier';

const TIER_LABELS: Record<number, string> = {
  0: 'TIER_0_STATIC — instant opacity only',
  1: 'TIER_1_MOTION — parallax, reveals, stagger (default, incl. mobile)',
  2: 'TIER_2_CINEMATIC — + autoplay, pinning, scrubbing',
};

export function TierIndicator() {
  const { tier, reason, detected } = useEnhancementTier();
  return (
    <div
      style={{
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        display: 'grid',
        gap: 'var(--space-2)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <span
          aria-hidden="true"
          style={{
            width: '0.75rem',
            height: '0.75rem',
            borderRadius: 'var(--radius-full)',
            background:
              tier === 2
                ? 'var(--data-positive)'
                : tier === 1
                  ? 'var(--data-warning)'
                  : 'var(--data-neutral)',
          }}
        />
        <strong className="type-heading-md numeric">
          Detected tier: {detected ? tier : '… (detecting)'}
        </strong>
      </div>
      <p className="type-body-md" style={{ color: 'var(--text-secondary)' }}>
        {TIER_LABELS[tier]}
      </p>
      <p className="type-body-sm" style={{ color: 'var(--text-muted)' }}>
        Reason: {reason}
      </p>
      <p className="type-body-sm" style={{ color: 'var(--text-muted)' }}>
        QA override:{' '}
        <a href="?tier=0" style={{ textDecoration: 'underline' }}>?tier=0</a>{' · '}
        <a href="?tier=1" style={{ textDecoration: 'underline' }}>?tier=1</a>{' · '}
        <a href="?tier=2" style={{ textDecoration: 'underline' }}>?tier=2</a>{' · '}
        <a href="?" style={{ textDecoration: 'underline' }}>auto</a>
      </p>
    </div>
  );
}

export function ParallaxDemo() {
  const layer: CSSProperties = {
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-4) var(--space-6)',
    fontWeight: 600,
  };
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--surface-raised)',
        border: '1px solid var(--border-subtle)',
        padding: 'var(--space-16) var(--space-6)',
        display: 'grid',
        gap: 'var(--space-6)',
        justifyItems: 'start',
      }}
    >
      <Parallax depth="far">
        <div style={{ ...layer, background: 'var(--color-neutral-100)', color: 'var(--color-neutral-500)' }}>
          far — multiplier 0.05 (moves least)
        </div>
      </Parallax>
      <Parallax depth="mid">
        <div style={{ ...layer, background: 'var(--color-red-tint)', color: 'var(--color-red-strong)' }}>
          mid — multiplier 0.12
        </div>
      </Parallax>
      <Parallax depth="near">
        <div style={{ ...layer, background: 'var(--color-red)', color: 'var(--color-white)' }}>
          near — multiplier 0.24 (moves most)
        </div>
      </Parallax>
      <p className="type-body-sm" style={{ color: 'var(--text-muted)' }}>
        Scroll the page — transform-only, passive, rAF-throttled. Uses CSS
        animation-timeline: view() where supported. No-op at TIER_0.
      </p>
    </div>
  );
}

export function RevealDemo() {
  const [runId, setRunId] = useState(0);
  const items = ['Sequenced', 'staggered', 'entrances', 'are', 'cheap cinema'];
  return (
    <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }} key={runId}>
        {items.map((label, i) => (
          <Reveal key={label} index={i}>
            <span
              style={{
                display: 'inline-block',
                padding: 'var(--space-3) var(--space-5)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--surface-raised)',
                border: '1px solid var(--border-default)',
                boxShadow: 'var(--elevation-1)',
                fontWeight: 600,
              }}
            >
              {label}
            </span>
          </Reveal>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setRunId((n) => n + 1)}
        style={{
          justifySelf: 'start',
          padding: 'var(--space-2) var(--space-4)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-strong)',
          background: 'transparent',
          color: 'var(--text-primary)',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Replay stagger
      </button>
      <p className="type-body-sm" style={{ color: 'var(--text-muted)' }}>
        Children are in the DOM at load — the hidden state only exists under
        html[data-enhanced]. At TIER_0 this is an instant opacity swap.
      </p>
    </div>
  );
}

const DURATIONS = [
  ['fast', '150ms'],
  ['base', '250ms'],
  ['slow', '400ms'],
  ['cinematic', '800ms'],
] as const;

const EASINGS = [
  ['standard', 'var(--ease-standard)'],
  ['decelerate', 'var(--ease-decelerate)'],
  ['accelerate', 'var(--ease-accelerate)'],
  ['cinematic', 'var(--ease-cinematic)'],
] as const;

export function MotionDemo() {
  const [go, setGo] = useState(false);
  return (
    <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
      <button
        type="button"
        onClick={() => setGo((v) => !v)}
        style={{
          justifySelf: 'start',
          padding: 'var(--space-3) var(--space-6)',
          borderRadius: 'var(--radius-md)',
          border: 'none',
          background: 'var(--color-red)',
          color: 'var(--color-white)',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {go ? 'Reset' : 'Run'} duration × easing matrix
      </button>
      <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
        {EASINGS.map(([easeName, ease]) => (
          <div key={easeName} style={{ display: 'grid', gap: 'var(--space-1)' }}>
            <span className="type-caption" style={{ color: 'var(--text-muted)' }}>
              {easeName}
            </span>
            <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
              {DURATIONS.map(([durName, dur]) => (
                <div
                  key={durName}
                  style={{
                    position: 'relative',
                    height: '1.75rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--surface-sunken)',
                  }}
                >
                  <span
                    className="type-caption numeric"
                    style={{
                      position: 'absolute',
                      left: 'var(--space-2)',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-muted)',
                      zIndex: 1,
                    }}
                  >
                    {durName} {dur}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '0.25rem',
                      left: '0.25rem',
                      width: '1.25rem',
                      height: '1.25rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--color-red)',
                      transform: go
                        ? 'translate3d(min(60vw, 28rem), 0, 0)'
                        : 'translate3d(0, 0, 0)',
                      transition: `transform ${dur} ${ease}`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="type-body-sm" style={{ color: 'var(--text-muted)' }}>
        All motion is opacity + transform only. Layout properties never animate.
      </p>
    </div>
  );
}
