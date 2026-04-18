export function DnaGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="8" fill="#0A0A0A" />
      <g stroke="#D8FF3E" strokeWidth="2.5" strokeLinecap="round">
        <path d="M10 9 C 22 15, 18 25, 30 31" />
        <path d="M30 9 C 18 15, 22 25, 10 31" />
      </g>
      <g fill="#FF3D7F">
        <circle cx="10" cy="9" r="2" />
        <circle cx="30" cy="9" r="2" />
        <circle cx="10" cy="31" r="2" />
        <circle cx="30" cy="31" r="2" />
      </g>
    </svg>
  );
}
