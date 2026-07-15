import { Icon } from '@/components/global/Icon';
import { Media } from '@/components/base/Media';
import { Parallax } from '@/components/base/Parallax';
import { Reveal } from '@/components/base/Reveal';
import type { CinematicHeroContent } from '@/types/content';

/**
 * CinematicHero — the dark-zone page opener (Home, all solution pages,
 * Technologies). Render inside <Zone zone="showroom">.
 *
 * - headlineLines render inside ONE <h1>; breaks are presentational
 *   (block-level spans separated by whitespace), so the accessible name is
 *   the continuous string.
 * - Media parallaxes at TIER_1+ (far depth — backgrounds move least) and
 *   only autoplays video at TIER_2 (<Media> enforces poster + tap-to-play
 *   below that).
 * - The benefit strip wraps; it never becomes a horizontal scroller.
 */
export function CinematicHero({
  eyebrow,
  headlineLines,
  subhead,
  benefits,
  ctas,
  media,
  accent,
  comparison,
}: CinematicHeroContent) {
  const accentVar = accent
    ? `var(--accent-${accent}-bright)`
    : 'var(--text-brand)';

  return (
    <header className="relative overflow-hidden section-y-loose">
      {media && (
        <Parallax depth="far" className="absolute inset-0">
          <div className="absolute inset-[-8%]">
            <Media {...media} priority className="h-full w-full object-cover" />
            {/* Luminosity depth, not shadows — showroom rule */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(100deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.62) 45%, rgba(10,10,10,0.28) 100%)',
              }}
            />
          </div>
        </Parallax>
      )}

      <div className="container relative grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
        <div>
          {eyebrow && (
            <Reveal as="p" index={0} className="type-overline" >
              <span style={{ color: accentVar }}>{eyebrow}</span>
            </Reveal>
          )}

          <Reveal index={1}>
            <h1 className="type-display-xl mt-4" style={{ color: 'var(--text-primary)' }}>
              {headlineLines.map((line, i) => (
                // Trailing space keeps the accessible name one continuous
                // string ("…Protection Engineered…"); the span is block-level
                // so the space never renders.
                <span key={i} className="block">
                  {i < headlineLines.length - 1 ? `${line} ` : line}
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal index={2}>
            <p
              className="type-body-lg mt-6 max-w-[46ch]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {subhead}
            </p>
          </Reveal>

          {ctas && ctas.length > 0 && (
            <Reveal index={3} className="mt-8 flex flex-wrap gap-3">
              {ctas.map((cta) => (
                <a
                  key={cta.href + cta.label}
                  href={cta.href}
                  className="type-body-sm inline-flex items-center gap-2 rounded-md px-6 py-3 font-semibold"
                  style={
                    cta.variant === 'secondary' || cta.variant === 'ghost'
                      ? {
                          border: '1px solid var(--border-strong)',
                          color: 'var(--text-primary)',
                        }
                      : {
                          background: 'var(--color-red)',
                          color: 'var(--color-white)',
                        }
                  }
                >
                  {cta.label}
                </a>
              ))}
            </Reveal>
          )}

          {benefits && benefits.length > 0 && (
            <Reveal
              as="ul"
              index={4}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
            >
              {benefits.map((benefit) => (
                <li
                  key={benefit.label}
                  className="type-body-sm flex items-center gap-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span style={{ color: accentVar }}>
                    <Icon name={benefit.icon} size={18} />
                  </span>
                  {benefit.label}
                </li>
              ))}
            </Reveal>
          )}
        </div>

        {comparison && (
          <Reveal index={5}>
            <div
              className="grid grid-cols-2 overflow-hidden rounded-lg"
              style={{ border: '1px solid var(--border-default)' }}
            >
              {(
                [
                  [comparison.without, 'var(--color-red-soft)', 'without'],
                  [comparison.with, 'var(--accent-sustainability-bright)', 'with'],
                ] as const
              ).map(([side, tone, key]) => (
                <div
                  key={key}
                  className="grid content-start gap-2 p-5"
                  style={{
                    background:
                      key === 'with' ? 'var(--surface-raised)' : 'transparent',
                  }}
                >
                  <p className="type-overline" style={{ color: tone }}>
                    {side.label}
                  </p>
                  <ul className="grid gap-1">
                    {side.points.map((point) => (
                      <li
                        key={point}
                        className="type-body-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </header>
  );
}
