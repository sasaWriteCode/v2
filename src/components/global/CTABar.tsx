import { Icon } from '@/components/global/Icon';
import type { CtaAction } from '@/types/content';

/**
 * CTABar — the recurring bottom conversion band (Find a Dealer / Request
 * Consultation / WhatsApp Us / Download Brochure). Zone-agnostic; the
 * `variant` prop optionally pins a zone regardless of ambient context.
 */
export function CTABar({
  headline,
  subhead,
  actions,
  variant,
}: {
  headline: string;
  subhead?: string;
  actions: CtaAction[];
  variant?: 'showroom' | 'workshop';
}) {
  return (
    <aside
      data-zone={variant}
      aria-label={headline}
      className="rounded-lg px-6 py-8"
      style={{
        border: '1px solid var(--border-subtle)',
        backgroundImage: 'var(--depth-glow-strong)',
      }}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center">
        <div>
          <h2 className="type-heading-lg">{headline}</h2>
          {subhead && (
            <p className="type-body-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              {subhead}
            </p>
          )}
        </div>
        <ul
          className="grid gap-3 sm:grid-cols-2"
          style={{
            gridTemplateColumns:
              actions.length > 2 ? undefined : 'repeat(auto-fit, minmax(14rem, 1fr))',
          }}
        >
          {actions.map((action) => (
            <li key={action.title}>
              <a
                href={action.cta.href}
                className="flex h-full items-start gap-3 rounded-md p-4"
                style={{
                  border: '1px solid var(--border-default)',
                  background: 'var(--surface-raised)',
                }}
              >
                <span style={{ color: 'var(--text-brand)' }}>
                  <Icon name={action.icon} size={24} />
                </span>
                <span className="min-w-0">
                  <span className="type-heading-sm block">{action.title}</span>
                  {action.description && (
                    <span
                      className="type-body-sm block"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {action.description}
                    </span>
                  )}
                  <span
                    className="type-body-sm mt-1 block font-semibold"
                    style={{ color: 'var(--text-brand)' }}
                  >
                    {action.cta.label} ›
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
