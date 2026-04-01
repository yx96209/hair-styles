"use client";

import { useEffect, useRef } from "react";

export default function SectionAwaken() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle field
    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      size: number; alpha: number;
      pulse: number;
    }
    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    let raf: number;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      frame++;

      ctx.fillStyle = "rgba(5,5,5,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = "rgba(201,169,110,0.04)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw particles
      particles.forEach((p) => {
        p.pulse += 0.02;
        const alpha = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,169,110,${alpha})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      // Central glow
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const breathe = 0.6 + 0.4 * Math.sin(frame * 0.025);

      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200 * breathe);
      grd.addColorStop(0, `rgba(201,169,110,${0.06 * breathe})`);
      grd.addColorStop(0.5, `rgba(201,169,110,${0.02 * breathe})`);
      grd.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, 200 * breathe, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="scroll-section" style={{ background: "#050505" }}>
      <div className="noise-overlay" />
      <canvas ref={canvasRef} className="canvas-cover" />

      {/* Sensor visual */}
      <div className="section-content" style={{ zIndex: 20 }}>
        {/* Sensor rings */}
        <div className="relative flex items-center justify-center" style={{ width: 220, height: 220, margin: "0 auto 3rem" }}>
          {/* Outer pulse rings */}
          <div
            className="sensor-ring absolute rounded-full border"
            style={{
              width: 180,
              height: 180,
              borderColor: "rgba(201,169,110,0.15)",
            }}
          />
          <div
            className="sensor-ring-2 absolute rounded-full border"
            style={{
              width: 180,
              height: 180,
              borderColor: "rgba(201,169,110,0.1)",
            }}
          />
          {/* Middle ring */}
          <div
            className="absolute rounded-full border"
            style={{
              width: 120,
              height: 120,
              borderColor: "rgba(201,169,110,0.2)",
              animation: "rotate-slow 12s linear infinite",
              borderStyle: "dashed",
            }}
          />
          {/* Sensor core */}
          <div
            className="sensor-core relative rounded-full"
            style={{
              width: 60,
              height: 60,
              background: "radial-gradient(circle, rgba(201,169,110,0.9) 0%, rgba(201,169,110,0.3) 50%, transparent 100%)",
              boxShadow: "0 0 30px rgba(201,169,110,0.5), 0 0 60px rgba(201,169,110,0.2)",
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, #fff 0%, rgba(201,169,110,0.8) 40%, transparent 80%)",
              }}
            />
          </div>
        </div>

        {/* Text */}
        <p className="sub-headline mb-4">AURUM HAIR SYSTEM · AI-01</p>
        <h1 className="headline" style={{ color: "#fff", maxWidth: 600, margin: "0 auto 1.5rem" }}>
          精準，始於
          <span className="gold-text"> 深度洞察</span>
          。
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: "0.8rem",
            letterSpacing: "0.2em",
            marginTop: "2.5rem",
            textTransform: "uppercase",
          }}
        >
          向下捲動以探索
        </p>
        {/* Scroll arrow */}
        <div
          style={{
            width: 1,
            height: 50,
            background: "linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)",
            margin: "1rem auto 0",
            animation: "float 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
