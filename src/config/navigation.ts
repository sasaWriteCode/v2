/**
 * IrisPro V2 — the single source of truth for site navigation.
 *
 * IA confirmed by the client (2026-08-12) from the approved site structure:
 * EN-only site; "Knowledge Centre" and "Request Consultation" ruled in;
 * E-Warranty is an external header button to ewarranty.irispro.com
 * (opens a new tab). Change nav here, nowhere else.
 */

import type { CtaLink } from '@/types/content';

export interface NavItem {
  label: string;
  href: string;
  /** Sub-items — rendered in the footer and mobile nav (full IA). */
  children?: NavItem[];
  /** Also surface this sub-item in the desktop header dropdown. */
  headerMenu?: boolean;
  /** External destination — render with target="_blank" rel="noopener". */
  external?: boolean;
}

export const BRAND = {
  name: 'IrisPro',
  tagline: 'Patented UV+420 Optical Solar Film',
  href: '/',
} as const;

export const PRIMARY_NAV: NavItem[] = [
  {
    label: 'Protection Solutions',
    href: '/solutions',
    children: [
      { label: 'Automotive', href: '/solutions/automotive' },
      { label: 'Residential', href: '/solutions/residential' },
      { label: 'Commercial', href: '/solutions/commercial' },
      { label: 'Personal Protection', href: '/solutions/personal-protection' },
      { label: 'Sustainability', href: '/solutions/sustainability' },
    ],
  },
  {
    label: 'Products',
    href: '/products/building',
    children: [
      { label: 'Building Window Films', href: '/products/building', headerMenu: true },
      { label: 'Building Films — For Homes', href: '/products/building-homes' },
      {
        label: 'Building Films — For Commercial',
        href: '/products/building-commercial',
      },
      { label: 'Automotive Films', href: '/products/automotive', headerMenu: true },
    ],
  },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Projects', href: '/projects' },
  {
    label: 'Knowledge Centre',
    href: '/knowledge',
    children: [
      { label: 'Learn the Basics', href: '/knowledge/learn-the-basics' },
      { label: 'Technology Explained', href: '/knowledge/technology-explained' },
      { label: 'Automotive Guide', href: '/knowledge/automotive' },
      { label: 'Residential Guide', href: '/knowledge/residential-guide' },
      { label: 'Commercial Guide', href: '/knowledge/commercial-guide' },
      { label: 'Health & Protection', href: '/knowledge/health-and-protection' },
      { label: 'Sustainability & ESG', href: '/knowledge/sustainability-esg' },
      { label: 'Myth vs Fact', href: '/knowledge/myth-vs-fact' },
      { label: 'Video Library', href: '/knowledge/video-library' },
    ],
  },
  { label: 'About', href: '/about' },
];

/**
 * E-Warranty — external system, always opens in a new tab.
 * Rendered as a secondary header button next to the primary CTA.
 */
export const NAV_EWARRANTY: NavItem = {
  label: 'E-Warranty',
  href: 'https://ewarranty.irispro.com/#/login',
  external: true,
};

/** Primary header CTA — confirmed: consultation form lives on /contact. */
export const NAV_CTA: CtaLink = {
  label: 'Request Consultation',
  href: '/contact',
  variant: 'primary',
};

export interface FooterGroup {
  heading: string;
  items: NavItem[];
}

export const FOOTER_NAV: FooterGroup[] = [
  {
    heading: 'Protection Solutions',
    items: PRIMARY_NAV[0].children ?? [],
  },
  {
    heading: 'Products',
    items: PRIMARY_NAV[1].children ?? [],
  },
  {
    heading: 'Knowledge Centre',
    items: [
      { label: 'Knowledge Centre', href: '/knowledge' },
      ...(PRIMARY_NAV[5].children ?? []),
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Projects', href: '/projects' },
      { label: 'Technologies', href: '/technologies' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Contact', href: '/contact' },
      NAV_EWARRANTY,
    ],
  },
];

export const FOOTER_LEGAL = `© ${new Date().getFullYear()} IrisPro Sdn. Bhd. All rights reserved.`;

/** Copy for routes whose content object has not been supplied yet. */
export const PENDING_PAGE = {
  eyebrow: 'IrisPro',
  note: 'The full content for this page is on its way. In the meantime, explore our solutions, products and the Knowledge Centre from the menu above.',
} as const;

/** a11y strings for the nav chrome (data, not hardcoded in components). */
export const NAV_STRINGS = {
  primaryNavLabel: 'Main navigation',
  footerNavLabel: 'Footer navigation',
  breadcrumbsLabel: 'Breadcrumb',
  openMenuLabel: 'Open menu',
  closeMenuLabel: 'Close menu',
  skipToContent: 'Skip to content',
} as const;
