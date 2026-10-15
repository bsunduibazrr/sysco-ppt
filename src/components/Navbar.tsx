"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slides } from "@/lib/content";
import SpiderGlyph from "./SpiderGlyph";

export function scrollToSlide(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export default function Navbar() {
  const [active, setActive] = useState(0);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const els = slides.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = els.indexOf(entry.target as HTMLElement);
          if (idx >= 0) {
            setActive(idx);
            setTheme(entry.target.getAttribute("data-theme") ?? "dark");
          }
        }
      },
      { rootMargin: "-48% 0px -48% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const tone = theme === "light" ? "text-ink" : "text-paper";
  const accent = theme === "red" ? "text-ink" : "text-spidey";
  const dot = theme === "red" ? "bg-ink" : "bg-spidey";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${tone}`}>
      <nav aria-label="Слайдын цэс" className="mx-auto flex items-center justify-between px-5 py-4 md:px-10 md:py-6">
        <button
          type="button"
          onClick={() => scrollToSlide(slides[0].id)}
          className="group flex items-center gap-2"
          aria-label="Syscotech, эхний слайд руу"
        >
          <SpiderGlyph className={`h-6 w-6 transition-transform ${accent} duration-300 group-hover:rotate-12 group-hover:scale-110`} />
          <span className="font-display text-xl font-bold uppercase tracking-[0.08em]">
            Sys<span className={`transition-colors duration-500 ${accent}`}>co</span>tech
          </span>
        </button>

        <ol className="flex items-center gap-2.5 md:gap-3.5">
          {slides.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => scrollToSlide(s.id)}
                aria-label={`${i + 1}-р слайд: ${s.label}`}
                aria-current={active === i ? "step" : undefined}
                className="group relative grid h-5 w-5 place-items-center"
              >
                <span className="absolute inset-0 rounded-full border border-current opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-50" />
                {active === i ? (
                  <motion.span layoutId="nav-dot" className={`h-2.5 w-2.5 rotate-45 ${dot}`} transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60 transition-transform duration-300 group-hover:scale-150" />
                )}
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
}
