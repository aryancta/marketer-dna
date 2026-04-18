import { notFound } from "next/navigation";
import Link from "next/link";
import { ARCHETYPES, getArchetype } from "@/lib/archetypes";
import { seededDistribution } from "@/lib/seedStats";
import { fallbackRoast } from "@/lib/roast";
import { ResultCard } from "@/components/ResultCard";

export function generateStaticParams() {
  return ARCHETYPES.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const a = getArchetype(params.id);
  if (!a) return {};
  return {
    title: `${a.name} — Marketer Archetype`,
    description: a.tagline,
    openGraph: { images: [`/api/og?a=${a.id}`] },
  };
}

export default function ArchetypePage({ params }: { params: { id: string } }) {
  const a = getArchetype(params.id);
  if (!a) return notFound();
  const dist = seededDistribution();
  const mine = dist.find((d) => d.id === a.id);
  const percent = mine?.percent ?? a.rarity;

  const soulmate = ARCHETYPES.find((x) => x.name === a.soulmate);
  const nemesis = ARCHETYPES.find((x) => x.name === a.nemesis);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <Link
        href="/archetypes"
        className="mono text-xs uppercase tracking-widest text-ink/60 hover:text-ink"
      >
        ← all archetypes
      </Link>
      <div className="mt-4 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="sticky top-24">
            <ResultCard
              archetype={a}
              blurb={fallbackRoast(a, a.id)}
              rarityPercent={percent}
              number={1234}
            />
            <div className="mt-4 flex justify-center">
              <Link
                href="/quiz"
                className="rounded-md border-2 border-ink bg-ink px-4 py-2 text-sm font-semibold text-bone hard-shadow-sm hover:-translate-y-0.5"
              >
                Am I this archetype?
              </Link>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="text-6xl">{a.emoji}</div>
          <h1 className="display mt-2 text-5xl md:text-7xl">
            {a.name.toUpperCase()}
          </h1>
          <div className="mt-2 text-lg opacity-75">{a.tagline}</div>

          <p className="mt-6 text-lg leading-snug">{a.blurb}</p>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            <Chip label="Superpower" value={a.superpower} bg="#D8FF3E" />
            <Chip label="Kryptonite" value={a.kryptonite} bg="#FF3D7F" fg="#F5F1E8" />
            <Chip label="Soulmate" value={a.soulmate} bg="#2E5BFF" fg="#F5F1E8" />
            <Chip label="Nemesis" value={a.nemesis} bg="#FFB547" />
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            <Stat label="Virality" value={a.stats.virality} />
            <Stat label="Rigor" value={a.stats.rigor} />
            <Stat label="Taste" value={a.stats.taste} />
            <Stat label="Speed" value={a.stats.speed} />
          </div>

          <div className="mono mt-6 inline-flex items-center gap-2 rounded-md border-2 border-ink px-3 py-1.5 text-xs uppercase tracking-widest">
            <span className="h-2 w-2 rounded-full" style={{ background: a.colors.bg }} />
            {percent}% of marketers type as {a.name}
          </div>

          {(soulmate || nemesis) && (
            <div className="mt-10">
              <div className="mono text-xs uppercase tracking-widest text-ink/60">
                Matchups
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {soulmate && <Matchup label="Dream team with" a={soulmate} />}
                {nemesis && <Matchup label="Will clash with" a={nemesis} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Chip({
  label,
  value,
  bg,
  fg = "#0A0A0A",
}: {
  label: string;
  value: string;
  bg: string;
  fg?: string;
}) {
  return (
    <div className="rounded-xl border-2 border-ink p-3" style={{ background: bg, color: fg }}>
      <div className="mono text-[11px] uppercase tracking-widest opacity-80">{label}</div>
      <div className="mt-0.5 font-semibold">{value}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border-2 border-ink bg-bone p-3 hard-shadow-sm">
      <div className="mono text-[11px] uppercase tracking-widest text-ink/60">{label}</div>
      <div className="display mt-0.5 text-2xl">{value}</div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink/10">
        <div className="h-full rounded-full bg-ink" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function Matchup({ label, a }: { label: string; a: ReturnType<typeof getArchetype> extends infer T ? T : never }) {
  if (!a) return null;
  return (
    <Link
      href={`/archetypes/${a.id}`}
      className="group flex items-center gap-3 rounded-xl border-2 border-ink p-3 transition-transform hover:-translate-y-0.5"
      style={{ background: a.colors.bg, color: a.colors.ink }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-md outline-brutal text-2xl">
        {a.emoji}
      </div>
      <div>
        <div className="mono text-[11px] uppercase tracking-widest opacity-75">{label}</div>
        <div className="font-semibold">{a.name}</div>
      </div>
    </Link>
  );
}
