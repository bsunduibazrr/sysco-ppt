"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Fish,
  Keyboard,
  Pencil,
  PenTool,
  UtensilsCrossed,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { useRef } from "react";
import { games } from "@/lib/content";
import { webPath } from "@/lib/web";
import SmartImage from "../SmartImage";
import Reveal from "../Reveal";
import TiltCard from "../TiltCard";
import SlideTag from "../SlideTag";

const icons: LucideIcon[] = [Keyboard, UtensilsCrossed, Pencil, Fish];
const tilt = [-2.5, 1.8, -1.2, 2.4];
const offset = ["lg:mt-0", "lg:mt-14", "lg:mt-4", "lg:mt-20"];

export default function Slide3() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const webRotate = useTransform(scrollYProgress, [0, 1], [-20, 30]);
  const bigX = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section
      ref={ref}
      id="slide-3"
      data-theme="dark"
      aria-label="4 тоглоом"
      className="relative flex min-h-[100svh] snap-start items-center overflow-hidden bg-blood"
    >
      <motion.svg
        aria-hidden
        viewBox="0 0 800 800"
        style={{ rotate: webRotate }}
        className="pointer-events-none absolute -right-[20%] -top-[30%] h-[130%] text-ink/30"
      >
        <path
          d={webPath({ cx: 400, cy: 400, radius: 400, spokes: 16, rings: 11 })}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </motion.svg>
      <div className="halftone pointer-events-none absolute inset-0 text-ink/25 [mask-image:linear-gradient(to_bottom,transparent,#000)]" />

      <motion.div
        aria-hidden
        style={{ x: bigX }}
        className="text-outline-soft pointer-events-none absolute -left-6 bottom-[-6%] select-none font-display text-[38vw] font-bold leading-none lg:text-[26vw]"
      >
        04
      </motion.div>

      <div className="relative w-full py-24 lg:pb-8 lg:pt-20">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 md:flex-row md:items-end md:justify-between md:px-10 lg:px-16">
          <div>
            <Reveal>
              <SlideTag
                no={3}
                label="Багууд хоорондын өрсөлдөөн"
                className="text-paper/80"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-[clamp(3.5rem,7vw,6.5rem)] font-bold uppercase leading-[0.82] text-paper">
                <span className="text-spidey [text-shadow:4px_4px_0_#0A0A0C]">
                  4
                </span>{" "}
                тоглоом
              </h2>
            </Reveal>
          </div>
        </div>

        <ul className="no-scrollbar mt-12 flex lg:mt-4 snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-10 pt-4 md:px-10 lg:mx-auto lg:grid lg:max-w-[1400px] lg:grid-cols-4 lg:gap-7 lg:overflow-visible lg:px-16">
          {games.map((g, i) => {
            const Icon = icons[i];
            return (
              <li
                key={g.no}
                className={`w-[78vw] shrink-0 snap-center sm:w-[46vw] lg:w-auto ${offset[i]}`}
              >
                <Reveal delay={i * 0.12} rotate={tilt[i]} y={80}>
                  <TiltCard max={12} scale={1.05} lift={8}>
                    <article
                      className="relative border-[3px] border-ink bg-paper text-ink shadow-comic"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="relative border-b-[3px] border-ink">
                        <SmartImage
                          src={g.image}
                          alt={g.alt}
                          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 78vw object-cover"
                          className="aspect-[4/3] w-full lg:aspect-[16/10]"
                          imgClassName="group-hover:scale-110"
                          tone={i % 2 ? "ink" : "red"}
                        />
                      </div>
                      <span
                        aria-hidden
                        className="absolute -top-6 right-3 font-display text-7xl font-bold leading-none text-spidey [text-shadow:3px_3px_0_#0A0A0C]"
                        style={{ transform: "translateZ(50px)" }}
                      >
                        {g.no}
                      </span>
                      <div
                        className="relative p-5"
                        style={{ transform: "translateZ(24px)" }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="grid h-10 w-10 shrink-0 place-items-center bg-ink text-paper transition-colors duration-300 group-hover:bg-spidey">
                            <Icon className="h-5 w-5" strokeWidth={2.2} />
                          </span>
                          <h3 className="font-display text-3xl font-bold uppercase leading-none">
                            {g.title}
                          </h3>
                        </div>
                        <p className="mt-3 font-body text-sm font-medium leading-snug text-ink/75">
                          {g.text}
                        </p>
                      </div>
                    </article>
                  </TiltCard>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
