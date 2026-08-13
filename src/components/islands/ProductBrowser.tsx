/**
 * ProductBrowser — filter bar + product grid + compare, the heaviest island.
 *
 * Contracts:
 * - Filtering is pure data: each item declares facets[param] = string[];
 *   matching is a lookup, never `if (param === 'vlt')` logic.
 * - Filters are URL state (?vlt=…&series=…) via history.replaceState —
 *   shareable, survive reload.
 * - The filter bar is a REAL <form method="get"> with native <select>s.
 *   Without JS it submits to fallbackAction with the same params, and the
 *   full grid stays visible — filtering enhances, never gates content.
 * - Compare selection is the Stage 2 ?compare= contract (useCompareState),
 *   capped at TWO products (client ruling 2026-08-12); once both slots are
 *   picked a side-by-side spec table renders below the hint.
 */

import { useEffect, useId, useState } from 'react';
import { ProductCard } from '@/components/workshop/ProductCard';
import { useCompareState } from '@/components/workshop/useCompareState';
import type { ProductBrowserContent } from '@/types/sections';
import type { ProductItem } from '@/types/content';

/** Side-by-side spec table for the compared pair. Plain markup, no state. */
function CompareTable({ products }: { products: ProductItem[] }) {
  const specLabels = Array.from(
    new Set(products.flatMap((product) => product.specs.map((spec) => spec.label))),
  );
  const valueOf = (product: ProductItem, label: string) =>
    product.specs.find((spec) => spec.label === label)?.value ?? '—';

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full" style={{ borderCollapse: 'collapse' }}>
        <caption className="sr-only">Product comparison</caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="type-body-sm p-3 text-left"
              style={{ borderBottom: '2px solid var(--border-strong)' }}
            >
              Specification
            </th>
            {products.map((product) => (
              <th
                key={product.id}
                scope="col"
                className="type-body-md p-3 text-left font-semibold"
                style={{ borderBottom: '2px solid var(--border-strong)' }}
              >
                {product.name}
                <span
                  className="type-caption block font-normal"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {product.technology}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specLabels.map((label) => (
            <tr key={label}>
              <th
                scope="row"
                className="type-body-sm p-3 text-left font-medium"
                style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}
              >
                {label}
              </th>
              {products.map((product) => (
                <td
                  key={product.id}
                  className="type-body-sm p-3"
                  style={{ borderBottom: '1px solid var(--border-subtle)' }}
                >
                  {valueOf(product, label)}
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
              VLT options
            </th>
            {products.map((product) => (
              <td key={product.id} className="type-body-sm p-3">
                {product.vltOptions.join(' / ')}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function ProductBrowser({
  heading,
  lede,
  filters,
  items,
  fallbackAction,
  emptyLabel,
  compareHint,
}: ProductBrowserContent) {
  const formId = useId();
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [enhanced, setEnhanced] = useState(false);
  const { ids, toggle, isCompared } = useCompareState(2);

  // Restore filter state from the URL after mount (SSR renders everything).
  useEffect(() => {
    setEnhanced(true);
    const params = new URLSearchParams(window.location.search);
    const initial: Record<string, string> = {};
    for (const filter of filters) {
      const value = params.get(filter.param);
      if (value && filter.options.some((o) => o.value === value)) {
        initial[filter.param] = value;
      }
    }
    setSelected(initial);
  }, [filters]);

  const update = (param: string, value: string) => {
    const next = { ...selected };
    if (value) next[param] = value;
    else delete next[param];
    setSelected(next);
    const url = new URL(window.location.href);
    for (const filter of filters) {
      if (next[filter.param]) url.searchParams.set(filter.param, next[filter.param]);
      else url.searchParams.delete(filter.param);
    }
    window.history.replaceState(window.history.state, '', url);
  };

  const active = Object.entries(selected);
  const visible =
    enhanced && active.length > 0
      ? items.filter((item) =>
          active.every(([param, value]) => (item.facets[param] ?? []).includes(value)),
        )
      : items;

  return (
    <div>
      {heading && <h2 className="type-heading-lg">{heading}</h2>}
      {lede && (
        <p className="type-body-md mt-2 max-w-article" style={{ color: 'var(--text-secondary)' }}>
          {lede}
        </p>
      )}

      <form
        action={fallbackAction}
        method="get"
        onSubmit={(e) => e.preventDefault()}
        className="mt-6 flex flex-wrap items-end gap-3 rounded-lg p-4"
        style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)' }}
      >
        {filters.map((filter) => (
          <label key={filter.param} className="grid min-w-[10rem] flex-1 gap-1 sm:flex-none">
            <span className="type-caption font-semibold" style={{ color: 'var(--text-muted)' }}>
              {filter.label}
            </span>
            <select
              name={filter.param}
              value={selected[filter.param] ?? ''}
              onChange={(e) => update(filter.param, e.target.value)}
              className="type-body-sm rounded-md px-3 py-2"
              style={{
                border: '1px solid var(--border-default)',
                background: 'var(--surface-base)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="">{filter.anyLabel}</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}
        {/* No-JS path: a real submit performs the GET. With JS, selects
            apply instantly and this button is hidden. */}
        {!enhanced && (
          <button
            id={formId}
            type="submit"
            className="type-body-sm rounded-md px-4 py-2 font-semibold"
            style={{ background: 'var(--color-red)', color: 'var(--color-white)' }}
          >
            Apply
          </button>
        )}
      </form>

      {compareHint && (
        <p aria-live="polite" className="type-body-sm mt-4" style={{ color: 'var(--text-secondary)' }}>
          {ids.length === 0 ? compareHint : `Comparing: ${ids.join(', ')}`}
        </p>
      )}

      {ids.length === 2 && (
        <CompareTable
          products={ids
            .map((id) => items.find((item) => item.product.id === id)?.product)
            .filter((product): product is NonNullable<typeof product> => Boolean(product))}
        />
      )}

      <p aria-live="polite" className="sr-only">
        {visible.length} products shown
      </p>

      {visible.length === 0 ? (
        <p
          className="type-body-md mt-6 rounded-lg p-6 text-center"
          style={{ border: '1px dashed var(--border-strong)', color: 'var(--text-secondary)' }}
        >
          {emptyLabel}
        </p>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <li key={item.product.id}>
              <ProductCard
                product={item.product}
                compared={isCompared(item.product.id)}
                onToggleCompare={toggle}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
