import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t-2 border-ink bg-ink text-bone">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <div className="display text-lg tracking-tight">
            Marketer<span className="text-lime">.</span>DNA
          </div>
          <p className="mt-1 max-w-md text-sm text-bone/70">
            A 60-second quiz built for ConnectsBlue. 12 archetypes. 10 questions. Zero
            attribution dashboards were harmed in the making.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <Link href="/quiz" className="underline decoration-lime underline-offset-4 hover:text-lime">
            Take the quiz
          </Link>
          <Link href="/leaderboard" className="underline decoration-lime underline-offset-4 hover:text-lime">
            Leaderboard
          </Link>
          <Link href="/archetypes" className="underline decoration-lime underline-offset-4 hover:text-lime">
            Archetypes
          </Link>
          <Link href="/about" className="underline decoration-lime underline-offset-4 hover:text-lime">
            About
          </Link>
          <Link href="/settings" className="underline decoration-lime underline-offset-4 hover:text-lime">
            Settings
          </Link>
        </div>
      </div>
      <div className="border-t border-bone/10 px-4 py-3 text-center text-xs text-bone/50 md:px-6">
        Built with a grin for ConnectsBlue · © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
