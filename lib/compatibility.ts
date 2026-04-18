import { ARCHETYPES, Archetype } from "./archetypes";

export type Compatibility = {
  score: number;
  verdict: string;
  blurb: string;
  strengths: string[];
  risks: string[];
};

function traitVector(a: Archetype) {
  return a.traits;
}

function cosine(a: Archetype, b: Archetype): number {
  const keys = new Set([...Object.keys(a.traits), ...Object.keys(b.traits)]);
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (const k of keys) {
    const av = (a.traits as Record<string, number>)[k] ?? 0;
    const bv = (b.traits as Record<string, number>)[k] ?? 0;
    dot += av * bv;
    na += av * av;
    nb += bv * bv;
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export function computeCompatibility(a: Archetype, b: Archetype): Compatibility {
  const sim = cosine(a, b);
  const soulmate = a.soulmate === b.name || b.soulmate === a.name;
  const nemesis = a.nemesis === b.name || b.nemesis === a.name;

  // Dream team math: high if complementary but not clashing.
  // Our formula rewards difference when both are strong, penalizes true nemesis pairings.
  let base = 55 + (1 - Math.abs(sim - 0.5)) * 40; // peak at ~0.5 sim
  if (soulmate) base += 15;
  if (nemesis) base -= 22;
  base = Math.max(12, Math.min(99, Math.round(base)));

  const verdict = soulmate
    ? "Iconic. Frame the retainer."
    : nemesis
    ? "Don't put them in the same Slack channel."
    : base >= 82
    ? "Dream team. Hire them both."
    : base >= 68
    ? "Strong pairing. Will ship."
    : base >= 50
    ? "Workable. With adult supervision."
    : base >= 34
    ? "Tense. Productive if contained."
    : "Chaotic evil. Maybe don't.";

  const strengths = [
    `${a.name} brings ${a.superpower.toLowerCase()}.`,
    `${b.name} brings ${b.superpower.toLowerCase()}.`,
    soulmate
      ? "Their instincts overlap exactly where they need to."
      : sim < 0.3
      ? "Zero creative overlap — that's a feature, not a bug."
      : "Enough shared vocabulary to move fast.",
  ];
  const risks = [
    `${a.name}'s kryptonite: ${a.kryptonite.toLowerCase()}.`,
    `${b.name}'s kryptonite: ${b.kryptonite.toLowerCase()}.`,
    nemesis ? "These two will die on hills that don't exist." : "Standard co-founder-friction material.",
  ];

  const blurb = soulmate
    ? `${a.name} and ${b.name} together are the reason the team shipped on time and on brand. They finish each other's briefs. It's faintly uncomfortable.`
    : nemesis
    ? `${a.name} wants to move fast. ${b.name} wants to be right. Every meeting is Groundhog Day. Consider a third teammate as a mediator.`
    : `Put ${a.name} in charge of ${a.superpower.toLowerCase()}, ${b.name} on ${b.superpower.toLowerCase()}, and nobody near the other's kryptonite. Score: ${base}/100.`;

  return { score: base, verdict, blurb, strengths, risks };
}

export function findArchetypeByIdOrDefault(id: string | null): Archetype {
  if (!id) return ARCHETYPES[0];
  return ARCHETYPES.find((a) => a.id === id) ?? ARCHETYPES[0];
}
