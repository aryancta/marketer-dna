import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-start px-4 py-20 md:px-6">
      <div className="mono text-xs uppercase tracking-widest text-ink/60">404 · misrouted campaign</div>
      <h1 className="display mt-2 text-5xl md:text-7xl">This page flopped.</h1>
      <p className="mt-3 text-ink/70">
        The page you're looking for didn't test well with audiences. Try one of these
        instead.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link className="rounded-lg border-2 border-ink bg-lime px-4 py-2 text-sm font-semibold hard-shadow-sm" href="/">
          Home
        </Link>
        <Link className="rounded-lg border-2 border-ink bg-bone px-4 py-2 text-sm font-semibold hard-shadow-sm" href="/quiz">
          Take the quiz
        </Link>
        <Link className="rounded-lg border-2 border-ink bg-bone px-4 py-2 text-sm font-semibold hard-shadow-sm" href="/archetypes">
          All archetypes
        </Link>
      </div>
    </div>
  );
}
