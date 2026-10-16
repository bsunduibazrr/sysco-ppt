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
