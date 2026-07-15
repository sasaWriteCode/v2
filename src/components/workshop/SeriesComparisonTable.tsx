import { Icon } from '@/components/global/Icon';
import type {
  ComparisonRow,
  SeriesColumn,
  SeriesHighlight,
} from '@/types/content';

/**
 * SeriesComparisonTable — Comfort/Plus/Signature (and the larger series
 * grids). The highest-value SEO surface on the site, so this is a REAL
 * <table>: <caption>, <thead>, <th scope="col">, <th scope="row">. Screen
 * readers navigate it cell-by-cell; crawlers index every spec value.
 *
 * Mobile: comparison semantics survive — the table never collapses into
 * cards. The label column sticks (position: sticky) and the data columns
 * scroll horizontally in an intentional scroll container with a visible
 * affordance.
 */
export function SeriesComparisonTable({
  caption,
  series,
  rows,
  highlight,
}: {
  caption: string;
  series: SeriesColumn[];
  rows: ComparisonRow[];
  highlight?: SeriesHighlight;
}) {
  return (
    <div>
      <div className="comparison-scroller">
        <table className="comparison-table type-body-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              <th scope="col" className="type-overline" style={{ color: 'var(--text-muted)' }}>
                Features
              </th>
              {series.map((column) => {
                const highlighted = highlight?.columnId === column.id;
                return (
                  <th
                    key={column.id}
                    scope="col"
                    data-highlighted={highlighted || undefined}
                    style={{ textAlign: 'left', minWidth: '10rem' }}
                  >
                    {highlighted && (
                      <span className="badge badge-brand mb-1.5 block w-fit">
                        {highlight!.label}
                      </span>
                    )}
                    <span className="type-heading-sm block">{column.name}</span>
                    {column.tagline && (
                      <span
                        className="type-caption block font-normal"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {column.tagline}
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="type-body-sm font-semibold">
                  {row.label}
                </th>
                {series.map((column) => {
                  const value = row.values[column.id];
                  return (
                    <td
                      key={column.id}
                      className="numeric"
                      data-highlighted={highlight?.columnId === column.id || undefined}
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {typeof value === 'boolean' ? (
                        value ? (
                          <>
                            <span style={{ color: 'var(--data-positive-text)' }}>
                              <Icon name="check" size={18} />
                            </span>
                            <span className="sr-only">Yes</span>
                          </>
                        ) : (
                          <span aria-label="No">—</span>
                        )
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="comparison-hint type-caption md:hidden" aria-hidden="true">
        Swipe to compare →
      </p>
    </div>
  );
}
