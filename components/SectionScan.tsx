"use client";

import { useEffect, useRef } from "react";

interface Point3D {
  x: number; y: number; z: number;
  ox: number; oy: number; oz: number;
  alpha: number; size: number;
}

export default function SectionScan() {
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

    // Generate head-shaped point cloud
    const POINT_COUNT = 600;
    const points: Point3D[] = [];

    for (let i = 0; i < POINT_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      // Oval head shape
      const rx = 90 + (Math.random() - 0.5) * 20;
      const ry = 110 + (Math.random() - 0.5) * 20;
      const rz = 85 + (Math.random() - 0.5) * 20;

      const x = rx * Math.sin(phi) * Math.cos(theta);
      const y = ry * Math.cos(phi);
      const z = rz * Math.sin(phi) * Math.sin(theta);

      points.push({
        x, y, z,
        ox: x, oy: y, oz: z,
        alpha: Math.random() * 0.7 + 0.3,
        size: Math.random() * 2 + 0.5,
      });
    }

    let frame = 0;
    let raf: number;
    const rotY = { v: 0.008 };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      frame++;

      ctx.fillStyle = "rgba(5,5,5,0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const scanProgress = (Math.sin(frame * 0.02) + 1) / 2; // 0..1 oscillate
      const scanY = -110 + scanProgress * 220; // map to sphere height

      // Sort by z for depth
      const angle = frame * rotY.v;

      const projected = points.map((p) => {
        // Rotate around Y
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const x2 = p.x * cosA - p.z * sinA;
        const z2 = p.x * sinA + p.z * cosA;
        const y2 = p.y;

        const fov = 500;
        const scale = fov / (fov + z2 + 200);
        const px = cx + x2 * scale;
        const py = cy + y2 * scale;

        // Highlight points near scan line
        const distToScan = Math.abs(y2 - scanY);
        const scanHighlight = Math.max(0, 1 - distToScan / 20);

        return { px, py, scale, alpha: p.alpha, size: p.size, scanHighlight, y2, z2 };
      });

      projected.sort((a, b) => a.z2 - b.z2);

      projected.forEach(({ px, py, scale, alpha, size, scanHighlight }) => {
        const r = size * scale;
        const a = alpha * (0.3 + 0.7 * scale);

        if (scanHighlight > 0.1) {
          // Bright scanned point
          const sg = ctx.createRadialGradient(px, py, 0, px, py, r * 4);
          sg.addColorStop(0, `rgba(201,169,110,${a * scanHighlight})`);
          sg.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(px, py, r * 4, 0, Math.PI * 2);
          ctx.fillStyle = sg;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        const color = scanHighlight > 0.3
          ? `rgba(255,220,140,${a})`
          : `rgba(201,169,110,${a * 0.6})`;
        ctx.fillStyle = color;
        ctx.fill();
      });

      // Scan line plane
      const scanLineScreenY = cy + scanY * (500 / (500 + 200));
      const lineGrad = ctx.createLinearGradient(cx - 130, 0, cx + 130, 0);
      lineGrad.addColorStop(0, "transparent");
      lineGrad.addColorStop(0.3, "rgba(201,169,110,0.6)");
      lineGrad.addColorStop(0.7, "rgba(201,169,110,0.6)");
      lineGrad.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.moveTo(cx - 130, scanLineScreenY);
      ctx.lineTo(cx + 130, scanLineScreenY);
      ctx.strokeStyle = lineGrad as CanvasGradient;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "rgba(201,169,110,0.8)";
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Beam lines from top
      if (frame % 3 === 0) {
        ctx.strokeStyle = "rgba(201,169,110,0.04)";
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 6; i++) {
          const bx = cx + (Math.random() - 0.5) * 260;
          ctx.beginPath();
          ctx.moveTo(cx, cy - 180);
          ctx.lineTo(bx, scanLineScreenY);
          ctx.stroke();
        }
      }
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      className="scroll-section"
      style={{
        background: "radial-gradient(ellipse at center top, #0d0a06 0%, #050505 70%)",
      }}
    >
      <div className="noise-overlay" />
      <canvas ref={canvasRef} className="canvas-cover" />

      {/* UI overlays */}
      <div
        className="section-content"
        style={{
          position: "absolute",
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          zIndex: 20,
        }}
      >
        <p className="sub-headline mb-4">深度頭型掃描 · 3D MAPPING</p>
        <h2 className="headline" style={{ maxWidth: 640, margin: "0 auto" }}>
          它比你，更了解
          <span className="gold-text"> 你的頭部輪廓</span>。
        </h2>
      </div>

      {/* Corner HUD elements */}
      <div
        style={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          zIndex: 20,
          color: "rgba(201,169,110,0.5)",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          fontFamily: "monospace",
          lineHeight: 1.8,
        }}
      >
        <div>SCAN STATUS: ACTIVE</div>
        <div>RESOLUTION: 0.01mm</div>
        <div>POINTS: 247,832</div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "2rem",
          right: "2rem",
          zIndex: 20,
          color: "rgba(201,169,110,0.5)",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          fontFamily: "monospace",
          textAlign: "right",
          lineHeight: 1.8,
        }}
      >
        <div>AURUM AI · v4.2</div>
        <div>DEPTH SENSOR ON</div>
        <div>CONFIDENCE: 99.7%</div>
      </div>

      {/* Corner brackets */}
      {[
        { top: "15%", left: "15%", rotate: "0deg" },
        { top: "15%", right: "15%", rotate: "90deg" },
        { bottom: "25%", left: "15%", rotate: "270deg" },
        { bottom: "25%", right: "15%", rotate: "180deg" },
      ].map((style, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 20,
            height: 20,
            borderTop: "1.5px solid rgba(201,169,110,0.4)",
            borderLeft: "1.5px solid rgba(201,169,110,0.4)",
            transform: `rotate(${style.rotate})`,
            zIndex: 20,
            ...style,
          }}
        />
      ))}
    </section>
  );
}
