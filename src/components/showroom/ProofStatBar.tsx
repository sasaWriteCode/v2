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
import { Icon } from '@/components/global/Icon';
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
  heading,
  lede,
  stats,
  variant,
  footnote,
}: {
  heading?: string;
  lede?: string;
  stats: StatItem[];
  /** Optional zone override for the band; omit to inherit the ambient zone. */
  variant?: 'light' | 'dark';
  /** Single shared disclaimer; pairs with StatItem.mark asterisks. */
  footnote?: string;
}) {
  const perStatFootnotes = stats.filter((s) => s.footnote);

  /* Accent helpers — default keeps the classic brand-red numbers, so pages
     without accents render exactly as before. -bright variants are the AA
     choice on dark surfaces, -text on light. */
  const accentColor = (accent?: string) =>
    !accent || accent === 'neutral'
      ? 'var(--text-brand)'
      : variant === 'light'
        ? `var(--accent-${accent}-text, var(--text-brand))`
        : `var(--accent-${accent}-bright, var(--text-brand))`;
  const accentRaw = (accent?: string) =>
    !accent || accent === 'neutral'
      ? 'var(--color-red)'
      : `var(--accent-${accent}, var(--color-red))`;

  return (
    <div
      data-zone={
        variant === 'dark' ? 'showroom' : variant === 'light' ? 'workshop' : undefined
      }
      className="rounded-xl px-6 py-10 sm:px-10"
      style={{
        border: '1px solid var(--border-subtle)',
        backgroundImage: 'var(--depth-glow-subtle)',
      }}
    >
      {(heading || lede) && (
        <div className="mx-auto mb-10 max-w-3xl text-center">
          {heading && (
            <h2 className="type-heading-md" style={{ color: 'var(--text-primary)' }}>
              {heading}
            </h2>
          )}
          {lede && (
            <p className="type-body-md mt-2" style={{ color: 'var(--text-secondary)' }}>
              {lede}
            </p>
          )}
        </div>
      )}

      {/* Flex, not a fixed 5-col grid — any stat count centers and balances
          without leaving empty columns. */}
      <dl className="flex flex-wrap justify-center gap-x-4 gap-y-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="grid min-w-[9.5rem] max-w-[16rem] flex-1 basis-44 content-start justify-items-center gap-2 px-2 text-center"
          >
            {/* dt precedes dd in the DOM (valid dl grouping); CSS order
                puts the icon + value visually first. */}
            <dt
              className="type-body-sm order-3"
              style={{ color: 'var(--text-secondary)' }}
            >
              {stat.label}
            </dt>
            {stat.icon && (
              <span
                aria-hidden="true"
                className="order-1 grid h-12 w-12 place-items-center rounded-full"
                style={{
                  background: `color-mix(in srgb, ${accentRaw(stat.accent)} 15%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${accentRaw(stat.accent)} 32%, transparent)`,
                  color: accentColor(stat.accent),
                }}
              >
                <Icon name={stat.icon} size={22} />
              </span>
            )}
            <dd
              className="type-display-md order-2"
              style={{ color: accentColor(stat.accent) }}
            >
              <StatValue value={stat.value} />
              {stat.unit && (
                <span className="type-heading-md ml-1" style={{ color: 'var(--text-primary)' }}>
                  {stat.unit}
                </span>
              )}
              {(stat.footnote || stat.mark) && (
                <sup
                  aria-hidden="true"
                  className="type-body-sm ml-0.5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  *
                </sup>
              )}
            </dd>
          </div>
        ))}
      </dl>

      {footnote ? (
        <p
          className="type-caption mx-auto mt-8 max-w-2xl text-center"
          style={{ color: 'var(--text-muted)' }}
        >
          *{footnote}
        </p>
      ) : (
        perStatFootnotes.length > 0 && (
          <ul className="mt-6 grid gap-1">
            {perStatFootnotes.map((stat) => (
              <li key={stat.label} className="type-caption" style={{ color: 'var(--text-muted)' }}>
                *{stat.footnote}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
