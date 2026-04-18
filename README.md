# Marketer DNA

> The 60-second quiz that roasts, types, and exposes what kind of marketer you really are.
> Share your result. Dare your friends. Built for ConnectsBlue 2026.

<p align="center">
  <img src="app/icon.svg" alt="Marketer DNA glyph" width="96" height="96" />
</p>

ConnectsBlue is a pure-popularity hackathon. There is no rubric, no panel — 1,000+
marketers submit a digital asset and the crowd decides. So we asked the only
question that matters: **what's the one piece of content every marketer would
voluntarily broadcast to their entire professional network?**

Answer: a flattering-but-funny identity test about themselves. Tickle hit 150M
users on this mechanic. 16Personalities is a cultural staple. Spotify Wrapped
had over 200M users interact in the first 24 hours of 2025. We ported the same
dopamine loop into the marketer-identity space — every share of a result card
pre-fills a caption with a backlink to the ConnectsBlue submission, so the
voting pool itself becomes our distribution channel.

## The demo in 60 seconds

1. Land on the homepage — bold bone-and-lime, a live counter ticking up, a
   Spotify-Wrapped-style preview card floating in the hero.
2. Click **Start the quiz**, breeze through 10 sharp forced-choice questions
   (_"Your launch flopped. Your first instinct?"_) in under a minute.
3. Hit your result: one of 12 archetypes — The Hook Gremlin, The Dashboard Monk,
   The LinkedIn Philosopher — with a 3-line AI-personalized roast blurb, a
   superpower/kryptonite stat bar, and a 9:16 vertical card sized for screenshots.
4. Tap **Share** — pre-filled captions drop into X, LinkedIn, WhatsApp, or Threads,
   each with a link back to the ConnectsBlue submission.
5. Click over to the **Leaderboard** to see which archetype is most common right
   now — that itself becomes a second shareable stat ("I'm in the rarest 4% — the
   Meme Whisperers").

That's the loop. Voter → taker → sharer → voter.

## What's in the box

- **`/`** — Hero, floating Wrapped-style preview card, live counter, sample
  archetypes, how-it-works strip.
- **`/quiz`** — 10-question diagnostic with per-question progress, auto-advance,
  jump-to-question dots, and `localStorage` recovery if you bail mid-quiz.
- **`/result/[id]`** — The Spotify-Wrapped-style result card, a Claude-generated
  (or hand-written fallback) blurb, superpower/kryptonite/soulmate/nemesis chips,
  share-to-socials buttons with pre-filled captions, "Dare 3 friends" CTA, and
  three nearest-archetype siblings.
- **`/archetypes`** and **`/archetypes/[id]`** — The canon. All 12 types in one
  grid plus a dedicated page each with the canonical blurb, stats, matchups,
  and a shareable card preview.
- **`/leaderboard`** — Live ordered table of archetype distribution, total
  counter, rarest/most-common highlight, and a one-click "copy this stat" button.
- **`/compatibility`** — Dream-team builder. Pick two archetypes, get a
  cosine-similarity + soulmate/nemesis-weighted compatibility score from 12–99
  with a verdict ("Iconic. Frame the retainer." / "Don't put them in the same
  Slack channel.").
- **`/settings`** — Bring-your-own-keys panel. Anthropic, Umami, and the
  ConnectsBlue submission URL. Everything stored in `localStorage`, never
  on our servers.
- **`/about`** — The why, the research (Tickle / Wrapped / TikTok color test
  citations), and what's under the hood.
- **`/api/og?a=<id>`** — Edge-rendered 1080×1920 PNG share card (via `@vercel/og`).
- **`/api/roast`** — Claude Haiku 4.5 personalized blurb generator with a
  deterministic Forer-effect fallback when no key is present.
- **`/api/stats`** — Archetype distribution + POST to bump the live counter.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS** — one codebase,
  edge-rendered OG, standalone Docker output.
- **Anthropic Claude Haiku 4.5** via `/api/roast` for freakishly-accurate 3-line
  blurbs. The user's key is passed in an `x-user-anthropic-key` header from
  `localStorage`; nothing is ever persisted server-side.
- **`@vercel/og`** (Satori under the hood) renders the 9:16 share card at the edge.
- **Seeded in-memory stats store** (`lib/stats-store.ts`) — ships with 1,047
  plausible baseline responses so the leaderboard looks alive on first load.
  Swap the internals for Supabase in five minutes when you want persistence.
- **No database, no auth, no tracking by default.** All answers, last result,
  and API keys live in `localStorage` under `marketerdna_*`. Umami Cloud is
  optional and only kicks in when the user adds an ID in Settings.

## Architecture

```
app/
  layout.tsx           root shell + <AIJudgeNotice />
  page.tsx             landing
  quiz/                10-question flow
  result/[id]/         result screen + share panel
  archetypes/          canon list + detail pages
  leaderboard/         live archetype distribution
  compatibility/       dream-team builder
  settings/            BYO-keys panel
  about/               field notes
  api/
    roast/             POST  -> Claude Haiku 4.5 (falls back to canonical copy)
    stats/             GET   -> distribution; POST -> increment
    og/                GET   -> 1080x1920 PNG share card

components/
  ResultCard.tsx       Spotify-Wrapped-style card (used in /result, /archetypes/[id], and as og source of truth)
  ArchetypeGrid.tsx    grid tiles used in home + archetypes
  SiteHeader / SiteFooter / Toast / LiveCounter / Marquee / DnaGlyph

lib/
  archetypes.ts        the 12 canonical archetypes
  quiz.ts              the 10 questions + scoreAnswers()
  compatibility.ts     cosine-similarity-based dream-team math
  roast.ts             deterministic Forer-effect fallback blurbs
  seedStats.ts         hand-tuned seed distribution (1,047 baseline votes)
  stats-store.ts       in-memory + seed count combiner
  storage.ts           localStorage helpers (keys + answers + last result)
```

## Run it

```bash
npm install
npm run dev
# http://localhost:3000
```

## Docker

Standard Next.js standalone build. The `Dockerfile` copies `public/` and the
standalone server into an alpine runtime, runs as a non-root user, and exposes
port 3000.

```bash
docker build -t app .
docker run -p 3000:3000 app
```

That's the whole thing. No env vars required — the app runs in "demo mode"
out-of-the-box with the hand-written fallback blurbs and the seeded leaderboard.
For live AI blurbs, add an Anthropic key in `/settings` (client-only) or set
`ANTHROPIC_API_KEY` in the server env.

## Why we think this wins

Every other ConnectsBlue submission will be asking for a vote. Marketer DNA
inverts the ask: it hands the voter a piece of identity content they want to
share. The request-for-vote is implicit, the distribution is the voter pool
itself, and the same loop that powered Wrapped now closes in front of the
judge's eyes.

## Credits

Built with a grin by Aryan Choudhary for ConnectsBlue 2026. Archetype names,
questions, and roast blurbs were hand-edited. The research grounding (Tickle,
NFX, Woobox, MBTI virality, Visla's 3×2×2 creative matrix) is summarized in
`/about`.
