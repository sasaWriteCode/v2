/**
 * ModuleBrowser — the filterable module/episode list (Module 1–10).
 *
 * URL-state contract (same pattern as PrioritySelector):
 * - Every module is server-rendered into the DOM. Without JS all of them
 *   are visible — filtering is an enhancement, never an existence gate.
 * - The active filter lives in ?module=<id> via history.replaceState:
 *   shareable, survives reload, no navigation.
 */

import { useEffect, useState } from 'react';
import type { ModuleBrowserContent } from '@/types/sections';

const PARAM = 'module';

export default function ModuleBrowser({
  heading,
  lede,
  allLabel,
  modules,
}: ModuleBrowserContent) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    setEnhanced(true);
    const fromUrl = new URLSearchParams(window.location.search).get(PARAM);
    if (fromUrl && modules.some((m) => m.id === fromUrl)) setActiveId(fromUrl);
  }, [modules]);

  const select = (id: string | null) => {
    setActiveId(id);
    const url = new URL(window.location.href);
    if (id) url.searchParams.set(PARAM, id);
    else url.searchParams.delete(PARAM);
    window.history.replaceState(window.history.state, '', url);
  };

  const visible = enhanced && activeId ? modules.filter((m) => m.id === activeId) : modules;

  return (
    <div>
      {heading && <h2 className="type-heading-lg">{heading}</h2>}
      {lede && (
        <p className="type-body-md mt-2 max-w-article" style={{ color: 'var(--text-secondary)' }}>
          {lede}
        </p>
      )}

      <div
        role="group"
        aria-label={heading ?? allLabel}
        className="mt-6 flex flex-wrap gap-2"
      >
        <button
          type="button"
          aria-pressed={activeId === null}
          onClick={() => select(null)}
          className="type-body-sm rounded-full px-4 py-1.5 font-medium"
          style={
            activeId === null
              ? { background: 'var(--color-red)', color: 'var(--color-white)' }
              : { border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }
          }
        >
          {allLabel}
        </button>
        {modules.map((module) => (
          <button
            key={module.id}
            type="button"
            aria-pressed={activeId === module.id}
            onClick={() => select(module.id === activeId ? null : module.id)}
            className="type-body-sm rounded-full px-4 py-1.5 font-medium"
            style={
              activeId === module.id
                ? { background: 'var(--color-red)', color: 'var(--color-white)' }
                : { border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }
            }
          >
            {module.title}
          </button>
        ))}
      </div>

      <ol className="mt-6 grid list-none gap-4 p-0">
        {visible.map((module) => (
          <li key={module.id}>
            <article
              className="rounded-lg p-5"
              style={{
                background: 'var(--surface-raised)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--elevation-1)',
              }}
            >
              <div className="flex items-baseline gap-3">
                <span className="numeric type-heading-md" style={{ color: 'var(--text-brand)' }}>
                  {String(module.number).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="type-heading-sm">{module.title}</h3>
                  {module.description && (
                    <p className="type-body-sm" style={{ color: 'var(--text-secondary)' }}>
                      {module.description}
                    </p>
                  )}
                </div>
              </div>
              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {module.episodes.map((episode) => (
                  <li
                    key={episode.title}
                    className="type-body-sm flex items-baseline justify-between gap-3"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {episode.href ? (
                      <a href={episode.href} style={{ color: 'var(--text-brand)' }}>
                        {episode.title}
                      </a>
                    ) : (
                      <span>{episode.title}</span>
                    )}
                    {episode.duration && (
                      <span className="type-caption numeric" style={{ color: 'var(--text-muted)' }}>
                        {episode.duration}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
