import { Reveal } from '@/components/base/Reveal';
import type { SpectrumBand, SpectrumDiagramContent } from '@/types/content';

/**
 * SpectrumDiagram — the most-repeated asset on the site: the solar spectrum
 * and how IrisPro film treats each band (blocked / reduced / transmitted).
 *
 * SEO + accessibility contract:
 * - Pure SVG, never an image. Band names and nm ranges are real, selectable
 *   <text> nodes — "380–420nm", "HEV Blue Light" etc. are search terms.
 * - No aria-hidden anywhere: the text participates in the accessibility
 *   tree and in find-in-page.
 *
 * Motion: ray groups carry .spectrum-ray and stagger in when the wrapping
 * Reveal fires (TIER_1+). TIER_0 and no-JS render the diagram fully drawn.
 *
 * On narrow screens the figure is an INTENTIONAL horizontal scroll
 * container so the labels never shrink below legibility.
 */

const BEHAVIOR_TONE: Record<SpectrumBand['behavior'], string> = {
  blocked: 'var(--color-red-bright)',
  reduced: 'var(--data-warning)',
  transmitted: 'var(--accent-sustainability)',
};

const BEHAVIOR_LEGEND: Record<SpectrumBand['behavior'], string> = {
  blocked: 'Blocked by film',
  reduced: 'Reduced by film',
  transmitted: 'Transmitted',
};

const W = 720;
const RAY_X0 = 16;
const FILM_X = 430;
const RAY_X1 = 470;
const ANNOTATION_X = 492;

export function SpectrumDiagram({
  bands,
  variant = 'full',
  showFilm = true,
  title,
}: SpectrumDiagramContent) {
  const compact = variant === 'compact';
  const rowH = compact ? 44 : 62;
  const top = compact ? 12 : 20;
  const height = top + bands.length * rowH + (compact ? 8 : 16);
  const rayEnd = showFilm ? RAY_X1 : ANNOTATION_X - 24;
  const behaviorsUsed = [...new Set(bands.map((b) => b.behavior))];

  return (
    // min-w-0 so grid/flex parents can't min-content-size the figure wider
    // than the viewport — the inner div is the intentional scroll container.
    <Reveal as="figure" className="m-0 min-w-0 max-w-full">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${height}`}
          className="block w-full"
          style={{ minWidth: compact ? '30rem' : '36rem' }}
          fontFamily="var(--font-ui)"
        >
          {title && (
            <text
              x={RAY_X0}
              y={top - 4}
              fontSize="13"
              fontWeight="600"
              fill="var(--text-primary)"
            >
              {title}
            </text>
          )}

          {bands.map((band, i) => {
            const y = top + i * rowH + rowH * 0.62;
            const tone = band.hue ?? BEHAVIOR_TONE[band.behavior];
            const blockedAtFilm = showFilm && band.behavior === 'blocked';
            const solidEnd = blockedAtFilm ? FILM_X - 4 : rayEnd;
            return (
              <g
                key={band.id}
                className="spectrum-ray"
                style={{ ['--ray-index' as string]: i }}
              >
                {/* Band name + nm range — real text, real search terms */}
                <text x={RAY_X0} y={y - 12} fontSize="13" fontWeight="600" fill="var(--text-primary)">
                  {band.name}
                </text>
                <text x={RAY_X0} y={y + 16} fontSize="11.5" fill="var(--text-muted)">
                  {band.fromNm}–{band.toNm}nm
                </text>

                {/* Incoming ray */}
                <line
                  x1={RAY_X0 + 118}
                  y1={y}
                  x2={solidEnd}
                  y2={y}
                  stroke={tone}
                  strokeWidth={band.behavior === 'transmitted' ? 3 : 2.5}
                  strokeLinecap="round"
                />
                {blockedAtFilm ? (
                  /* Terminal bar — the ray stops at the film */
                  <line
                    x1={FILM_X - 4}
                    y1={y - 6}
                    x2={FILM_X - 4}
                    y2={y + 6}
                    stroke={tone}
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                ) : (
                  <>
                    {showFilm && band.behavior === 'reduced' && (
                      <line
                        x1={FILM_X + 10}
                        y1={y}
                        x2={rayEnd}
                        y2={y}
                        stroke={tone}
                        strokeWidth={1.5}
                        strokeDasharray="4 5"
                        strokeLinecap="round"
                      />
                    )}
                    <path
                      d={`M ${rayEnd} ${y - 5} L ${rayEnd + 9} ${y} L ${rayEnd} ${y + 5} Z`}
                      fill={tone}
                    />
                  </>
                )}

                {band.annotation && (
                  <text
                    x={ANNOTATION_X}
                    y={y + 4}
                    fontSize="12.5"
                    fontWeight="600"
                    fill={tone}
                  >
                    {band.annotation}
                  </text>
                )}
              </g>
            );
          })}

          {showFilm && (
            <g>
              {[0, 1].map((pane) => (
                <rect
                  key={pane}
                  x={FILM_X + pane * 9}
                  y={top}
                  width={4.5}
                  height={height - top - 10}
                  rx={2}
                  fill="var(--text-muted)"
                  opacity={pane === 0 ? 0.85 : 0.45}
                />
              ))}
              <text
                x={FILM_X + 7}
                y={height - 2}
                fontSize="11"
                textAnchor="middle"
                fill="var(--text-muted)"
              >
                IrisPro film
              </text>
            </g>
          )}
        </svg>
      </div>

      <figcaption
        className="type-caption mt-2 flex flex-wrap gap-x-5 gap-y-1"
        style={{ color: 'var(--text-muted)' }}
      >
        {behaviorsUsed.map((behavior) => (
          <span key={behavior} className="inline-flex items-center gap-2">
            <span
              className="inline-block h-0.5 w-5 rounded-full"
              style={{ background: BEHAVIOR_TONE[behavior] }}
            />
            {BEHAVIOR_LEGEND[behavior]}
          </span>
        ))}
      </figcaption>
    </Reveal>
  );
}
