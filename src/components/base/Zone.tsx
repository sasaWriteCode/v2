import type { ElementType, ReactNode } from 'react';

export type ZoneName = 'showroom' | 'workshop';

interface ZoneProps {
  zone: ZoneName;
  children: ReactNode;
  /** Rendered element — defaults to <div>; use "main"/"section" for landmarks. */
  as?: ElementType;
  className?: string;
  id?: string;
}

/**
 * <Zone> — sets data-zone and thereby swaps every semantic token
 * (surface/text/border, elevation vs. luminosity depth) for its subtree.
 * Pure CSS: the swap lives in tokens/colors.css + tokens/spacing.css,
 * works without JS, and zones nest freely.
 *
 *   showroom — dark, cinematic. Depth = luminosity + gradient, no shadows.
 *   workshop — light, utility. Depth = --elevation-* box shadows.
 */
export function Zone({
  zone,
  children,
  as: Tag = 'div',
  className,
  id,
}: ZoneProps) {
  return (
    <Tag data-zone={zone} className={className} id={id}>
      {children}
    </Tag>
  );
}
