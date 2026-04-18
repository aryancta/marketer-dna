"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { clearAnswers, clearUserKeys, getUserKeys, setUserKeys } from "@/lib/storage";
import { useToast } from "@/components/Toast";

const DEFAULT_SUBMISSION = "https://devpost.com/software/marketer-dna-connectsblue";
const URL_KEY = "marketerdna_submission_url";

export default function SettingsClient() {
  const toast = useToast();
  const [anthropic, setAnthropic] = useState("");
  const [umami, setUmami] = useState("");
  const [submissionUrl, setSubmissionUrl] = useState(DEFAULT_SUBMISSION);
  const [showAnthropic, setShowAnthropic] = useState(false);

  useEffect(() => {
    const k = getUserKeys();
    setAnthropic(k.anthropic ?? "");
    setUmami(k.umami ?? "");
    try {
      const raw = localStorage.getItem(URL_KEY);
      if (raw) setSubmissionUrl(raw);
    } catch {}
  }, []);

  function save() {
    setUserKeys({ anthropic: anthropic.trim() || undefined, umami: umami.trim() || undefined });
    try {
      if (submissionUrl.trim()) localStorage.setItem(URL_KEY, submissionUrl.trim());
    } catch {}
    toast.push("Settings saved locally", "success");
  }

  function clearAll() {
    clearUserKeys();
    clearAnswers();
    try {
      localStorage.removeItem(URL_KEY);
      localStorage.removeItem("marketerdna_last_result");
      localStorage.removeItem("marketerdna_local_stats");
    } catch {}
    setAnthropic("");
    setUmami("");
    setSubmissionUrl(DEFAULT_SUBMISSION);
    toast.push("Local state cleared", "success");
  }

  async function testKey() {
    if (!anthropic) {
      toast.push("Paste an Anthropic key first", "warn");
      return;
    }
    setUserKeys({ anthropic: anthropic.trim(), umami: umami.trim() || undefined });
    try {
      const r = await fetch("/api/roast", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-user-anthropic-key": anthropic.trim(),
        },
        body: JSON.stringify({ archetypeId: "hook-gremlin", fingerprint: "test-fingerprint" }),
      });
      const j = await r.json();
      if (j.source === "claude") {
        toast.push("Claude is live — AI blurbs will render", "success");
      } else {
        toast.push(`Key didn't authenticate (${j.note ?? "fallback"})`, "warn");
      }
    } catch {
      toast.push("Network error contacting Anthropic", "warn");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
      <div className="mono text-xs uppercase tracking-widest text-ink/60">Settings</div>
      <h1 className="display mt-1 text-4xl md:text-6xl">Bring your own keys.</h1>
      <p className="mt-2 max-w-xl text-ink/70">
        Keys live in your browser only. We never write them to the server, never log them,
        never commit them. The app runs great without any keys — missing keys just fall
        back to hand-written blurbs and seeded stats.
      </p>

      <div className="mt-8 space-y-5">
        <Row
          label="Anthropic API key"
          hint="Used to generate AI-personalized roast blurbs (Claude Haiku 4.5)."
          href="https://console.anthropic.com/settings/keys"
        >
          <div className="flex items-center gap-2">
            <input
              type={showAnthropic ? "text" : "password"}
              placeholder="sk-ant-..."
              value={anthropic}
              onChange={(e) => setAnthropic(e.target.value)}
              className="w-full rounded-md border-2 border-ink bg-bone px-3 py-2 font-mono text-sm"
            />
            <button
              onClick={() => setShowAnthropic((v) => !v)}
              className="rounded-md border-2 border-ink bg-bone px-2 py-2 text-xs"
            >
              {showAnthropic ? "Hide" : "Show"}
            </button>
          </div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={testKey}
              className="rounded-md border-2 border-ink bg-lime px-3 py-1.5 text-xs font-semibold hard-shadow-sm"
            >
              Test key
            </button>
            <span className="mono text-[11px] text-ink/60">Sponsored — free tier plenty for a hackathon.</span>
          </div>
        </Row>

        <Row
          label="Umami Cloud website ID"
          hint="Optional. Tracks share clicks and referral backlinks for the leaderboard. Demo mode works without this."
          href="https://cloud.umami.is/"
        >
          <input
            type="text"
            placeholder="00000000-0000-0000-0000-000000000000"
            value={umami}
            onChange={(e) => setUmami(e.target.value)}
            className="w-full rounded-md border-2 border-ink bg-bone px-3 py-2 font-mono text-sm"
          />
        </Row>

        <Row
          label="ConnectsBlue submission URL"
          hint="Pre-filled in every shareable caption. Paste your hackathon submission here so every shared result drives a vote back."
        >
          <input
            type="url"
            placeholder="https://devpost.com/software/..."
            value={submissionUrl}
            onChange={(e) => setSubmissionUrl(e.target.value)}
            className="w-full rounded-md border-2 border-ink bg-bone px-3 py-2 font-mono text-sm"
          />
        </Row>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <button
          onClick={save}
          className="rounded-md border-2 border-ink bg-ink px-4 py-2 text-sm font-semibold text-bone hard-shadow-sm hover:-translate-y-0.5"
        >
          Save settings
        </button>
        <button
          onClick={clearAll}
          className="rounded-md border-2 border-ink bg-hot px-4 py-2 text-sm font-semibold text-bone hard-shadow-sm hover:-translate-y-0.5"
        >
          Clear local state
        </button>
        <Link href="/quiz" className="rounded-md border-2 border-ink bg-bone px-4 py-2 text-sm font-semibold hard-shadow-sm hover:-translate-y-0.5">
          Back to the quiz
        </Link>
      </div>

      <div className="mt-10 rounded-xl border-2 border-ink bg-bone p-4 text-sm text-ink/70 hard-shadow-sm">
        <div className="mono text-[11px] uppercase tracking-widest text-ink/60">Privacy</div>
        <p className="mt-1">
          We store your answers, last result, and any API keys in <code className="mono">localStorage</code>.
          Nothing touches our servers except the Claude request (which uses your key and is
          never logged), the archetype count increment (no PII), and the OG image render
          (fully static). Hit "Clear local state" to wipe everything.
        </p>
      </div>
    </div>
  );
}

function Row({
  label,
  hint,
  href,
  children,
}: {
  label: string;
  hint: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border-2 border-ink bg-bone p-4 hard-shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="font-semibold">{label}</div>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-[11px] uppercase tracking-widest text-cobalt underline decoration-cobalt/50"
          >
            Get a free key →
          </a>
        )}
      </div>
      <div className="mt-1 text-xs text-ink/60">{hint}</div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
