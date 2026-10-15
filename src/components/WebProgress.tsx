"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import SpiderGlyph from "./SpiderGlyph";

export default function WebProgress() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const top = useTransform(p, [0, 1], ["0%", "100%"]);
  const sway = useTransform(p, (v) => Math.sin(v * Math.PI * 7) * 14);

  return (
    <div aria-hidden className="pointer-events-none fixed right-5 top-[18vh] z-40 hidden h-[64vh] w-6 md:block lg:right-8">
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-paper/10" />
      <motion.div
        className="absolute left-1/2 top-0 w-px -translate-x-1/2 origin-top bg-spidey shadow-[1px_0_0_#0A0A0C]"
        style={{ height: top }}
      />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <span
          key={i}
          className="absolute left-1/2 h-px w-2.5 -translate-x-1/2 bg-paper/30"
          style={{ top: `${(i / 6) * 100}%` }}
        />
      ))}
      <motion.div className="absolute left-1/2 -ml-3 -mt-2" style={{ top, rotate: sway }}>
        <SpiderGlyph className="h-6 w-6 text-spidey drop-shadow-[0_0_1.5px_#0A0A0C]" />
      </motion.div>
    </div>
  );
}
