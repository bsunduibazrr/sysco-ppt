"use client";

import { useEffect, useRef } from "react";

const anchors = [
  [0, 0.08],
  [0.22, 0],
  [0.58, 0],
  [1, 0.12],
  [1, 0.62],
  [0.82, 1],
  [0.36, 1],
  [0, 0.74],
];

export default function WebStrands({ className = "" }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const pth = path.current;
    if (!el || !pth) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = el.clientWidth;
    let h = el.clientHeight;
    let tx = w * 0.62;
    let ty = h * 0.45;
    let hx = tx;
    let hy = ty;
    let raf = 0;
    let visible = true;

    const draw = () => {
      let d = "";
      const pts = anchors.map(([ax, ay]) => [ax * w, ay * h]);
      for (const [x, y] of pts) d += `M${x.toFixed(1)} ${y.toFixed(1)}L${hx.toFixed(1)} ${hy.toFixed(1)}`;
      for (const t of [0.22, 0.42, 0.62, 0.8]) {
        const ring = pts.map(([x, y]) => [hx + (x - hx) * t, hy + (y - hy) * t]);
        d += `M${ring[0][0].toFixed(1)} ${ring[0][1].toFixed(1)}`;
        for (let i = 1; i <= ring.length; i++) {
          const a = ring[i - 1];
          const b = ring[i % ring.length];
          const mx = (a[0] + b[0]) / 2 + (hx - (a[0] + b[0]) / 2) * 0.1;
          const my = (a[1] + b[1]) / 2 + (hy - (a[1] + b[1]) / 2) * 0.1;
          d += `Q${mx.toFixed(1)} ${my.toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
        }
      }
      pth.setAttribute("d", d);
    };

    const tick = () => {
      hx += (tx - hx) * 0.06;
      hy += (ty - hy) * 0.06;
      draw();
      if (visible && (Math.abs(tx - hx) > 0.3 || Math.abs(ty - hy) > 0.3)) raf = requestAnimationFrame(tick);
      else raf = 0;
    };

    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (reduce) return;
      const r = el.getBoundingClientRect();
      tx = w * 0.62 + (e.clientX - r.left - w * 0.62) * 0.35;
      ty = h * 0.45 + (e.clientY - r.top - h * 0.45) * 0.35;
      kick();
    };

    const onResize = () => {
      w = el.clientWidth;
      h = el.clientHeight;
      tx = hx = w * 0.62;
      ty = hy = h * 0.45;
      draw();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });

    draw();
    io.observe(el);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={wrap} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <svg className="h-full w-full">
        <path ref={path} fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}
