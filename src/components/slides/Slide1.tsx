"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Bookmark, UserRound } from "lucide-react";
import { useEffect } from "react";
import HeroVisual from "../HeroVisual";
import WebStrands from "../WebStrands";
import WebCorner from "../WebCorner";
import { scrollToSlide } from "../Navbar";

const word = "SYSCOTECH".split("");

export default function Slide1() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const titleX = useTransform(sx, (v) => v * -14);
  const titleY = useTransform(sy, (v) => v * -10);
  const stickerX = useTransform(sx, (v) => v * 22);
  const stickerY = useTransform(sy, (v) => v * 16);
  const panelX = useTransform(sx, (v) => v * 8);

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
    <section id="slide-1" data-theme="dark" aria-label="Нүүр слайд" className="relative flex min-h-[100svh] snap-start items-center overflow-hidden bg-ink">
      <WebStrands className="text-paper/[0.07]" />
      <div className="halftone halftone-fade pointer-events-none absolute -left-10 bottom-0 h-[60%] w-[55%] rotate-180 text-blood/70" />
      <WebCorner corner="tr" size={260} className="text-paper/15" />

      <div className="absolute inset-y-0 right-0 w-full opacity-60 md:w-[62%] md:opacity-100">
        <div className="absolute right-[-12%] top-1/2 aspect-square w-[115%] -translate-y-1/2 md:right-[-6%] md:w-[95%]">
          <div className="absolute inset-[18%] rounded-full bg-spidey/20 blur-3xl" />
          <HeroVisual />
        </div>
      </div>

      <div className="relative z-10 w-full px-5 pb-24 pt-28 md:px-10 lg:px-16">
        <motion.p
          className="mb-4 flex items-center gap-3 font-body text-[11px] font-bold uppercase tracking-[0.35em] text-spidey"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="h-px w-10 bg-spidey" />
          Их сургуулийн клуб
        </motion.p>

        <div className="relative inline-block">
          <motion.h1
            style={{ x: titleX, y: titleY }}
            className="font-display text-[clamp(4.2rem,15vw,14rem)] font-bold uppercase leading-[0.8] tracking-[-0.01em] text-paper"
            aria-label="Syscotech клуб"
          >
            <span aria-hidden className="flex overflow-hidden pb-2">
              {word.map((l, i) => (
                <motion.span
                  key={i}
                  className={i >= 4 && i <= 5 ? "text-spidey" : undefined}
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {l}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.div
            aria-hidden
            style={{ x: stickerX, y: stickerY }}
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: -7 }}
            transition={{ delay: 1, type: "spring", stiffness: 220, damping: 12 }}
            whileHover={{ scale: 1.12, rotate: 3 }}
            className="absolute -bottom-6 right-[-4%] border-[3px] border-ink bg-spidey px-4 py-1 font-display text-[clamp(1.8rem,4.6vw,4.2rem)] font-bold uppercase leading-none text-paper shadow-[5px_5px_0_0_#F4F1EC] md:-bottom-8"
          >
            клуб
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-12 max-w-md font-body text-lg font-semibold leading-snug text-paper/85 md:mt-16 md:text-2xl"
        >
          Идэвхгүй гишүүдэд зориулсан
          <br />
          <span className="text-paper">танилцуулга</span>
        </motion.p>

        <motion.div
          style={{ x: panelX }}
          initial={{ opacity: 0, y: 40, rotate: 6 }}
          animate={{ opacity: 1, y: 0, rotate: 2 }}
          transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 w-fit"
        >
          <motion.dl
            whileHover={{ scale: 1.04, rotate: -1 }}
            className="relative grid gap-2 border-[3px] border-ink bg-paper px-5 py-4 font-body text-ink shadow-comic-red"
          >
            <span aria-hidden className="absolute -left-2 -top-2 h-4 w-4 bg-suit" />
            <div className="flex items-center gap-3">
              <UserRound className="h-4 w-4 text-spidey" strokeWidth={2.5} />
              <dt className="text-xs font-bold uppercase tracking-widest text-ink/60">Нэр</dt>
              <dd className="font-display text-xl font-semibold uppercase">[НЭРЭЭ БИЧ]</dd>
            </div>
            <div className="flex items-center gap-3">
              <Bookmark className="h-4 w-4 text-spidey" strokeWidth={2.5} />
              <dt className="text-xs font-bold uppercase tracking-widest text-ink/60">Гарчиг</dt>
              <dd className="font-display text-xl font-semibold uppercase">[ГАРЧИГ]</dd>
            </div>
          </motion.dl>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToSlide("slide-2")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        whileHover={{ scale: 1.08 }}
        className="absolute bottom-6 left-5 z-10 flex items-center gap-3 font-body text-[11px] font-bold uppercase tracking-[0.3em] text-paper/70 hover:text-paper md:left-10 lg:left-16"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-9 w-9 place-items-center rounded-full border border-paper/40"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
        Доош гүйлгэ
      </motion.button>

      <div aria-hidden className="absolute bottom-6 right-6 z-10 hidden font-display text-sm tracking-[0.3em] text-paper/40 md:block lg:right-20">
        01 / 07
      </div>
    </section>
  );
}
