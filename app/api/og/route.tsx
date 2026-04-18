import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { ARCHETYPES, getArchetype } from "@/lib/archetypes";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("a") ?? ARCHETYPES[0].id;
  const a = getArchetype(id) ?? ARCHETYPES[0];

  const width = 1080;
  const height = 1920;

  const ink = a.colors.ink;
  const bg = a.colors.bg;
  const accent = a.colors.accent;

  const bars = (["virality", "rigor", "taste", "speed"] as const).map((k) => (
    <div key={k} style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 26,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          opacity: 0.8,
          color: ink,
        }}
      >
        <span>{k}</span>
        <span>{a.stats[k]}</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 10,
          height: 18,
          background: ink + "22",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", width: `${a.stats[k]}%`, background: ink }} />
      </div>
    </div>
  ));

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: bg,
          color: ink,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "60px 64px 0 64px",
            fontSize: 26,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0.75,
          }}
        >
          <div style={{ display: "flex" }}>Marketer.DNA · Archetype Report</div>
          <div
            style={{
              display: "flex",
              background: ink,
              color: bg,
              padding: "4px 14px",
              borderRadius: 8,
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            #{Math.floor(Math.random() * 9000 + 1000)}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", padding: "48px 64px 0 64px" }}>
          <div style={{ display: "flex", fontSize: 260, lineHeight: 1 }}>{a.emoji}</div>
          <div
            style={{
              display: "flex",
              fontSize: 38,
              marginTop: 24,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            You are
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 140,
              lineHeight: 0.92,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              marginTop: 8,
            }}
          >
            {a.name}
          </div>
          <div style={{ display: "flex", fontSize: 40, marginTop: 20, opacity: 0.85, lineHeight: 1.2 }}>
            {a.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "48px 64px 0 64px",
            gap: 22,
          }}
        >
          {bars}
        </div>

        <div style={{ display: "flex", padding: "48px 64px 0 64px", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              background: ink + "0d",
              border: `4px solid ${ink}`,
              borderRadius: 20,
              padding: "22px 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 24,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                opacity: 0.75,
              }}
            >
              Superpower
            </div>
            <div style={{ display: "flex", fontSize: 34, marginTop: 8, fontWeight: 700, lineHeight: 1.15 }}>
              {a.superpower}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              background: ink + "0d",
              border: `4px solid ${ink}`,
              borderRadius: 20,
              padding: "22px 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 24,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                opacity: 0.75,
              }}
            >
              Kryptonite
            </div>
            <div style={{ display: "flex", fontSize: 34, marginTop: 8, fontWeight: 700, lineHeight: 1.15 }}>
              {a.kryptonite}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexGrow: 1 }} />

        <div
          style={{
            display: "flex",
            background: ink,
            color: bg,
            justifyContent: "space-between",
            alignItems: "center",
            padding: "28px 64px",
            fontSize: 30,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>marketer.dna · ConnectsBlue 2026</div>
          <div
            style={{
              display: "flex",
              background: accent,
              color: ink,
              padding: "8px 16px",
              borderRadius: 8,
              fontWeight: 900,
              fontSize: 28,
            }}
          >
            SHARE ME
          </div>
        </div>
      </div>
    ),
    {
      width,
      height,
      headers: {
        "cache-control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
