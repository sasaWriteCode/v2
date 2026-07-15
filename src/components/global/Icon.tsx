import type { IconName } from '@/types/content';

/**
 * <Icon> — resolves the serializable IconName ids used throughout the
 * content schema (types/content.ts) to inline SVG. One stroke style,
 * currentColor, decorative by default (aria-hidden) — pair every icon with
 * visible text; never rely on an icon alone to carry meaning.
 */

const PATHS: Record<IconName, React.ReactNode> = {
  car: (
    <>
      <path d="M4 16v-3l2-5.5A1.5 1.5 0 0 1 7.4 6.5h9.2A1.5 1.5 0 0 1 18 7.5L20 13v3" />
      <path d="M4 13h16" />
      <circle cx="7.5" cy="16.5" r="1.6" />
      <circle cx="16.5" cy="16.5" r="1.6" />
    </>
  ),
  home: (
    <>
      <path d="M4 11.5 12 5l8 6.5" />
      <path d="M6 10.5V19h12v-8.5" />
      <path d="M10 19v-5h4v5" />
    </>
  ),
  building: (
    <>
      <rect x="6" y="4" width="12" height="16" rx="1" />
      <path d="M9.5 8h2M13 8h2M9.5 11.5h2M13 11.5h2M9.5 15h2M13 15h2" />
      <path d="M10.5 20v-2.5h3V20" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="2.8" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M15.5 6.2a2.8 2.8 0 1 1 0 4.8" />
      <path d="M16.5 13.7a5.5 5.5 0 0 1 4 5.3" />
    </>
  ),
  leaf: (
    <>
      <path d="M19 5c-8 0-13 4-13 10 0 2.2 1.2 4 4 4 6 0 9-6 9-14Z" />
      <path d="M6 19c3-5 6-8 10-10" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6v5.5c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6l-7-2.5Z" />
      <path d="m9 11.5 2.2 2.2L15.5 9.5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  thermometer: (
    <>
      <path d="M10.5 4.5a1.5 1.5 0 0 1 3 0v9a3.8 3.8 0 1 1-3 0v-9Z" />
      <circle cx="12" cy="16.8" r="1.4" />
    </>
  ),
  snowflake: (
    <>
      <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
      <path d="m9.5 4.5 2.5 2 2.5-2M9.5 19.5l2.5-2 2.5 2" />
    </>
  ),
  battery: (
    <>
      <rect x="3" y="8" width="15" height="8" rx="1.5" />
      <path d="M21 11v2" />
      <path d="m10.5 9.5-2 3h3l-2 3" />
    </>
  ),
  layers: (
    <>
      <path d="m12 4 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9.5" r="4.5" />
      <path d="m9.5 13.5-1.5 6 4-2.2 4 2.2-1.5-6" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  star: (
    <path d="m12 4 2.35 4.9 5.4.7-4 3.75 1.05 5.35L12 16.1l-4.8 2.6 1.05-5.35-4-3.75 5.4-.7L12 4Z" />
  ),
  play: <path d="M8.5 6.2v11.6l9.5-5.8-9.5-5.8Z" />,
  pin: (
    <>
      <path d="M12 21s6.5-5.6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </>
  ),
  chat: (
    <>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-7Z" />
      <path d="M8.5 9h7M8.5 12h4.5" />
    </>
  ),
  document: (
    <>
      <path d="M7 3.5h7L18.5 8v11A1.5 1.5 0 0 1 17 20.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z" />
      <path d="M14 3.5V8h4.5M8.5 12h7M8.5 15.5h5" />
    </>
  ),
  handshake: (
    <>
      <path d="m2.5 12 4-5 5 1.5L16 7l5.5 5" />
      <path d="m11.5 8.5-3.5 3.7a1.4 1.4 0 0 0 2 2l.8-.8" />
      <path d="m18.5 14-3.6 3.7a1.4 1.4 0 0 1-2-2" />
      <path d="m15.5 17.2-1.1 1.1a1.4 1.4 0 0 1-2-2" />
    </>
  ),
  headset: (
    <>
      <path d="M5 13.5v-2a7 7 0 0 1 14 0v2" />
      <rect x="4" y="13" width="3.5" height="5.5" rx="1.5" />
      <rect x="16.5" y="13" width="3.5" height="5.5" rx="1.5" />
      <path d="M18 18.5v.5a2 2 0 0 1-2 2h-3" />
    </>
  ),
  bolt: <path d="M13 3 5.5 13.5H11L10 21l7.5-10.5H12L13 3Z" />,
  wallet: (
    <>
      <path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h12A1.5 1.5 0 0 1 19 7.5" />
      <rect x="4" y="7.5" width="16" height="11" rx="1.5" />
      <path d="M15.5 13h4.5" />
      <circle cx="15.5" cy="13" r="0.4" />
    </>
  ),
  recycle: (
    <>
      <path d="M8 8.5 10.2 5h3.6l2 3.5" />
      <path d="m17.5 9.5 2 3.5-1.8 3.5h-3.5" />
      <path d="M10 19.5H6.3l-1.8-3.5 2-3.5" />
      <path d="m14.5 6.5 1.3 2-2.3.3M18.6 15.5l-2.3.2 1 2.1M6.7 12.7l1-2.1 1.3 2" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5" />
    </>
  ),
};

interface IconProps {
  name: IconName;
  /** Rendered size in px (width = height). Default 24. */
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={name === 'star' || name === 'play' ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
