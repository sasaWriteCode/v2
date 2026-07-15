/**
 * AskIrisProAI — UI shell + interface boundary only (no backend in Stage 2).
 *
 * - The input is a REAL <form> whose action is the no-JS fallback
 *   (fallbackAction + ?q=): if JS never hydrates, submitting performs a
 *   plain GET to a search/contact page. With JS, submit is intercepted and
 *   handed to `onSubmit` — the single integration point for Stage 4+.
 * - Suggested-question chips are real buttons that prefill + submit.
 */

import { useId, useState, type FormEvent } from 'react';
import { Icon } from '@/components/global/Icon';
import type { AskAiContent } from '@/types/content';

export interface AskIrisProAIProps extends AskAiContent {
  /**
   * Stage 4 integration point. Return the assistant's reply. When omitted,
   * the shell renders a "coming soon" acknowledgement.
   */
  onSubmit?: (question: string) => Promise<string>;
}

type Exchange = { question: string; answer: string };

export function AskIrisProAI({
  heading = 'Ask IrisPro AI',
  description,
  placeholder = 'Ask anything…',
  suggestedQuestions,
  fallbackAction,
  onSubmit,
}: AskIrisProAIProps) {
  const inputId = useId();
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);

  const ask = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || busy) return;
    setBusy(true);
    setValue('');
    try {
      const answer = onSubmit
        ? await onSubmit(trimmed)
        : 'IrisPro AI is coming soon. Meanwhile, our experts can answer this — use Request Consultation below.';
      setExchanges((prev) => [...prev, { question: trimmed, answer }]);
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); // JS path; without JS the form GETs fallbackAction
    void ask(value);
  };

  return (
    <section
      aria-label={heading}
      className="grid gap-4 rounded-lg p-6"
      style={{
        background: 'var(--surface-raised)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--elevation-2)',
        backgroundImage: 'var(--depth-glow-subtle)',
      }}
    >
      <div>
        <h3 className="type-heading-md">{heading}</h3>
        {description && (
          <p className="type-body-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
        )}
      </div>

      {exchanges.length > 0 && (
        <div aria-live="polite" className="grid gap-3">
          {exchanges.map((exchange, i) => (
            <div key={i} className="grid gap-2">
              <p
                className="type-body-sm justify-self-end rounded-md px-3 py-2"
                style={{ background: 'var(--surface-sunken)' }}
              >
                {exchange.question}
              </p>
              <p
                className="type-body-sm rounded-md px-3 py-2"
                style={{
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                {exchange.answer}
              </p>
            </div>
          ))}
        </div>
      )}

      <form action={fallbackAction} method="get" onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor={inputId} className="sr-only">
          {placeholder}
        </label>
        <input
          id={inputId}
          name="q"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="type-body-md min-w-0 flex-1 rounded-md px-3 py-2"
          style={{
            border: '1px solid var(--border-default)',
            background: 'var(--surface-base)',
            color: 'var(--text-primary)',
          }}
        />
        <button
          type="submit"
          disabled={busy}
          aria-label="Send question"
          className="inline-flex items-center justify-center rounded-md px-3"
          style={{ background: 'var(--color-red)', color: 'var(--color-white)' }}
        >
          {busy ? '…' : <Icon name="play" size={16} />}
        </button>
      </form>

      <div>
        <p className="type-caption mb-1.5" style={{ color: 'var(--text-muted)' }}>
          Try asking:
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {suggestedQuestions.map((question) => (
            <li key={question}>
              <button
                type="button"
                className="chip cursor-pointer"
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => void ask(question)}
              >
                {question}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
