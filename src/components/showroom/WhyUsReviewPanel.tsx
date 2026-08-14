import React from 'react';
import { Icon } from '@/components/global/Icon';
import type { TechPillar } from '@/types/content';
import type { CustomerReview, WhyUsReviewPanelContent } from '@/types/sections';

const DEFAULT_PILLARS: TechPillar[] = [
  {
    icon: 'sun',
    title: 'Engineered for ASEAN Climate',
    description: 'Developed to withstand extreme heat, high UV and humidity.',
  },
  {
    icon: 'layers',
    title: 'Patented Technologies',
    description: 'UV+420™ and 6-Layer Hotmelt™ for complete protection.',
  },
  {
    icon: 'shield',
    title: 'Superior Performance',
    description: 'Excellent heat rejection, UV protection and optical clarity.',
  },
  {
    icon: 'check',
    title: 'Proven & Trusted',
    description: 'Certified, tested and trusted by thousands of customers.',
  },
  {
    icon: 'award',
    title: 'Award Winning Quality',
    description: 'Recognised by industry leaders for innovation and excellence.',
  },
  {
    icon: 'leaf',
    title: 'Sustainable Choice',
    description: 'Contributing to energy efficiency and a better environment.',
  },
];

const DEFAULT_REVIEWS: CustomerReview[] = [
  {
    name: 'Ahmad Razak',
    username: '@ahmad_kl',
    body: 'Huge difference in heat rejection. My car interior cools down in seconds under intense KL heat!',
    img: 'https://avatar.vercel.sh/ahmad',
    rating: 5,
  },
  {
    name: 'Dr. Karen Tan',
    username: '@dr_karen',
    body: 'Installed UV+420 film for my clinic glazing. Outstanding glare reduction and skin protection.',
    img: 'https://avatar.vercel.sh/karen',
    rating: 5,
  },
  {
    name: 'Jason Lim',
    username: '@jason_pg',
    body: 'Installed on my home floor-to-ceiling glass in Penang. Lowered aircon electricity bill significantly!',
    img: 'https://avatar.vercel.sh/jason',
    rating: 5,
  },
  {
    name: 'Michelle Wong',
    username: '@michelle_w',
    body: 'The optical clarity is unmatched. No haze, perfect vision at night, and 100% UV protection.',
    img: 'https://avatar.vercel.sh/michelle',
    rating: 5,
  },
  {
    name: 'Syed Al-Attas',
    username: '@syed_jb',
    body: 'Best tint decision for our commercial office building in JB. Exceptional warranty and service.',
    img: 'https://avatar.vercel.sh/syed',
    rating: 5,
  },
  {
    name: 'David Chen',
    username: '@david_c',
    body: '6-Layer Hotmelt technology is super tough. 5 years in and zero peeling or bubbles!',
    img: 'https://avatar.vercel.sh/david',
    rating: 5,
  },
];

function ReviewCard({ img, name, username, body, rating = 5 }: CustomerReview) {
  return (
    <figure className="relative w-full cursor-pointer overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/90 p-4 shadow-sm hover:bg-zinc-900 hover:border-red-500/40 transition-all duration-300">
      <div className="flex items-center gap-3">
        <img className="rounded-full w-9 h-9 object-cover border border-zinc-700" alt={name} src={img} />
        <div className="flex flex-col min-w-0">
          <figcaption className="text-sm font-bold text-white truncate">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-zinc-400 truncate">{username}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 mt-2 text-amber-400">
        {Array.from({ length: rating }).map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
        "{body}"
      </blockquote>
    </figure>
  );
}

/**
 * WhyUsReviewPanel — 2-column component combining:
 * Left Panel: Why IrisPro 6 cards redesigned in a responsive 2-row / 3-col grid.
 * Right Panel: Vertical Marquee scrolling customer reviews with pauseOnHover & fade masks.
 */
export function WhyUsReviewPanel({
  heading = 'Why IrisPro',
  marqueeTitle = 'Why us? Hear from our customers',
  pillars = DEFAULT_PILLARS,
  reviews = DEFAULT_REVIEWS,
}: WhyUsReviewPanelContent) {
  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <div className="w-full py-2 sm:py-4">
      <style>{`
        @keyframes marqueeVertical {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marqueeVerticalReverse {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0%); }
        }
        .animate-marquee-vertical {
          animation: marqueeVertical 22s linear infinite;
        }
        .animate-marquee-vertical-reverse {
          animation: marqueeVerticalReverse 22s linear infinite;
        }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Left Panel: Why IrisPro 6 Redesigned Feature Cards */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1a1e] tracking-tight">
              {heading}
            </h2>
            <div className="w-10 h-1 bg-[#d20f18] rounded-full mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="group flex flex-col justify-between rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:border-red-500/30 transition-all text-center min-h-[220px]"
              >
                <div>
                  <h3 className="text-base font-bold text-[#1a1a1e] mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-4 flex justify-center">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-[#d20f18] border border-red-100 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon name={pillar.icon} size={22} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Vertical Marquee Customer Reviews Card */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="h-full min-h-[480px] max-h-[560px] rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Header inside Marquee Box */}
            <div className="mb-3 border-b border-zinc-800 pb-3 flex items-center justify-between z-20">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 block">
                  Customer Reviews
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  {marqueeTitle}
                </h3>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                <span className="text-xs font-bold text-white mr-1">4.9/5</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>

            {/* Vertical Marquee Container */}
            <div className="relative flex-1 overflow-hidden">
              {/* Fade Overlays */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent z-10" />

              <div className="grid grid-cols-2 gap-3 h-full">
                {/* Column 1 Marquee */}
                <div className="relative h-full overflow-hidden">
                  <div className="flex flex-col gap-3 animate-marquee-vertical hover:[animation-play-state:paused]">
                    {[...firstRow, ...firstRow, ...firstRow].map((review, idx) => (
                      <ReviewCard key={`col1-${idx}`} {...review} />
                    ))}
                  </div>
                </div>

                {/* Column 2 Marquee Reverse */}
                <div className="relative h-full overflow-hidden">
                  <div className="flex flex-col gap-3 animate-marquee-vertical-reverse hover:[animation-play-state:paused]">
                    {[...secondRow, ...secondRow, ...secondRow].map((review, idx) => (
                      <ReviewCard key={`col2-${idx}`} {...review} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
