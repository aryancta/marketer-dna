import Link from "next/link";
import { DnaGlyph } from "./DnaGlyph";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-bone/85 backdrop-blur supports-[backdrop-filter]:bg-bone/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <DnaGlyph className="h-7 w-7" />
          <span className="display text-lg tracking-tight">
            Marketer<span className="text-hot">.</span>DNA
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          <NavLink href="/quiz" label="Take the quiz" highlight />
          <NavLink href="/leaderboard" label="Leaderboard" />
          <NavLink href="/archetypes" label="Archetypes" />
          <NavLink href="/about" label="About" />
          <NavLink href="/settings" label="Settings" />
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, label, highlight }: { href: string; label: string; highlight?: boolean }) {
  if (highlight) {
    return (
      <Link
        href={href}
        className="ml-1 rounded-md border-2 border-ink bg-lime px-3 py-1.5 text-ink hover:-translate-y-0.5 hard-shadow-sm transition-all duration-150"
      >
        {label}
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className="hidden rounded-md px-3 py-1.5 text-ink/80 hover:bg-ink hover:text-bone md:inline-block"
    >
      {label}
    </Link>
  );
}
