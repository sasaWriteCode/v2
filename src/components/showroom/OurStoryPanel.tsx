import React, { useState } from 'react';
import { Icon } from '@/components/global/Icon';
import { resolveUrl } from '@/lib/paths';
import type { OurStoryPanelContent, OurStoryStat } from '@/types/sections';

const DEFAULT_PARAGRAPHS = [
  'IrisPro was born from one simple belief:',
  'Protection should be better, longer lasting and made for ASEAN.',
  'We saw a need for window films that truly block harmful UV, reduce heat effectively and stand strong in our hot, humid climate.',
  'Through continuous research, advanced materials and strict quality control, we developed patented technologies that deliver complete protection beyond what ordinary films can do.',
  'Today, IrisPro is trusted by homeowners, businesses, architects and institutions across the region to create cooler, safer and more sustainable environments.',
];

const DEFAULT_STATS: OurStoryStat[] = [
  { icon: 'clock', value: '10+', label: 'Years of Expertise' },
  { icon: 'building', value: '1,000,000+', label: 'Vehicles & Buildings Protected' },
  { icon: 'users', value: '500+', label: 'Partners & Dealers Across ASEAN' },
  { icon: 'globe', value: '20+', label: 'Countries & Growing' },
];

/**
 * OurStoryPanel — 2-column layout matching the About Us page reference design.
 * Left panel: "Our Story" headline with red bar + narrative paragraphs.
 * Right panel: Featured Video card with play overlay + integrated 4-stat bar footer.
 */
export function OurStoryPanel({
  heading = 'Our Story',
  paragraphs = DEFAULT_PARAGRAPHS,
  videoTitle = 'Our Journey',
  videoSubtitle = 'Watch Our Story',
  videoHref = '#video-our-journey',
  videoPoster = '/images/history_page_hero.png',
  stats = DEFAULT_STATS,
}: OurStoryPanelContent) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full py-2 sm:py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Our Story Prose Content */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1a1e] tracking-tight">
              {heading}
            </h2>
            <div className="w-10 h-1 bg-[#d20f18] rounded-full mt-3" />
          </div>

          <div className="space-y-4 text-zinc-700 text-base sm:text-lg leading-relaxed font-normal">
            {paragraphs.length >= 2 ? (
              <>
                <p>
                  {paragraphs[0]}
                  <strong className="block font-bold text-[#1a1a1e] mt-1">
                    {paragraphs[1]}
                  </strong>
                </p>
                {paragraphs.slice(2).map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </>
            ) : (
              paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
            )}
          </div>
        </div>

        {/* Right Column: Featured Video Banner + 4-Stat Bar Card */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-xl overflow-hidden flex flex-col">
            {/* Top Half: Facility Image / Video Player */}
            <div className="relative w-full aspect-[16/9] bg-zinc-900 group overflow-hidden">
              <img
                src={resolveUrl(videoPoster)}
                alt={videoTitle}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Play Button */}
              <a
                href={resolveUrl(videoHref)}
                onClick={(e) => {
                  if (videoHref.startsWith('#')) {
                    e.preventDefault();
                    setIsPlaying(true);
                  }
                }}
                className="absolute inset-0 flex items-center justify-center z-10"
                aria-label="Play video"
              >
                <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 text-zinc-900 shadow-2xl flex items-center justify-center border border-white/40 transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1 text-zinc-900" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </a>

              {/* Bottom-left Video Title Overlay */}
              <div className="absolute bottom-5 left-6 z-10 text-white space-y-0.5 pointer-events-none">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow">
                  {videoTitle}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-200 font-medium drop-shadow">
                  {videoSubtitle}
                </p>
              </div>
            </div>

            {/* Bottom Half: 4 Stat Items Grid Bar */}
            <div className="p-6 bg-white border-t border-zinc-100">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-zinc-100">
                {stats.map((stat, index) => (
                  <div key={index} className={`flex items-start gap-3 ${index > 0 ? 'sm:pl-4 pt-4 sm:pt-0' : ''}`}>
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-800">
                      <Icon name={stat.icon || 'award'} size={18} />
                    </span>
                    <div>
                      <span className="text-xl sm:text-2xl font-extrabold text-[#1a1a1e] tracking-tight block">
                        {stat.value}
                      </span>
                      <span className="text-xs text-zinc-500 font-medium block leading-tight mt-0.5">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
