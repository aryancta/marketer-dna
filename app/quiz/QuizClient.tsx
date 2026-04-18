"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUESTIONS, scoreAnswers } from "@/lib/quiz";
import { setAnswers as saveAnswers, getAnswers, bumpLocalStat, setLastResult } from "@/lib/storage";
import { cn } from "@/lib/utils";

export default function QuizClient() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const existing = getAnswers();
    if (Object.keys(existing).length > 0) {
      setAnswers(existing);
      // Continue where user left off
      const firstUnanswered = QUESTIONS.findIndex((q) => !existing[q.id]);
      setIdx(firstUnanswered === -1 ? QUESTIONS.length - 1 : firstUnanswered);
    }
  }, []);

  const q = QUESTIONS[idx];
  const progress = ((idx + (answers[q.id] ? 1 : 0)) / QUESTIONS.length) * 100;
  const isLast = idx === QUESTIONS.length - 1;
  const hasAnswer = Boolean(answers[q.id]);

  function pick(choiceId: string) {
    const next = { ...answers, [q.id]: choiceId };
    setAnswers(next);
    saveAnswers(next);

    // auto-advance (except on last, so user can double-check)
    if (!isLast) {
      setTimeout(() => setIdx((i) => Math.min(QUESTIONS.length - 1, i + 1)), 220);
    }
  }

  async function submit() {
    setSubmitting(true);
    const { archetypeId, fingerprint } = scoreAnswers(answers);

    // fire and forget, tell the server to increment stats
    try {
      await fetch("/api/stats", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ archetypeId, fingerprint }),
      });
    } catch {}
    bumpLocalStat(archetypeId);
    setLastResult({
      archetypeId,
      blurb: "",
      fingerprint,
      at: Date.now(),
    });
    router.push(`/result/${archetypeId}?fp=${encodeURIComponent(fingerprint)}`);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:py-16">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="mono text-xs uppercase tracking-widest text-ink/60 hover:text-ink"
        >
          ← back to home
        </Link>
        <div className="mono text-xs uppercase tracking-widest text-ink/60">
          Question {idx + 1} of {QUESTIONS.length}
        </div>
      </div>

      <div className="mb-8 h-3 w-full overflow-hidden rounded-full border-2 border-ink bg-bone">
        <div
          className="h-full bg-lime transition-all duration-300"
          style={{ width: `${Math.max(progress, 4)}%` }}
        />
      </div>

      <div className="rounded-2xl border-2 border-ink bg-bone p-5 md:p-8 hard-shadow">
        <div className="mono text-xs uppercase tracking-widest text-hot">Q{q.index}</div>
        <h1 className="display mt-2 text-2xl md:text-4xl">{q.prompt}</h1>
        <p className="mt-2 text-sm text-ink/60">{q.flavor}</p>

        <div className="mt-6 grid gap-3">
          {q.choices.map((c) => {
            const active = answers[q.id] === c.id;
            return (
              <button
                key={c.id}
                onClick={() => pick(c.id)}
                className={cn(
                  "group text-left rounded-xl border-2 border-ink p-4 transition-all duration-150",
                  active
                    ? "bg-ink text-bone hard-shadow-sm -translate-y-0.5"
                    : "bg-bone hover:-translate-y-0.5 hover:hard-shadow-sm hover:bg-lime"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "mono flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 text-xs font-bold",
                      active ? "border-lime bg-lime text-ink" : "border-ink bg-bone"
                    )}
                  >
                    {c.id.toUpperCase()}
                  </div>
                  <div>
                    <div className="text-base font-semibold leading-snug">{c.label}</div>
                    {c.sub && (
                      <div className={cn("mt-1 text-xs", active ? "text-bone/70" : "text-ink/60")}>
                        {c.sub}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          disabled={idx === 0}
          className={cn(
            "rounded-lg border-2 border-ink px-4 py-2 text-sm font-semibold",
            idx === 0 ? "cursor-not-allowed bg-bone/50 text-ink/40" : "bg-bone hover:-translate-y-0.5 hard-shadow-sm"
          )}
        >
          ← Prev
        </button>
        {isLast ? (
          <button
            onClick={submit}
            disabled={!hasAnswer || submitting}
            className={cn(
              "rounded-lg border-2 border-ink px-5 py-3 text-sm font-semibold",
              !hasAnswer || submitting
                ? "cursor-not-allowed bg-bone/60 text-ink/40"
                : "bg-hot text-bone hover:-translate-y-0.5 hard-shadow"
            )}
          >
            {submitting ? "Decoding your DNA…" : "Reveal my archetype →"}
          </button>
        ) : (
          <button
            onClick={() => setIdx((i) => Math.min(QUESTIONS.length - 1, i + 1))}
            disabled={!hasAnswer}
            className={cn(
              "rounded-lg border-2 border-ink px-4 py-2 text-sm font-semibold",
              !hasAnswer ? "cursor-not-allowed bg-bone/60 text-ink/40" : "bg-lime hover:-translate-y-0.5 hard-shadow-sm"
            )}
          >
            Next →
          </button>
        )}
      </div>

      <QuizDots idx={idx} answers={answers} onJump={setIdx} />
    </div>
  );
}

function QuizDots({
  idx,
  answers,
  onJump,
}: {
  idx: number;
  answers: Record<string, string>;
  onJump: (i: number) => void;
}) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      {QUESTIONS.map((q, i) => {
        const answered = Boolean(answers[q.id]);
        const active = i === idx;
        return (
          <button
            key={q.id}
            onClick={() => onJump(i)}
            aria-label={`Go to question ${i + 1}`}
            className={cn(
              "mono inline-flex h-7 w-7 items-center justify-center rounded-md border-2 border-ink text-[11px] font-bold transition-transform hover:-translate-y-0.5",
              active ? "bg-ink text-bone" : answered ? "bg-lime text-ink" : "bg-bone text-ink/60"
            )}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}
