"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { webPath } from "@/lib/web";
import SpiderGlyph from "./SpiderGlyph";

const WebScene = dynamic(() => import("./WebScene"), { ssr: false });

function canRun3D() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = navigator as Navigator & { deviceMemory?: number };
  if ((nav.hardwareConcurrency ?? 8) <= 2) return false;
  if ((nav.deviceMemory ?? 8) < 3) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function Fallback() {
  return (
    <div className="relative h-full w-full">
      <motion.svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full text-spidey"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <path d={webPath({ cx: 200, cy: 200, radius: 170, spokes: 14, rings: 9 })} fill="none" stroke="currentColor" strokeWidth="1.2" />
      </motion.svg>
      <SpiderGlyph className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-paper" />
    </div>
  );
}

export default function HeroVisual() {
  const [mode, setMode] = useState<"idle" | "3d" | "flat">("idle");

  useEffect(() => {
    const go = () => setMode(canRun3D() ? "3d" : "flat");
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(go, { timeout: 1200 });
    else setTimeout(go, 300);
  }, []);

  return (
    <div className="relative h-full w-full">
      {mode !== "3d" && <Fallback />}
      {mode === "3d" && (
        <motion.div className="absolute inset-0" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}>
          <WebScene />
        </motion.div>
      )}
    </div>
  );
}
