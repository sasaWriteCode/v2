/**
 * Client wrapper for the ProductCard grid — wires the cards to the
 * URL-persisted comparison state (?compare=id1,id2).
 */

import { ProductCard } from '@/components/workshop/ProductCard';
import { useCompareState } from '@/components/workshop/useCompareState';
import type { ProductItem } from '@/types/content';

export function CompareDemo({ products }: { products: ProductItem[] }) {
  const { ids, toggle, isCompared } = useCompareState();

  return (
    <div>
      <p
        aria-live="polite"
        className="type-body-sm mb-4"
        style={{ color: 'var(--text-secondary)' }}
      >
        {ids.length === 0
          ? 'Tick “Compare” on up to 4 films — the selection persists in the URL (?compare=…).'
          : `Comparing: ${ids.join(', ')} — reload or share the URL and the selection survives.`}
      </p>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard
              product={product}
              compared={isCompared(product.id)}
              onToggleCompare={toggle}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
