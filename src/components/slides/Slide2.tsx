"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Camera, Gamepad2, Users } from "lucide-react";
import { useRef } from "react";
import SmartImage from "../SmartImage";
import Reveal from "../Reveal";
import TiltCard from "../TiltCard";
import TornEdge from "../TornEdge";
import SlideTag from "../SlideTag";
import WebCorner from "../WebCorner";

function Burst({ className = "" }: { className?: string }) {
  const pts = Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * Math.PI * 2;
    const r = i % 2 ? 38 : 50;
    return `${(50 + Math.cos(a) * r).toFixed(1)},${(50 + Math.sin(a) * r).toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <polygon
        points={pts}
        fill="currentColor"
        stroke="#0A0A0C"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Slide2() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const panelY = useTransform(scrollYProgress, [0, 1], [130, -110]);
  const panelY2 = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const dotsY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section
      ref={ref}
      id="slide-2"
      data-theme="light"
      aria-label="Дотоод үйл ажиллагаа"
      className="relative flex min-h-[100svh] snap-start items-center overflow-hidden bg-paper text-ink"
    >
      <TornEdge className="text-ink" />
      <WebCorner corner="bl" size={300} className="text-ink/10" />
      <motion.div
        style={{ y: dotsY }}
        className="halftone-lg pointer-events-none absolute right-[8%] top-[10%] h-[70%] w-[45%] text-spidey/25"
      />

      <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 px-5 pb-16 pt-24 md:px-10 lg:grid-cols-12 lg:gap-6 lg:px-16 lg:py-24">
        <div className="relative z-10 lg:col-span-5 lg:pt-10">
          <Reveal>
            <SlideTag
              no={2}
              label="DUA таскийн тайлан"
              className="text-spidey"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(3rem,6.4vw,6.4rem)] font-bold uppercase leading-[0.92]">
              Дотоод
              <br />
              <span className="text-outline">үйл</span> ажиллагаа
            </h2>
          </Reveal>

          <Reveal
            delay={0.3}
            rotate={-8}
            scale={0.4}
            className="relative mt-8 inline-block w-36 md:w-44"
          >
            <motion.div
              whileHover={{ scale: 1.12, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
              className="relative"
            >
              <Burst className="w-full text-spidey" />
              <span className="absolute inset-0 grid place-items-center text-center font-display text-2xl font-bold uppercase leading-none text-paper md:text-3xl">
                ДҮА
                <br />
                таск
              </span>
            </motion.div>
          </Reveal>
        </div>

        <div className="relative lg:col-span-7">
          <motion.div style={{ y: photoY }} className="relative">
            <Reveal rotate={1.5} y={60}>
              <TiltCard max={5} scale={1.015}>
                <div className="relative border-4 border-ink bg-ink shadow-comic-lg">
                  <SmartImage
                    src="/images/slide2-team.jpg"
                    alt="DUA таскийн багийн гишүүдийн хамтын зураг"
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="aspect-[4/3] w-full"
                    imgClassName="group-hover:scale-105"
                    tone="red"
                  />
                  <div className="absolute bottom-0 right-0 flex items-center gap-2 bg-paper px-4 py-2 font-display text-lg font-semibold uppercase md:text-2xl">
                    <Camera className="h-5 w-5 text-spidey" strokeWidth={2.5} />
                    Багийн бүрэлдэхүүн
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </motion.div>

          <motion.div
            style={{ y: panelY }}
            className="relative z-10 -mt-16 ml-2 w-[62%] max-w-[300px] md:absolute md:-left-16 md:bottom-[-6%] md:mt-0"
          >
            <Reveal rotate={-4} x={-40}>
              <TiltCard max={14} scale={1.07}>
                <div className="relative border-[3px] border-ink bg-spidey p-5 text-paper shadow-comic">
                  <Users
                    className="absolute right-4 top-4 h-7 w-7"
                    strokeWidth={2.2}
                  />
                  <div className="font-display text-[7rem] font-bold leading-[0.8] md:text-[9rem]">
                    3
                  </div>
                  <p className="mt-2 font-display text-2xl font-semibold uppercase leading-tight md:text-3xl">
                    гишүүнтэй баг
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          </motion.div>

          <motion.div
            style={{ y: panelY2 }}
            className="relative z-10 -mt-10 ml-auto mr-2 w-[58%] max-w-[280px] md:absolute md:-right-6 md:-top-14 md:mt-0"
          >
            <Reveal rotate={4} x={40} delay={0.15}>
              <TiltCard max={14} scale={1.07}>
                <div className="relative overflow-hidden border-[3px] border-ink bg-ink p-5 text-paper shadow-comic-red">
                  <div className="halftone absolute inset-0 text-paper/10" />
                  <Gamepad2
                    className="relative h-7 w-7 text-spidey"
                    strokeWidth={2.2}
                  />
                  <div className="relative mt-1 font-display text-[6rem] font-bold leading-[0.8] text-spidey md:text-[8rem]">
                    4
                  </div>
                  <p className="relative mt-2 font-display text-xl font-semibold uppercase leading-tight md:text-2xl">
                    хөгжүүлэлтийн
                    <br />
                    тоглоом
                  </p>
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-1.5 w-1/3 bg-suit"
                  />
                </div>
              </TiltCard>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
