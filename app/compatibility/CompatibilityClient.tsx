"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ARCHETYPES } from "@/lib/archetypes";
import { computeCompatibility, findArchetypeByIdOrDefault } from "@/lib/compatibility";
import { getLastResult } from "@/lib/storage";
import { useToast } from "@/components/Toast";

export default function CompatibilityClient() {
  const [aId, setAId] = useState<string>(ARCHETYPES[0].id);
  const [bId, setBId] = useState<string>(ARCHETYPES[2].id);
  const toast = useToast();

  useEffect(() => {
    const last = getLastResult();
    if (last?.archetypeId) setAId(last.archetypeId);
  }, []);

  const a = findArchetypeByIdOrDefault(aId);
  const b = findArchetypeByIdOrDefault(bId);
  const compat = useMemo(() => computeCompatibility(a, b), [a, b]);

  async function copy() {
    const text = `${a.name} × ${b.name}: ${compat.score}/100 — ${compat.verdict}. via Marketer DNA`;
    try {
      await navigator.clipboard.writeText(text);
      toast.push("Compatibility copied", "success");
    } catch {
      toast.push("Couldn't copy", "warn");
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="mono text-xs uppercase tracking-widest text-ink/60">Dream team builder</div>
          <h1 className="display mt-1 text-4xl md:text-6xl">
            Two marketers. <span className="bg-lime px-1 outline-brutal">One dashboard.</span>
          </h1>
          <p className="mt-2 max-w-xl text-ink/70">
            Pick yourself. Pick a teammate. Find out if you ship or spiral.
          </p>
        </div>
        <Link href="/quiz" className="rounded-lg border-2 border-ink bg-ink px-4 py-2 text-sm font-semibold text-bone hard-shadow-sm hover:-translate-y-0.5">
          Take the quiz →
        </Link>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Picker label="Marketer A" value={aId} onChange={setAId} />
        <Picker label="Marketer B" value={bId} onChange={setBId} />
      </div>

      <div className="mt-8 rounded-2xl border-2 border-ink bg-bone p-6 hard-shadow-sm">
        <div className="flex items-center gap-6">
          <PickerPreview archetype={a} />
          <div className="display text-4xl text-ink/40">×</div>
          <PickerPreview archetype={b} />
          <div className="ml-auto text-right">
            <div className="mono text-xs uppercase tracking-widest text-ink/60">Compatibility</div>
            <div className="display text-6xl leading-none">{compat.score}</div>
            <div className="mono text-xs text-ink/50">/ 100</div>
          </div>
        </div>

        <div className="mt-5 rounded-xl border-2 border-ink bg-lime p-4">
          <div className="mono text-[11px] uppercase tracking-widest">Verdict</div>
          <div className="display mt-0.5 text-2xl">{compat.verdict}</div>
          <p className="mt-2 text-sm">{compat.blurb}</p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border-2 border-ink bg-bone p-4">
            <div className="mono text-[11px] uppercase tracking-widest text-ink/60">Strengths</div>
            <ul className="mt-2 space-y-1 text-sm">
              {compat.strengths.map((s, i) => (
                <li key={i}>• {s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 border-ink bg-bone p-4">
            <div className="mono text-[11px] uppercase tracking-widest text-ink/60">Risks</div>
            <ul className="mt-2 space-y-1 text-sm">
              {compat.risks.map((s, i) => (
                <li key={i}>• {s}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button onClick={copy} className="rounded-md border-2 border-ink bg-ink px-3 py-1.5 text-xs font-semibold text-bone hard-shadow-sm">
            Copy compatibility
          </button>
          <Link
            href={`/result/${a.id}`}
            className="rounded-md border-2 border-ink bg-bone px-3 py-1.5 text-xs font-semibold hard-shadow-sm"
          >
            See {a.name} card
          </Link>
          <Link
            href={`/result/${b.id}`}
            className="rounded-md border-2 border-ink bg-bone px-3 py-1.5 text-xs font-semibold hard-shadow-sm"
          >
            See {b.name} card
          </Link>
        </div>
      </div>
    </div>
  );
}

function Picker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block rounded-xl border-2 border-ink bg-bone p-4 hard-shadow-sm">
      <div className="mono text-[11px] uppercase tracking-widest text-ink/60">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border-2 border-ink bg-bone px-3 py-2 font-semibold"
      >
        {ARCHETYPES.map((a) => (
          <option key={a.id} value={a.id}>
            {a.emoji}  {a.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function PickerPreview({ archetype: a }: { archetype: ReturnType<typeof findArchetypeByIdOrDefault> }) {
  return (
    <div
      className="flex h-20 w-20 flex-col items-center justify-center rounded-xl outline-brutal"
      style={{ background: a.colors.bg, color: a.colors.ink }}
      title={a.name}
    >
      <div className="text-3xl">{a.emoji}</div>
      <div className="mono mt-0.5 truncate text-[9px] uppercase tracking-widest">
        {a.name.split(" ").slice(-1)[0]}
      </div>
    </div>
  );
}
