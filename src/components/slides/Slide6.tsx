"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Compass, Heart, House, Quote, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { thoughts } from "@/lib/content";
import { webPath } from "@/lib/web";
import CrewWeb from "../CrewWeb";
import Reveal from "../Reveal";
import TiltCard from "../TiltCard";
import SlideTag from "../SlideTag";
import SpiderGlyph from "../SpiderGlyph";

const bubbles: {
  icon: LucideIcon;
  shift: string;
  rotate: number;
  tail: string;
}[] = [
  { icon: Heart, shift: "lg:ml-0", rotate: -2, tail: "left-10" },
  { icon: House, shift: "lg:ml-20", rotate: 1.5, tail: "left-1/2" },
  { icon: Compass, shift: "lg:ml-6", rotate: -1, tail: "right-12" },
];

export default function Slide6() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 16 });
  const thread = useTransform(smooth, [0, 0.5, 1], [60, 300, 160]);
  const spin = useTransform(smooth, [0, 0.5, 1], [-18, 0, 14]);
  const bgY = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const photoY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      id="slide-6"
      data-theme="red"
      aria-label="Клубийн талаарх миний бодол"
      className="relative flex min-h-[100svh] snap-start items-center overflow-hidden bg-spidey"
    >
      <motion.svg
        aria-hidden
        viewBox="0 0 800 800"
        style={{ y: bgY }}
        className="pointer-events-none absolute -left-[15%] top-[-20%] h-[140%] text-ink/25"
      >
        <path
          d={webPath({ cx: 400, cy: 400, radius: 400, spokes: 18, rings: 12 })}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </motion.svg>
      <div className="halftone-lg pointer-events-none absolute inset-0 text-blood/50 [mask-image:radial-gradient(circle_at_80%_70%,#000,transparent_65%)]" />

      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-0 z-20 hidden md:block"
      >
        <motion.div className="w-px bg-ink" style={{ height: thread }} />
        <motion.div className="-ml-[26px] -mt-1" style={{ rotate: spin }}>
          <motion.div
            animate={{ rotate: [-6, 6, -6] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "50% 0%" }}
          >
            <SpiderGlyph className="h-[52px] w-[52px] rotate-180 text-ink" />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-14 px-5 py-24 md:px-10 lg:grid-cols-12 lg:gap-10 lg:px-16 lg:py-16">
        <motion.div style={{ y: photoY }} className="relative mx-auto w-full max-w-[400px] lg:col-span-5">
          <Reveal rotate={-3} x={-50}>
            <TiltCard max={7} scale={1.03}>
              <figure className="relative border-4 border-ink bg-paper p-3 pb-14 shadow-comic-lg">
                <CrewWeb />

                <Heart className="absolute bottom-4 right-4 h-6 w-6 fill-spidey text-spidey" />
              </figure>
            </TiltCard>
          </Reveal>
          <span
            aria-hidden
            className="absolute -right-3 -top-3 h-10 w-24 rotate-12 bg-paper/80 shadow-sm"
          />
        </motion.div>

        <div className="relative lg:col-span-7">
          <Reveal>
            <SlideTag
              no={6}
              label="Клубийн талаарх миний бодол"
              className="text-ink"
            />
          </Reveal>
          <Quote aria-hidden className="mt-4 h-10 w-10 fill-ink text-ink lg:mt-3" />

          <ul className="mt-4 flex flex-col gap-6">
            {thoughts.map((t, i) => {
              const b = bubbles[i];
              const Icon = b.icon;
              return (
                <li key={t} className={b.shift}>
                  <Reveal
                    delay={0.15 + i * 0.18}
                    rotate={b.rotate}
                    x={i % 2 ? 60 : -60}
                    y={0}
                  >
                    <motion.blockquote
                      whileHover={{ scale: 1.04, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 16,
                      }}
                      className="relative w-fit max-w-[40rem] border-[3px] border-ink bg-paper px-5 py-4 text-ink shadow-comic md:px-7 md:py-5"
                    >
                      <p className="flex items-start gap-3 font-display text-[clamp(1.4rem,2.5vw,2.3rem)] font-semibold uppercase leading-[1.02]">
                        <Icon
                          aria-hidden
                          className="mt-1 h-6 w-6 shrink-0 text-spidey md:h-8 md:w-8"
                          strokeWidth={2.5}
                        />
                        <span>{t}</span>
                      </p>
                      <svg
                        aria-hidden
                        viewBox="0 0 40 24"
                        className={`absolute -bottom-[21px] h-6 w-10 ${b.tail}`}
                      >
                        <path
                          d="M2 0 L20 22 L30 0"
                          fill="#F4F1EC"
                          stroke="#0A0A0C"
                          strokeWidth="3"
                          strokeLinejoin="round"
                        />
                        <path d="M5 1.5 H28" stroke="#F4F1EC" strokeWidth="4" />
                      </svg>
                    </motion.blockquote>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
