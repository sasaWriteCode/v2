/**
 * ProjectStrip — horizontal project cards (Porsche 911 KL, Menara Office
 * Tower, OCBC Bank Tower…), optionally filterable by category tab.
 *
 * - Mobile/desktop scrolling is NATIVE horizontal scroll with snap
 *   (.snap-strip) — never a JS carousel, touch is never intercepted.
 * - Filters default to "All", so every project is in the SSR DOM; filtering
 *   is a user action (allowed to change what's shown — that's not tier/
 *   scroll-gated content).
 */

import { useState } from 'react';
import { Icon } from '@/components/global/Icon';
import { Media } from '@/components/base/Media';
import type { ProjectItem } from '@/types/content';

const ALL = 'All';

const BADGE_TONE: Record<string, string> = {
  featured: 'badge-brand',
  progress: 'badge-progress',
  achievement: 'badge-achievement',
};

export function ProjectStrip({
  projects,
  filters = false,
  scrollable = true,
}: {
  projects: ProjectItem[];
  /** Show category tabs derived from project.category. */
  filters?: boolean;
  /** false = wrap into a grid instead of a snap strip. */
  scrollable?: boolean;
}) {
  const categories = [
    ALL,
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ] as string[];
  const [active, setActive] = useState(ALL);
  const visible =
    active === ALL ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      {filters && categories.length > 2 && (
        <div
          role="group"
          aria-label="Filter projects by category"
          className="mb-5 flex flex-wrap gap-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={active === category}
              onClick={() => setActive(category)}
              className="type-body-sm rounded-full px-4 py-1.5 font-medium"
              style={
                active === category
                  ? { background: 'var(--color-red)', color: 'var(--color-white)' }
                  : {
                      border: '1px solid var(--border-default)',
                      color: 'var(--text-secondary)',
                    }
              }
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <ul
        className={
          scrollable
            ? 'snap-strip'
            : 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'
        }
      >
        {visible.map((project) => (
          <li
            key={project.name}
            className={scrollable ? 'w-[16.5rem] sm:w-[18.5rem]' : undefined}
          >
            <article
              className="grid h-full content-start overflow-hidden rounded-lg"
              style={{
                background: 'var(--surface-raised)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--elevation-1)',
              }}
            >
              <div className="relative">
                <Media {...project.image} className="w-full object-cover" />
                {project.badge && (
                  <span
                    className={`badge ${BADGE_TONE[project.badge.tone ?? 'featured']} absolute left-3 top-3`}
                  >
                    {project.badge.label}
                  </span>
                )}
              </div>
              <div className="grid gap-2 p-4">
                <h3 className="type-heading-sm">{project.name}</h3>
                <p
                  className="type-caption flex items-center gap-1.5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Icon name="pin" size={14} />
                  {project.location}
                </p>
                {project.productsUsed && project.productsUsed.length > 0 && (
                  <p className="type-body-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="font-semibold">Films:</span>{' '}
                    {project.productsUsed.join(', ')}
                  </p>
                )}
                {project.benefit && (
                  <p className="type-body-sm" style={{ color: 'var(--text-secondary)' }}>
                    {project.benefit}
                  </p>
                )}
                {project.cta && (
                  <a
                    href={project.cta.href}
                    className="type-body-sm mt-1 font-semibold underline"
                    style={{ color: 'var(--text-brand)' }}
                  >
                    {project.cta.label}
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
