/**
 * ProofStatBar — the recurring numbers band ("Up to 10°C", "99.99% UV400",
 * "20,000+ Vehicles", "1.2 Tons CO₂"…).
 *
 * Count-up is a TIER_1+ flourish with a content-safety contract: the FINAL
 * value is the server-rendered text (crawlers and TIER_0 always see the real
 * number). On intersect at TIER_1+, the numeric portion re-runs from 0 —
 * text swap only, width reserved in ch so nothing shifts.
 */

import { useEffect, useRef, useState } from 'react';
import { useEnhancementTier } from '@/lib/enhancement/useEnhancementTier';
import type { StatItem } from '@/types/content';

const COUNT_DURATION_MS = 900;

function parseNumeric(value: string) {
  const match = /^([\d.,]+)(.*)$/.exec(value);
  if (!match) return null;
  const numeric = Number(match[1].replace(/,/g, ''));
  if (!Number.isFinite(numeric)) return null;
  const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0;
  const grouped = match[1].includes(',');
  return { numeric, decimals, grouped, suffix: match[2] };
}

function formatNumeric(n: number, decimals: number, grouped: boolean) {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  });
}

function StatValue({ value }: { value: string }) {
  const { isStatic, detected } = useEnhancementTier();
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value); // SSR = final value
  const ran = useRef(false);

  useEffect(() => {
    const node = ref.current;
    const parsed = parseNumeric(value);
    if (!node || !parsed || !detected || isStatic || ran.current) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting) || ran.current) return;
      ran.current = true;
      observer.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / COUNT_DURATION_MS);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(
          formatNumeric(parsed.numeric * eased, parsed.decimals, parsed.grouped) +
            parsed.suffix,
        );
        if (t < 1) requestAnimationFrame(step);
        else setDisplay(value);
      };
      requestAnimationFrame(step);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, detected, isStatic]);

  return (
    <span
      ref={ref}
      className="numeric inline-block"
      style={{ minWidth: `${value.length}ch` }}
    >
      {display}
    </span>
  );
}

export function ProofStatBar({
  stats,
  variant,
}: {
  stats: StatItem[];
  /** Optional zone override for the band; omit to inherit the ambient zone. */
  variant?: 'light' | 'dark';
}) {
  const footnotes = stats.filter((s) => s.footnote);

  return (
    <div
      data-zone={
        variant === 'dark' ? 'showroom' : variant === 'light' ? 'workshop' : undefined
      }
      className="rounded-lg px-6 py-8"
      style={{
        border: '1px solid var(--border-subtle)',
        backgroundImage: 'var(--depth-glow-subtle)',
      }}
    >
      <dl className="grid grid-cols-2 gap-x-4 gap-y-8 text-center sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="grid content-start gap-1">
            {/* dt precedes dd in the DOM (valid dl grouping); CSS order
                puts the value visually first. */}
            <dt className="type-body-sm order-2" style={{ color: 'var(--text-secondary)' }}>
              {stat.label}
            </dt>
            <dd className="type-display-md order-1" style={{ color: 'var(--text-brand)' }}>
              <StatValue value={stat.value} />
              {stat.unit && (
                <span className="type-heading-md ml-1" style={{ color: 'var(--text-primary)' }}>
                  {stat.unit}
                </span>
              )}
              {stat.footnote && <sup aria-hidden="true">*</sup>}
            </dd>
          </div>
        ))}
      </dl>
      {footnotes.length > 0 && (
        <ul className="mt-6 grid gap-1">
          {footnotes.map((stat) => (
            <li key={stat.label} className="type-caption" style={{ color: 'var(--text-muted)' }}>
              *{stat.footnote}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
