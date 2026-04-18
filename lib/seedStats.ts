import { ARCHETYPES } from "./archetypes";

export const SEED_TOTAL = 1047;

export const SEED_COUNTS: Record<string, number> = {
  "hook-gremlin": 124,
  "dashboard-monk": 189,
  "meme-whisperer": 42,
  "linkedin-philosopher": 147,
  "launch-day-panicker": 94,
  "brand-guardian": 118,
  "narrative-architect": 83,
  "performance-marketer": 105,
  "vibes-cmo": 63,
  "systems-architect": 136,
  "viral-savant": 52,
  "growth-alchemist": 74,
};

export function seededDistribution() {
  const total = Object.values(SEED_COUNTS).reduce((a, b) => a + b, 0);
  return ARCHETYPES.map((a) => ({
    id: a.id,
    name: a.name,
    emoji: a.emoji,
    colors: a.colors,
    count: SEED_COUNTS[a.id] ?? 0,
    percent: Number((((SEED_COUNTS[a.id] ?? 0) / total) * 100).toFixed(1)),
  })).sort((x, y) => y.count - x.count);
}
