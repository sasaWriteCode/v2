import { Icon } from '@/components/global/Icon';
import { Media } from '@/components/base/Media';
import type { GuideChapter } from '@/types/content';

/**
 * GuideChapterList — the chapter accordion on the four Knowledge Centre
 * guide pages.
 *
 * Native <details>/<summary>: keyboard and screen-reader behaviour for
 * free, zero JS. The lesson list is SEO-bearing content, and with
 * <details> it is ALWAYS in the DOM — collapsed is a rendering state, not
 * an existence state. `defaultOpen` lets the first chapter start expanded.
 */
export function GuideChapterList({
  chapters,
  defaultOpen = 1,
}: {
  chapters: GuideChapter[];
  /** Chapter number to render expanded initially (0 = all collapsed). */
  defaultOpen?: number;
}) {
  return (
    <ol className="grid list-none gap-4 p-0">
      {chapters.map((chapter) => (
        <li key={chapter.number}>
          <details
            className="guide-chapter rounded-lg"
            open={chapter.number === defaultOpen}
            style={{
              background: 'var(--surface-raised)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--elevation-1)',
            }}
          >
            <summary className="flex items-center gap-4 p-5">
              <span
                className="numeric type-heading-lg"
                style={{ color: 'var(--text-brand)' }}
              >
                {String(chapter.number).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <p className="type-overline" style={{ color: 'var(--text-muted)' }}>
                  Chapter {chapter.number}
                </p>
                <h3 className="type-heading-md">{chapter.title}</h3>
                <p
                  className="type-body-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {chapter.description}
                </p>
              </div>
              <span
                className="type-caption hidden sm:block"
                style={{ color: 'var(--text-muted)' }}
              >
                {chapter.lessons.length} lessons
              </span>
              <span className="guide-caret" style={{ color: 'var(--text-muted)' }}>
                <Icon name="play" size={14} />
              </span>
            </summary>

            <div className="grid gap-4 px-5 pb-5 sm:grid-cols-[minmax(0,14rem)_1fr]">
              {chapter.thumbnail && (
                <Media
                  {...chapter.thumbnail}
                  className="w-full rounded-md object-cover"
                />
              )}
              <div>
                <ul className="grid gap-1.5">
                  {chapter.lessons.map((lesson) => (
                    <li
                      key={lesson}
                      className="type-body-sm flex items-start gap-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span style={{ color: 'var(--data-positive-text)' }}>
                        <Icon name="check" size={16} />
                      </span>
                      {lesson}
                    </li>
                  ))}
                </ul>
                {chapter.href && (
                  <a
                    href={chapter.href}
                    className="type-body-sm mt-3 inline-block font-semibold underline"
                    style={{ color: 'var(--text-brand)' }}
                  >
                    Start Chapter {chapter.number}
                  </a>
                )}
              </div>
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
