/**
 * useCompareState — URL-persisted product-comparison selection.
 * State lives in ?compare=id1,id2 via history.replaceState: shareable,
 * survives reload, no navigation, native scroll untouched. Stage 3's
 * comparison view reads the same parameter.
 */

import { useCallback, useEffect, useState } from 'react';

const PARAM = 'compare';

export function useCompareState(maxItems = 4) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get(PARAM);
    if (raw) setIds(raw.split(',').filter(Boolean).slice(0, maxItems));
  }, [maxItems]);

  const toggle = useCallback(
    (id: string) => {
      setIds((prev) => {
        const next = prev.includes(id)
          ? prev.filter((x) => x !== id)
          : prev.length >= maxItems
            ? prev
            : [...prev, id];
        const url = new URL(window.location.href);
        if (next.length) url.searchParams.set(PARAM, next.join(','));
        else url.searchParams.delete(PARAM);
        window.history.replaceState(window.history.state, '', url);
        return next;
      });
    },
    [maxItems],
  );

  return { ids, toggle, isCompared: (id: string) => ids.includes(id) };
}
