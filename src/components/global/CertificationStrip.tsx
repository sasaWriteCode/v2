import React, { useEffect, useState } from 'react';
import type { CertItem } from '@/types/content';

export interface PartnerLogo {
  id: string;
  name: string;
  sub?: string;
  styleType: 'luxe' | 'premium' | 'apex' | 'zenith' | 'shield' | 'glaze' | 'nexus' | 'veloce';
}

export const PARTNER_LOGOS: PartnerLogo[] = [
  { id: 'porsche', name: 'PORSCHE', sub: 'AUTOMOTIVE', styleType: 'luxe' },
  { id: 'petronas', name: 'PETRONAS', sub: 'ENERGY', styleType: 'zenith' },
  { id: 'sunway', name: 'SUNWAY', sub: 'DEVELOPMENT', styleType: 'premium' },
  { id: 'gamuda', name: 'GAMUDA', sub: 'ENGINEERING', styleType: 'apex' },
  { id: 'uem', name: 'UEM SUNRISE', sub: 'ESTATES', styleType: 'glaze' },
  { id: 'ijm', name: 'IJM LAND', sub: 'INFRASTRUCTURE', styleType: 'shield' },
  { id: 'kpj', name: 'KPJ HEALTH', sub: 'MEDICAL', styleType: 'veloce' },
  { id: 'sime', name: 'SIME DARBY', sub: 'MOTORS', styleType: 'nexus' },
  { id: 'drb', name: 'DRB-HICOM', sub: 'AUTOMOTIVE', styleType: 'luxe' },
  { id: 'boustead', name: 'BOUSTEAD', sub: 'HOLDINGS', styleType: 'zenith' },
  { id: 'mahsing', name: 'MAH SING', sub: 'PROPERTIES', styleType: 'premium' },
  { id: 'oriental', name: 'ORIENTAL', sub: 'HOLDINGS', styleType: 'glaze' },
];

function RenderLogoContent({ logo }: { logo: PartnerLogo }) {
  if (!logo) return null;

  switch (logo.styleType) {
    case 'luxe':
      return (
        <div className="trusted-logo trusted-logo--luxe">
          <div className="logo-core-wrap">
            <span className="logo-core-text">{logo.name}</span>
            <span className="logo-core-dot" />
          </div>
          {logo.sub && <span className="logo-core-sub">{logo.sub}</span>}
        </div>
      );
    case 'premium':
      return (
        <div className="trusted-logo trusted-logo--premium">
          <span className="logo-premium-text">{logo.name}</span>
          {logo.sub && <span className="logo-premium-sub">{logo.sub}</span>}
        </div>
      );
    case 'apex':
      return (
        <div className="trusted-logo">
          <span className="logo-apex-text">{logo.name}</span>
        </div>
      );
    case 'zenith':
      return (
        <div className="trusted-logo trusted-logo--zenith">
          <svg className="w-5 h-5 logo-zenith-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="logo-zenith-text">{logo.name}</span>
        </div>
      );
    case 'shield':
      return (
        <div className="trusted-logo trusted-logo--shield">
          <svg
            className="w-5 h-5 logo-shield-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span className="logo-shield-text">{logo.name}</span>
        </div>
      );
    case 'glaze':
      return (
        <div className="trusted-logo trusted-logo--glaze">
          <span className="logo-glaze-text">{logo.name}</span>
          {logo.sub && <span className="logo-glaze-sub">{logo.sub}</span>}
        </div>
      );
    case 'nexus':
      return (
        <div className="trusted-logo">
          <span className="logo-nexus-text">{logo.name}</span>
        </div>
      );
    case 'veloce':
      return (
        <div className="trusted-logo trusted-logo--veloce">
          <span className="logo-veloce-text">{logo.name}</span>
          {logo.sub && <span className="logo-veloce-sub">{logo.sub}</span>}
        </div>
      );
    default:
      return <span className="logo-core-text">{logo.name}</span>;
  }
}

function RotatingLogoCard({ logos, delay = 0 }: { logos: PartnerLogo[]; delay?: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [frontIndex, setFrontIndex] = useState(0);
  const [backIndex, setBackIndex] = useState(1);

  useEffect(() => {
    let nextIndex = 2;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setIsFlipped((prev) => {
          if (!prev) {
            setBackIndex(nextIndex % logos.length);
          } else {
            setFrontIndex(nextIndex % logos.length);
          }
          nextIndex++;
          return !prev;
        });
      }, 4000);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [logos, delay]);

  const frontLogo = logos[frontIndex % logos.length];
  const backLogo = logos[backIndex % logos.length];

  return (
    <div className={`trusted-logo-card ${isFlipped ? 'is-flipped' : ''}`}>
      {/* Front Face */}
      <div className="trusted-logo-face trusted-logo-face--front">
        <RenderLogoContent logo={frontLogo} />
      </div>

      {/* Back Face */}
      <div className="trusted-logo-face trusted-logo-face--back">
        <RenderLogoContent logo={backLogo} />
      </div>
    </div>
  );
}

/**
 * CertificationStrip / Trusted Collaborations (In Good Company) Section.
 * Renders 3D rotating partner logo slots with cream background and sleek face styles.
 */
export function CertificationStrip({
  certs,
  heading,
  title = 'In Good Company',
  subtitle = "Brand partnerships that share IrisPro's commitment to quality, protection, and premium engineering.",
}: {
  certs?: CertItem[];
  variant?: 'row' | 'grid';
  heading?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="trusted-collaborations-section">
      <style>{`
        /* Trusted Collaborations (In Good Company) Section */
        .trusted-collaborations-section {
          background-color: #f5f3f0;
          padding: 6rem 0;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .trusted-collaborations__container {
          max-width: var(--container-max, 1200px);
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 5vw, 4rem);
          text-align: center;
        }

        .trusted-collaborations__kicker {
          font-family: var(--font-ui, sans-serif);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #77777a;
          display: block;
          margin-bottom: 1rem;
        }

        .trusted-collaborations__title {
          font-family: var(--font-ui, sans-serif);
          font-size: clamp(2.1rem, 5vw, 3.2rem);
          font-weight: 800;
          font-style: normal;
          color: #1a1a1e;
          margin-bottom: 1.2rem;
          line-height: 1.2;
        }

        .trusted-collaborations__subtitle {
          font-family: var(--font-ui, sans-serif);
          font-size: 0.95rem;
          line-height: 1.6;
          color: #55555c;
          max-width: 620px;
          margin: 0 auto 4rem;
        }

        .trusted-collaborations__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }

        .trusted-logo-slot {
          position: relative;
          height: 130px;
          perspective: 1000px;
        }

        .trusted-logo-card {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.76, 0, 0.24, 1);
        }

        .trusted-logo-card.is-flipped {
          transform: rotateX(180deg);
        }

        .trusted-logo-face {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
          padding: 1.5rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .trusted-logo-face--front {
          transform: rotateX(0deg);
          z-index: 2;
        }

        .trusted-logo-face--back {
          transform: rotateX(180deg);
        }

        .trusted-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000000;
          user-select: none;
          width: 100%;
          height: 100%;
        }

        .trusted-logo--luxe {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .logo-core-wrap {
          display: flex;
          align-items: baseline;
        }

        .logo-core-text {
          font-family: var(--font-ui, sans-serif);
          font-weight: 800;
          font-size: 1.8rem;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .logo-core-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--color-red, #d20f18);
          margin-left: 2px;
        }

        .logo-core-sub {
          font-family: var(--font-ui, sans-serif);
          font-size: 0.52rem;
          font-weight: 900;
          letter-spacing: 0.35em;
          margin-top: 0.2rem;
          margin-right: -0.35em;
          color: #555;
        }

        .trusted-logo--premium {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .logo-premium-text {
          font-family: var(--font-ui, sans-serif);
          font-weight: 700;
          font-size: 1.3rem;
          letter-spacing: 0.2em;
          line-height: 1;
          color: #000000;
          margin-right: -0.2em;
        }

        .logo-premium-sub {
          font-family: var(--font-ui, sans-serif);
          font-size: 0.58rem;
          font-weight: 500;
          letter-spacing: 0.4em;
          margin-top: 0.3rem;
          margin-right: -0.4em;
          color: var(--color-red, #d20f18);
        }

        .logo-apex-text {
          font-family: var(--font-ui, sans-serif);
          font-weight: 300;
          font-size: 2rem;
          letter-spacing: -0.02em;
          line-height: 1;
          color: #000000;
        }

        .trusted-logo--zenith {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .logo-zenith-icon {
          color: var(--color-red, #d20f18);
        }

        .logo-zenith-text {
          font-family: var(--font-ui, sans-serif);
          font-weight: 800;
          font-size: 1.3rem;
          letter-spacing: 0.15em;
          line-height: 1;
        }

        .trusted-logo--shield {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-shield-icon {
          color: #000000;
        }

        .logo-shield-text {
          font-family: var(--font-ui, sans-serif);
          font-weight: 800;
          font-size: 1.35rem;
          letter-spacing: 0.08em;
          line-height: 1;
        }

        .trusted-logo--glaze {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .logo-glaze-text {
          font-family: var(--font-ui, sans-serif);
          font-weight: 300;
          font-size: 1.5rem;
          letter-spacing: 0.15em;
          line-height: 1;
        }

        .logo-glaze-sub {
          font-family: var(--font-ui, sans-serif);
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          margin-top: 0.3rem;
          color: #777;
        }

        .logo-nexus-text {
          font-family: var(--font-ui, sans-serif);
          font-weight: 300;
          font-size: 1.6rem;
          letter-spacing: 0.25em;
          line-height: 1;
          text-transform: uppercase;
        }

        .trusted-logo--veloce {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .logo-veloce-text {
          font-size: 1.6rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          line-height: 1;
        }

        .logo-veloce-sub {
          font-size: 0.55rem;
          font-weight: 600;
          border-top: 1px solid #000000;
          padding-top: 0.1rem;
          letter-spacing: 0.15em;
          margin-top: 0.2rem;
          color: #555;
        }

        @media (max-width: 991px) {
          .trusted-collaborations__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.2rem;
          }

          .trusted-logo-slot {
            height: 120px;
          }
        }

        @media (max-width: 575px) {
          .trusted-collaborations__grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .trusted-logo-slot {
            height: 110px;
          }
        }
      `}</style>
      <div className="trusted-collaborations__container text-center">
        <h2 className="trusted-collaborations__title">{heading || title}</h2>
        <p className="trusted-collaborations__subtitle">{subtitle}</p>
        <div className="trusted-collaborations__grid">
          {/* Logo Slot 1 */}
          <div className="trusted-logo-slot">
            <RotatingLogoCard logos={[PARTNER_LOGOS[0], PARTNER_LOGOS[4], PARTNER_LOGOS[8]]} delay={0} />
          </div>

          {/* Logo Slot 2 */}
          <div className="trusted-logo-slot">
            <RotatingLogoCard logos={[PARTNER_LOGOS[1], PARTNER_LOGOS[5], PARTNER_LOGOS[9]]} delay={1200} />
          </div>

          {/* Logo Slot 3 */}
          <div className="trusted-logo-slot">
            <RotatingLogoCard logos={[PARTNER_LOGOS[2], PARTNER_LOGOS[6], PARTNER_LOGOS[10]]} delay={2400} />
          </div>

          {/* Logo Slot 4 */}
          <div className="trusted-logo-slot">
            <RotatingLogoCard logos={[PARTNER_LOGOS[3], PARTNER_LOGOS[7], PARTNER_LOGOS[11]]} delay={3600} />
          </div>
        </div>
      </div>
    </section>
  );
}
