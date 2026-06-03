"use client";

import React, { useEffect, useRef } from "react";

export default function SectionArrive() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
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
    let running = false;

    const loop = () => {
      if (!running) return;
      frame++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Marble floor gradient
      const floorY = cy + 60;
      const floorGrad = ctx.createLinearGradient(0, floorY, 0, canvas.height);
      floorGrad.addColorStop(0, "rgba(30,25,20,0.8)");
      floorGrad.addColorStop(0.3, "rgba(20,17,12,0.9)");
      floorGrad.addColorStop(1, "rgba(5,5,5,1)");
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, floorY, canvas.width, canvas.height - floorY);

      // Floor marble veins
      ctx.save();
      ctx.globalAlpha = 0.06;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        const startX = (canvas.width / 8) * i + Math.sin(frame * 0.002 + i) * 5;
        ctx.moveTo(startX, floorY);
        ctx.bezierCurveTo(
          startX + 30, floorY + 50,
          startX - 20, floorY + 100,
          startX + 40, canvas.height
        );
        ctx.strokeStyle = `rgba(201,169,110,1)`;
        ctx.lineWidth = Math.random() * 1.5 + 0.5;
        ctx.stroke();
      }
      ctx.restore();

      // Background glow — ceiling lights
      const ceilGrad = ctx.createRadialGradient(cx, 0, 0, cx, 0, canvas.height * 0.7);
      ceilGrad.addColorStop(0, "rgba(201,169,110,0.04)");
      ceilGrad.addColorStop(0.4, "rgba(201,169,110,0.01)");
      ceilGrad.addColorStop(1, "transparent");
      ctx.fillStyle = ceilGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Machine body
      const mw = 160;
      const mh = 200;
      const mx = cx - mw / 2;
      const my = cy - mh / 2 - 30;

      // Machine shadow / reflection
      ctx.save();
      ctx.globalAlpha = 0.15;
      const refGrad = ctx.createLinearGradient(mx, floorY, mx, floorY + 80);
      refGrad.addColorStop(0, "rgba(201,169,110,0.3)");
      refGrad.addColorStop(1, "transparent");
      ctx.fillStyle = refGrad;
      ctx.beginPath();
      ctx.ellipse(cx, floorY + 8, mw * 0.55, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Machine base
      const baseGrad = ctx.createLinearGradient(mx, my + mh - 30, mx + mw, my + mh);
      baseGrad.addColorStop(0, "rgba(40,35,28,1)");
      baseGrad.addColorStop(0.5, "rgba(60,52,38,1)");
      baseGrad.addColorStop(1, "rgba(30,25,18,1)");
      ctx.beginPath();
      ctx.roundRect(mx + 10, my + mh - 10, mw - 20, 20, 4);
      ctx.fillStyle = baseGrad;
      ctx.fill();

      // Main body gradient (metallic silver-gold)
      const bodyGrad = ctx.createLinearGradient(mx, my, mx + mw, my + mh);
      bodyGrad.addColorStop(0, "rgba(80,75,65,1)");
      bodyGrad.addColorStop(0.2, "rgba(120,110,90,1)");
      bodyGrad.addColorStop(0.5, "rgba(160,145,115,1)");
      bodyGrad.addColorStop(0.8, "rgba(100,90,70,1)");
      bodyGrad.addColorStop(1, "rgba(60,55,40,1)");

      ctx.beginPath();
      ctx.roundRect(mx, my + 20, mw, mh - 20, [12, 12, 4, 4]);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Edge highlight
      ctx.beginPath();
      ctx.roundRect(mx, my + 20, mw, mh - 20, [12, 12, 4, 4]);
      ctx.strokeStyle = "rgba(201,169,110,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Top dome / sensor head
      const domeBreath = Math.sin(frame * 0.025) * 3;
      const domeGrad = ctx.createRadialGradient(cx, my + 20, 0, cx, my + 20, 55);
      domeGrad.addColorStop(0, "rgba(230,220,200,1)");
      domeGrad.addColorStop(0.4, "rgba(160,148,120,1)");
      domeGrad.addColorStop(0.8, "rgba(80,72,55,1)");
      domeGrad.addColorStop(1, "rgba(40,35,25,1)");

      ctx.beginPath();
      ctx.arc(cx, my + 22 + domeBreath, 52, Math.PI, 0);
      ctx.fillStyle = domeGrad;
      ctx.fill();

      // Dome highlight
      ctx.beginPath();
      ctx.arc(cx, my + 22 + domeBreath, 52, Math.PI, 0);
      ctx.strokeStyle = "rgba(201,169,110,0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Sensor LED — breathing
      const ledAlpha = 0.5 + 0.5 * Math.sin(frame * 0.04);
      ctx.beginPath();
      ctx.arc(cx, my + 22 + domeBreath, 8, 0, Math.PI * 2);
      const ledGrad = ctx.createRadialGradient(cx, my + 22 + domeBreath, 0, cx, my + 22 + domeBreath, 8);
      ledGrad.addColorStop(0, `rgba(255,255,255,${ledAlpha})`);
      ledGrad.addColorStop(0.5, `rgba(201,169,110,${ledAlpha * 0.8})`);
      ledGrad.addColorStop(1, "transparent");
      ctx.fillStyle = ledGrad;
      ctx.fill();

      // LED glow
      ctx.beginPath();
      ctx.arc(cx, my + 22 + domeBreath, 20, 0, Math.PI * 2);
      const glowGrad = ctx.createRadialGradient(cx, my + 22 + domeBreath, 0, cx, my + 22 + domeBreath, 20);
      glowGrad.addColorStop(0, `rgba(201,169,110,${ledAlpha * 0.3})`);
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Arm structures (robotic arms)
      [[-1, 1], [1, -1]].forEach(([sx]) => {
        const armX = cx + sx * (mw / 2 - 10);
        const armY1 = my + 60;
        const armY2 = my + 140;

        // Arm rail
        ctx.beginPath();
        ctx.moveTo(armX, armY1);
        ctx.lineTo(armX + sx * 30, armY1 + 20);
        ctx.lineTo(armX + sx * 30, armY2);
        ctx.strokeStyle = "rgba(120,108,80,0.8)";
        ctx.lineWidth = 8;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.strokeStyle = "rgba(201,169,110,0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // End effector
        ctx.beginPath();
        ctx.arc(armX + sx * 30, armY2, 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(201,169,110,0.7)";
        ctx.fill();
      });

      // Panel details on body
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.roundRect(cx - 30, my + 90, 60, 35, 3);
      ctx.fill();

      // Status light strip
      const stripColors = ["#c9a96e", "#8fbc8f", "#c9a96e"];
      stripColors.forEach((color, i) => {
        const dotAlpha = i === 0 ? ledAlpha : 0.4;
        ctx.beginPath();
        ctx.arc(cx - 15 + i * 15, my + 100, 3, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(")", `,${dotAlpha})`).replace("rgb", "rgba");
        ctx.fill();
      });

      // Ambient rim light
      const rimGrad = ctx.createRadialGradient(cx, cy, mw * 0.4, cx, cy, mw * 1.2);
      rimGrad.addColorStop(0, "transparent");
      rimGrad.addColorStop(0.7, "transparent");
      rimGrad.addColorStop(1, "rgba(201,169,110,0.03)");
      ctx.fillStyle = rimGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Floor reflection of machine
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.transform(1, 0, 0, -0.3, 0, floorY * 1.3);
      ctx.beginPath();
      ctx.roundRect(mx, my + 20, mw, mh - 20, [12, 12, 4, 4]);
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.restore();

      // Ceiling track lights
      for (let i = 0; i < 5; i++) {
        const lx = (canvas.width / 6) * (i + 1);
        const lg = ctx.createRadialGradient(lx, 0, 0, lx, 0, 120);
        lg.addColorStop(0, "rgba(255,245,220,0.08)");
        lg.addColorStop(0.5, "rgba(201,169,110,0.03)");
        lg.addColorStop(1, "transparent");
        ctx.fillStyle = lg;
        ctx.fillRect(lx - 120, 0, 240, 200);
      }
      raf = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        loop();
      } else if (!entry.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    }, { threshold: 0 });
    observer.observe(section);

    return () => {
      observer.disconnect();
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="scroll-section"
      style={{
        background: "linear-gradient(180deg, #08070500 0%, #050505 100%)",
      }}
    >
      <div className="noise-overlay" />
      <canvas ref={canvasRef} className="canvas-cover" />

      {/* Luxury space lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(201,169,110,0.015) 0px, rgba(201,169,110,0.015) 1px, transparent 1px, transparent 80px)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        className="section-content"
        style={{
          position: "absolute",
          bottom: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          zIndex: 20,
        }}
      >
        <p className="sub-headline mb-4">空間意境 · SALON EXPERIENCE</p>
        <h2 className="headline" style={{ maxWidth: 560, margin: "0 auto" }}>
          自動化，
          <span className="gold-text">而不失溫度</span>。
        </h2>
      </div>

      {/* Location tag */}
      <div
        style={{
          position: "absolute",
          top: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 20,
          color: "rgba(201,169,110,0.4)",
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
        }}
      >
        AURUM FLAGSHIP SALON · TAIPEI
      </div>
    </section>
  );
}
