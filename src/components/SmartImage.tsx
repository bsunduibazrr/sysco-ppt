"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera } from "lucide-react";
import { webPath } from "@/lib/web";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  tone?: "red" | "ink" | "paper";
};

const tones = {
  red: "bg-blood text-spidey",
  ink: "bg-[#141418] text-spidey/70",
  paper: "bg-[#e6e0d6] text-ink/25",
};

export default function SmartImage({ src, alt, sizes, className = "", imgClassName = "", priority, tone = "ink" }: Props) {
  const [ok, setOk] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`absolute inset-0 ${tones[tone]}`}
        role={ok ? undefined : "img"}
        aria-label={ok ? undefined : alt}
      >
        <div className="halftone absolute inset-0 opacity-40" />
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
          <path
            d={webPath({ cx: 330, cy: 40, radius: 360, spokes: 10, rings: 7 })}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.55"
          />
        </svg>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 font-body text-[10px] tracking-[0.12em] opacity-80">
          <Camera className="h-3.5 w-3.5" strokeWidth={2} />
          <span>{src}</span>
        </div>
      </div>
      {ok && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setOk(false)}
          className={`object-cover transition-transform duration-700 ease-out ${imgClassName}`}
        />
      )}
    </div>
  );
}
