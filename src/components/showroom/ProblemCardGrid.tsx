import { Icon } from '@/components/global/Icon';
import { Media } from '@/components/base/Media';
import { Reveal } from '@/components/base/Reveal';
import type { ProblemCard } from '@/types/content';

/**
 * ProblemCardGrid — "Why Protection Matters" / "Driving in ASEAN is
 * Different" / "Why Home Protection Matters". Works in either zone.
 *
 * Staggered reveal at TIER_1+ (Reveal indexes); simultaneous-instant at
 * TIER_0 (stagger collapses with --motion-scale: 0). Images lazy and
 * dimensioned — no CLS.
 */
export function ProblemCardGrid({
  cards,
  columns = 3,
}: {
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
    <ul className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${desktopCols}`}>
      {cards.map((card, i) => (
        <Reveal as="li" key={card.title} index={i} className="h-full">
          <article
            className="grid h-full content-start gap-3 overflow-hidden rounded-lg p-5"
            style={{
              background: 'var(--surface-raised)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--elevation-1)',
              backgroundImage: 'var(--depth-glow-subtle)',
            }}
          >
            <span
              className="inline-flex h-11 w-11 items-center justify-center rounded-full"
              style={{
                border: '1px solid var(--border-default)',
                color: 'var(--text-brand)',
              }}
            >
              <Icon name={card.icon} size={22} />
            </span>
            <h3 className="type-heading-sm">{card.title}</h3>
            <p className="type-body-sm" style={{ color: 'var(--text-secondary)' }}>
              {card.description}
            </p>
            {card.image && (
              <div className="-mx-5 -mb-5 mt-2">
                <Media {...card.image} className="w-full object-cover" />
              </div>
            )}
          </article>
        </Reveal>
      ))}
    </ul>
  );
}
