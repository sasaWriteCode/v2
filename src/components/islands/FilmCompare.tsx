/**
 * FilmCompare — GSMArena-style side-by-side film comparison island.
 *
 * Three slots; each is a "COMPARE WITH" search combobox over the page's
 * film catalogue. Picking a film fills its column (photo, name, badge) and
 * the spec table below stays row-aligned across all slots — one <table>,
 * so header cards and spec cells can never drift apart.
 *
 * `films` is injected by ProductGridTemplate from the page's own
 * product-browser section (single source of truth — nothing authored twice).
 */

import { useRef, useState } from 'react';
import type { FilmCompareContent } from '@/types/sections';
import type { ProductItem } from '@/types/content';

const DEFAULT_SLOTS = 3;

function matches(film: ProductItem, query: string) {
  const haystack = `${film.name} ${film.technology} ${film.badge ?? ''}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}

export default function FilmCompare({
  heading,
  lede,
  films = [],
  initialId,
  slots = DEFAULT_SLOTS,
}: FilmCompareContent) {
  const [selected, setSelected] = useState<(string | null)[]>(() => {
    const first = initialId ?? films[0]?.id ?? null;
    return Array.from({ length: slots }, (_, i) => (i === 0 ? first : null));
  });
  const [queries, setQueries] = useState<string[]>(() => Array(slots).fill(''));
  const [openSlot, setOpenSlot] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const chosen = selected.map((id) => films.find((film) => film.id === id) ?? null);
  const chosenFilms = chosen.filter((film): film is ProductItem => film !== null);

  const pick = (slot: number, id: string | null) => {
    setSelected((prev) => prev.map((cur, i) => (i === slot ? id : cur)));
    setQueries((prev) => prev.map((cur, i) => (i === slot ? '' : cur)));
    setOpenSlot(null);
  };

  const optionsFor = (slot: number) =>
    films.filter(
      (film) =>
        !selected.some((id, i) => i !== slot && id === film.id) &&
        (queries[slot] === '' || matches(film, queries[slot])),
    );

  /* Spec rows — union of the chosen films' spec labels, first-seen order. */
  const specLabels = Array.from(
    new Set(chosenFilms.flatMap((film) => film.specs.map((spec) => spec.label))),
  );
  const valueOf = (film: ProductItem, label: string) =>
    film.specs.find((spec) => spec.label === label)?.value ?? '—';

  if (films.length === 0) return null;

  return (
    <div>
      {heading && <h2 className="type-heading-lg">{heading}</h2>}
      {lede && (
        <p className="type-body-md mt-2 max-w-article" style={{ color: 'var(--text-secondary)' }}>
          {lede}
        </p>
      )}

      <div className="mt-6 overflow-x-auto pb-2">
        <table className="w-full min-w-[42rem]" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <caption className="sr-only">Film comparison</caption>
          <thead>
            <tr>
              <th scope="col" className="w-32 sm:w-40 p-2 align-bottom">
                <span className="sr-only">Specification</span>
              </th>
              {chosen.map((film, slot) => (
                <th key={slot} scope="col" className="p-2 text-left align-top font-normal">
                  {/* ── Combobox ── */}
                  <div
                    className="relative rounded-lg p-3"
                    style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)' }}
                  >
                    <label className="grid gap-1.5">
                      <span
                        className="type-caption font-bold uppercase tracking-wider"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {slot === 0 ? 'Compare' : 'Compare with'}
                      </span>
                      <input
                        type="text"
                        placeholder="Search films…"
                        value={queries[slot]}
                        aria-label={`Search film for compare slot ${slot + 1}`}
                        onFocus={() => {
                          clearTimeout(closeTimer.current);
                          setOpenSlot(slot);
                        }}
                        onBlur={() => {
                          closeTimer.current = setTimeout(() => setOpenSlot(null), 150);
                        }}
                        onChange={(e) => {
                          const value = e.target.value;
                          setQueries((prev) => prev.map((cur, i) => (i === slot ? value : cur)));
                          setOpenSlot(slot);
                        }}
                        className="type-body-sm w-full rounded-md px-3 py-2"
                        style={{
                          border: '1px solid var(--border-default)',
                          background: 'var(--surface-base)',
                          color: 'var(--text-primary)',
                        }}
                      />
                    </label>
                    {openSlot === slot && (
                      <ul
                        className="absolute left-0 right-0 top-full z-20 mt-1 max-h-64 overflow-y-auto rounded-md p-1"
                        style={{
                          background: 'var(--surface-raised)',
                          border: '1px solid var(--border-default)',
                          boxShadow: '0 12px 32px -8px rgb(0 0 0 / 0.18)',
                          listStyle: 'none',
                          margin: '0.25rem 0 0',
                        }}
                      >
                        {optionsFor(slot).length === 0 && (
                          <li className="type-body-sm px-3 py-2" style={{ color: 'var(--text-muted)' }}>
                            No films match.
                          </li>
                        )}
                        {optionsFor(slot).map((option) => (
                          <li key={option.id}>
                            <button
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => pick(slot, option.id)}
                              className="type-body-sm block w-full rounded px-3 py-2 text-left"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              <span className="font-semibold">{option.name}</span>
                              <span className="type-caption block" style={{ color: 'var(--text-muted)' }}>
                                {option.technology}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* ── Selected film card / empty slot ── */}
                  {film ? (
                    <div className="mt-3">
                      <div
                        className="overflow-hidden rounded-lg"
                        style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-raised)' }}
                      >
                        <img
                          src={film.image.src}
                          alt={film.image.alt}
                          width={film.image.width}
                          height={film.image.height}
                          loading="lazy"
                          className="aspect-video w-full object-cover"
                        />
                        <div className="p-3">
                          <div className="flex items-start justify-between gap-2">
                            <span className="type-body-md font-bold" style={{ color: 'var(--text-primary)' }}>
                              {film.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => pick(slot, null)}
                              aria-label={`Remove ${film.name} from comparison`}
                              className="type-caption shrink-0 rounded px-1.5 py-0.5 font-semibold"
                              style={{ border: '1px solid var(--border-default)', color: 'var(--text-muted)' }}
                            >
                              ✕
                            </button>
                          </div>
                          {film.badge && (
                            <span
                              className="type-caption mt-1 inline-block rounded-full px-2 py-0.5 font-bold uppercase tracking-wider"
                              style={{ background: 'var(--color-red-tint)', color: 'var(--color-red-strong)' }}
                            >
                              {film.badge}
                            </span>
                          )}
                          <span className="type-caption mt-1 block" style={{ color: 'var(--text-muted)' }}>
                            {film.technology}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="type-body-sm mt-3 grid aspect-video place-items-center rounded-lg text-center"
                      style={{ border: '2px dashed var(--border-default)', color: 'var(--text-muted)' }}
                    >
                      Select a film
                      <br />
                      to compare
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                scope="row"
                className="type-body-sm p-3 text-left font-medium"
                style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}
              >
                Technology
              </th>
              {chosen.map((film, slot) => (
                <td
                  key={slot}
                  className="type-body-sm p-3"
                  style={{ borderBottom: '1px solid var(--border-subtle)' }}
                >
                  {film ? film.technology : ''}
                </td>
              ))}
            </tr>
            {specLabels.map((label) => (
              <tr key={label}>
                <th
                  scope="row"
                  className="type-body-sm p-3 text-left font-medium"
                  style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}
                >
                  {label}
                </th>
                {chosen.map((film, slot) => (
                  <td
                    key={slot}
                    className="type-body-sm p-3"
                    style={{ borderBottom: '1px solid var(--border-subtle)' }}
                  >
                    {film ? valueOf(film, label) : ''}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th
                scope="row"
                className="type-body-sm p-3 text-left font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                VLT Options
              </th>
              {chosen.map((film, slot) => (
                <td key={slot} className="type-body-sm p-3">
                  {film ? film.vltOptions.join(' / ') : ''}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
