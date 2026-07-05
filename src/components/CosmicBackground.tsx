import { useEffect, useRef } from "react";

/**
 * CosmicBackground
 * - Layer 1: canvas neural network (living nodes + connecting synapses)
 * - Layer 2: canvas starfield with parallax + twinkle
 * - Layer 3: DOM solar system (orbiting planets around a glowing sun)
 * - Layer 4: floating nebula gradient blobs
 */
export function CosmicBackground() {
  const neuralRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Neural network
  useEffect(() => {
    const canvas = neuralRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: number; pulse: number };
    let nodes: Node[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor((w * h) / 22000);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.8 + 0.6,
        hue: 200 + Math.random() * 140,
        pulse: Math.random() * Math.PI * 2,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        // mouse attraction
        const dx = mx - n.x, dy = my - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 40000) {
          n.vx += (dx / Math.sqrt(d2 + 1)) * 0.008;
          n.vy += (dy / Math.sqrt(d2 + 1)) * 0.008;
        }
        n.vx = Math.max(-0.6, Math.min(0.6, n.vx));
        n.vy = Math.max(-0.6, Math.min(0.6, n.vy));
        n.pulse += 0.02;
      }

      // synapses
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 140) {
            const alpha = (1 - d / 140) * 0.35;
            const hue = (a.hue + b.hue) / 2;
            ctx.strokeStyle = `hsla(${hue}, 90%, 65%, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const glow = 0.6 + 0.4 * Math.sin(n.pulse);
        ctx.fillStyle = `hsla(${n.hue}, 95%, 70%, ${glow})`;
        ctx.shadowColor = `hsla(${n.hue}, 95%, 65%, 0.9)`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  // Starfield
  useEffect(() => {
    const canvas = starsRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    type Star = { x: number; y: number; z: number; r: number; tw: number };
    let stars: Star[] = [];

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor((w * h) / 6000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.9 + 0.1,
        r: Math.random() * 1.2 + 0.2,
        tw: Math.random() * Math.PI * 2,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.tw += 0.03;
        s.y += 0.02 * s.z;
        if (s.y > h) s.y = 0;
        const a = 0.4 + 0.6 * Math.abs(Math.sin(s.tw)) * s.z;
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* base radial */}
      <div className="absolute inset-0"
           style={{
             background:
               "radial-gradient(1200px 800px at 70% -10%, oklch(0.25 0.15 290 / 0.6), transparent 60%),\
                radial-gradient(1000px 700px at 10% 20%, oklch(0.22 0.15 210 / 0.5), transparent 60%),\
                radial-gradient(900px 700px at 50% 100%, oklch(0.22 0.18 340 / 0.4), transparent 60%),\
                linear-gradient(180deg, oklch(0.06 0.02 265), oklch(0.08 0.03 265))",
           }}
      />
      <canvas ref={starsRef} className="absolute inset-0 w-full h-full" />
      <canvas ref={neuralRef} className="absolute inset-0 w-full h-full opacity-90" />

      {/* Solar system - fixed corner */}
      <div className="absolute right-[-8rem] top-[8rem] hidden lg:block" style={{ width: 640, height: 640 }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* sun */}
          <div className="relative">
            <div className="absolute -inset-16 rounded-full animate-pulse-glow"
                 style={{ background: "radial-gradient(circle, oklch(0.85 0.2 60 / 0.6), transparent 70%)" }} />
            <div className="w-16 h-16 rounded-full"
                 style={{ background: "radial-gradient(circle at 30% 30%, oklch(0.95 0.15 80), oklch(0.7 0.22 40))",
                          boxShadow: "0 0 60px oklch(0.85 0.2 60 / 0.8), 0 0 120px oklch(0.7 0.22 40 / 0.5)" }} />
          </div>

          {/* orbits */}
          {[
            { r: 90, size: 8, dur: 12, color: "oklch(0.75 0.15 30)" },
            { r: 140, size: 10, dur: 20, color: "oklch(0.7 0.18 140)" },
            { r: 200, size: 14, dur: 32, color: "oklch(0.7 0.2 240)", ring: true },
            { r: 265, size: 11, dur: 48, color: "oklch(0.7 0.22 320)" },
          ].map((p, i) => (
            <div key={i} className="absolute rounded-full border border-white/10"
                 style={{ width: p.r * 2, height: p.r * 2 }}>
              <div className="absolute top-1/2 left-1/2"
                   style={{
                     ["--r" as string]: `${p.r}px`,
                     animation: `orbit ${p.dur}s linear infinite`,
                     transform: `translate(-50%,-50%)`,
                   }}>
                <div className="rounded-full relative"
                     style={{
                       width: p.size, height: p.size,
                       background: `radial-gradient(circle at 30% 30%, white, ${p.color})`,
                       boxShadow: `0 0 20px ${p.color}`,
                     }}>
                  {p.ring && (
                    <div className="absolute left-1/2 top-1/2 border border-white/30 rounded-full"
                         style={{ width: p.size * 2.6, height: p.size * 0.6, transform: "translate(-50%,-50%) rotate(20deg)" }} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nebula blobs */}
      <div className="absolute -left-40 top-1/3 w-[500px] h-[500px] rounded-full animate-pulse-glow"
           style={{ background: "radial-gradient(circle, oklch(0.7 0.22 290 / 0.35), transparent 70%)" }} />
      <div className="absolute right-1/4 bottom-0 w-[600px] h-[600px] rounded-full animate-pulse-glow"
           style={{ background: "radial-gradient(circle, oklch(0.72 0.24 340 / 0.25), transparent 70%)", animationDelay: "2s" }} />

      {/* vignette */}
      <div className="absolute inset-0"
           style={{ background: "radial-gradient(ellipse at center, transparent 40%, oklch(0.05 0.02 265 / 0.6) 100%)" }} />
    </div>
  );
}