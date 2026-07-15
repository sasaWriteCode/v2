/**
 * ProductCard — the 9/10-series product grids (TITAN X, DIAMOND X, RAYPRO…).
 * Light-zone utility card: elevation, dense specs, tabular numerals.
 *
 * - The compare checkbox is a real <input type="checkbox"> wired to the
 *   URL-persisted state (useCompareState) via props.
 * - VLT chips are data (ProductItem.vltOptions) — Stage 3 filters on them.
 */

import { Icon } from '@/components/global/Icon';
import { Media } from '@/components/base/Media';
import type { ProductItem } from '@/types/content';

const BADGE_CLASS: Record<string, string> = {
  SIGNATURE: 'badge-brand',
  'PRIVACY + HEAT': 'badge-neutral',
  'HEAT REJECTION': 'badge-neutral',
  'HEAT REJECTION + SECURITY': 'badge-neutral',
};

export function ProductCard({
  product,
  compared = false,
  onToggleCompare,
}: {
  product: ProductItem;
  compared?: boolean;
  onToggleCompare?: (id: string) => void;
}) {
  const compareInputId = `compare-${product.id}`;

  return (
    <article
      className="grid h-full content-start overflow-hidden rounded-lg"
      style={{
        background: 'var(--surface-raised)',
        border: `1px solid ${compared ? 'var(--color-red)' : 'var(--border-subtle)'}`,
        boxShadow: 'var(--elevation-1)',
      }}
    >
      <div className="relative">
        {product.badge && (
          <span
            className={`badge ${BADGE_CLASS[product.badge] ?? 'badge-neutral'} absolute left-3 top-3 z-10`}
          >
            {product.badge}
          </span>
        )}
        <Media {...product.image} className="w-full object-cover" />
      </div>

      <div className="grid gap-3 p-4">
        <div>
          <h3 className="type-heading-sm">{product.name}</h3>
          <p className="type-caption" style={{ color: 'var(--text-muted)' }}>
            {product.technology}
          </p>
        </div>

        <dl className="numeric grid grid-cols-3 gap-2">
          {product.specs.map((spec) => (
            <div key={spec.label}>
              <dt className="type-caption" style={{ color: 'var(--text-muted)' }}>
                {spec.label}
              </dt>
              <dd className="type-body-sm font-semibold">{spec.value}</dd>
            </div>
          ))}
        </dl>

        {product.vltOptions.length > 0 && (
          <div>
            <p className="type-caption mb-1" style={{ color: 'var(--text-muted)' }}>
              VLT options
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {product.vltOptions.map((vlt) => (
                <li key={vlt} className="chip">
                  {vlt}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-1 flex items-center justify-between gap-3">
          <a
            href={product.detailsHref ?? '#'}
            className="type-body-sm inline-flex items-center gap-1 rounded-md px-3 py-1.5 font-semibold"
            style={{ border: '1px solid var(--border-strong)' }}
          >
            View details
            <Icon name="play" size={12} />
          </a>
          {product.compareable !== false && onToggleCompare && (
            <label
              htmlFor={compareInputId}
              className="type-body-sm flex cursor-pointer items-center gap-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              <input
                id={compareInputId}
                type="checkbox"
                checked={compared}
                onChange={() => onToggleCompare(product.id)}
                style={{ accentColor: 'var(--color-red)' }}
              />
              Compare
            </label>
          )}
        </div>
      </div>
    </article>
  );
}
