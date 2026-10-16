"use client";

import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

type Pointer = { nx: number; ny: number; cx: number; cy: number; at: number };
type Bead = { x: number; y: number; w: number; s: number };

const HUB = new THREE.Vector2(0.12, 0.3);
const SPOKES = 28;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Kept in sync with the vertex shader below.
function sway(x: number, y: number, w: number, t: number) {
  return w * (0.16 * Math.sin(t * 0.6 + x * 0.9 + y * 0.4) + 0.05 * Math.sin(t * 1.3 + y * 2.1));
}

function poke(x: number, y: number, w: number, p: THREE.Vector3) {
  const dx = x - p.x;
  const dy = y - p.y;
  return -p.z * Math.exp(-(dx * dx + dy * dy) / 0.35) * Math.min(1, w * 3);
}

const weight = (f: number) => 1 - f * f;

function buildWeb() {
  const rnd = mulberry32(11);
  const pos: number[] = [];
  const ws: number[] = [];
  const as: number[] = [];
  const beads: Bead[] = [];
  const seg = (x0: number, y0: number, w0: number, a0: number, x1: number, y1: number, w1: number, a1: number) => {
    pos.push(x0, y0, 0, x1, y1, 0);
    ws.push(w0, w1);
    as.push(a0, a1);
  };

  // Frame: an uneven polygon, roomier below the hub like a real orb web.
  const anchors: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const ang = 0.35 + (i * Math.PI * 2) / 6 + (rnd() - 0.5) * 0.45;
    const r = (1.75 + rnd() * 0.4) * (Math.sin(ang) < 0 ? 1.12 : 0.9);
    anchors.push([HUB.x + Math.cos(ang) * r, HUB.y + Math.sin(ang) * r]);
  }
  anchors.forEach(([x0, y0], i) => {
    const [x1, y1] = anchors[(i + 1) % anchors.length];
    seg(x0, y0, 0, 0.75, x1, y1, 0, 0.75);
    const bridges = rnd() < 0.5 ? 2 : 1;
    for (let b = 0; b < bridges; b++) {
      const out = Math.atan2(y0 - HUB.y, x0 - HUB.x) + (rnd() - 0.5) * 0.9;
      const len = 1.4 + rnd() * 1.2;
      for (let k = 0; k < 6; k++) {
        const t0 = (k / 6) * len;
        const t1 = ((k + 1) / 6) * len;
        seg(
          x0 + Math.cos(out) * t0, y0 + Math.sin(out) * t0, 0, 0.6 * (1 - k / 6),
          x0 + Math.cos(out) * t1, y0 + Math.sin(out) * t1, 0, 0.6 * (1 - (k + 1) / 6),
        );
      }
    }
  });

  const cross = (ax: number, ay: number, bx: number, by: number) => ax * by - ay * bx;
  const reach = (dx: number, dy: number) => {
    let best = Infinity;
    anchors.forEach(([ax, ay], i) => {
      const [bx, by] = anchors[(i + 1) % anchors.length];
      const ex = bx - ax;
      const ey = by - ay;
      const den = cross(dx, dy, ex, ey);
      if (Math.abs(den) < 1e-6) return;
      const qx = ax - HUB.x;
      const qy = ay - HUB.y;
      const t = cross(qx, qy, ex, ey) / den;
      const u = cross(qx, qy, dx, dy) / den;
      if (t > 0 && u >= 0 && u <= 1) best = Math.min(best, t);
    });
    return best;
  };

  const spokes = Array.from({ length: SPOKES }, (_, i) => {
    const ang = (i * Math.PI * 2) / SPOKES + (rnd() - 0.5) * 0.12;
    const dx = Math.cos(ang);
    const dy = Math.sin(ang);
    return { dx, dy, len: reach(dx, dy) };
  });
  const at = (i: number, f: number): [number, number] => {
    const s = spokes[i];
    return [HUB.x + s.dx * s.len * f, HUB.y + s.dy * s.len * f];
  };

  spokes.forEach((_, i) => {
    for (let k = 0; k < 14; k++) {
      const f0 = 0.02 + (k / 14) * 0.98;
      const f1 = 0.02 + ((k + 1) / 14) * 0.98;
      const [x0, y0] = at(i, f0);
      const [x1, y1] = at(i, f1);
      seg(x0, y0, weight(f0), 0.8, x1, y1, weight(f1), 0.8);
    }
  });

  // One sagging strand between two neighbouring spokes.
  const thread = (i: number, f0: number, f1: number, alpha: number, wet: boolean) => {
    const j = (i + 1) % SPOKES;
    const [x0, y0] = at(i, f0);
    const [x1, y1] = at(j, f1);
    const len = Math.hypot(x1 - x0, y1 - y0);
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    const hl = Math.hypot(HUB.x - mx, HUB.y - my) || 1;
    const ox = ((HUB.x - mx) / hl) * 0.05 * len;
    const oy = ((HUB.y - my) / hl) * 0.05 * len - 0.14 * len * len;
    let px = x0;
    let py = y0;
    let pw = weight(f0);
    for (let k = 1; k <= 4; k++) {
      const t = k / 4;
      const bend = 4 * t * (1 - t);
      const x = x0 + (x1 - x0) * t + ox * bend;
      const y = y0 + (y1 - y0) * t + oy * bend;
      const w = weight(f0 + (f1 - f0) * t);
      seg(px, py, pw, alpha, x, y, w, alpha);
      if (wet && k < 4 && rnd() < 0.12) beads.push({ x, y, w, s: 0.0035 + rnd() ** 3 * 0.011 });
      px = x;
      py = y;
      pw = w;
    }
  };

  const dangle = (i: number, f: number) => {
    const [x, y] = at(i, f);
    const w = weight(f);
    const len = 0.12 + rnd() * 0.22;
    const curl = (rnd() - 0.5) * 0.08;
    for (let k = 0; k < 5; k++) {
      const t0 = k / 5;
      const t1 = (k + 1) / 5;
      seg(
        x + Math.sin(t0 * 3) * curl, y - t0 * len, w, 0.5,
        x + Math.sin(t1 * 3) * curl, y - t1 * len, w, 0.5,
      );
    }
  };

  // Capture spiral, with a torn patch where something broke through.
  let f = 0.93;
  let i = 0;
  while (f > 0.33) {
    const next = f - 0.04 / SPOKES + (rnd() - 0.5) * 0.006;
    const torn = i >= 4 && i <= 8 && f > 0.46 && f < 0.78 && rnd() < 0.85;
    if (torn) {
      if (rnd() < 0.18) dangle(i, f);
    } else if (rnd() > 0.025) {
      thread(i, f, next, 0.55, true);
    }
    f = next;
    i = (i + 1) % SPOKES;
  }

  // Hub: denser, messier loops.
  for (const ring of [0.05, 0.075, 0.1, 0.13, 0.16, 0.2, 0.24]) {
    for (let s = 0; s < SPOKES; s++) {
      if (rnd() < 0.85) thread(s, ring + (rnd() - 0.5) * 0.02, ring + (rnd() - 0.5) * 0.02, 0.7, false);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("aW", new THREE.Float32BufferAttribute(ws, 1));
  geo.setAttribute("aA", new THREE.Float32BufferAttribute(as, 1));
  return { geo, beads };
}

function webGeometry() {
  const pts: number[] = [];
  const r = 1.75;
  const lat = 10;
  const lon = 16;
  const at = (i: number, j: number, k = 1) => {
    const phi = (i / lat) * Math.PI;
    const th = (j / lon) * Math.PI * 2;
    return [r * k * Math.sin(phi) * Math.cos(th), r * k * Math.cos(phi), r * k * Math.sin(phi) * Math.sin(th)];
  };
  for (let j = 0; j < lon; j++) {
    for (let i = 0; i < lat; i++) pts.push(...at(i, j), ...at(i + 1, j));
  }
  for (let i = 1; i < lat; i++) {
    for (let j = 0; j < lon; j++) {
      const a = at(i, j);
      const b = at(i, j + 1);
      const m = at(i, j + 0.5, 0.94);
      pts.push(...a, ...m, ...m, ...b);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return g;
}

function WebSphere({ pointer }: { pointer: MutableRefObject<[number, number]> }) {
  const group = useRef<THREE.Group>(null);
  const geo = useMemo(webGeometry, []);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const [px, py] = pointer.current;
    g.rotation.y += dt * 0.22;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, py * 0.45, 0.05);
    g.position.x = THREE.MathUtils.lerp(g.position.x, px * 0.35, 0.05);
    g.position.y = THREE.MathUtils.lerp(g.position.y, -py * 0.2, 0.05);
  });

  return (
    <group ref={group}>
      <lineSegments geometry={geo}>
        <lineBasicMaterial color="#E62429" transparent opacity={0.9} />
      </lineSegments>
      <mesh>
        <sphereGeometry args={[1.25, 48, 48]} />
        <meshStandardMaterial color="#120709" metalness={0.75} roughness={0.28} />
      </mesh>
      <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[2.25, 0.012, 8, 160]} />
        <meshBasicMaterial color="#1B3A8A" />
      </mesh>
    </group>
  );
}

export default function WebScene() {
  const pointer = useRef<[number, number]>([0, 0]);
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = [(e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1];
    };
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (host.current) io.observe(host.current);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={host} className="h-full w-full">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 6], fov: 42 }}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[3, 2, 4]} intensity={60} color="#E62429" />
        <pointLight position={[-4, -2, 2]} intensity={18} color="#1B3A8A" />
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
          <WebSphere pointer={pointer} />
        </Float>
      </Canvas>
    </div>
  );
}
