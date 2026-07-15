/**
 * SearchBar — a REAL GET form. Without JS it submits to `action` with ?q=
 * (same no-JS contract as AskIrisProAI). The island only adds a clear
 * button once hydrated — search itself never needs JS.
 */

import { useId, useState } from 'react';
import type { SearchContent } from '@/types/sections';

export default function SearchBar({
  label,
  placeholder,
  action,
  buttonLabel = 'Search',
}: SearchContent) {
  const inputId = useId();
  const [value, setValue] = useState('');

  return (
    <form action={action} method="get" role="search" className="flex gap-2">
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <div className="relative min-w-0 flex-1">
        <input
          id={inputId}
          name="q"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder ?? label}
          autoComplete="off"
          className="type-body-md w-full rounded-md px-3 py-2"
          style={{
            border: '1px solid var(--border-default)',
            background: 'var(--surface-base)',
            color: 'var(--text-primary)',
          }}
        />
        {value && (
          <button
            type="button"
            onClick={() => setValue('')}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-1"
            style={{ color: 'var(--text-muted)' }}
          >
            ×
          </button>
        )}
      </div>
      <button
        type="submit"
        className="type-body-sm rounded-md px-4 font-semibold"
        style={{ background: 'var(--color-red)', color: 'var(--color-white)' }}
      >
        {buttonLabel}
      </button>
    </form>
  );
}
