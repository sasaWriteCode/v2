import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@/components/global/Icon';
import { resolveUrl } from '@/lib/paths';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface TechPatentShowcaseProps {
  patent1Number?: string;
  patent1Badge?: string;
  patent1Title?: string;
  patent1Tagline?: string;
  patent1Lead?: string;
  patent2Number?: string;
  patent2Badge?: string;
  patent2Title?: string;
  patent2Tagline?: string;
  patent2Lead?: string;
}

export function TechPatentShowcase({
  patent1Number = '01',
  patent1Badge = 'PATENT 1',
  patent1Title = 'UV+420™ OPTICAL TECHNOLOGY',
  patent1Tagline = 'Complete protection for your skin & eyes.',
  patent1Lead = 'IRISPRO blocks UV400 (UVA1 380–400nm) and HEV Blue Light (380–420nm) at the source, helping protect your skin, eyes and health.',
  patent2Number = '02',
  patent2Badge = 'PATENT 2',
  patent2Title = '6-LAYER HOTMELT™ TECHNOLOGY',
  patent2Tagline = 'Stronger, more durable, built to last.',
  patent2Lead = '6 layers of advanced materials are hotmelted into one integrated base film for superior durability, optical clarity and long-term performance.',
}: TechPatentShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Patent 1 (UV) Section
      gsap.from('.tech-patent-section--uv .patent-card__visual', {
        opacity: 0,
        x: -80,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.tech-patent-section--uv',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.tech-patent-section--uv .patent-card__copy', {
        opacity: 0,
        x: 80,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.tech-patent-section--uv',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Patent 2 (Hotmelt) Section
      gsap.from('.tech-patent-section--hotmelt .patent-card__visual', {
        opacity: 0,
        x: -80,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.tech-patent-section--hotmelt',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.tech-patent-section--hotmelt .patent-card__copy', {
        opacity: 0,
        x: 80,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.tech-patent-section--hotmelt',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Patent 2 (Hotmelt) Stage Reveal (Spread & Labels) Scrub
      gsap.timeline({
        scrollTrigger: {
          trigger: '.tech-patent-section--hotmelt',
          start: 'top 80%',
          end: 'center center',
          scrub: 1,
          onEnter: () => {
            containerRef.current?.querySelector('.xs-stage')?.classList.add('is-revealed');
          },
          onEnterBack: () => {
            containerRef.current?.querySelector('.xs-stage')?.classList.add('is-revealed');
          },
          onLeaveBack: () => {
            containerRef.current?.querySelector('.xs-stage')?.classList.remove('is-revealed');
          },
        },
      })
        .to(
          '.xs-stage',
          {
            '--reveal': 1,
            ease: 'none',
          },
          0
        );

      // Patent 2 (Hotmelt) Rotor Tilt (3D Rotation) Scrub
      gsap.timeline({
        scrollTrigger: {
          trigger: '.tech-patent-section--hotmelt',
          start: 'top bottom',
          end: 'bottom 30%',
          scrub: 1,
        },
      })
        .to(
          '.xs-rotor',
          {
            transform: 'perspective(1500px) rotateX(-12deg) rotateY(-30deg)',
            ease: 'none',
          },
          0
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="technology-patent-showcase-wrapper w-full">
      {/* Patented Technology Section - Patent 1 */}
      <section className="tech-patent-section tech-patent-section--uv">
        <div className="tech-patent__container">
          <article className="patent-card is-active" data-i="0">
            <div className="patent-card__inner">
              <div className="patent-card__visual" aria-hidden="true">
                <div className="patent-visual patent-visual--uv">
                  {/* 3D glass with embossed IrisPro logo */}
                  <div className="pv-glass">
                    <span className="pv-glass__frame"></span>
                    <span className="pv-glass__pane pv-glass__pane--l"></span>
                    <span className="pv-glass__pane pv-glass__pane--r"></span>
                    <span className="pv-glass__mullion"></span>
                    {/* Embossed IrisPro logo on the glass */}
                    <span className="pv-emboss">
                      <b>Iris</b>
                      <em>P</em>
                      <b>ro</b>
                    </span>
                    {/* Reflection sheen sweeping across the glass */}
                    <span className="pv-glass__sheen"></span>
                    {/* Impact glows */}
                    <span className="pv-burst" data-i="0" data-color="#78aaff"></span>
                    <span className="pv-burst" data-i="1" data-color="#966ee6"></span>
                    <span className="pv-burst" data-i="2" data-color="#78aaff"></span>
                    <span className="pv-burst" data-i="3" data-color="#966ee6"></span>
                    <span className="pv-burst" data-i="4"></span>
                    <span className="pv-burst" data-i="5"></span>
                  </div>

                  {/* Inbound + reflected ray streams */}
                  <span
                    className="pv-stream pv-stream--hev1"
                    data-burst="0"
                    style={{ color: '#6aa8ff', ['--ray-color' as any]: '#6aa8ff' }}
                  >
                    <span
                      className="pv-stream__in"
                      style={{
                        background: 'linear-gradient(90deg, transparent, #6aa8ff)',
                        boxShadow: '0 0 12px #6aa8ff',
                        filter: 'drop-shadow(0 0 6px #6aa8ff) drop-shadow(0 0 14px #6aa8ff)',
                      }}
                    ></span>
                    <span
                      className="pv-stream__refl"
                      style={{
                        background: 'linear-gradient(90deg, #6aa8ff, transparent)',
                        boxShadow: '0 0 12px #6aa8ff',
                        filter: 'drop-shadow(0 0 6px #6aa8ff) drop-shadow(0 0 14px #6aa8ff)',
                      }}
                    ></span>
                  </span>
                  <span
                    className="pv-stream pv-stream--hev2"
                    data-burst="2"
                    style={{ color: '#6aa8ff', ['--ray-color' as any]: '#6aa8ff' }}
                  >
                    <span
                      className="pv-stream__in"
                      style={{
                        background: 'linear-gradient(90deg, transparent, #6aa8ff)',
                        boxShadow: '0 0 12px #6aa8ff',
                        filter: 'drop-shadow(0 0 6px #6aa8ff) drop-shadow(0 0 14px #6aa8ff)',
                      }}
                    ></span>
                    <span
                      className="pv-stream__refl"
                      style={{
                        background: 'linear-gradient(90deg, #6aa8ff, transparent)',
                        boxShadow: '0 0 12px #6aa8ff',
                        filter: 'drop-shadow(0 0 6px #6aa8ff) drop-shadow(0 0 14px #6aa8ff)',
                      }}
                    ></span>
                  </span>
                  <span
                    className="pv-stream pv-stream--uv1"
                    data-burst="1"
                    style={{ color: '#8a6fea', ['--ray-color' as any]: '#8a6fea' }}
                  >
                    <span
                      className="pv-stream__in"
                      style={{
                        background: 'linear-gradient(90deg, transparent, #8a6fea)',
                        boxShadow: '0 0 12px #8a6fea',
                        filter: 'drop-shadow(0 0 6px #8a6fea) drop-shadow(0 0 14px #8a6fea)',
                      }}
                    ></span>
                    <span
                      className="pv-stream__refl"
                      style={{
                        background: 'linear-gradient(90deg, #8a6fea, transparent)',
                        boxShadow: '0 0 12px #8a6fea',
                        filter: 'drop-shadow(0 0 6px #8a6fea) drop-shadow(0 0 14px #8a6fea)',
                      }}
                    ></span>
                  </span>
                  <span
                    className="pv-stream pv-stream--uv2"
                    data-burst="3"
                    style={{ color: '#8a6fea', ['--ray-color' as any]: '#8a6fea' }}
                  >
                    <span
                      className="pv-stream__in"
                      style={{
                        background: 'linear-gradient(90deg, transparent, #8a6fea)',
                        boxShadow: '0 0 12px #8a6fea',
                        filter: 'drop-shadow(0 0 6px #8a6fea) drop-shadow(0 0 14px #8a6fea)',
                      }}
                    ></span>
                    <span
                      className="pv-stream__refl"
                      style={{
                        background: 'linear-gradient(90deg, #8a6fea, transparent)',
                        boxShadow: '0 0 12px #8a6fea',
                        filter: 'drop-shadow(0 0 6px #8a6fea) drop-shadow(0 0 14px #8a6fea)',
                      }}
                    ></span>
                  </span>

                  {/* Spectrum legend */}
                  <span className="pv-legend">
                    <span>
                      <i style={{ background: '#6aa8ff' }}></i>HEV 420nm
                    </span>
                    <span>
                      <i style={{ background: '#8a6fea' }}></i>UV 400nm
                    </span>
                  </span>
                </div>
              </div>
              <div className="patent-card__copy">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-zinc-300 font-sans tracking-tight select-none">
                    {patent1Number}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#E82629] uppercase">
                    {patent1Badge}
                  </span>
                </div>
                <h3 className="patent-card__title">
                  {patent1Title}
                </h3>
                {patent1Tagline && (
                  <h4 className="text-base sm:text-lg font-bold text-[#140E0D] tracking-tight -mt-1">
                    {patent1Tagline}
                  </h4>
                )}
                <p className="patent-card__lead">
                  {patent1Lead}
                </p>

                {/* 4 Feature Spec Cards matching screenshot */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-3">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-zinc-200/90 shadow-sm flex flex-col items-center text-center justify-between min-h-[105px]">
                    <Icon name="shield" size={22} className="text-zinc-800 shrink-0" />
                    <span className="text-[11px] font-semibold text-zinc-700 leading-tight my-1">
                      Blocks UV400<br />(UVA1 + UVB)
                    </span>
                    <strong className="text-xs font-extrabold text-zinc-900">
                      100%
                    </strong>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-zinc-200/90 shadow-sm flex flex-col items-center text-center justify-between min-h-[105px]">
                    <Icon name="sun" size={22} className="text-zinc-800 shrink-0" />
                    <span className="text-[11px] font-semibold text-zinc-700 leading-tight my-1">
                      Blocks HEV Blue Light<br />380–430nm
                    </span>
                    <strong className="text-xs font-extrabold text-zinc-900">
                      Up to 100%
                    </strong>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-zinc-200/90 shadow-sm flex flex-col items-center text-center justify-between min-h-[105px]">
                    <Icon name="eye" size={22} className="text-zinc-800 shrink-0" />
                    <span className="text-[11px] font-semibold text-zinc-700 leading-tight mt-1">
                      Protects Eyes
                    </span>
                    <span className="text-[10px] text-zinc-500 font-medium leading-tight mb-0.5">
                      &amp; Reduces Cataract Risk
                    </span>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-zinc-200/90 shadow-sm flex flex-col items-center text-center justify-between min-h-[105px]">
                    <Icon name="person" size={22} className="text-zinc-800 shrink-0" />
                    <span className="text-[11px] font-semibold text-zinc-700 leading-tight mt-1">
                      Protects Skin
                    </span>
                    <span className="text-[10px] text-zinc-500 font-medium leading-tight mb-0.5">
                      &amp; Prevents Premature Aging
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Patented Technology Section - Patent 2 */}
      <section className="tech-patent-section tech-patent-section--hotmelt">
        <div className="tech-patent__container">
          <article className="patent-card is-active" data-i="1">
            <div className="patent-card__inner">
              <div className="patent-card__visual" aria-hidden="true">
                <div className="patent-visual patent-visual--hotmelt" id="pv-section">
                  {/* Title bracket */}
                  <div className="xs-title">
                    <span className="xs-title__line xs-title__line--l"></span>
                    <span className="xs-title__text">6 + S + 1 Hot Melt Film</span>
                    <span className="xs-title__line xs-title__line--r"></span>
                  </div>

                  <div className="xs-stage" id="xs-stage">
                    <div className="xs-rotor" id="xs-rotor">
                      <div className="xs-deck">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className={`xs-layer ${i === 7 ? 'xs-layer--final' : ''}`}
                            data-i={i}
                          >
                            <span className="xs-sheet"></span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Labels live OUTSIDE the rotor so they never rotate / distort */}
                    <div className="xs-labels" aria-hidden="true">
                      {[
                        'Anti Aging',
                        'UV400 HEV Bluelight',
                        'Chip Dye',
                        'Nano Titanium',
                        'UV400 HEV Bluelight',
                        'Anti Aging',
                        'Extra Sputter',
                        'Release Layer',
                      ].map((label, i) => (
                        <div key={i} className="xs-tag" data-i={i}>
                          <span className="xs-tag__line"></span>
                          <span className="xs-tag__pill">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="patent-card__copy flex flex-col gap-3.5">
                <div className="flex items-center gap-3 mb-0.5">
                  <span className="text-4xl sm:text-5xl font-extrabold text-zinc-300 font-sans tracking-tight select-none">
                    {patent2Number}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#E82629] uppercase">
                    {patent2Badge}
                  </span>
                </div>
                <h3 className="patent-card__title">
                  {patent2Title}
                </h3>
                {patent2Tagline && (
                  <h4 className="text-base sm:text-lg font-bold text-[#140E0D] tracking-tight -mt-1">
                    {patent2Tagline}
                  </h4>
                )}
                <p className="patent-card__lead">
                  {patent2Lead}
                </p>

                {/* 6 Layers list with numbered badges */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-zinc-200/90 shadow-sm space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-1">
                    Integrated 6-Layer Architecture
                  </span>
                  <ul className="space-y-1.5">
                    {[
                      'Anti-Aging Outer Layer',
                      'UV+420™ / UV380 Layer',
                      'Chip Dye Colour Layer',
                      'Titanium Oxide Inorganic Ceramic Heat Rejection Layer',
                      'UV+420™ / UV380 Layer',
                      'Anti-Aging Outer Layer',
                    ].map((layerName, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#1b5091] text-white text-[10px] font-bold shrink-0 shadow-sm">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-semibold text-zinc-800">
                          {layerName}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why Hotmelt Technology Card */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-zinc-200/90 shadow-sm space-y-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 block">
                    WHY HOTMELT TECHNOLOGY?
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="flex items-start gap-2">
                      <Icon name="shield" size={16} className="text-[#E82629] shrink-0 mt-0.5" />
                      <span className="text-xs text-zinc-700 leading-snug">Stronger structure, less prone to delamination</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="sun" size={16} className="text-[#E82629] shrink-0 mt-0.5" />
                      <span className="text-xs text-zinc-700 leading-snug">Superior UV, heat &amp; color stability</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="thermometer" size={16} className="text-[#E82629] shrink-0 mt-0.5" />
                      <span className="text-xs text-zinc-700 leading-snug">Better durability in harsh climate</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="eye" size={16} className="text-[#E82629] shrink-0 mt-0.5" />
                      <span className="text-xs text-zinc-700 leading-snug">Crystal clear visibility</span>
                    </div>
                  </div>

                  {/* Hotmelt into One banner */}
                  <div className="pt-2.5 border-t border-zinc-100 flex items-center justify-between">
                    <div>
                      <strong className="text-xs font-extrabold text-[#E82629] block uppercase tracking-wide">
                        HOTMELT INTO ONE
                      </strong>
                      <span className="text-[11px] font-medium text-zinc-500">
                        Integrated. Durable. Reliable.
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-700 bg-zinc-100 px-2.5 py-1 rounded-md">
                      6 In 1
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Sputtered Nanotechnology Detail Section */}
      <section className="tech-sputtered-section">
        <div className="tech-sputtered__container">
          <div className="tech-sputtered__grid">
            {/* Left Column: Description text & Comparison Matrix */}
            <div className="tech-sputtered__content flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl sm:text-5xl font-extrabold text-zinc-300 font-sans tracking-tight select-none">
                  03
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#0a0a0a] uppercase m-0 leading-tight">
                  MULTI-LAYER SPUTTERING TECHNOLOGY
                </h2>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#140E0D] tracking-tight -mt-0.5 mb-0">
                Reflect more heat. Stay cooler.
              </h3>

              <p className="tech-sputtered__text mb-1">
                Multi-layer sputtering reflects up to 98% of solar heat (IRR up to 1400nm) for maximum heat rejection without compromising visibility.
              </p>

              {/* Silver Sputter Badge Pill */}
              <div className="inline-flex items-center gap-2.5 bg-zinc-950 text-white px-3.5 py-1.5 rounded-lg border border-zinc-800 self-start shadow-sm mb-1">
                <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-red-400">
                  <Icon name="layers" size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-extrabold tracking-wider uppercase leading-tight">
                    SILVER SPUTTER
                  </span>
                  <span className="text-[9px] text-zinc-400 font-medium leading-tight">
                    Highest Heat Reflectivity
                  </span>
                </div>
              </div>

              {/* Sputter Materials Table */}
              <div className="w-full overflow-x-auto rounded-xl bg-white border border-zinc-200/90 shadow-sm p-2 sm:p-3">
                <table className="w-full text-center text-xs border-collapse min-w-[340px]">
                  <thead>
                    <tr className="border-b border-zinc-200">
                      <th className="p-2 text-left text-zinc-400 font-medium text-[11px]"></th>
                      <th className="p-2 font-extrabold text-[#140E0D] border-b-2 border-red-500 bg-red-50/40 rounded-t-md">
                        SILVER
                      </th>
                      <th className="p-2 font-bold text-zinc-700">Titanium</th>
                      <th className="p-2 font-bold text-zinc-700">NiCr</th>
                      <th className="p-2 font-bold text-zinc-700">SS</th>
                      <th className="p-2 font-bold text-zinc-700">Aluminium</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-100">
                      <td className="p-2 text-left font-bold text-zinc-800 text-[11px]">
                        Reflectivity
                      </td>
                      <td className="p-2 text-[#E82629] font-bold text-sm tracking-widest bg-red-50/20">
                        ★★★★★
                      </td>
                      <td className="p-2 text-amber-500 font-bold text-sm tracking-widest">
                        ★★★★
                      </td>
                      <td className="p-2 text-yellow-500 font-bold text-sm tracking-widest">
                        ★★★
                      </td>
                      <td className="p-2 text-emerald-600 font-bold text-sm tracking-widest">
                        ★★★
                      </td>
                      <td className="p-2 text-blue-500 font-bold text-sm tracking-widest">
                        ★★★
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 text-left font-bold text-zinc-800 text-[11px]">
                        Heat Rejection
                      </td>
                      <td className="p-2 font-bold text-[#E82629] bg-red-50/20 rounded-b-md">
                        Excellent
                      </td>
                      <td className="p-2 font-medium text-zinc-700">
                        Very Good
                      </td>
                      <td className="p-2 font-medium text-zinc-700">
                        Good
                      </td>
                      <td className="p-2 font-medium text-zinc-700">
                        Fair
                      </td>
                      <td className="p-2 font-medium text-zinc-700">
                        Fair
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Close-up HD Image */}
            <div className="tech-sputtered__image-wrapper">
              <img
                src={resolveUrl('/images/sputtered_film_roll.png')}
                alt="Close-up of IrisPro Sputtered Nanotechnology Window Film roll"
                className="tech-sputtered__image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 04: Precision Manufacturing Section */}
      <section className="tech-manufacturing-section">
        <div className="tech-manufacturing__container">
          <div className="tech-manufacturing__grid">
            {/* Left Column: Description & Banner */}
            <div className="tech-manufacturing__content flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl sm:text-5xl font-extrabold text-zinc-300 font-sans tracking-tight select-none">
                  04
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#0a0a0a] uppercase m-0 leading-tight">
                  PRECISION MANUFACTURING
                </h2>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#140E0D] tracking-tight -mt-0.5 mb-0">
                From raw material to premium film.
              </h3>

              <p className="tech-manufacturing__text mb-2">
                IRISPRO uses advanced manufacturing process and strict quality control to ensure consistent performance in every roll.
              </p>

              {/* Bottom Dark Banner */}
              <div className="bg-[#0a0a0a] text-white py-3 px-5 rounded-xl font-extrabold text-[10px] sm:text-xs tracking-wider uppercase inline-block shadow-sm">
                STRICT QUALITY CONTROL &nbsp;|&nbsp; CONSISTENT PERFORMANCE &nbsp;|&nbsp; BUILT FOR ASEAN CLIMATE
              </div>
            </div>

            {/* Right Column: 6 Process Flow Steps with S-Curve Serpentine Workflow */}
            <div className="tech-manufacturing__flow-container">
              <div className="flex flex-col gap-4 sm:gap-6">
                
                {/* Row 1: Step 01 -> Step 02 -> Step 03 (Flows Right) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 sm:gap-y-0 gap-x-2 items-center">
                  {/* Step 1 */}
                  <div className="flex items-center">
                    <div className="process-step-card flex-1 flex flex-col items-center text-center p-3.5 rounded-xl bg-white border border-zinc-200/90 shadow-sm relative group hover:border-[#E82629] transition-all">
                      <span className="process-step-num">01</span>
                      <div className="w-12 h-12 rounded-full bg-zinc-50 border border-zinc-200/80 flex items-center justify-center text-zinc-800 mb-1.5 group-hover:scale-105 transition-transform">
                        <Icon name="layers" size={20} className="text-zinc-700" />
                      </div>
                      <span className="text-xs font-bold text-zinc-800 leading-tight">
                        Raw Material Selection
                      </span>
                    </div>
                    {/* Arrow 1 -> 2 (Right) */}
                    <div className="process-flow-arrow hidden sm:flex items-center justify-center px-1 delay-0">
                      <svg className="w-5 h-5 process-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-center">
                    <div className="process-step-card flex-1 flex flex-col items-center text-center p-3.5 rounded-xl bg-white border border-zinc-200/90 shadow-sm relative group hover:border-[#E82629] transition-all">
                      <span className="process-step-num">02</span>
                      <div className="w-12 h-12 rounded-full bg-zinc-50 border border-zinc-200/80 flex items-center justify-center text-zinc-800 mb-1.5 group-hover:scale-105 transition-transform">
                        <Icon name="sun" size={20} className="text-zinc-700" />
                      </div>
                      <span className="text-xs font-bold text-zinc-800 leading-tight">
                        Precision Coating
                      </span>
                    </div>
                    {/* Arrow 2 -> 3 (Right) */}
                    <div className="process-flow-arrow hidden sm:flex items-center justify-center px-1 delay-1">
                      <svg className="w-5 h-5 process-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-center">
                    <div className="process-step-card flex-1 flex flex-col items-center text-center p-3.5 rounded-xl bg-white border border-zinc-200/90 shadow-sm relative group hover:border-[#E82629] transition-all">
                      <span className="process-step-num">03</span>
                      <div className="w-12 h-12 rounded-full bg-zinc-50 border border-zinc-200/80 flex items-center justify-center text-zinc-800 mb-1.5 group-hover:scale-105 transition-transform">
                        <Icon name="bolt" size={20} className="text-zinc-700" />
                      </div>
                      <span className="text-xs font-bold text-zinc-800 leading-tight">
                        Vacuum Sputtering
                      </span>
                    </div>
                  </div>
                </div>

                {/* S-Curve Flow Connector: from Step 3 (Top Right) to Step 4 (Bottom Right) */}
                <div className="hidden sm:flex justify-end pr-14 -my-3.5 z-10">
                  <div className="process-flow-arrow process-flow-arrow--curve delay-2 flex items-center">
                    <svg className="w-16 h-8 process-curve-svg" viewBox="0 0 64 32" fill="none">
                      <path d="M 52 2 C 64 2, 64 30, 20 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M 26 25 L 18 30 L 26 35" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Row 2: Step 06 <- Step 05 <- Step 04 (Flows Left) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 sm:gap-y-0 gap-x-2 items-center">
                  {/* Step 6 */}
                  <div className="flex items-center order-3 sm:order-1">
                    <div className="process-step-card flex-1 flex flex-col items-center text-center p-3.5 rounded-xl bg-white border border-zinc-200/90 shadow-sm relative group hover:border-[#E82629] transition-all">
                      <span className="process-step-num">06</span>
                      <div className="w-12 h-12 rounded-full bg-zinc-50 border border-zinc-200/80 flex items-center justify-center text-zinc-800 mb-1.5 group-hover:scale-105 transition-transform">
                        <Icon name="shield" size={20} className="text-zinc-700" />
                      </div>
                      <span className="text-xs font-bold text-zinc-800 leading-tight">
                        Slitting &amp; Packaging
                      </span>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex items-center order-2">
                    {/* Arrow 5 -> 6 (Left) */}
                    <div className="process-flow-arrow hidden sm:flex items-center justify-center px-1 delay-4">
                      <svg className="w-5 h-5 process-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                    </div>

                    <div className="process-step-card flex-1 flex flex-col items-center text-center p-3.5 rounded-xl bg-white border border-zinc-200/90 shadow-sm relative group hover:border-[#E82629] transition-all">
                      <span className="process-step-num">05</span>
                      <div className="w-12 h-12 rounded-full bg-zinc-50 border border-zinc-200/80 flex items-center justify-center text-zinc-800 mb-1.5 group-hover:scale-105 transition-transform">
                        <Icon name="eye" size={20} className="text-zinc-700" />
                      </div>
                      <span className="text-xs font-bold text-zinc-800 leading-tight">
                        Quality Inspection
                      </span>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-center order-1 sm:order-3">
                    {/* Arrow 4 -> 5 (Left) */}
                    <div className="process-flow-arrow hidden sm:flex items-center justify-center px-1 delay-3">
                      <svg className="w-5 h-5 process-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                    </div>

                    <div className="process-step-card flex-1 flex flex-col items-center text-center p-3.5 rounded-xl bg-white border border-zinc-200/90 shadow-sm relative group hover:border-[#E82629] transition-all">
                      <span className="process-step-num">04</span>
                      <div className="w-12 h-12 rounded-full bg-zinc-50 border border-zinc-200/80 flex items-center justify-center text-zinc-800 mb-1.5 group-hover:scale-105 transition-transform">
                        <Icon name="layers" size={20} className="text-zinc-700" />
                      </div>
                      <span className="text-xs font-bold text-zinc-800 leading-tight">
                        Hotmelt Lamination
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05: Professional Installation System Section */}
      <section className="tech-installation-section">
        <div className="tech-installation__container">
          <div className="tech-installation__grid">
            {/* Left Column: Description & 5 Pillars */}
            <div className="tech-installation__content flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl sm:text-5xl font-extrabold text-zinc-300 font-sans tracking-tight select-none">
                  05
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#0a0a0a] uppercase m-0 leading-tight">
                  PROFESSIONAL INSTALLATION SYSTEM
                </h2>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#140E0D] tracking-tight -mt-0.5 mb-0">
                Technology is only as good as the installation.
              </h3>

              <p className="tech-installation__text mb-2">
                We follow IWFA installation standards to ensure optimal performance, clarity and long-term warranty support.
              </p>

              {/* 5 Installation Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
                {[
                  { title: 'IWFA Installation Standard', isBadge: true },
                  { title: 'Dust-Free Environment', icon: 'sun' },
                  { title: 'Precision Cutting', icon: 'check' },
                  { title: 'Professional Tools', icon: 'layers' },
                  { title: 'Warranty Support', icon: 'shield' },
                ].map((pillar) => (
                  <div key={pillar.title} className="flex flex-col items-center text-center p-2.5 rounded-xl bg-white border border-zinc-200/90 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-200/80 flex items-center justify-center text-zinc-800 mb-1.5">
                      {pillar.isBadge ? (
                        <span className="text-[10px] font-black tracking-tighter text-zinc-900 font-sans">
                          IWFA
                        </span>
                      ) : (
                        <Icon name={pillar.icon as any} size={18} className="text-zinc-700" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-zinc-800 leading-tight">
                      {pillar.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Shield Badge Graphic */}
            <div className="tech-installation__visual flex items-center justify-center p-4">
              <div className="w-full max-w-[220px] aspect-[4/5] rounded-3xl border-2 border-zinc-300 bg-white p-6 flex flex-col items-center justify-center text-center relative group hover:border-[#E82629] transition-colors shadow-sm">
                <span className="text-xs font-black uppercase tracking-wider text-zinc-900 leading-snug mb-5">
                  INSTALLATION<br />MAKES THE<br />DIFFERENCE
                </span>
                <div className="w-12 h-12 rounded-full border-2 border-zinc-900 flex items-center justify-center text-zinc-900 group-hover:border-[#E82629] group-hover:text-[#E82629] transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scoped CSS styling */}
      <style>{`
        /* 04 Precision Manufacturing Section */
        .tech-manufacturing-section {
          background-color: #ffffff;
          padding: 7rem 0;
          border-top: 1px solid rgba(0, 0, 0, 0.04);
        }

        .tech-manufacturing__container {
          width: 100%;
          max-width: var(--container-max, 1200px);
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 5vw, 5rem);
        }

        .tech-manufacturing__grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: clamp(2.5rem, 5vw, 5rem);
          align-items: center;
        }

        .tech-manufacturing__content {
          display: flex;
          flex-direction: column;
        }

        .tech-manufacturing__text {
          font-family: inherit;
          font-size: clamp(0.95rem, 1.5vw, 1.05rem);
          line-height: 1.8;
          color: #4a4a55;
        }

        /* Process Flow Step Cards & Animated Glowing Arrows */
        .process-step-card {
          position: relative;
          background: #ffffff;
        }

        .process-step-num {
          position: absolute;
          top: 6px;
          left: 10px;
          font-size: 10px;
          font-weight: 800;
          color: #a1a1aa;
          letter-spacing: -0.02em;
        }

        .process-flow-arrow {
          color: #d4d4d8;
          flex-shrink: 0;
        }

        .process-arrow-svg {
          animation: processArrowPulse 2.5s infinite ease-in-out;
        }

        .process-flow-arrow.delay-0 .process-arrow-svg {
          animation-delay: 0s;
        }

        .process-flow-arrow.delay-1 .process-arrow-svg {
          animation-delay: 0.5s;
        }

        .process-flow-arrow.delay-2 .process-arrow-svg {
          animation-delay: 1.0s;
        }

        .process-flow-arrow.delay-3 .process-arrow-svg {
          animation-delay: 1.5s;
        }

        .process-flow-arrow.delay-4 .process-arrow-svg {
          animation-delay: 2.0s;
        }

        .process-flow-arrow--down .process-arrow-svg {
          animation-name: processArrowDownPulse;
        }

        .process-curve-svg {
          animation: processArrowCurvePulse 2.5s infinite ease-in-out;
        }

        .process-flow-arrow--curve .process-curve-svg {
          animation-delay: 1.0s;
        }

        @keyframes processArrowCurvePulse {
          0%, 100% {
            color: #d4d4d8;
            stroke: #d4d4d8;
            filter: drop-shadow(0 0 0px transparent);
          }
          50% {
            color: #E82629;
            stroke: #E82629;
            filter: drop-shadow(0 0 8px rgba(232, 38, 41, 0.8)) drop-shadow(0 0 14px rgba(232, 38, 41, 0.45));
          }
        }

        @keyframes processArrowPulse {
          0%, 100% {
            color: #d4d4d8;
            transform: translateX(0) scale(1);
            filter: drop-shadow(0 0 0px transparent);
          }
          50% {
            color: #E82629;
            transform: translateX(3px) scale(1.2);
            filter: drop-shadow(0 0 8px rgba(232, 38, 41, 0.8)) drop-shadow(0 0 14px rgba(232, 38, 41, 0.45));
          }
        }

        @keyframes processArrowDownPulse {
          0%, 100% {
            color: #d4d4d8;
            transform: translateY(0) scale(1);
            filter: drop-shadow(0 0 0px transparent);
          }
          50% {
            color: #E82629;
            transform: translateY(3px) scale(1.2);
            filter: drop-shadow(0 0 8px rgba(232, 38, 41, 0.8)) drop-shadow(0 0 14px rgba(232, 38, 41, 0.45));
          }
        }

        @media (max-width: 991px) {
          .tech-manufacturing-section {
            padding: 4rem 0;
          }

          .tech-manufacturing__grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        /* 05 Professional Installation System Section */
        .tech-installation-section {
          background-color: #fafaf8;
          padding: 7rem 0;
          border-top: 1px solid rgba(0, 0, 0, 0.04);
        }

        .tech-installation__container {
          width: 100%;
          max-width: var(--container-max, 1200px);
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 5vw, 5rem);
        }

        .tech-installation__grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: clamp(2.5rem, 5vw, 5rem);
          align-items: center;
        }

        .tech-installation__content {
          display: flex;
          flex-direction: column;
        }

        .tech-installation__text {
          font-family: inherit;
          font-size: clamp(0.95rem, 1.5vw, 1.05rem);
          line-height: 1.8;
          color: #4a4a55;
        }

        @media (max-width: 991px) {
          .tech-installation-section {
            padding: 4rem 0;
          }

          .tech-installation__grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        /* Sputtered Nanotechnology Detail Section */
        .tech-sputtered-section {
          background-color: #fafaf8;
          padding: 7rem 0;
          border-top: 1px solid rgba(0, 0, 0, 0.04);
        }

        .tech-sputtered__container {
          width: 100%;
          max-width: var(--container-max, 1200px);
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 5vw, 5rem);
        }

        .tech-sputtered__grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: clamp(2.5rem, 5vw, 5rem);
          align-items: center;
        }

        .tech-sputtered__content {
          display: flex;
          flex-direction: column;
        }

        .tech-sputtered__title {
          font-family: inherit;
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: #0a0a0a;
          margin-bottom: 1.5rem;
        }

        .tech-sputtered__text {
          font-family: inherit;
          font-size: clamp(0.95rem, 1.5vw, 1.05rem);
          line-height: 1.8;
          color: #4a4a55;
          margin-bottom: 1.5rem;
        }

        .tech-sputtered__text:last-child {
          margin-bottom: 0;
        }

        .tech-sputtered__image-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .tech-sputtered__image {
          width: 100%;
          height: auto;
          max-height: 480px;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: none;
        }

        @media (max-width: 991px) {
          .tech-sputtered-section {
            padding: 4rem 0;
          }

          .tech-sputtered__grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .tech-sputtered__title {
            margin-bottom: 1.2rem;
          }
        }

        .tech-patent-section {
          background-color: #fafaf8;
          padding: 6rem 0;
          border-top: 1px solid rgba(0, 0, 0, 0.04);
        }

        .tech-patent-section--uv {
          padding-bottom: 2.5rem;
        }

        .tech-patent-section--hotmelt {
          padding-top: 2.5rem;
          border-top: none;
        }

        .tech-patent__container {
          width: 100%;
          max-width: var(--container-max, 1200px);
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 5vw, 5rem);
          display: flex;
          justify-content: center;
        }

        /* Patent card styling */
        .patent-card {
          flex: 0 0 min(96%, 1080px);
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          overflow: visible;
          position: relative;
          isolation: isolate;
        }

        .patent-card.is-active {
          transform: none;
          opacity: 1;
          filter: none;
          box-shadow: none !important;
        }

        .patent-card.is-active::before,
        .patent-card.is-active::after {
          display: none !important;
        }

        .patent-card__inner {
          display: grid;
          grid-template-columns: 1fr 1.05fr;
          gap: clamp(28px, 4vw, 56px);
          padding: clamp(24px, 4vw, 48px);
          position: relative;
          z-index: 2;
          align-items: center;
        }

        .patent-card__visual {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-height: 440px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .patent-card__copy {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-width: 520px;
        }

        .patent-card__pat {
          font-family: inherit;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #E82629;
          background: rgba(232, 38, 41, 0.08);
          border: 1px solid rgba(232, 38, 41, 0.22);
          padding: 6px 14px;
          border-radius: 999px;
          align-self: flex-start;
        }

        .patent-card__title {
          font-family: inherit;
          font-weight: 800;
          font-size: clamp(1.6rem, 2.6vw, 2.2rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #140E0D !important;
          margin: 4px 0 6px;
        }

        .patent-card__lead {
          font-family: inherit;
          font-size: 0.95rem;
          color: rgba(20, 14, 13, 0.72) !important;
          line-height: 1.6;
          margin: 0 0 8px;
        }

        .patent-card__specs {
          list-style: none;
          margin: 8px 0 0;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 22px;
        }

        .patent-card__specs li {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 10px 0 10px 14px;
          border-left: 2px solid rgba(232, 38, 41, 0.4);
        }

        .patent-card__specs strong {
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 700;
          color: #140E0D;
          letter-spacing: -0.005em;
        }

        .patent-card__specs span {
          font-family: inherit;
          font-size: 0.78rem;
          color: rgba(20, 14, 13, 0.62);
          line-height: 1.45;
        }

        /* ── Patent 1 visual — light physics simulation on glass ── */
        .patent-visual {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
          overflow: visible;
        }

        .patent-visual--uv {
          padding: 10% 6%;
        }

        .pv-glass {
          position: relative;
          width: 80%;
          aspect-ratio: 1.05 / 1;
          transform: rotateY(-18deg) rotateX(2deg);
          transform-style: preserve-3d;
        }

        .pv-glass__frame {
          position: absolute;
          inset: 0;
          border-radius: 6px;
          border: 4px solid #cfd2d6;
          background: linear-gradient(135deg, #e6e8ec 0%, #c5c8cc 50%, #b8bbc0 100%);
          box-shadow:
            0 0 0 2px rgba(120, 124, 130, 0.35) inset,
            0 28px 60px -24px rgba(20, 14, 13, 0.45);
        }

        .pv-glass__pane {
          position: absolute;
          top: 6%;
          bottom: 6%;
          width: 45%;
          background:
            linear-gradient(135deg, rgba(50, 62, 82, 0.92) 0%, rgba(28, 38, 58, 0.96) 50%, rgba(40, 52, 72, 0.9) 100%);
          border: 1px solid rgba(180, 190, 210, 0.3);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.06) inset,
            0 0 80px rgba(120, 170, 255, 0.06) inset;
          overflow: hidden;
        }

        .pv-glass__pane--l {
          left: 5%;
        }

        .pv-glass__pane--r {
          right: 5%;
        }

        .pv-glass__mullion {
          position: absolute;
          top: 4%;
          bottom: 4%;
          left: 50%;
          width: 5px;
          margin-left: -2.5px;
          background: linear-gradient(180deg, #e6e8ec 0%, #b8bbc0 100%);
          border-radius: 2px;
        }

        /* Embossed IrisPro logo on the glass surface */
        .pv-emboss {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: inherit;
          font-weight: 800;
          font-size: clamp(1.6rem, 3vw, 2.6rem);
          letter-spacing: -0.03em;
          color: rgba(255, 255, 255, 0.06);
          text-shadow:
            0 1px 0 rgba(255, 255, 255, 0.18),
            0 -1px 0 rgba(0, 0, 0, 0.4);
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
          z-index: 2;
        }

        .pv-emboss b {
          font-weight: 800;
          color: rgba(255, 255, 255, 0.10);
        }

        .pv-emboss em {
          font-style: normal;
          color: rgba(255, 90, 90, 0.22);
        }

        /* Slow reflection sheen sweeping across the glass surface */
        .pv-glass__sheen {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50%;
          background: linear-gradient(110deg,
              transparent 0%,
              rgba(255, 255, 255, 0.04) 35%,
              rgba(255, 255, 255, 0.18) 50%,
              rgba(255, 255, 255, 0.04) 65%,
              transparent 100%);
          mix-blend-mode: screen;
          filter: blur(3px);
          pointer-events: none;
          animation: pvSheen 7s ease-in-out infinite;
        }

        @keyframes pvSheen {
          0%,
          100% {
            transform: translateX(-60%);
            opacity: 0.4;
          }
          50% {
            transform: translateX(160%);
            opacity: 1;
          }
        }

        /* Impact bursts — bloom where rays hit the glass */
        .pv-burst {
          position: absolute;
          width: 60px;
          height: 60px;
          margin: -30px 0 0 -30px;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          filter: blur(2px);
          z-index: 3;
        }

        .pv-burst[data-i="0"] {
          left: 30%;
          top: 38%;
          background: radial-gradient(circle, rgba(120, 170, 255, 0.95), transparent 70%);
        }

        .pv-burst[data-i="1"] {
          left: 50%;
          top: 32%;
          background: radial-gradient(circle, rgba(150, 110, 230, 0.95), transparent 70%);
        }

        .pv-burst[data-i="2"] {
          left: 68%;
          top: 52%;
          background: radial-gradient(circle, rgba(120, 170, 255, 0.95), transparent 70%);
        }

        .pv-burst[data-i="3"] {
          left: 80%;
          top: 34%;
          background: radial-gradient(circle, rgba(150, 110, 230, 0.95), transparent 70%);
        }

        .pv-burst[data-i="4"],
        .pv-burst[data-i="5"] {
          display: none;
        }

        /* Ray streams — incoming + reflected back outward */
        .pv-stream {
          position: absolute;
          pointer-events: none;
          transform-origin: top left;
          z-index: 4;
        }

        .pv-stream__in,
        .pv-stream__refl {
          position: absolute;
          top: 0;
          left: 0;
          height: 4px;
          border-radius: 4px;
          transform-origin: left center;
          box-shadow: 0 0 12px currentColor;
        }

        .pv-stream__in {
          width: 0;
          background: linear-gradient(90deg, transparent, currentColor);
          opacity: 0;
        }

        .pv-stream__refl {
          width: 0;
          background: linear-gradient(90deg, currentColor, transparent);
          opacity: 0;
          left: 100%;
        }

        .pv-stream--hev1 {
          top: -10%;
          left: -18%;
          color: #6aa8ff;
          transform: rotate(45deg);
          width: 68%;
        }

        .pv-stream--uv1 {
          top: -10%;
          left: 8%;
          color: #8a6fea;
          transform: rotate(45deg);
          width: 59%;
        }

        .pv-stream--hev2 {
          top: -10%;
          left: 6%;
          color: #6aa8ff;
          transform: rotate(45deg);
          width: 88%;
        }

        .pv-stream--uv2 {
          top: -10%;
          left: 36%;
          color: #8a6fea;
          transform: rotate(45deg);
          width: 62%;
        }

        .patent-card.is-active .pv-stream__in {
          animation: rayIn 3.6s cubic-bezier(.4, 0, .2, 1) infinite;
        }

        .patent-card.is-active .pv-stream__refl {
          animation: rayRefl 3.6s cubic-bezier(.4, 0, .2, 1) infinite;
        }

        .pv-stream--hev1 .pv-stream__in,
        .pv-stream--hev1 .pv-stream__refl {
          animation-delay: 0.0s;
        }

        .pv-stream--uv1 .pv-stream__in,
        .pv-stream--uv1 .pv-stream__refl {
          animation-delay: 0.4s;
        }

        .pv-stream--hev2 .pv-stream__in,
        .pv-stream--hev2 .pv-stream__refl {
          animation-delay: 0.8s;
        }

        .pv-stream--uv2 .pv-stream__in,
        .pv-stream--uv2 .pv-stream__refl {
          animation-delay: 1.2s;
        }

        @keyframes rayIn {
          0% {
            width: 0;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          40% {
            width: 100%;
            opacity: 1;
          }
          55% {
            width: 100%;
            opacity: 0.4;
          }
          70% {
            opacity: 0;
          }
          100% {
            width: 100%;
            opacity: 0;
          }
        }

        @keyframes rayRefl {
          0%,
          38% {
            width: 0;
            opacity: 0;
            transform: rotate(0deg);
          }
          45% {
            width: 0;
            opacity: 0;
            transform: rotate(var(--refl-angle, -60deg));
          }
          55% {
            width: 32%;
            opacity: 0.95;
            transform: rotate(var(--refl-angle, -60deg));
          }
          72% {
            width: 44%;
            opacity: 0.7;
            transform: rotate(var(--refl-angle, -60deg));
          }
          85% {
            width: 44%;
            opacity: 0;
            transform: rotate(var(--refl-angle, -60deg));
          }
          100% {
            width: 0;
            opacity: 0;
            transform: rotate(var(--refl-angle, -60deg));
          }
        }

        .pv-stream--hev1 .pv-stream__refl,
        .pv-stream--uv1 .pv-stream__refl,
        .pv-stream--hev2 .pv-stream__refl,
        .pv-stream--uv2 .pv-stream__refl {
          --refl-angle: -90deg;
        }

        .patent-card.is-active .pv-burst {
          animation: rayBurst 3.6s ease-in-out infinite;
        }

        .pv-burst[data-i="0"] {
          animation-delay: 1.4s;
        }
        .pv-burst[data-i="1"] {
          animation-delay: 1.8s;
        }
        .pv-burst[data-i="2"] {
          animation-delay: 2.2s;
        }
        .pv-burst[data-i="3"] {
          animation-delay: 2.6s;
        }

        @keyframes rayBurst {
          0%,
          30% {
            opacity: 0;
            transform: scale(0.6);
          }
          38% {
            opacity: 1;
            transform: scale(1.15);
          }
          55% {
            opacity: 0.5;
            transform: scale(1);
          }
          70% {
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }

        .pv-legend {
          position: absolute;
          bottom: 4%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 14px;
          font-family: inherit;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(20, 14, 13, 0.7);
          z-index: 5;
        }

        .pv-legend span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.85);
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(20, 14, 13, 0.08);
        }

        .pv-legend i {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 6px currentColor;
        }

        /* ── Patent 2 visual — cross-section inspection ── */
        .patent-visual--hotmelt {
          perspective: 1500px;
          padding: 12% 5% 6% 5%;
          --reveal: 0;
          overflow: visible;
          aspect-ratio: auto !important;
          max-height: none !important;
          min-height: 540px;
        }

        .xs-title {
          position: absolute;
          top: 4%;
          left: 4%;
          right: 4%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          z-index: 5;
        }

        .xs-title__text {
          font-family: inherit;
          font-size: clamp(0.85rem, 1.3vw, 1.05rem);
          font-weight: 800;
          letter-spacing: 0.04em;
          color: #140E0D;
          white-space: nowrap;
          padding: 4px 14px;
        }

        .xs-title__line {
          flex: 1 1 0;
          max-width: 90px;
          height: 1px;
          background: rgba(20, 14, 13, 0.45);
          position: relative;
        }

        .xs-title__line--l::before,
        .xs-title__line--r::after {
          content: '';
          position: absolute;
          top: -3px;
          width: 1px;
          height: 7px;
          background: rgba(20, 14, 13, 0.45);
        }

        .xs-title__line--l::before {
          left: 0;
        }

        .xs-title__line--r::after {
          right: 0;
        }

        .xs-stage {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          cursor: default;
          padding-top: 18%;
          padding-bottom: 24%;
        }

        .xs-stage::before {
          content: '';
          position: absolute;
          top: 22%;
          left: -10%;
          width: 25%;
          height: 60%;
          background: linear-gradient(90deg,
              transparent 0%,
              rgba(255, 235, 180, 0.0) 30%,
              rgba(255, 232, 170, 0.55) 50%,
              rgba(255, 235, 180, 0.0) 70%,
              transparent 100%);
          filter: blur(6px);
          mix-blend-mode: screen;
          pointer-events: none;
          opacity: 0;
          transform: translateX(0);
          z-index: 6;
        }

        .xs-stage.is-revealed::before {
          animation: xsScan 1.2s cubic-bezier(.4, 0, .2, 1) 1 forwards;
        }

        @keyframes xsScan {
          0% {
            opacity: 0;
            transform: translateX(0);
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(360%);
          }
        }

        .xs-rotor {
          position: relative;
          width: 56%;
          aspect-ratio: 1.5 / 1;
          transform-style: preserve-3d;
          transform: perspective(1500px) rotateX(-6deg) rotateY(0deg);
        }

        .xs-deck {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
        }

        .xs-layer {
          position: absolute;
          inset: 0;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.55);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.4) inset,
            0 -1px 0 rgba(20, 14, 13, 0.04) inset,
            0 18px 36px -22px rgba(20, 14, 13, 0.25);
          backdrop-filter: blur(2px);
          --space: calc(var(--reveal) * 60px);
          transition: transform 0.4s cubic-bezier(.22, .61, .36, 1);
        }

        .xs-layer[data-i="0"] {
          transform: translateZ(calc(var(--space) * 3.5));
          background: linear-gradient(135deg, rgba(190, 210, 240, 0.55) 0%, rgba(255, 255, 255, 0.32) 100%);
        }

        .xs-layer[data-i="1"] {
          transform: translateZ(calc(var(--space) * 2.5));
          background: linear-gradient(135deg, rgba(170, 190, 255, 0.5) 0%, rgba(255, 255, 255, 0.32) 100%);
        }

        .xs-layer[data-i="2"] {
          transform: translateZ(calc(var(--space) * 1.5));
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(230, 235, 245, 0.28) 100%);
        }

        .xs-layer[data-i="3"] {
          transform: translateZ(calc(var(--space) * 0.5));
          background: linear-gradient(135deg, rgba(255, 235, 200, 0.45) 0%, rgba(255, 255, 255, 0.30) 100%);
        }

        .xs-layer[data-i="4"] {
          transform: translateZ(calc(var(--space) * -0.5));
          background: linear-gradient(135deg, rgba(255, 200, 150, 0.55) 0%, rgba(255, 255, 255, 0.32) 100%);
        }

        .xs-layer[data-i="5"] {
          transform: translateZ(calc(var(--space) * -1.5));
          background: linear-gradient(135deg, rgba(180, 180, 200, 0.48) 0%, rgba(255, 255, 255, 0.32) 100%);
        }

        .xs-layer[data-i="6"] {
          transform: translateZ(calc(var(--space) * -2.5));
          background: linear-gradient(135deg, rgba(232, 38, 41, 0.18) 0%, rgba(255, 255, 255, 0.32) 100%);
        }

        .xs-layer[data-i="7"] {
          transform: translateZ(calc(var(--space) * -3.5));
          background: linear-gradient(135deg, rgba(120, 120, 130, 0.45) 0%, rgba(255, 255, 255, 0.30) 100%);
        }

        .xs-layer .xs-sheet {
          position: absolute;
          inset: 0;
        }

        .xs-layer::after {
          content: '';
          position: absolute;
          top: 4%;
          bottom: 4%;
          right: -1px;
          width: 1px;
          background: rgba(20, 14, 13, 0.22);
          opacity: var(--reveal);
        }

        .xs-labels {
          position: absolute;
          left: 4%;
          right: 4%;
          top: 68%;
          bottom: 4%;
          pointer-events: none;
          z-index: 5;
        }

        .xs-tag {
          position: absolute;
          top: -10px;
          left: var(--tag-x, 50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translateX(-50%) translateY(10px);
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(.22, .61, .36, 1);
        }

        .xs-tag__line {
          display: block;
          width: 1px;
          height: var(--tag-line, 44px);
          background: linear-gradient(180deg,
              rgba(20, 14, 13, 0) 0%,
              rgba(20, 14, 13, 0.32) 12%,
              rgba(20, 14, 13, 0.42) 60%,
              rgba(20, 14, 13, 0.55) 100%);
          position: relative;
          flex-shrink: 0;
          filter: drop-shadow(0 1px 0 rgba(255, 255, 255, 0.5));
        }

        .xs-tag__line::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ffffff;
          border: 1.4px solid #E82629;
          box-shadow:
            0 0 0 3px rgba(232, 38, 41, 0.08),
            0 1px 2px rgba(20, 14, 13, 0.10);
          transform: translate(-50%, -50%);
        }

        .xs-tag__line::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(20, 14, 13, 0.55);
          transform: translateX(-50%);
        }

        .xs-tag__pill {
          margin-top: 8px;
          font-family: inherit;
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #140E0D;
          white-space: nowrap;
          background: linear-gradient(180deg, #ffffff 0%, #fafaf7 100%);
          border: 1px solid rgba(20, 14, 13, 0.08);
          padding: 4px 10px;
          border-radius: 999px;
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.7) inset,
            0 6px 14px -8px rgba(20, 14, 13, 0.16);
          flex-shrink: 0;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .xs-tag[data-i="0"] { --tag-x: 5%; --tag-line: 22px; z-index: 10; }
        .xs-tag[data-i="1"] { --tag-x: 18%; --tag-line: 110px; z-index: 1; }
        .xs-tag[data-i="2"] { --tag-x: 32%; --tag-line: 66px; z-index: 5; }
        .xs-tag[data-i="3"] { --tag-x: 46%; --tag-line: 22px; z-index: 10; }
        .xs-tag[data-i="4"] { --tag-x: 55%; --tag-line: 110px; z-index: 1; }
        .xs-tag[data-i="5"] { --tag-x: 69%; --tag-line: 66px; z-index: 5; }
        .xs-tag[data-i="6"] { --tag-x: 82%; --tag-line: 22px; z-index: 10; }
        .xs-tag[data-i="7"] { --tag-x: 94%; --tag-line: 90px; z-index: 2; }

        .xs-stage.is-revealed .xs-tag {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
          pointer-events: auto;
        }

        .xs-stage.is-revealed .xs-tag:hover .xs-tag__pill {
          transform: translateY(-1px);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.7) inset,
            0 10px 18px -10px rgba(20, 14, 13, 0.22);
        }

        .xs-stage.is-revealed .xs-tag[data-i="0"] { transition-delay: 0.10s; }
        .xs-stage.is-revealed .xs-tag[data-i="1"] { transition-delay: 0.18s; }
        .xs-stage.is-revealed .xs-tag[data-i="2"] { transition-delay: 0.26s; }
        .xs-stage.is-revealed .xs-tag[data-i="3"] { transition-delay: 0.34s; }
        .xs-stage.is-revealed .xs-tag[data-i="4"] { transition-delay: 0.42s; }
        .xs-stage.is-revealed .xs-tag[data-i="5"] { transition-delay: 0.50s; }
        .xs-stage.is-revealed .xs-tag[data-i="6"] { transition-delay: 0.58s; }
        .xs-stage.is-revealed .xs-tag[data-i="7"] { transition-delay: 0.66s; }

        @media (max-width: 900px) {
          .patent-card {
            flex: 0 0 100%;
          }
          .patent-card__inner {
            grid-template-columns: 1fr;
            gap: 28px;
            padding: 24px 16px;
          }
          .patent-card__visual {
            aspect-ratio: 4 / 3;
            max-height: 320px;
            order: 1;
          }
          .patent-card__copy {
            order: 2;
          }
          .patent-card__specs {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .tech-patent-section--hotmelt .patent-card__visual {
            aspect-ratio: auto !important;
            max-height: none !important;
            min-height: 440px;
            height: auto !important;
            margin-bottom: 3.5rem;
          }
          .patent-visual--hotmelt {
            min-height: 440px !important;
          }
          .xs-title {
            top: 1rem;
          }
          .xs-labels {
            top: 250px;
          }
          .xs-tag__pill {
            font-size: 0.46rem;
            padding: 3px 7px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .patent-card.is-active::before,
          .patent-card.is-active::after,
          .pv-stream__in,
          .pv-stream__refl,
          .pv-burst,
          .pv-glass__sheen {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
