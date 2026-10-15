"use client";

import { motion } from "framer-motion";
import { webPath } from "@/lib/web";
import SyscoLogo from "./SyscoLogo";

const cx = 200;
const cy = 250;

const ring = (count: number, r: number, offset: number) =>
  Array.from({ length: count }, (_, i) => {
    const a = offset + (i / count) * Math.PI * 2;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.92 };
  });

const inner = ring(5, 100, -Math.PI / 2);
const outer = ring(7, 165, -Math.PI / 2 + 0.45);
const red = new Set([2, 8]);

const f = (n: number) => n.toFixed(1);
const sag = (a: { x: number; y: number }, b: { x: number; y: number }, k = 0.14) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  return `M${f(a.x)} ${f(a.y)}Q${f(mx + (cx - mx) * k)} ${f(my + (cy - my) * k)} ${f(b.x)} ${f(b.y)}`;
};

const nearest = (p: { x: number; y: number }, list: { x: number; y: number }[], n: number) =>
  [...list].sort((a, b) => Math.hypot(a.x - p.x, a.y - p.y) - Math.hypot(b.x - p.x, b.y - p.y)).slice(0, n);

const strands = [
  ...inner.map((p) => `M${cx} ${cy}L${f(p.x)} ${f(p.y)}`),
  ...inner.map((p, i) => sag(p, inner[(i + 1) % inner.length])),
  ...outer.flatMap((p) => nearest(p, inner, 2).map((q) => `M${f(q.x)} ${f(q.y)}L${f(p.x)} ${f(p.y)}`)),
  ...outer.map((p, i) => sag(p, outer[(i + 1) % outer.length], 0.08)),
];

const members = [...inner, ...outer];

export default function CrewWeb() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink" role="img" aria-label="Клубийн гишүүд нэг тороор холбогдсон дүрслэл">
      <div className="halftone absolute inset-0 text-spidey/15" />
      <motion.svg
        viewBox="0 0 400 500"
        className="absolute inset-0 h-full w-full"
        aria-hidden
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <path
          d={webPath({ cx, cy, radius: 330, spokes: 14, rings: 9 })}
          fill="none"
          stroke="#F4F1EC"
          strokeOpacity="0.07"
          strokeWidth="1"
        />

        <motion.g variants={{ show: { transition: { staggerChildren: 0.035 } } }}>
          {strands.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke={i < inner.length ? "#E62429" : "#F4F1EC"}
              strokeOpacity={i < inner.length ? 0.9 : 0.45}
              strokeWidth={i < inner.length ? 2 : 1.2}
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0 },
                show: { pathLength: 1, transition: { duration: 0.9, ease: "easeInOut" } },
              }}
            />
          ))}
        </motion.g>

        {members.map((p, i) => {
          const hot = red.has(i);
          return (
            <motion.g
              key={i}
              variants={{
                hidden: { scale: 0, opacity: 0 },
                show: {
                  scale: 1,
                  opacity: 1,
                  transition: { delay: 0.6 + i * 0.06, type: "spring", stiffness: 300, damping: 14 },
                },
              }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <motion.g
                animate={{ y: [0, i % 2 ? -5 : 5, 0] }}
                transition={{ duration: 3 + (i % 4) * 0.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.g
                  whileHover={{ scale: 1.35 }}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  data-cursor
                >
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={i < inner.length ? 17 : 14}
                    fill={hot ? "#E62429" : "#F4F1EC"}
                    stroke="#0A0A0C"
                    strokeWidth="3"
                  />
                  <circle cx={p.x} cy={p.y - 4} r={i < inner.length ? 4.6 : 3.8} fill={hot ? "#F4F1EC" : "#0A0A0C"} />
                  <path
                    d={`M${f(p.x - 8)} ${f(p.y + 9)}Q${f(p.x)} ${f(p.y - 2)} ${f(p.x + 8)} ${f(p.y + 9)}Z`}
                    fill={hot ? "#F4F1EC" : "#0A0A0C"}
                  />
                </motion.g>
              </motion.g>
            </motion.g>
          );
        })}
      </motion.svg>

      <div className="absolute left-1/2 top-[50%] w-[27%] -translate-x-1/2 -translate-y-1/2">
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border-2 border-spidey"
          animate={{ scale: [1, 1.45], opacity: [0.8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 13 }}
          whileHover={{ scale: 1.1, rotate: 12 }}
        >
          <SyscoLogo sizes="120px" className="aspect-square w-full ring-[3px] ring-spidey" />
        </motion.div>
      </div>
    </div>
  );
}
