import Link from "next/link";
import { ArchetypeGrid } from "@/components/ArchetypeGrid";
import { LiveCounter } from "@/components/LiveCounter";
import { Marquee } from "@/components/Marquee";
import { ARCHETYPES } from "@/lib/archetypes";
import { SEED_TOTAL, seededDistribution } from "@/lib/seedStats";

export default function Home() {
  const top = seededDistribution()[0];

  const marqueeItems = [
    "97% of marketers get mildly offended by their result",
    "12 archetypes. 10 questions. 60 seconds.",
    "Yes, your CMO is The LinkedIn Philosopher. Obviously.",
    "No logins. No fluff. No attribution dashboards.",
    "Built for ConnectsBlue — your hackathon competitors are the voters",
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-bone">
        <div className="pointer-events-none absolute -right-24 -top-24 h-[480px] w-[480px] rounded-full bg-lime opacity-60 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 top-40 h-[360px] w-[360px] rounded-full bg-hot opacity-30 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-5 md:px-6 md:py-24">
          <div className="md:col-span-3">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-bone px-3 py-1 text-xs font-medium hard-shadow-sm">
              <LiveCounter start={SEED_TOTAL} /> marketers have taken this · ConnectsBlue 2026
            </div>

            <h1 className="display text-5xl md:text-7xl">
              Which of the <span className="rounded-md bg-lime px-2 py-0.5 outline-brutal">12 Marketer</span>{" "}
              Archetypes are <span className="text-hot">actually</span> you?
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink/75">
              A 60-second quiz that roasts, types, and exposes what kind of marketer you
              really are. Find your archetype. Share the card. Dare your team.
              <span className="mono ml-1 text-xs text-ink/50">
                (97% get mildly offended — this is normal and good.)
              </span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/quiz"
                className="group relative inline-flex items-center gap-2 rounded-lg border-2 border-ink bg-ink px-5 py-3 text-base font-semibold text-bone transition-all duration-150 hover:-translate-y-0.5 hard-shadow hover:bg-hot hover:text-ink"
              >
                Start the quiz →
              </Link>
              <Link
                href="/leaderboard"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-ink bg-bone px-5 py-3 text-base font-semibold hover:-translate-y-0.5 hard-shadow-sm"
              >
                See the live leaderboard
              </Link>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-xs">
              <Fact top="10" bottom="forced-choice questions" />
              <Fact top="12" bottom="archetypes engineered to flatter" />
              <Fact top="60s" bottom="less than a coffee order" />
            </div>
          </div>

          <div className="md:col-span-2">
            <HeroCard />
          </div>
        </div>
      </section>

      <Marquee items={marqueeItems} />

      {/* LEADERBOARD TEASER */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mono text-xs uppercase tracking-widest text-ink/60">Live global distribution</div>
            <h2 className="display mt-1 text-3xl md:text-5xl">
              Right now, <span className="text-hot">{top.percent}%</span>
              <br className="md:hidden" /> of marketers are {top.name}.
            </h2>
            <p className="mt-2 max-w-xl text-ink/70">
              This itself is a shareable stat. The rarer your archetype, the more
              dangerous the flex. (We know which one you're picturing.)
            </p>
          </div>
          <Link
            href="/leaderboard"
            className="self-start rounded-lg border-2 border-ink bg-lime px-4 py-2 text-sm font-semibold hard-shadow-sm hover:-translate-y-0.5"
          >
            Open the leaderboard →
          </Link>
        </div>

        <div className="mt-8">
          <ArchetypeGrid />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y-2 border-ink bg-ink text-bone">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <div className="mono text-xs uppercase tracking-widest text-lime">The loop</div>
          <h2 className="display mt-2 text-3xl md:text-5xl">Take → type → share → repeat.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            <Step n="01" title="Take the 10-Q quiz." body="Sharp, witty, forced-choice. No boring personality-test math. Takes 60 seconds." />
            <Step n="02" title="Get your archetype." body="An AI-personalized, kindly roasted 3-line blurb with your superpower and kryptonite." />
            <Step n="03" title="Share the card." body="A 9:16 Spotify-Wrapped-style image. One tap for X, LinkedIn, WhatsApp, IG." />
            <Step n="04" title="Dare your team." body="Every share pre-fills a caption. Every caption points one friend to the quiz." />
          </div>
        </div>
      </section>

      {/* SAMPLE CARDS */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mono text-xs uppercase tracking-widest text-ink/60">Sample archetypes</div>
            <h2 className="display mt-1 text-3xl md:text-5xl">You already know at least 3 of these.</h2>
          </div>
          <Link href="/archetypes" className="self-start rounded-lg border-2 border-ink bg-bone px-4 py-2 text-sm font-semibold hard-shadow-sm hover:-translate-y-0.5">
            All 12 archetypes →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["hook-gremlin", "dashboard-monk", "linkedin-philosopher"].map((id) => {
            const a = ARCHETYPES.find((x) => x.id === id)!;
            return (
              <Link
                key={a.id}
                href={`/archetypes/${a.id}`}
                className="group block overflow-hidden rounded-2xl outline-brutal hard-shadow transition-all duration-150 hover:-translate-y-1"
                style={{ background: a.colors.bg, color: a.colors.ink }}
              >
                <div className="p-6">
                  <div className="text-5xl">{a.emoji}</div>
                  <div className="display mt-3 text-2xl">{a.name}</div>
                  <div className="mt-1 text-sm opacity-80">{a.tagline}</div>
                  <p className="mt-4 text-sm opacity-90">{a.blurb}</p>
                  <div className="mono mt-5 text-[11px] uppercase tracking-widest opacity-80">
                    Superpower: {a.superpower}
                  </div>
                </div>
                <div className="h-1.5 w-full transition-all group-hover:h-3" style={{ background: a.colors.accent }} />
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <div className="relative overflow-hidden rounded-3xl outline-brutal hard-shadow-lg">
          <div className="absolute inset-0 bg-lime" />
          <div className="relative grid items-center gap-6 p-8 md:grid-cols-2 md:p-12">
            <div>
              <div className="display text-3xl md:text-5xl">Think your team is this self-aware?</div>
              <p className="mt-3 max-w-md text-ink/80">
                Take the quiz. Find your archetype. Dare 3 people who need to see
                themselves described out loud. That's it. That's the whole bit.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <Link
                href="/quiz"
                className="rounded-lg border-2 border-ink bg-ink px-6 py-4 text-lg font-semibold text-bone hover:-translate-y-0.5 hard-shadow"
              >
                Start the quiz →
              </Link>
              <div className="mono text-xs text-ink/70">~60 seconds · no login</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Fact({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="rounded-lg border-2 border-ink bg-bone p-3">
      <div className="display text-2xl">{top}</div>
      <div className="mt-1 text-xs text-ink/70">{bottom}</div>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-xl border-2 border-lime bg-ink p-5">
      <div className="mono text-sm text-lime">{n}</div>
      <div className="display mt-2 text-xl">{title}</div>
      <p className="mt-2 text-sm text-bone/70">{body}</p>
    </div>
  );
}

function HeroCard() {
  const a = ARCHETYPES[0]; // Hook Gremlin preview
  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      <div
        className="animate-float relative aspect-[9/16] overflow-hidden rounded-2xl outline-brutal hard-shadow-lg"
        style={{ background: a.colors.bg, color: a.colors.ink }}
      >
        <div className="flex items-center justify-between p-5">
          <div className="mono text-[10px] uppercase tracking-widest opacity-70">Marketer.DNA · Result</div>
          <div className="mono text-[10px] opacity-70">#0137</div>
        </div>
        <div className="px-5">
          <div className="text-6xl">{a.emoji}</div>
          <div className="display mt-3 text-3xl leading-none">{a.name.toUpperCase()}</div>
          <div className="mt-2 text-sm opacity-80">{a.tagline}</div>
        </div>
        <div className="mt-5 space-y-2 px-5">
          <StatBar label="Virality" value={a.stats.virality} />
          <StatBar label="Rigor" value={a.stats.rigor} />
          <StatBar label="Taste" value={a.stats.taste} />
          <StatBar label="Speed" value={a.stats.speed} />
        </div>
        <div className="mt-5 px-5">
          <div className="mono text-[10px] uppercase tracking-widest opacity-70">Superpower</div>
          <div className="text-sm font-semibold">{a.superpower}</div>
          <div className="mono mt-3 text-[10px] uppercase tracking-widest opacity-70">Kryptonite</div>
          <div className="text-sm font-semibold">{a.kryptonite}</div>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t-2 border-ink bg-ink px-5 py-3 text-bone">
          <div className="mono text-[10px] uppercase tracking-widest">marketer.dna/you</div>
          <div className="rounded bg-lime px-2 py-0.5 text-[10px] font-bold text-ink">SHARE ME</div>
        </div>
      </div>
      <div className="pointer-events-none absolute -left-6 -top-4 rotate-[-8deg] rounded-md border-2 border-ink bg-hot px-2 py-1 text-[10px] font-bold text-bone hard-shadow-sm">
        screenshot-first
      </div>
      <div className="pointer-events-none absolute -right-4 bottom-8 rotate-[6deg] rounded-md border-2 border-ink bg-bone px-2 py-1 text-[10px] font-bold hard-shadow-sm">
        9:16 wrapped-style
      </div>
    </div>
  );
}

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mono flex items-center justify-between text-[10px] uppercase tracking-widest opacity-70">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 w-full rounded-full border border-ink/40 bg-ink/10">
        <div
          className="h-full rounded-full bg-ink"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
