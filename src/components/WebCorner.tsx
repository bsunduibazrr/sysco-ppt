import { webPath } from "@/lib/web";

type Props = {
  corner?: "tl" | "tr" | "bl" | "br";
  size?: number;
  className?: string;
  strokeWidth?: number;
};

const angles = {
  tl: [0, Math.PI / 2],
  tr: [Math.PI / 2, Math.PI],
  br: [Math.PI, Math.PI * 1.5],
  bl: [Math.PI * 1.5, Math.PI * 2],
} as const;

const origin = {
  tl: [0, 0],
  tr: [200, 0],
  br: [200, 200],
  bl: [0, 200],
} as const;

const place = {
  tl: "left-0 top-0",
  tr: "right-0 top-0",
  br: "right-0 bottom-0",
  bl: "left-0 bottom-0",
};

export default function WebCorner({ corner = "tl", size = 220, className = "", strokeWidth = 1.2 }: Props) {
  const [start, end] = angles[corner];
  const [cx, cy] = origin[corner];
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`pointer-events-none absolute ${place[corner]} ${className}`}
    >
      <path
        d={webPath({ cx, cy, radius: 200, spokes: 6, rings: 6, start, end, sag: 0.18 })}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
