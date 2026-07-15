import { Icon } from '@/components/global/Icon';
import { Reveal } from '@/components/base/Reveal';
import type { TechPillar } from '@/types/content';

/**
 * TechPillarGrid — the recurring technology pillars band (UV+420™,
 * 6-Layer Hotmelt™, Multi-Layer Sputtering, Rigorous Testing, Professional
 * Installation, eWarranty…). Zone-agnostic via semantic tokens.
 */
export function TechPillarGrid({
  pillars,
  columns = 5,
}: {
  pillars: TechPillar[];
  /** Desktop column count; wraps 1/2-col below. */
  columns?: 3 | 4 | 5 | 6;
}) {
  const desktopCols = {
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
  }[columns];

  return (
    <ul className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${desktopCols}`}>
      {pillars.map((pillar, i) => (
        <Reveal as="li" key={pillar.title} index={i}>
          <div className="grid h-full content-start justify-items-start gap-2 sm:justify-items-center sm:text-center">
            <span
              className="inline-flex h-12 w-12 items-center justify-center rounded-full"
              style={{
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
              }}
            >
              <Icon name={pillar.icon} size={24} />
            </span>
            <h3 className="type-heading-sm">{pillar.title}</h3>
            <p className="type-body-sm" style={{ color: 'var(--text-secondary)' }}>
              {pillar.description}
            </p>
            {pillar.link && (
              <a
                href={pillar.link.href}
                className="type-body-sm font-semibold underline"
                style={{ color: 'var(--text-brand)' }}
              >
                {pillar.link.label}
              </a>
            )}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
