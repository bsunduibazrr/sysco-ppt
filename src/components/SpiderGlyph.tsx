type Props = {
  className?: string;
};

export default function SpiderGlyph({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden fill="currentColor">
      <g stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 30 18 19 11 24" />
        <path d="M27 34 13 30 6 37" />
        <path d="M27 38 14 43 9 53" />
        <path d="M29 42 21 51 19 61" />
        <path d="M36 30 46 19 53 24" />
        <path d="M37 34 51 30 58 37" />
        <path d="M37 38 50 43 55 53" />
        <path d="M35 42 43 51 45 61" />
      </g>
      <ellipse cx="32" cy="38" rx="6.5" ry="9.5" />
      <circle cx="32" cy="25.5" r="5" />
      <path d="M29.6 34.5 32 31l2.4 3.5L32 44Z" fill="#0A0A0C" opacity="0.45" />
    </svg>
  );
}
