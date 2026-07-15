/**
 * OnThisPage — the guide rail's section nav. A REAL <nav> with real anchor
 * links, server-rendered; hydration only adds the scroll-spy highlight
 * (aria-current) via IntersectionObserver. Without JS it is a working
 * table of contents.
 */

import { useEffect, useState } from 'react';
import type { OnThisPageItem } from '@/types/sections';

export default function OnThisPage({
  heading,
  items,
}: {
  heading: string;
  items: OnThisPageItem[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Topmost intersecting section wins.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -60% 0px' },
    );
    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label={heading}
      className="rounded-lg p-5"
      style={{
        background: 'var(--surface-raised)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--elevation-1)',
      }}
    >
      <h2 className="type-heading-sm">{heading}</h2>
      <ol className="mt-3 grid list-none gap-2 p-0">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? 'true' : undefined}
              className="type-body-sm block"
              style={{
                color:
                  activeId === item.id
                    ? 'var(--text-brand)'
                    : 'var(--text-secondary)',
                fontWeight: activeId === item.id ? 600 : 400,
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
