export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const list = [...items, ...items];
  return (
    <div className={`overflow-hidden border-y-2 border-ink bg-ink text-bone ${className}`}>
      <div className="flex w-max animate-marquee whitespace-nowrap py-2">
        {list.map((it, i) => (
          <span key={i} className="mx-6 inline-flex items-center gap-3 text-sm font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
