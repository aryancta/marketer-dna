import type { Archetype } from "@/lib/archetypes";

export function ResultCard({
  archetype: a,
  blurb,
  rarityPercent,
  number,
}: {
  archetype: Archetype;
  blurb: string;
  rarityPercent: number;
  number: number;
}) {
  return (
    <div
      id="result-card"
      className="relative mx-auto w-full max-w-[400px] overflow-hidden rounded-2xl outline-brutal-thick hard-shadow-lg"
      style={{ background: a.colors.bg, color: a.colors.ink, aspectRatio: "9 / 16" }}
    >
      <div className="flex items-center justify-between p-5">
        <div className="mono text-[10px] font-semibold uppercase tracking-widest opacity-80">
          Marketer.DNA · Archetype Report
        </div>
        <div
          className="mono rounded-md px-1.5 py-0.5 text-[10px] font-bold"
          style={{ background: a.colors.ink, color: a.colors.bg }}
        >
          #{String(number).padStart(4, "0")}
        </div>
      </div>

      <div className="px-5">
        <div className="text-6xl leading-none">{a.emoji}</div>
        <div className="mono mt-4 text-[10px] uppercase tracking-widest opacity-70">
          You are
        </div>
        <div className="display mt-1 text-4xl leading-[0.9]">
          {a.name.toUpperCase()}
        </div>
        <div className="mt-2 text-sm opacity-80">{a.tagline}</div>
      </div>

      <div className="mt-4 px-5">
        <p className="text-[13px] leading-snug opacity-90">{blurb}</p>
      </div>

      <div className="mt-4 space-y-1.5 px-5">
        <StatBar label="Virality" value={a.stats.virality} ink={a.colors.ink} />
        <StatBar label="Rigor" value={a.stats.rigor} ink={a.colors.ink} />
        <StatBar label="Taste" value={a.stats.taste} ink={a.colors.ink} />
        <StatBar label="Speed" value={a.stats.speed} ink={a.colors.ink} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 px-5">
        <Box label="Superpower" value={a.superpower} ink={a.colors.ink} accent={a.colors.accent} />
        <Box label="Kryptonite" value={a.kryptonite} ink={a.colors.ink} accent={a.colors.accent} />
      </div>

      <div className="mt-3 px-5">
        <div
          className="mono inline-flex items-center gap-2 rounded-md border-2 px-2 py-1 text-[10px] font-bold uppercase tracking-widest"
          style={{ borderColor: a.colors.ink }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: a.colors.accent }} />
          Rarity · {rarityPercent}% of marketers
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-3 text-[11px] font-semibold"
        style={{ background: a.colors.ink, color: a.colors.bg }}
      >
        <div className="mono">marketer.dna · ConnectsBlue 2026</div>
        <div
          className="mono rounded px-2 py-0.5 text-[10px] font-bold"
          style={{ background: a.colors.accent, color: a.colors.ink }}
        >
          SHARE ME
        </div>
      </div>
    </div>
  );
}

function StatBar({ label, value, ink }: { label: string; value: number; ink: string }) {
  return (
    <div>
      <div className="mono flex items-center justify-between text-[9px] font-semibold uppercase tracking-widest opacity-80">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div
        className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full"
        style={{ background: `${ink}22` }}
      >
        <div
          className="h-full rounded-full"
          style={{ background: ink, width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Box({
  label,
  value,
  ink,
  accent,
}: {
  label: string;
  value: string;
  ink: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-lg border-2 p-2"
      style={{ borderColor: ink, background: `${ink}0d` }}
    >
      <div
        className="mono text-[9px] font-bold uppercase tracking-widest"
        style={{ color: accent === ink ? ink : ink, opacity: 0.7 }}
      >
        {label}
      </div>
      <div className="mt-1 text-[11px] font-semibold leading-tight">{value}</div>
    </div>
  );
}
