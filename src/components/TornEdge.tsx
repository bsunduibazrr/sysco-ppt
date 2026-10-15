type Props = {
  className?: string;
  flip?: boolean;
};

function tornPath() {
  let s = 17;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  let x = 1440;
  let d = "M0 0H1440V22";
  while (x > 0) {
    x = Math.max(0, x - (16 + rand() * 34));
    d += `L${x.toFixed(0)} ${(10 + rand() * 30).toFixed(0)}`;
  }
  return `${d}L0 0Z`;
}

const d = tornPath();

export default function TornEdge({ className = "", flip }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute left-0 z-10 h-6 w-full md:h-10 ${flip ? "bottom-0 rotate-180" : "top-0"} ${className}`}
    >
      <path fill="currentColor" d={d} />
    </svg>
  );
}
