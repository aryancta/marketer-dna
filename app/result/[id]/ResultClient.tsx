"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Archetype } from "@/lib/archetypes";
import { ResultCard } from "@/components/ResultCard";
import { getUserKeys, setLastResult } from "@/lib/storage";
import { useToast } from "@/components/Toast";
import { ARCHETYPES } from "@/lib/archetypes";
import { cn } from "@/lib/utils";

export default function ResultClient({
  archetype,
  fingerprint,
  fallbackBlurb,
  rarityPercent,
}: {
  archetype: Archetype;
  fingerprint: string;
  fallbackBlurb: string;
  rarityPercent: number;
}) {
  const [blurb, setBlurb] = useState<string>(fallbackBlurb);
  const [source, setSource] = useState<"fallback" | "claude">("fallback");
  const [loading, setLoading] = useState(true);
  const [submissionUrl, setSubmissionUrl] = useState<string>("");
  const toast = useToast();

  const number = useMemo(() => {
    const base = fingerprint.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return 1000 + (base % 9000);
  }, [fingerprint]);

  useEffect(() => {
    const keys = getUserKeys();
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const r = await fetch("/api/roast", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            ...(keys.anthropic ? { "x-user-anthropic-key": keys.anthropic } : {}),
          },
          body: JSON.stringify({ archetypeId: archetype.id, fingerprint }),
        });
        const j = await r.json();
        if (!cancelled) {
          setBlurb(j.blurb || fallbackBlurb);
          setSource(j.source === "claude" ? "claude" : "fallback");
        }
      } catch {
        if (!cancelled) setBlurb(fallbackBlurb);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    // Persist last result
    setLastResult({
      archetypeId: archetype.id,
      blurb: fallbackBlurb,
      fingerprint,
      at: Date.now(),
    });

    // Pull the ConnectsBlue submission URL (settable via settings)
    try {
      const raw = localStorage.getItem("marketerdna_submission_url");
      setSubmissionUrl(raw || "https://devpost.com/software/marketer-dna-connectsblue");
    } catch {
      setSubmissionUrl("https://devpost.com/software/marketer-dna-connectsblue");
    }

    return () => {
      cancelled = true;
    };
  }, [archetype.id, fingerprint, fallbackBlurb]);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/result/${archetype.id}`
    : `/result/${archetype.id}`;

  const captionShort = `I'm ${archetype.name} ${archetype.emoji} — top ${rarityPercent}% of marketers. What's your Marketer DNA?`;
  const captionLong = `${captionShort}\n\nTake the 60-second quiz → ${shareUrl}\nVote for us at ConnectsBlue → ${submissionUrl}`;

  async function copyCaption() {
    try {
      await navigator.clipboard.writeText(captionLong);
      toast.push("Caption copied · paste anywhere", "success");
    } catch {
      toast.push("Couldn't copy. Long-press to copy the preview.", "warn");
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.push("Link copied", "success");
    } catch {
      toast.push("Couldn't copy link", "warn");
    }
  }

  function shareNative() {
    const data = { title: `I'm ${archetype.name}`, text: captionShort, url: shareUrl };
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      (navigator as any).share(data).catch(() => {});
    } else {
      copyCaption();
    }
  }

  function downloadCard() {
    // Open the OG image in a new tab. Users right-click/long-press to save.
    const url = `/api/og?a=${archetype.id}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.push("Card opened in a new tab · save the image", "success");
  }

  const encoded = encodeURIComponent(captionLong);
  const shareLinks = [
    {
      id: "x",
      label: "X / Twitter",
      href: `https://twitter.com/intent/tweet?text=${encoded}`,
      bg: "#0A0A0A",
      fg: "#F5F1E8",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      bg: "#2E5BFF",
      fg: "#F5F1E8",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encoded}`,
      bg: "#25D366",
      fg: "#0A0A0A",
    },
    {
      id: "threads",
      label: "Threads",
      href: `https://www.threads.net/intent/post?text=${encoded}`,
      bg: "#0A0A0A",
      fg: "#F5F1E8",
    },
  ];

  const siblings = useMemo(() => {
    const pool = ARCHETYPES.filter((a) => a.id !== archetype.id);
    // Pick 3 "compatible" archetypes: the soulmate + 2 random
    const soulmateId =
      ARCHETYPES.find((a) => a.name === archetype.soulmate)?.id ?? pool[0].id;
    const remaining = pool.filter((a) => a.id !== soulmateId);
    // deterministic sample from fingerprint
    const pick = (n: number) => {
      const base = fingerprint.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
      return (base + n * 7) % remaining.length;
    };
    const pool3 = [
      ARCHETYPES.find((a) => a.id === soulmateId)!,
      remaining[pick(1)],
      remaining[pick(2)],
    ];
    return pool3.filter(Boolean).slice(0, 3);
  }, [archetype.id, archetype.soulmate, fingerprint]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/quiz" className="mono text-xs uppercase tracking-widest text-ink/60 hover:text-ink">
          ← retake the quiz
        </Link>
        <div className="mono text-xs uppercase tracking-widest text-ink/60">
          Report #{String(number).padStart(4, "0")}
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="sticky top-24">
            <ResultCard
              archetype={archetype}
              blurb={blurb}
              rarityPercent={rarityPercent}
              number={number}
            />
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={downloadCard}
                className="rounded-md border-2 border-ink bg-bone px-3 py-1.5 text-xs font-semibold hard-shadow-sm hover:-translate-y-0.5"
              >
                ⬇ Download PNG
              </button>
              <button
                onClick={copyLink}
                className="rounded-md border-2 border-ink bg-bone px-3 py-1.5 text-xs font-semibold hard-shadow-sm hover:-translate-y-0.5"
              >
                🔗 Copy link
              </button>
              <button
                onClick={shareNative}
                className="rounded-md border-2 border-ink bg-lime px-3 py-1.5 text-xs font-semibold hard-shadow-sm hover:-translate-y-0.5"
              >
                ↗ Share
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 space-y-8">
          <div>
            <div className="mono text-xs uppercase tracking-widest text-hot">
              {loading ? "Decoding your DNA…" : source === "claude" ? "AI-personalized blurb" : "Canonical blurb"}
            </div>
            <h1 className="display mt-1 text-4xl md:text-6xl">
              You are <span className="rounded-md px-2" style={{ background: archetype.colors.bg }}>
                {archetype.name}
              </span>
              <span className="ml-2">{archetype.emoji}</span>
            </h1>
            <p className="mt-3 max-w-xl text-ink/70">{archetype.tagline}</p>
          </div>

          <div className="rounded-2xl border-2 border-ink bg-bone p-5 hard-shadow-sm">
            <div className="mono text-[11px] uppercase tracking-widest text-ink/60">
              Freakishly accurate blurb
            </div>
            <p
              className={cn(
                "mt-2 text-lg leading-snug",
                loading && "animate-pulse text-ink/60"
              )}
            >
              {blurb}
            </p>
            {source === "fallback" && !loading && (
              <div className="mono mt-3 rounded-md border border-ink/20 bg-bone px-2 py-1 text-[11px] text-ink/60">
                Running in demo mode · add your Anthropic key in{" "}
                <Link href="/settings" className="underline">Settings</Link> for a
                Claude-personalized blurb.
              </div>
            )}
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <KV label="Superpower" value={archetype.superpower} tone="lime" />
            <KV label="Kryptonite" value={archetype.kryptonite} tone="hot" />
            <KV label="Soulmate archetype" value={archetype.soulmate} tone="cobalt" />
            <KV label="Nemesis archetype" value={archetype.nemesis} tone="amber" />
          </div>

          {/* SHARE */}
          <div className="rounded-2xl border-2 border-ink bg-ink p-5 text-bone hard-shadow-sm">
            <div className="mono text-[11px] uppercase tracking-widest text-lime">
              Step 3 of 3 · share the card
            </div>
            <h2 className="display mt-1 text-2xl md:text-3xl text-bone">
              Think your team is this self-aware? Dare them.
            </h2>

            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {shareLinks.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border-2 border-bone px-4 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                  style={{ background: s.bg, color: s.fg }}
                >
                  <span>Share to {s.label}</span>
                  <span>→</span>
                </a>
              ))}
            </div>

            <div className="mt-4">
              <div className="mono text-[11px] uppercase tracking-widest text-lime">
                Pre-filled caption
              </div>
              <pre className="mt-2 whitespace-pre-wrap rounded-md border border-bone/20 bg-bone/5 p-3 text-xs text-bone/90">
{captionLong}
              </pre>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={copyCaption}
                  className="rounded-md border-2 border-lime bg-lime px-3 py-1.5 text-xs font-semibold text-ink hover:-translate-y-0.5"
                >
                  Copy caption
                </button>
                <Link
                  href="/settings"
                  className="rounded-md border-2 border-bone px-3 py-1.5 text-xs font-semibold text-bone hover:-translate-y-0.5"
                >
                  Edit ConnectsBlue link →
                </Link>
              </div>
            </div>
          </div>

          {/* DARE A FRIEND */}
          <div className="rounded-2xl border-2 border-ink bg-lime p-5 hard-shadow-sm">
            <div className="mono text-[11px] uppercase tracking-widest text-ink/70">
              Dare 3 friends
            </div>
            <h2 className="display mt-1 text-2xl md:text-3xl">
              Tag the 3 marketers who need to see this most.
            </h2>
            <p className="mt-2 text-sm text-ink/70">
              That's it. That's the loop.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `.@friend1 .@friend2 .@friend3 — which Marketer DNA are you? I'm ${archetype.name} ${archetype.emoji}. Take it: ${shareUrl}`
                    )}`,
                    "_blank",
                    "noopener"
                  )
                }
                className="rounded-md border-2 border-ink bg-bone px-3 py-1.5 text-xs font-semibold hard-shadow-sm hover:-translate-y-0.5"
              >
                Draft a tag tweet
              </button>
              <Link
                href="/compatibility"
                className="rounded-md border-2 border-ink bg-ink px-3 py-1.5 text-xs font-semibold text-bone hard-shadow-sm hover:-translate-y-0.5"
              >
                Dream-team compatibility →
              </Link>
            </div>
          </div>

          {/* SIBLINGS */}
          <div>
            <div className="mono text-xs uppercase tracking-widest text-ink/60">
              Closest archetypes to yours
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {siblings.map((s) => (
                <Link
                  key={s.id}
                  href={`/archetypes/${s.id}`}
                  className="group block rounded-xl border-2 border-ink p-4 hard-shadow-sm hover:-translate-y-0.5"
                  style={{ background: s.colors.bg, color: s.colors.ink }}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{s.emoji}</div>
                    <div>
                      <div className="display text-lg leading-none">{s.name}</div>
                      <div className="mt-1 text-[11px] opacity-70">{s.tagline}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KV({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "lime" | "hot" | "cobalt" | "amber";
}) {
  const bg =
    tone === "lime" ? "#D8FF3E" : tone === "hot" ? "#FF3D7F" : tone === "cobalt" ? "#2E5BFF" : "#FFB547";
  const fg = tone === "cobalt" ? "#F5F1E8" : "#0A0A0A";
  return (
    <div className="rounded-xl border-2 border-ink p-4" style={{ background: bg, color: fg }}>
      <div className="mono text-[11px] font-semibold uppercase tracking-widest opacity-80">
        {label}
      </div>
      <div className="mt-1 text-base font-semibold">{value}</div>
    </div>
  );
}
