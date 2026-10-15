"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
  rotate?: number;
  scale?: number;
};

export default function Reveal({ children, className, delay = 0, x = 0, y = 40, rotate = 0, scale = 1 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, rotate: rotate ? rotate * 2 : 0, scale }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
