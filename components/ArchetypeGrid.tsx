import Link from "next/link";
import { ARCHETYPES } from "@/lib/archetypes";
import { seededDistribution } from "@/lib/seedStats";

export function ArchetypeGrid({ compact = false }: { compact?: boolean }) {
  const dist = Object.fromEntries(seededDistribution().map((d) => [d.id, d]));
  return (
    <div
      className={`grid gap-3 ${
        compact ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      }`}
    >
      {ARCHETYPES.map((a) => {
        const pct = dist[a.id]?.percent ?? 0;
        return (
          <Link
            key={a.id}
            href={`/archetypes/${a.id}`}
            className="group relative block overflow-hidden rounded-xl outline-brutal hard-shadow-sm transition-all duration-150 hover:-translate-y-1 hover:hard-shadow"
            style={{ background: a.colors.bg, color: a.colors.ink }}
          >
            <div className="flex items-start justify-between p-4">
              <span className="text-3xl">{a.emoji}</span>
              <span
                className="mono text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: a.colors.ink, opacity: 0.7 }}
              >
                {pct}%
              </span>
            </div>
            <div className="px-4 pb-4">
              <div className="display text-base leading-tight">{a.name}</div>
              {!compact && (
                <div className="mt-1 text-xs opacity-80 line-clamp-2">{a.tagline}</div>
              )}
            </div>
            <div
              className="absolute inset-x-0 bottom-0 h-1 transition-all duration-150 group-hover:h-2"
              style={{ background: a.colors.accent }}
            />
          </Link>
        );
      })}
    </div>
  );
}
