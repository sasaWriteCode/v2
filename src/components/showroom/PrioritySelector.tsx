/**
 * PrioritySelector — the "What Matters Most To You?" 6-way self-selector.
 * A lead-qualification device, so the state is a first-class URL:
 *
 * - Selection writes ?priority=<id> via history.replaceState (shareable,
 *   no navigation, native scroll untouched).
 * - On mount, an existing ?priority= in the URL restores the selection.
 * - Real <button>s with aria-pressed inside a labelled group.
 * - EVERY recommendation is server-rendered into the DOM. Without JS
 *   (no html[data-enhanced]) all of them are visible under their option
 *   labels; with JS, CSS collapses the non-selected ones. Content never
 *   depends on the interaction to exist.
 */

import { useEffect, useState } from 'react';
import { Icon } from '@/components/global/Icon';
import type { PriorityOption } from '@/types/content';

const PARAM = 'priority';

export function PrioritySelector({
  legend,
  options,
  hint,
}: {
  legend: string;
  options: PriorityOption[];
  hint?: string;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Restore shareable state from the URL after mount (SSR renders none).
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get(PARAM);
    if (fromUrl && options.some((o) => o.id === fromUrl)) {
      setSelectedId(fromUrl);
    }
  }, [options]);

  const select = (id: string) => {
    const next = id === selectedId ? null : id;
    setSelectedId(next);
    const url = new URL(window.location.href);
    if (next) url.searchParams.set(PARAM, next);
    else url.searchParams.delete(PARAM);
    window.history.replaceState(window.history.state, '', url);
  };

  return (
    <section aria-label={legend}>
      <div role="group" aria-label={legend}>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {options.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                className="priority-option h-full w-full"
                aria-pressed={selectedId === option.id}
                aria-expanded={selectedId === option.id}
                aria-controls={`priority-rec-${option.id}`}
                onClick={() => select(option.id)}
              >
                <span
                  style={{
                    color: option.accent
                      ? `var(--accent-${option.accent})`
                      : 'var(--text-brand)',
                  }}
                >
                  <Icon name={option.icon} size={26} />
                </span>
                <span className="type-body-sm font-semibold">{option.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {hint && (
        <p className="type-caption mt-3 text-center" style={{ color: 'var(--text-muted)' }}>
          {hint}
        </p>
      )}

      {/* All recommendations are in the DOM at load; CSS shows only the
          active one once JS is enhancing (html[data-enhanced]). */}
      <div className="mt-6 grid gap-4">
        {options.map((option) => {
          const active = selectedId === option.id;
          return (
            <div
              key={option.id}
              id={`priority-rec-${option.id}`}
              className="priority-recommendation rounded-lg p-6"
              data-active={active}
              style={{
                background: 'var(--surface-raised)',
                border: `1px solid ${active ? 'var(--color-red)' : 'var(--border-subtle)'}`,
              }}
            >
              <p className="type-overline" style={{ color: 'var(--text-muted)' }}>
                {option.label}
              </p>
              <h3 className="type-heading-md mt-2">{option.recommendation.title}</h3>
              <p className="type-body-md mt-2" style={{ color: 'var(--text-secondary)' }}>
                {option.recommendation.body}
              </p>
              {option.recommendation.cta && (
                <a
                  href={option.recommendation.cta.href}
                  className="type-body-sm mt-4 inline-block font-semibold underline"
                  style={{ color: 'var(--text-brand)' }}
                >
                  {option.recommendation.cta.label}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
