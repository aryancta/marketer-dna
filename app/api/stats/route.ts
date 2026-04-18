import { NextRequest, NextResponse } from "next/server";
import { ARCHETYPES, getArchetype } from "@/lib/archetypes";
import { getCombinedStats, incStat } from "@/lib/stats-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { counts, total } = getCombinedStats();
  const distribution = ARCHETYPES.map((a) => ({
    id: a.id,
    name: a.name,
    emoji: a.emoji,
    count: counts[a.id] ?? 0,
    percent: Number((((counts[a.id] ?? 0) / Math.max(total, 1)) * 100).toFixed(2)),
  })).sort((a, b) => b.count - a.count);

  return NextResponse.json({ total, distribution });
}

export async function POST(req: NextRequest) {
  let body: { archetypeId?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  if (!body.archetypeId || !getArchetype(body.archetypeId)) {
    return NextResponse.json({ error: "unknown archetype" }, { status: 400 });
  }
  incStat(body.archetypeId);
  const { counts, total } = getCombinedStats();
  return NextResponse.json({ ok: true, total, archetypeCount: counts[body.archetypeId] });
}
