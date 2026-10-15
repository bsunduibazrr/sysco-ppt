"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect } from "react";
import { webPath } from "@/lib/web";
import SpiderGlyph from "../SpiderGlyph";
import WebCorner from "../WebCorner";
import { scrollToSlide } from "../Navbar";

const lines = [
  { text: "Анхаарал", cls: "text-paper" },
  { text: "тавьсанд", cls: "text-outline-red" },
  { text: "баярлалаа", cls: "text-spidey" },
];

export default function Slide7() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });
  const rotY = useTransform(sx, (v) => v * 6);
  const rotX = useTransform(sy, (v) => v * -5);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <section id="slide-7" data-theme="dark" aria-label="Баярлалаа" className="relative flex min-h-[100svh] snap-start flex-col justify-center overflow-hidden bg-ink">
      <WebCorner corner="tr" size={320} className="text-paper/15" />
      <WebCorner corner="bl" size={260} className="text-spidey/25" />
      <div className="halftone halftone-fade pointer-events-none absolute inset-0 text-blood/40" />

      <div aria-hidden className="pointer-events-none absolute left-[62%] top-0 z-20 md:left-[70%]">
        <motion.div
          style={{ transformOrigin: "50% 0%" }}
          animate={{ rotate: [16, -16, 16] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="h-[22vh] w-px bg-paper/60 md:h-[28vh]" />
          <svg viewBox="0 0 120 120" className="-mt-2 h-24 w-24 text-paper/50 md:h-32 md:w-32">
            <path d={webPath({ cx: 60, cy: 60, radius: 56, spokes: 10, rings: 5 })} fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
          <SpiderGlyph className="-mt-20 h-12 w-12 text-spidey md:-mt-24 md:h-14 md:w-14" />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pt-28 md:px-10 lg:px-16" style={{ perspective: 1200 }}>
        <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} style={{ rotateY: rotY, rotateX: rotX }} className="font-display text-[clamp(3.6rem,12.5vw,13rem)] font-bold uppercase leading-[0.86]">
          {lines.map((l, i) => (
            <span key={l.text} className={`block overflow-hidden ${i === 1 ? "md:pl-[12%]" : i === 2 ? "md:pl-[4%]" : ""}`}>
              <motion.span
                className={`block ${l.cls}`}
                variants={{
                  hidden: { y: "110%", rotate: 4 },
                  show: { y: "0%", rotate: 0, transition: { duration: 1, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                {l.text}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 flex flex-col gap-6 md:ml-auto md:mt-10 md:w-fit md:flex-row md:items-center md:gap-10"
        >
          <p className="font-display text-2xl font-semibold uppercase leading-tight text-paper md:text-4xl">
            Syscotech-д нэгдэхэд
            <br />
            <span className="text-spidey">бэлэн үү?</span>
          </p>
          <motion.button
            type="button"
            onClick={() => scrollToSlide("slide-1")}
            whileHover={{ scale: 1.08, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex w-fit items-center gap-3 border-[3px] border-paper bg-spidey px-6 py-4 font-display text-xl font-bold uppercase text-paper shadow-[6px_6px_0_0_#F4F1EC] transition-shadow hover:shadow-[9px_9px_0_0_#1B3A8A]"
          >
            Эхнээс нь харах
            <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
          </motion.button>
        </motion.div>
      </div>

      <footer className="relative z-10 mx-auto mt-16 flex w-full max-w-[1500px] items-center justify-between px-5 pb-6 font-body text-[11px] font-bold uppercase tracking-[0.3em] text-paper/40 md:px-10 lg:px-16">
        <span>Syscotech клуб</span>
        <span>07 / 07</span>
      </footer>
    </section>
  );
}
