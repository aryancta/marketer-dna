import Link from "next/link";

export const metadata = {
  title: "About · Marketer DNA",
  description: "Why we built Marketer DNA, and the viral loop behind it.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-20">
      <div className="mono text-xs uppercase tracking-widest text-ink/60">Field notes</div>
      <h1 className="display mt-1 text-4xl md:text-6xl">
        Why a quiz, and why for marketers?
      </h1>

      <div className="prose prose-neutral mt-6 max-w-none text-ink/85">
        <p>
          ConnectsBlue is a popularity-vote hackathon. 1,000+ marketers each submit a
          single digital asset, and winners are decided purely by how many real people
          stop, react, share, and vote. There's no judging rubric beyond the crowd, and
          the crowd is the other marketers. So we asked the only useful question:{" "}
          <em>what's the one piece of content every marketer would voluntarily
          broadcast to their entire professional network?</em>
        </p>
        <p>
          Answer: a flattering-but-funny identity test about themselves. Tickle hit
          150M users with a personality quiz. 16Personalities is a cultural staple.
          Spotify Wrapped had{" "}
          <strong>over 200 million users interact in the first 24 hours of 2025</strong>{" "}
          for the same reason — <em>self-disclosure activates the same dopamine
          circuitry as food and money</em>, per Harvard research. We simply ported
          that mechanic into the marketer-identity space.
        </p>
        <p>
          Marketer DNA is 10 forced-choice questions, 12 archetypes engineered to
          flatter 90% of the time, and a Spotify-Wrapped-style result card sized for
          Instagram Stories and LinkedIn screenshots. Every share pre-fills a caption
          with a backlink to our ConnectsBlue submission — turning every voter into a
          distributor. That's the Dropbox / PayPal / Wrapped loop in a hackathon bottle.
        </p>

        <h2 className="display mt-10 text-2xl">What's under the hood</h2>
        <ul>
          <li>Next.js 14 (App Router), Tailwind, TypeScript — one codebase, fully static-first.</li>
          <li>Claude Haiku 4.5 generates the 3-line personalized roast blurb from the answer fingerprint. Keyless demo mode falls back to hand-written blurbs that are still freakishly accurate (the Forer effect rated at 84–87% accurate in research).</li>
          <li>@vercel/og renders 1080×1920 share-card PNGs at the edge, screenshot-perfect.</li>
          <li>A small in-memory stats store (seeded with 1,047 fake-but-plausible responses) powers the live leaderboard. Plug in Supabase in <code>lib/stats-store.ts</code> for production.</li>
          <li>No logins. No personal data. Everything lives in <code>localStorage</code>.</li>
        </ul>

        <h2 className="display mt-10 text-2xl">Why we think this wins</h2>
        <p>
          Every other hackathon submission will be asking for a vote. Marketer DNA
          inverts the ask: it hands the voter a piece of identity content they want
          to share. The ask is implicit. That's the loop.
        </p>

        <div className="not-prose mt-8 flex flex-wrap gap-3">
          <Link
            href="/quiz"
            className="rounded-lg border-2 border-ink bg-ink px-5 py-3 text-base font-semibold text-bone hover:-translate-y-0.5 hard-shadow"
          >
            Start the quiz →
          </Link>
          <Link
            href="/leaderboard"
            className="rounded-lg border-2 border-ink bg-bone px-5 py-3 text-base font-semibold hover:-translate-y-0.5 hard-shadow-sm"
          >
            See the leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}
