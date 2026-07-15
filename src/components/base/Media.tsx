/**
 * <Media> — responsive image/video with the performance budget built in.
 *
 * Images: <picture> with AVIF → WebP → JPEG/PNG source order. width/height
 * are REQUIRED props (reserves layout space — CLS < 0.1 is a hard budget).
 * Lazy by default; set priority for the LCP hero image.
 *
 * Video (EXPENSIVE — desktop-conditional by the cost split):
 *   TIER_2  — muted, looped, playsInline autoplay.
 *   TIER_0/1 (incl. all mobile) — poster + tap-to-play, always. The video
 *   element only mounts after intent, so no video bytes move on mobile
 *   until the user asks.
 *
 * SSR renders the poster + play button (TIER_1 baseline); TIER_2 upgrades
 * to autoplay after mount. Content parity: the poster IS the content at
 * every tier — autoplay changes how it appears, not whether it exists.
 */

import { useEffect, useState } from 'react';
import { useEnhancementTier } from '@/lib/enhancement/useEnhancementTier';

interface MediaBaseProps {
  alt: string;
  /** Intrinsic dimensions — required to reserve space and prevent CLS. */
  width: number;
  height: number;
  className?: string;
  sizes?: string;
}

interface MediaImageProps extends MediaBaseProps {
  /** JPEG/PNG fallback source. */
  src: string;
  avifSrc?: string;
  webpSrc?: string;
  /** Set for the LCP image (hero): eager load + async decode. */
  priority?: boolean;
  video?: undefined;
}

interface MediaVideoProps extends MediaBaseProps {
  /** Poster image (JPEG/PNG fallback) — the tier-0/1 representation. */
  src: string;
  avifSrc?: string;
  webpSrc?: string;
  /** MP4/WebM source. Autoplays at TIER_2 only. */
  video: string;
  videoType?: string;
  priority?: boolean;
}

export type MediaProps = MediaImageProps | MediaVideoProps;

function Picture({
  src,
  avifSrc,
  webpSrc,
  alt,
  width,
  height,
  sizes,
  priority,
  className,
}: MediaImageProps) {
  return (
    // display:contents so the img participates directly in the parent's
    // layout — h-full/w-full classes on Media then behave as expected.
    <picture style={{ display: 'contents' }}>
      {avifSrc && <source srcSet={avifSrc} type="image/avif" sizes={sizes} />}
      {webpSrc && <source srcSet={webpSrc} type="image/webp" sizes={sizes} />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={className}
        style={{ aspectRatio: `${width} / ${height}` }}
      />
    </picture>
  );
}

export function Media(props: MediaProps) {
  const { isCinematic, detected } = useEnhancementTier();
  const [playing, setPlaying] = useState(false);

  const isVideo = typeof props.video === 'string';

  // TIER_2 upgrade happens post-mount only — SSR/first paint always shows
  // the poster, so there is no hydration mismatch and no layout shift
  // (poster and video share the same reserved box).
  useEffect(() => {
    if (isVideo && detected && isCinematic) setPlaying(true);
  }, [isVideo, detected, isCinematic]);

  if (!isVideo) {
    return <Picture {...(props as MediaImageProps)} />;
  }

  const videoProps = props as MediaVideoProps;
  const { video, videoType = 'video/mp4', width, height, alt, className } = videoProps;
  const posterProps: MediaImageProps = {
    src: videoProps.src,
    avifSrc: videoProps.avifSrc,
    webpSrc: videoProps.webpSrc,
    alt,
    width,
    height,
    sizes: videoProps.sizes,
    priority: videoProps.priority,
  };

  if (playing) {
    return (
      <video
        width={width}
        height={height}
        poster={props.src}
        autoPlay={isCinematic}
        controls={!isCinematic}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        className={className}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <source src={video} type={videoType} />
      </video>
    );
  }

  return (
    <div
      className={className}
      style={{ position: 'relative', aspectRatio: `${width} / ${height}` }}
    >
      <Picture {...posterProps} />
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Play video: ${alt}`}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          background: 'rgba(10, 10, 10, 0.25)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: 'grid',
            placeItems: 'center',
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-red)',
            color: 'var(--color-white)',
            fontSize: '1.25rem',
            paddingLeft: '0.25rem',
          }}
        >
          ▶
        </span>
      </button>
    </div>
  );
}
