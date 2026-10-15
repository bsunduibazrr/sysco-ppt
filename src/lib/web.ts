type WebOptions = {
  cx: number;
  cy: number;
  radius: number;
  spokes: number;
  rings: number;
  start?: number;
  end?: number;
  sag?: number;
  jitter?: number;
};

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function webPath({
  cx,
  cy,
  radius,
  spokes,
  rings,
  start = 0,
  end = Math.PI * 2,
  sag = 0.12,
  jitter = 0.06,
}: WebOptions) {
  const rand = seeded(spokes * 31 + rings * 7 + Math.round(radius));
  const full = Math.abs(end - start) >= Math.PI * 2 - 0.001;
  const count = full ? spokes : spokes - 1;
  const step = (end - start) / count;
  const angles = Array.from({ length: spokes }, (_, i) => start + step * i + (full ? (rand() - 0.5) * step * 0.3 : 0));
  const f = (n: number) => n.toFixed(1);
  let d = "";

  for (const a of angles) {
    d += `M${f(cx)} ${f(cy)}L${f(cx + Math.cos(a) * radius)} ${f(cy + Math.sin(a) * radius)}`;
  }

  for (let k = 1; k <= rings; k++) {
    const pts = angles.map((a) => {
      const r = radius * (k / rings) * (1 + (rand() - 0.5) * jitter);
      return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
    });
    if (full) pts.push(pts[0]);
    d += `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      const mx = (x0 + x1) / 2;
      const my = (y0 + y1) / 2;
      const qx = mx + (cx - mx) * sag;
      const qy = my + (cy - my) * sag;
      d += `Q${f(qx)} ${f(qy)} ${f(x1)} ${f(y1)}`;
    }
  }

  return d;
}
