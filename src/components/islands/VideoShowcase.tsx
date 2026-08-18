/**
 * VideoShowcase — click-to-play YouTube embeds in three layouts:
 *  - 'featured': one large player + an episode rail; picking an episode
 *    swaps it into the player and starts it.
 *  - 'grid': responsive cards, each plays in place.
 *  - 'shorts': horizontal 9:16 snap rail for vertical clips.
 *
 * Content safety + weight: NO iframe exists until the visitor clicks —
 * the SSR payload is thumbnails (i.ytimg.com) and real text titles, so
 * the band ships zero third-party JS until a play is requested. Embeds
 * use the privacy-enhanced youtube-nocookie.com host.
 */

import { useState } from 'react';
import type { VideoShowcaseContent } from '@/types/sections';

const thumbUrl = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const embedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;

function PlayBadge({ size = 56 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="grid place-items-center rounded-full shadow-lg transition-transform duration-200 group-hover:scale-110"
      style={{
        width: size,
        height: size,
        background: 'var(--color-red)',
        color: 'var(--color-white)',
      }}
    >
      <svg
        width={size * 0.42}
        height={size * 0.42}
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ marginLeft: size * 0.05 }}
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}

function Frame({ id, title, vertical }: { id: string; title: string; vertical?: boolean }) {
  return (
    <iframe
      src={embedUrl(id)}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className={`h-full w-full ${vertical ? 'aspect-[9/16]' : 'aspect-video'}`}
      style={{ border: 0 }}
    />
  );
}

export default function VideoShowcase({
  heading,
  lede,
  layout = 'featured',
  videos,
  playlist,
}: VideoShowcaseContent) {
  const [featured, setFeatured] = useState(0);
  const [playingFeatured, setPlayingFeatured] = useState(false);
  const [playing, setPlaying] = useState<Record<string, boolean>>({});

  if (!videos || videos.length === 0) return null;

  const header = (heading || lede || playlist) && (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {heading && <h2 className="type-heading-lg">{heading}</h2>}
        {lede && (
          <p className="type-body-md mt-2" style={{ color: 'var(--text-secondary)' }}>
            {lede}
          </p>
        )}
      </div>
      {playlist && (
        <a
          href={playlist.href}
          target="_blank"
          rel="noopener"
          className="btn-press type-body-sm inline-flex items-center gap-2 rounded-md px-4 py-2 font-semibold"
          style={{
            border: '1px solid var(--border-strong)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
          }}
        >
          {playlist.label}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
          </svg>
        </a>
      )}
    </div>
  );

  /* ── Shorts: vertical 9:16 snap rail ── */
  if (layout === 'shorts') {
    return (
      <div>
        {header}
        <ul
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3"
          style={{ scrollbarWidth: 'thin' }}
        >
          {videos.map((video) => (
            <li key={video.youtubeId} className="w-44 shrink-0 snap-start sm:w-52">
              {playing[video.youtubeId] ? (
                <div className="overflow-hidden rounded-xl" style={{ background: '#000' }}>
                  <Frame id={video.youtubeId} title={video.title} vertical />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying((p) => ({ ...p, [video.youtubeId]: true }))}
                  aria-label={`Play: ${video.title}`}
                  className="group relative block w-full overflow-hidden rounded-xl text-left"
                  style={{ border: '1px solid var(--border-subtle)' }}
                >
                  <img
                    src={thumbUrl(video.youtubeId)}
                    alt=""
                    loading="lazy"
                    className="aspect-[9/16] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span
                    className="absolute inset-0 grid place-items-center"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 45%)' }}
                  >
                    <PlayBadge size={44} />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-3">
                    <span className="type-caption block font-semibold leading-snug text-white">
                      {video.title}
                    </span>
                  </span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /* ── Grid: cards play in place ── */
  if (layout === 'grid') {
    return (
      <div>
        {header}
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <li key={video.youtubeId}>
              <figure
                className="overflow-hidden rounded-xl"
                style={{
                  background: 'var(--surface-raised)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--elevation-1)',
                }}
              >
                {playing[video.youtubeId] ? (
                  <div style={{ background: '#000' }}>
                    <Frame id={video.youtubeId} title={video.title} />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaying((p) => ({ ...p, [video.youtubeId]: true }))}
                    aria-label={`Play: ${video.title}`}
                    className="group relative block w-full"
                  >
                    <img
                      src={thumbUrl(video.youtubeId)}
                      alt=""
                      loading="lazy"
                      className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 grid place-items-center" style={{ background: 'rgba(0,0,0,0.25)' }}>
                      <PlayBadge size={48} />
                    </span>
                    {video.duration && (
                      <span className="type-caption absolute bottom-2 right-2 rounded px-1.5 py-0.5 font-semibold text-white" style={{ background: 'rgba(0,0,0,0.75)' }}>
                        {video.duration}
                      </span>
                    )}
                  </button>
                )}
                <figcaption className="p-4">
                  {video.tag && (
                    <span className="type-caption font-bold uppercase tracking-wider" style={{ color: 'var(--text-brand)' }}>
                      {video.tag}
                    </span>
                  )}
                  <span className="type-body-sm mt-0.5 block font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {video.title}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /* ── Featured: large player + episode rail ── */
  const current = videos[featured];
  return (
    <div>
      {header}
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
        <div
          className="overflow-hidden rounded-xl"
          style={{ background: '#000', border: '1px solid var(--border-subtle)', boxShadow: 'var(--elevation-1)' }}
        >
          {playingFeatured ? (
            <Frame id={current.youtubeId} title={current.title} />
          ) : (
            <button
              type="button"
              onClick={() => setPlayingFeatured(true)}
              aria-label={`Play: ${current.title}`}
              className="group relative block w-full"
            >
              <img
                src={thumbUrl(current.youtubeId)}
                alt=""
                loading="lazy"
                className="aspect-video w-full object-cover"
              />
              <span
                className="absolute inset-0 grid place-items-center"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 40%)' }}
              >
                <PlayBadge />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-5 text-left">
                <span className="type-body-md block font-bold leading-snug text-white sm:text-lg">
                  {current.title}
                </span>
              </span>
            </button>
          )}
        </div>

        <ol
          className="grid max-h-[28rem] content-start gap-2 overflow-y-auto pr-1"
          aria-label="More videos"
        >
          {videos.map((video, i) => (
            <li key={video.youtubeId}>
              <button
                type="button"
                onClick={() => {
                  setFeatured(i);
                  setPlayingFeatured(true);
                }}
                aria-current={i === featured ? 'true' : undefined}
                className="group flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors"
                style={{
                  background: i === featured ? 'var(--surface-raised)' : 'transparent',
                  border: `1px solid ${i === featured ? 'var(--color-red)' : 'var(--border-subtle)'}`,
                }}
              >
                <span className="relative w-28 shrink-0 overflow-hidden rounded-md">
                  <img
                    src={thumbUrl(video.youtubeId)}
                    alt=""
                    loading="lazy"
                    className="aspect-video w-full object-cover"
                  />
                  <span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-150 group-hover:opacity-100" style={{ background: 'rgba(0,0,0,0.35)' }}>
                    <PlayBadge size={26} />
                  </span>
                </span>
                <span className="min-w-0">
                  <span
                    className="type-body-sm block font-semibold leading-snug"
                    style={{
                      color: 'var(--text-primary)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {video.title}
                  </span>
                  {video.duration && (
                    <span className="type-caption" style={{ color: 'var(--text-muted)' }}>
                      {video.duration}
                    </span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
