import { SEED_COUNTS } from "./seedStats";

// In-memory increments on top of seed counts. Lives for the lifetime of the process.
// In production we'd back this with Supabase; the brief's free tier is fine, but
// we want the app to be fully functional out-of-the-box with no external deps.

const runtime: Record<string, number> = {};

export function incStat(id: string) {
  runtime[id] = (runtime[id] ?? 0) + 1;
}

export function getCombinedStats(): {
  counts: Record<string, number>;
  total: number;
} {
  const counts: Record<string, number> = {};
  let total = 0;
  for (const [id, seed] of Object.entries(SEED_COUNTS)) {
    const n = seed + (runtime[id] ?? 0);
    counts[id] = n;
    total += n;
  }
  return { counts, total };
}
