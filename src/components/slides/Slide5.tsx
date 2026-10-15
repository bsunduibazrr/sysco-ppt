"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Atom, Clock3, Route, Thermometer, Triangle, type LucideIcon } from "lucide-react";
import { projects } from "@/lib/content";
import Reveal from "../Reveal";
import TiltCard from "../TiltCard";
import TornEdge from "../TornEdge";
import SlideTag from "../SlideTag";

const looks: { icon: LucideIcon; shell: string; chip: string; btn: string; rotate: number }[] = [
  { icon: Clock3, shell: "bg-ink text-paper shadow-comic-red", chip: "border-paper/40", btn: "bg-spidey text-paper", rotate: -1.5 },
  { icon: Thermometer, shell: "bg-spidey text-paper shadow-comic", chip: "border-paper/60", btn: "bg-ink text-paper", rotate: 1.5 },
];

const stack: { icon: LucideIcon; label: string }[] = [
  { icon: Atom, label: "React" },
  { icon: Triangle, label: "Next.js" },
];

function RoadmapLines() {
  const draw = {
    hidden: { pathLength: 0 },
    show: (i: number) => ({ pathLength: 1, transition: { duration: 1.4, delay: 0.3 + i * 0.25, ease: "easeInOut" } }),
  };
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block">
      <motion.path
        d="M22 50 C 34 50, 34 22, 46 22"
        fill="none"
        stroke="#0A0A0C"
        strokeWidth="3"
        strokeDasharray="1 8"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        variants={draw}
        custom={0}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      />
      <motion.path
        d="M22 50 C 36 50, 36 78, 52 78"
        fill="none"
        stroke="#E62429"
        strokeWidth="3"
        strokeDasharray="1 8"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        variants={draw}
        custom={1}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      />
    </svg>
  );
}

export default function Slide5() {
  return (
    <section id="slide-5" data-theme="light" aria-label="Хөгжүүлэлтийн таск" className="relative flex min-h-[100svh] snap-start items-center overflow-hidden bg-paper text-ink">
      <TornEdge className="text-ink" />
      <div className="halftone pointer-events-none absolute -right-20 top-0 h-full w-1/2 text-ink/[0.08]" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-24 md:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SlideTag no={5} label="Next.js, React" className="text-spidey" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display text-[clamp(2.6rem,5.4vw,5rem)] font-bold uppercase leading-[0.95]">
                Хөгжүүлэлтийн
                <br />
                <span className="text-spidey">таск</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-5">
            <p className="border-l-4 border-spidey pl-4 font-body text-base font-semibold leading-snug text-ink/80 md:text-lg">
              roadmap.sh-ээс хүссэн feature-ээ сонгоод
              <br />
              Next, React JS ашиглан хөгжүүлсэн.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-12 flex flex-col gap-10 lg:mt-6 lg:block lg:h-[500px]">
          <RoadmapLines />

          <div className="absolute bottom-0 left-6 top-0 w-px border-l-2 border-dashed border-ink/30 lg:hidden" aria-hidden />

          <div className="relative lg:absolute lg:left-0 lg:top-1/2 lg:flex lg:w-[22%] lg:-translate-y-1/2 lg:justify-end">
            <Reveal x={-30} y={0}>
              <motion.div whileHover={{ scale: 1.06, rotate: -2 }} className="relative inline-flex items-center gap-3 border-[3px] border-ink bg-paper px-4 py-3 shadow-comic">
                <span className="relative grid h-10 w-10 place-items-center bg-ink text-paper">
                  <Route className="h-5 w-5" />
                  <motion.span
                    aria-hidden
                    className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-spidey"
                    animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                </span>
                <span className="font-display text-2xl font-bold">roadmap.sh</span>
              </motion.div>
            </Reveal>
          </div>

          {projects.map((p, i) => {
            const look = looks[i];
            const Icon = look.icon;
            const pos = i === 0 ? "lg:top-0" : "lg:bottom-0";
            return (
              <Reveal key={p.title} delay={0.4 + i * 0.2} rotate={look.rotate} y={60} className={`relative pl-12 lg:absolute lg:left-[46%] lg:w-[48%] lg:pl-0 xl:w-[42%] ${pos} ${i === 1 ? "lg:left-[52%]" : ""}`}>
                <TiltCard max={9} scale={1.04} lift={14}>
                  <article className={`relative border-[3px] border-ink p-5 md:p-6 ${look.shell}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-12 w-12 place-items-center border-2 border-current">
                          <Icon className="h-6 w-6" strokeWidth={2.2} />
                        </span>
                        <h3 className="font-display text-4xl font-bold uppercase leading-none">{p.title}</h3>
                      </div>
                      <span aria-hidden className="font-display text-5xl font-bold leading-none opacity-25">0{i + 1}</span>
                    </div>
                    <p className="mt-4 max-w-sm font-body text-sm font-semibold leading-snug opacity-85 md:text-base">{p.text}</p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <ul className="flex gap-2">
                        {stack.map((s) => {
                          const SIcon = s.icon;
                          return (
                            <li key={s.label} className={`flex items-center gap-1.5 border px-2.5 py-1 font-body text-xs font-bold ${look.chip}`}>
                              <SIcon className="h-3.5 w-3.5" />
                              {s.label}
                            </li>
                          );
                        })}
                      </ul>
                      <motion.a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.08, x: 4 }}
                        whileTap={{ scale: 0.96 }}
                        className={`inline-flex items-center gap-2 border-2 border-ink px-5 py-2.5 font-display text-lg font-bold uppercase ${look.btn}`}
                        aria-label={`${p.title} project-ийг шинэ цонхонд үзэх`}
                      >
                        Үзэх
                        <ArrowUpRight className="h-5 w-5" />
                      </motion.a>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
