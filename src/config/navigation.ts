/**
 * IrisPro V2 — the single source of truth for site navigation.
 *
 * ⚠ CONFLICT NOTICE (see _conflicts.md §9–§12): the reference screens
 * disagree on IA, nav labels ("Learning Centre" vs "Knowledge Centre"),
 * product-area naming ("Products" vs "Protection Series") and the primary
 * CTA ("Find A Dealer" / "Request Consultation" / "Request Building
 * Assessment"). The values below are PROVISIONAL DEFAULTS per the Stage 3
 * brief — "Knowledge Centre" and "Request Consultation" — pending client
 * ruling. Change them here, nowhere else.
 */

import type { CtaLink } from '@/types/content';

export interface NavItem {
  label: string;
  href: string;
  /** Sub-items — rendered in the footer and mobile nav (full IA). */
  children?: NavItem[];
}

export const BRAND = {
  name: 'IrisPro',
  tagline: 'The Best Tint for ASEAN',
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
    // "Products" vs "Protection Series" — provisional: Products (§11)
    label: 'Products',
    href: '/products/automotive',
    children: [
      { label: 'Automotive Films', href: '/products/automotive' },
      { label: 'Building Films', href: '/products/building' },
    ],
  },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Projects', href: '/projects' },
  {
    // "Learning Centre" vs "Knowledge Centre" — provisional: Knowledge Centre (§10)
    label: 'Knowledge Centre',
    href: '/knowledge',
    children: [
      { label: 'Learn the Basics', href: '/knowledge/learn-the-basics' },
      { label: 'Technology Explained', href: '/knowledge/technology-explained' },
      { label: 'Automotive Guide', href: '/knowledge/automotive' },
    ],
  },
  { label: 'About', href: '/about' },
];

/** Primary header CTA — provisional default per the Stage 3 brief (§12). */
export const NAV_CTA: CtaLink = {
  label: 'Request Consultation',
  href: '#consultation',
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
      ...(PRIMARY_NAV[4].children ?? []),
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Projects', href: '/projects' },
      { label: 'Technologies', href: '/technologies' },
    ],
  },
  {
    heading: 'Development',
    items: [
      { label: 'Design system', href: '/design-system' },
      { label: 'Component primitives', href: '/components' },
    ],
  },
];

export const FOOTER_LEGAL = `© ${new Date().getFullYear()} IrisPro. All rights reserved.`;

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
