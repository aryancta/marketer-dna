import { NextRequest, NextResponse } from "next/server";
import { getArchetype } from "@/lib/archetypes";
import { fallbackRoast } from "@/lib/roast";

export const runtime = "nodejs";

type Body = {
  archetypeId: string;
  fingerprint: string;
  answers?: Record<string, string>;
};

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const archetype = getArchetype(body.archetypeId);
  if (!archetype) {
    return NextResponse.json({ error: "Unknown archetype" }, { status: 400 });
  }

  const fingerprint = body.fingerprint ?? "";
  const userKey =
    req.headers.get("x-user-anthropic-key") ||
    process.env.ANTHROPIC_API_KEY ||
    "";

  if (!userKey) {
    return NextResponse.json({
      blurb: fallbackRoast(archetype, fingerprint),
      source: "fallback",
    });
  }

  const prompt = [
    `You are writing a 3-sentence "kindly roasted" personality blurb for a marketer.`,
    `Tone: BuzzFeed meets a senior CMO. Witty, specific, self-aware, warm, never mean.`,
    `Constraints:`,
    `- 3 sentences max, 55 words max.`,
    `- Second-person ("you").`,
    `- 90% flattering, 10% playfully self-deprecating.`,
    `- Must feel freakishly personal — never generic.`,
    `- No em-dashes. No emojis. No hashtags. No opening with "You are...".`,
    ``,
    `Archetype: ${archetype.name} ${archetype.emoji}`,
    `Tagline: ${archetype.tagline}`,
    `Superpower: ${archetype.superpower}`,
    `Kryptonite: ${archetype.kryptonite}`,
    `Canonical blurb (rewrite, don't copy): ${archetype.blurb}`,
    ``,
    `Their answer pattern fingerprint: ${fingerprint}`,
    ``,
    `Return ONLY the 3-sentence blurb, no preamble.`,
  ].join("\n");

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": userKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 220,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!r.ok) {
      return NextResponse.json({
        blurb: fallbackRoast(archetype, fingerprint),
        source: "fallback",
        note: `claude ${r.status}`,
      });
    }

    const data = await r.json();
    const text: string =
      data?.content?.map((c: { text?: string }) => c?.text ?? "").join("").trim() ||
      fallbackRoast(archetype, fingerprint);

    return NextResponse.json({ blurb: text, source: "claude" });
  } catch (e) {
    return NextResponse.json({
      blurb: fallbackRoast(archetype, fingerprint),
      source: "fallback",
      note: "network error",
    });
  }
}
