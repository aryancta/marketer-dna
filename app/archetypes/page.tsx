import Link from "next/link";
import { ARCHETYPES } from "@/lib/archetypes";
import { seededDistribution } from "@/lib/seedStats";

export const metadata = {
  title: "All 12 Marketer Archetypes",
  description: "The canon. 12 flattering-but-spicy marketer archetypes.",
};

export default function ArchetypesPage() {
  const dist = Object.fromEntries(seededDistribution().map((d) => [d.id, d.percent]));
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mono text-xs uppercase tracking-widest text-ink/60">The canon</div>
          <h1 className="display mt-1 text-4xl md:text-6xl">All 12 Archetypes.</h1>
          <p className="mt-2 max-w-xl text-ink/70">
            Flattering-ish. Spicy-ish. At least three of these are you. One of them is
            your boss. We both know which one.
          </p>
        </div>
        <Link
          href="/quiz"
          className="self-start rounded-lg border-2 border-ink bg-ink px-4 py-2 text-sm font-semibold text-bone hover:-translate-y-0.5 hard-shadow-sm"
        >
          Find yours →
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ARCHETYPES.map((a) => (
          <Link
            key={a.id}
            href={`/archetypes/${a.id}`}
            className="group block overflow-hidden rounded-2xl outline-brutal hard-shadow-sm transition-all duration-150 hover:-translate-y-1 hover:hard-shadow"
            style={{ background: a.colors.bg, color: a.colors.ink }}
          >
            <div className="flex items-start justify-between p-5">
              <div className="text-5xl">{a.emoji}</div>
              <div
                className="mono rounded-md border-2 px-2 py-1 text-[10px] font-bold uppercase tracking-widest"
                style={{ borderColor: a.colors.ink }}
              >
                {dist[a.id] ?? 0}% of marketers
              </div>
            </div>
            <div className="p-5 pt-0">
              <div className="display text-2xl leading-tight">{a.name}</div>
              <div className="mt-1 text-sm opacity-85">{a.tagline}</div>
              <div className="mt-4 border-t-2 border-current/10 pt-3 text-xs opacity-80">
                <div className="mono uppercase tracking-widest">Superpower</div>
                <div className="mt-0.5 font-semibold">{a.superpower}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
