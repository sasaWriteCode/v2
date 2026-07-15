import type { CertItem } from '@/types/content';

/**
 * CertificationStrip — SIRIM / SGS / RoHS / REACH / GBI / IWFA / eWarranty
 * row. Renders styled text marks until real logo assets land (Stage 4);
 * the name + label are the content either way.
 */
export function CertificationStrip({
  certs,
  variant = 'row',
  heading,
}: {
  certs: CertItem[];
  variant?: 'row' | 'grid';
  heading?: string;
}) {
  return (
    <section
      aria-label={heading ?? 'Certifications and standards'}
      className="flex flex-wrap items-center gap-x-8 gap-y-5"
    >
      {heading && (
        <h2 className="type-heading-sm" style={{ color: 'var(--text-secondary)' }}>
          {heading}
        </h2>
      )}
      <ul
        className={
          variant === 'grid'
            ? 'grid flex-1 grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-7'
            : 'flex flex-1 flex-wrap items-center gap-x-8 gap-y-4'
        }
      >
        {certs.map((cert) => (
          <li key={cert.id} className="flex items-center gap-3">
            {/* Text mark placeholder — swapped for the logo asset in Stage 4 */}
            <span
              className="type-heading-sm inline-flex h-10 min-w-10 items-center justify-center rounded-md px-2"
              style={{
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
                letterSpacing: '0.04em',
              }}
            >
              {cert.name}
            </span>
            <span
              className="type-caption max-w-[11rem]"
              style={{ color: 'var(--text-muted)' }}
            >
              {cert.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
