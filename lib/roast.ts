import { Archetype } from "./archetypes";

export function fallbackRoast(a: Archetype, fingerprint: string): string {
  // Deterministic Forer-effect blurb based on fingerprint + archetype.
  const shortName = a.name.replace(/^The /, "");
  const SEEDS = [
    `You're ${a.name}. You'd rather ${a.superpower.toLowerCase()} than touch a spreadsheet, and you know it. Your kryptonite — ${a.kryptonite.toLowerCase()} — has ruined at least one Monday this quarter, and we both remember which one.`,
    `${a.emoji} Certified ${shortName}. You've mistaken ${a.kryptonite.toLowerCase()} for a personality flaw for years. It isn't; you're just better at ${a.superpower.toLowerCase()} than you are at pretending to care.`,
    `You move through the world as ${a.name}. Your peers quietly rely on your ${a.superpower.toLowerCase()}; you quietly resent anyone who suggests you handle ${a.kryptonite.toLowerCase()}. Both parties are correct.`,
    `The data is in: you are ${a.name}. Your team loves you for ${a.superpower.toLowerCase()}. Your team avoids you during ${a.kryptonite.toLowerCase()}. It's a fair trade and you've monetized it.`,
  ];
  const pick = fingerprint.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % SEEDS.length;
  return SEEDS[pick];
}
