import { Icon } from '@/components/global/Icon';
import { Media } from '@/components/base/Media';
import { Reveal } from '@/components/base/Reveal';
import { ImagePlaceholder } from '@/components/base/ImagePlaceholder';
import type { ProblemCard } from '@/types/content';

/**
 * ProblemCardGrid — "Why Protection Matters" / "Driving in ASEAN is
 * Different" / "Why Home Protection Matters".
 *
 * Enhanced with:
 * - ImagePlaceholder integration for visual design and future asset placement
 * - High-contrast automotive dark-zone styling with subtle accent glow
 * - Category badges and responsive card grid
 */
export function ProblemCardGrid({
  heading,
  lede,
  cards,
  columns = 3,
}: {
  heading?: string;
  lede?: string;
  cards: ProblemCard[];
  /** Desktop column count; mobile is always 1, tablet 2. */
  columns?: 2 | 3 | 6;
}) {
  const desktopCols =
    columns === 6
      ? 'lg:grid-cols-3 xl:grid-cols-6'
      : columns === 2
        ? 'lg:grid-cols-2'
        : 'lg:grid-cols-3';

  return (
    <div>
    {(heading || lede) && (
      <div className="mx-auto mb-8 max-w-3xl text-center">
        {heading && (
          <h2 className="type-heading-lg" style={{ color: 'var(--text-primary)' }}>
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
    <ul className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${desktopCols}`}>
      {cards.map((card, i) => (
        <Reveal as="li" key={card.title} index={i} className="h-full">
          <article
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:translate-y-[-3px]"
            style={{
              background: 'var(--surface-raised, #16161a)',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
              boxShadow: 'var(--elevation-1, 0 4px 20px rgba(0,0,0,0.4))',
              backgroundImage: 'var(--depth-glow-subtle, none)',
            }}
          >
            {/* Top Image / Placeholder Banner if specified */}
            {card.placeholderLabel || card.image ? (
              <div className="mb-4 overflow-hidden rounded-xl">
                {card.image?.src ? (
                  <Media {...card.image} className="w-full h-40 object-cover rounded-xl" />
                ) : (
                  <ImagePlaceholder
                    label={card.placeholderLabel || card.title}
                    aspect="16/9"
                    dimensions="800 × 450"
                    accent="red"
                    className="w-full h-36 sm:h-40"
                  />
                )}
              </div>
            ) : null}

            {/* Header: Icon + Tag */}
            <div className="flex items-center justify-between gap-3 mb-3">
              <span
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: 'rgba(234, 34, 39, 0.12)',
                  border: '1px solid rgba(234, 34, 39, 0.28)',
                  color: 'var(--text-brand, #ef4444)',
                }}
              >
                <Icon name={card.icon} size={22} />
              </span>

              {card.tag && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-800/90 text-zinc-300 border border-zinc-700/60">
                  {card.tag}
                </span>
              )}
            </div>

            {/* Title & Description — token color so both zones stay legible */}
            <h3
              className="text-lg sm:text-xl font-bold tracking-tight leading-snug"
              style={{ color: 'var(--text-primary)' }}
            >
              {card.title}
            </h3>

            <p
              className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed flex-1"
              style={{ color: 'var(--text-secondary, #a1a1aa)' }}
            >
              {card.description}
            </p>
          </article>
        </Reveal>
      ))}
    </ul>
    </div>
  );
}
