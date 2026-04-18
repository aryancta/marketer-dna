import Link from "next/link";
import { ARCHETYPES } from "@/lib/archetypes";
import { getCombinedStats } from "@/lib/stats-store";
import { LiveCounter } from "@/components/LiveCounter";
import { LeaderboardShareButton } from "./LeaderboardShareButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Marketer DNA · Live archetype leaderboard",
  description:
    "Right now, X% of marketers are Dashboard Monks. The stats itself is a flex.",
};

export default function LeaderboardPage() {
  const { counts, total } = getCombinedStats();
  const rows = ARCHETYPES.map((a) => ({
    archetype: a,
    count: counts[a.id] ?? 0,
    percent: ((counts[a.id] ?? 0) / Math.max(total, 1)) * 100,
  })).sort((a, b) => b.count - a.count);

  const top = rows[0];
  const rarest = [...rows].sort((a, b) => a.count - b.count)[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mono flex items-center gap-3 text-xs uppercase tracking-widest text-ink/60">
            Live global leaderboard <span className="text-ink/30">·</span>
            <LiveCounter start={total} /> responses
          </div>
          <h1 className="display mt-2 text-4xl md:text-6xl">
            Right now, <span className="text-hot">{top.percent.toFixed(1)}%</span>{" "}
            of marketers are <span className="bg-lime px-1 outline-brutal">{top.archetype.name}</span>.
          </h1>
          <p className="mt-2 max-w-xl text-ink/70">
            Rarest in the wild: <strong>{rarest.archetype.name}</strong> at
            {" "}{rarest.percent.toFixed(1)}%. If that's you, the flex is real.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 md:items-end">
          <Link
            href="/quiz"
            className="rounded-lg border-2 border-ink bg-ink px-4 py-2 text-sm font-semibold text-bone hover:-translate-y-0.5 hard-shadow-sm"
          >
            Take the quiz →
          </Link>
          <LeaderboardShareButton top={top.archetype.name} percent={top.percent} />
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border-2 border-ink bg-bone hard-shadow">
        <div className="grid grid-cols-[56px_1fr_120px_120px] items-center border-b-2 border-ink bg-ink px-4 py-3 text-[11px] uppercase tracking-widest text-bone md:grid-cols-[56px_1fr_140px_140px]">
          <div className="mono">#</div>
          <div className="mono">Archetype</div>
          <div className="mono text-right">Count</div>
          <div className="mono text-right">Share</div>
        </div>
        {rows.map((row, i) => {
          const a = row.archetype;
          const pct = row.percent;
          return (
            <Link
              href={`/archetypes/${a.id}`}
              key={a.id}
              className="group block border-b-2 border-ink/10 last:border-b-0 hover:bg-bone"
            >
              <div className="grid grid-cols-[56px_1fr_120px_120px] items-center gap-3 px-4 py-3 md:grid-cols-[56px_1fr_140px_140px]">
                <div className="mono text-sm text-ink/60">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-md outline-brutal text-xl"
                    style={{ background: a.colors.bg, color: a.colors.ink }}
                  >
                    {a.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold">{a.name}</div>
                    <div className="truncate text-xs text-ink/60">{a.tagline}</div>
                  </div>
                </div>
                <div className="mono text-right text-sm tabular-nums">{row.count}</div>
                <div className="text-right">
                  <div className="mono text-sm font-semibold tabular-nums">
                    {pct.toFixed(1)}%
                  </div>
                  <div className="ml-auto mt-1 h-1.5 w-24 overflow-hidden rounded-full border border-ink/20 bg-bone md:w-28">
                    <div
                      className="h-full"
                      style={{
                        width: `${Math.min(100, pct * 3.5)}%`,
                        background: a.colors.bg,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        <Stat title="Most common" v={top.archetype.name} sub={`${top.percent.toFixed(1)}% of responses`} tone="lime" />
        <Stat title="Rarest" v={rarest.archetype.name} sub={`${rarest.percent.toFixed(1)}% of responses`} tone="hot" />
        <Stat title="Total archetyped" v={total.toLocaleString()} sub="…and counting" tone="ink" />
      </div>
    </div>
  );
}

function Stat({
  title,
  v,
  sub,
  tone,
}: {
  title: string;
  v: string;
  sub: string;
  tone: "lime" | "hot" | "ink";
}) {
  const bg = tone === "lime" ? "bg-lime text-ink" : tone === "hot" ? "bg-hot text-bone" : "bg-ink text-bone";
  return (
    <div className={`rounded-xl border-2 border-ink p-4 ${bg} hard-shadow-sm`}>
      <div className="mono text-xs uppercase tracking-widest opacity-80">{title}</div>
      <div className="display mt-1 text-2xl leading-tight">{v}</div>
      <div className="mt-1 text-xs opacity-80">{sub}</div>
    </div>
  );
}
