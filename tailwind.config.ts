import type { Config } from 'tailwindcss';

/**
 * IrisPro V2 — Tailwind theme wired to the CSS custom properties defined in
 * /tokens/*.css. The CSS files are the source of truth (they carry the
 * dual-zone swap and the tier engine); this config only surfaces them as
 * utilities. Semantic colors (surface/text/border) re-resolve automatically
 * inside [data-zone="showroom"] / [data-zone="workshop"].
 */
const config: Config = {
  content: ['./src/**/*.{astro,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand core (literal)
        'irispro-red': {
          DEFAULT: 'var(--color-red)',
          strong: 'var(--color-red-strong)',
          deep: 'var(--color-red-deep)',
          bright: 'var(--color-red-bright)',
          soft: 'var(--color-red-soft)',
          tint: 'var(--color-red-tint)',
        },
        'irispro-black': 'var(--color-black)',
        'irispro-white': 'var(--color-white)',
        neutral: {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          350: 'var(--color-neutral-350)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          700: 'var(--color-neutral-700)',
          750: 'var(--color-neutral-750)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
        },
        // Per-solution accents
        automotive: {
          DEFAULT: 'var(--accent-automotive)',
          text: 'var(--accent-automotive-text)',
          bright: 'var(--accent-automotive-bright)',
        },
        residential: {
          DEFAULT: 'var(--accent-residential)',
          text: 'var(--accent-residential-text)',
          bright: 'var(--accent-residential-bright)',
        },
        commercial: {
          DEFAULT: 'var(--accent-commercial)',
          text: 'var(--accent-commercial-text)',
          bright: 'var(--accent-commercial-bright)',
        },
        'personal-protection': {
          DEFAULT: 'var(--accent-personal-protection)',
          text: 'var(--accent-personal-protection-text)',
          bright: 'var(--accent-personal-protection-bright)',
        },
        sustainability: {
          DEFAULT: 'var(--accent-sustainability)',
          text: 'var(--accent-sustainability-text)',
          bright: 'var(--accent-sustainability-bright)',
        },
        // Semantic, zone-aware
        surface: {
          base: 'var(--surface-base)',
          raised: 'var(--surface-raised)',
          sunken: 'var(--surface-sunken)',
        },
        content: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          inverse: 'var(--text-inverse)',
          brand: 'var(--text-brand)',
        },
        line: {
          subtle: 'var(--border-subtle)',
          DEFAULT: 'var(--border-default)',
          strong: 'var(--border-strong)',
        },
        // Data colors
        data: {
          positive: 'var(--data-positive)',
          'positive-text': 'var(--data-positive-text)',
          warning: 'var(--data-warning)',
          'warning-text': 'var(--data-warning-text)',
          critical: 'var(--data-critical)',
          'critical-text': 'var(--data-critical-text)',
          neutral: 'var(--data-neutral)',
          'neutral-text': 'var(--data-neutral-text)',
        },
      },
      fontFamily: {
        display: 'var(--font-display)',
        ui: 'var(--font-ui)',
      },
      fontSize: {
        'display-xl': [
          'var(--text-display-xl)',
          { lineHeight: 'var(--leading-display-xl)', letterSpacing: 'var(--tracking-display-xl)' },
        ],
        'display-lg': [
          'var(--text-display-lg)',
          { lineHeight: 'var(--leading-display-lg)', letterSpacing: 'var(--tracking-display-lg)' },
        ],
        'display-md': [
          'var(--text-display-md)',
          { lineHeight: 'var(--leading-display-md)', letterSpacing: 'var(--tracking-display-md)' },
        ],
        'heading-lg': [
          'var(--text-heading-lg)',
          { lineHeight: 'var(--leading-heading-lg)', letterSpacing: 'var(--tracking-heading-lg)' },
        ],
        'heading-md': [
          'var(--text-heading-md)',
          { lineHeight: 'var(--leading-heading-md)', letterSpacing: 'var(--tracking-heading-md)' },
        ],
        'heading-sm': ['var(--text-heading-sm)', { lineHeight: 'var(--leading-heading-sm)' }],
        'body-lg': ['var(--text-body-lg)', { lineHeight: 'var(--leading-body-lg)' }],
        'body-md': ['var(--text-body-md)', { lineHeight: 'var(--leading-body-md)' }],
        'body-sm': ['var(--text-body-sm)', { lineHeight: 'var(--leading-body-sm)' }],
        caption: ['var(--text-caption)', { lineHeight: 'var(--leading-caption)' }],
        overline: [
          'var(--text-overline)',
          { lineHeight: 'var(--leading-overline)', letterSpacing: 'var(--tracking-overline)' },
        ],
      },
      spacing: {
        'section-tight': 'var(--section-y-tight)',
        section: 'var(--section-y-default)',
        'section-loose': 'var(--section-y-loose)',
        gutter: 'var(--gutter)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        'elevation-1': 'var(--elevation-1)',
        'elevation-2': 'var(--elevation-2)',
        'elevation-3': 'var(--elevation-3)',
      },
      backgroundImage: {
        'depth-glow-subtle': 'var(--depth-glow-subtle)',
        'depth-glow-strong': 'var(--depth-glow-strong)',
      },
      maxWidth: {
        container: 'var(--container-max)',
        'container-narrow': 'var(--container-narrow)',
        article: 'var(--measure-article)',
      },
      transitionDuration: {
        instant: 'var(--duration-instant)',
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
        cinematic: 'var(--duration-cinematic)',
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
        decelerate: 'var(--ease-decelerate)',
        accelerate: 'var(--ease-accelerate)',
        cinematic: 'var(--ease-cinematic)',
      },
    },
  },
  plugins: [],
};

export default config;
