"use client";

import { useEffect, useRef } from "react";

export default function SectionFinal() {
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

    let frame = 0;
    let raf: number;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      frame++;

      ctx.fillStyle = "rgba(3,3,3,0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Slow breathing outer glow
      const breathe = Math.max(0.05, 0.4 + 0.6 * Math.sin(frame * 0.015));
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 350 * breathe);
      glow.addColorStop(0, `rgba(201,169,110,${0.04 * breathe})`);
      glow.addColorStop(0.5, `rgba(201,169,110,${0.01 * breathe})`);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Very subtle rotating ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(frame * 0.002);
      ctx.strokeStyle = `rgba(201,169,110,${0.04 * breathe})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 16]);
      ctx.beginPath();
      ctx.arc(0, 0, 180, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      className="scroll-section final-section"
      style={{
        background: "#030303",
      }}
    >
      <canvas ref={canvasRef} className="canvas-cover" />

      <div
        className="section-content"
        style={{
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            position: "relative",
            width: 80,
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              border: "1px solid rgba(201,169,110,0.5)",
              transform: "rotate(45deg)",
              position: "absolute",
            }}
          />
          <div
            style={{
              width: 44,
              height: 44,
              border: "1px solid rgba(201,169,110,0.25)",
              transform: "rotate(45deg)",
              position: "absolute",
              animation: "rotate-slow 20s linear infinite",
            }}
          />
          <span
            style={{
              fontSize: "1.2rem",
              fontWeight: 300,
              letterSpacing: "0.15em",
              color: "rgba(201,169,110,0.9)",
              position: "relative",
              zIndex: 1,
            }}
          >
            AU
          </span>
        </div>

        {/* Brand name */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 100,
              letterSpacing: "0.5em",
              color: "#fff",
              marginBottom: "0.5rem",
              textIndent: "0.5em",
            }}
          >
            AURUM
          </p>
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)",
              margin: "1rem auto",
              width: "80%",
            }}
          />
          <p
            style={{
              fontSize: "clamp(0.6rem, 1.2vw, 0.8rem)",
              letterSpacing: "0.5em",
              color: "rgba(201,169,110,0.6)",
              textTransform: "uppercase",
              fontWeight: 300,
            }}
          >
            The Future of Hair
          </p>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.2)",
            textTransform: "uppercase",
            marginTop: "1rem",
          }}
        >
          精準 · 美感 · 科技 · 未來
        </p>
      </div>
    </section>
  );
}
