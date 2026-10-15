"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Figma, LayoutGrid, Mail } from "lucide-react";
import { useState, type PointerEvent } from "react";
import SmartImage from "../SmartImage";
import Reveal from "../Reveal";
import SlideTag from "../SlideTag";
import WebCorner from "../WebCorner";

const tabs = [
  {
    key: "works",
    label: "Хийсэн ажлууд",
    icon: LayoutGrid,
    src: "/images/tom.png",
    alt: "Portfolio-ийн хийсэн ажлууд хэсэг",
  },
  {
    key: "contact",
    label: "Contact",
    icon: Mail,
    src: "/images/design-2.png",
    alt: "Portfolio-ийн холбоо барих хэсэг",
  },
] as const;

const shots = [
  { src: "/images/pi.jpeg", alt: "Portfolio дизайны нүүр хэсэг" },
  { src: "/images/figma.png", alt: "Portfolio дизайны холбоо барих хэсэг" },
  { src: "/images/cla.jpeg", alt: "Portfolio дизайны гар утасны хувилбар" },
];

export default function Slide4() {
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("works");
  const active = tabs.find((t) => t.key === tab) ?? tabs[0];
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 90, damping: 18 };
  const rotY = useSpring(useTransform(px, [0, 1], [-22, -4]), spring);
  const rotX = useSpring(useTransform(py, [0, 1], [12, 2]), spring);
  const phoneY = useSpring(useTransform(py, [0, 1], [-14, 14]), spring);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  return (
    <section
      id="slide-4"
      data-theme="dark"
      aria-label="Дизайн таск"
      className="relative flex min-h-[100svh] snap-start items-center overflow-hidden bg-ink"
    >
      <div
        aria-hidden
        className="text-outline-paper pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none font-display text-[14vw] font-bold uppercase leading-none [writing-mode:vertical-rl] lg:block"
      >
        portfolio
      </div>
      <WebCorner corner="tl" size={240} className="text-spidey/30" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-spidey via-blood to-ink" />

      <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-5 py-24 md:px-10 lg:grid-cols-12 lg:gap-8 lg:px-16">
        <div className="relative z-10 lg:col-span-4">
          <Reveal>
            <SlideTag no={4} label="Figma" className="text-spidey" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(3.5rem,7.4vw,6.6rem)] font-bold uppercase leading-[0.95] text-paper">
              Дизайн
              <br />
              <span className="relative inline-block">
                таск
                <motion.span
                  className="absolute -right-14 top-1 grid h-11 w-11 place-items-center border-2 border-paper bg-suit"
                  whileHover={{ rotate: 20, scale: 1.15 }}
                >
                  <Figma className="h-5 w-5 text-paper" />
                </motion.span>
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 font-body text-lg font-semibold leading-snug text-paper/75">
              Өөрийн хэв маягаар
              <br />
              хийсэн portfolio
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div
              role="tablist"
              aria-label="Portfolio хэсгүүд"
              className="mt-8 flex w-fit border-2 border-paper/80"
            >
              {tabs.map((t) => {
                const Icon = t.icon;
                const on = t.key === tab;
                return (
                  <button
                    key={t.key}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setTab(t.key)}
                    className={`relative flex items-center gap-2 px-4 py-3 font-body text-sm font-bold transition-colors ${on ? "text-paper" : "text-paper/60 hover:text-paper"}`}
                  >
                    {on && (
                      <motion.span
                        layoutId="design-tab"
                        className="absolute inset-0 bg-spidey"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <Icon className="relative h-4 w-4" />
                    <span className="relative">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <ul className="mt-8 flex gap-3">
            {shots.map((s, i) => (
              <li key={s.src} className="w-1/3">
                <Reveal delay={0.35 + i * 0.08} rotate={i === 1 ? 2 : -2}>
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 0, zIndex: 10 }}
                    className="group relative border-2 border-paper/70 shadow-[4px_4px_0_0_#E62429]"
                  >
                    <SmartImage
                      src={s.src}
                      alt={s.alt}
                      sizes="12vw"
                      className="aspect-[4/3] w-full"
                      imgClassName="group-hover:scale-125"
                    />
                  </motion.div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="relative lg:col-span-8"
          onPointerMove={onMove}
          onPointerLeave={() => {
            px.set(0.5);
            py.set(0.5);
          }}
          style={{ perspective: 1600 }}
        >
          <Reveal y={80} scale={0.92}>
            <motion.div
              style={{
                rotateY: reduce ? -12 : rotY,
                rotateX: reduce ? 6 : rotX,
                transformStyle: "preserve-3d",
              }}
              className="relative mx-auto w-[92%] lg:w-full"
            >
              <div className="relative rounded-t-2xl border-[10px] border-b-[14px] border-[#1c1c21] bg-[#1c1c21] shadow-[0_40px_80px_-20px_rgba(230,36,41,0.45)]">
                <span
                  aria-hidden
                  className="absolute left-1/2 top-[-7px] h-1 w-1 -translate-x-1/2 rounded-full bg-paper/30"
                />
                <div
                  className="group relative aspect-[16/10] overflow-hidden rounded-sm bg-ink"
                  role="tabpanel"
                  aria-label={active.label}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.key}
                      className="absolute inset-0"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <SmartImage
                        src={active.src}
                        alt={active.alt}
                        sizes="(min-width: 1024px) 60vw, 92vw"
                        className="h-full w-full"
                        imgClassName="group-hover:scale-110"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <div className="relative mx-[-6%] h-4 rounded-b-xl bg-gradient-to-b from-[#2a2a31] to-[#121215]">
                <span className="absolute left-1/2 top-0 h-1.5 w-24 -translate-x-1/2 rounded-b-md bg-[#0d0d10]" />
              </div>

              <motion.div
                style={{ y: phoneY, z: 90 }}
                className="absolute -bottom-10 -left-4 w-[24%] min-w-[96px] md:-left-12"
              >
                <motion.div
                  whileHover={{ scale: 1.08, rotate: -2 }}
                  className="group relative rotate-[-8deg] rounded-[1.6rem] border-[6px] border-[#1c1c21] bg-[#1c1c21] shadow-[12px_12px_0_0_#E62429]"
                >
                  <span className="absolute left-1/2 top-1 z-10 h-1.5 w-8 -translate-x-1/2 rounded-full bg-ink" />
                  <SmartImage
                    src="/images/ggg.png"
                    alt="Portfolio-ийн гар утасны хувилбар"
                    sizes="20vw"
                    className="aspect-[9/19] w-full rounded-[1.1rem]"
                    imgClassName="group-hover:scale-110"
                    tone="red"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
