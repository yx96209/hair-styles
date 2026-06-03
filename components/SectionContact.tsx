"use client";

import React, { useEffect, useRef } from "react";

interface SectionContactProps {
  onBuyClick?: () => void;
}

const STEPS = [
  { num: "01", icon: "◎", title: "3D 頭型掃描", sub: "約 4 分鐘" },
  { num: "02", icon: "⬡", title: "AI 深度分析", sub: "即時運算" },
  { num: "03", icon: "✦", title: "髮型方案推薦", sub: "3 款客製選擇" },
  { num: "04", icon: "✂", title: "精準剪造完成", sub: "享受專屬成果" },
];

export default function SectionContact({ onBuyClick }: SectionContactProps) {
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
      ctx.fillStyle = "rgba(4,3,3,0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const breathe = 0.5 + 0.5 * Math.sin(frame * 0.018);
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 300 * breathe);
      glow.addColorStop(0, `rgba(201,169,110,${0.03 * breathe})`);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="scroll-section" style={{ background: "#030303" }}>
      <canvas ref={canvasRef} className="canvas-cover" />
      <div className="noise-overlay" />

      <div style={{
        position: "relative", zIndex: 20,
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "4% 7%",
      }}>
        {/* Section label */}
        <p className="sub-headline" style={{ marginBottom: "3rem" }}>
          預約體驗 · HOW IT WORKS
        </p>

        {/* Steps */}
        <div style={{
          display: "flex", alignItems: "flex-start",
          width: "100%", maxWidth: 900, marginBottom: "5rem",
        }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{
              flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", position: "relative",
            }}>
              {/* Connector line between steps */}
              {i < STEPS.length - 1 && (
                <div style={{
                  position: "absolute", top: 22,
                  left: "calc(50% + 22px)", right: "calc(-50% + 22px)",
                  height: 1, borderTop: "1px dashed rgba(201,169,110,0.25)", zIndex: 0,
                }} />
              )}

              {/* Icon circle */}
              <div style={{
                width: 44, height: 44,
                border: "1px solid rgba(201,169,110,0.35)", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1rem", background: "rgba(201,169,110,0.04)",
                position: "relative", zIndex: 1, flexShrink: 0,
              }}>
                <span style={{ fontSize: "1rem", color: "rgba(201,169,110,0.7)" }}>{step.icon}</span>
              </div>

              <p style={{
                fontSize: "0.55rem", letterSpacing: "0.3em",
                color: "rgba(201,169,110,0.4)", marginBottom: "0.4rem",
              }}>
                {step.num}
              </p>
              <p style={{
                fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
                color: "rgba(255,255,255,0.75)", letterSpacing: "0.06em",
                textAlign: "center", marginBottom: "0.3rem",
              }}>
                {step.title}
              </p>
              <p style={{
                fontSize: "0.6rem", letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.2)", textAlign: "center",
              }}>
                {step.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          width: "100%", maxWidth: 600, height: 1, marginBottom: "3.5rem",
          background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)",
        }} />

        {/* Contact info */}
        <div style={{
          display: "flex", gap: "6%", width: "100%",
          maxWidth: 700, alignItems: "flex-start", flexWrap: "wrap",
        }}>
          {/* Left: address + phone */}
          <div style={{ flex: "1 1 200px" }}>
            <p style={{
              fontSize: "0.55rem", letterSpacing: "0.3em",
              color: "rgba(201,169,110,0.4)", marginBottom: "0.5rem",
            }}>
              地址
            </p>
            <p style={{
              fontSize: "0.8rem", color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.05em", lineHeight: 1.7, marginBottom: "1.5rem",
            }}>
              台北市信義區<br />忠孝東路五段 1 號
            </p>
            <p style={{
              fontSize: "0.55rem", letterSpacing: "0.3em",
              color: "rgba(201,169,110,0.4)", marginBottom: "0.5rem",
            }}>
              電話
            </p>
            <p style={{
              fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em",
            }}>
              +886 2 2222-2222
            </p>
          </div>

          {/* Right: hours + CTA */}
          <div style={{ flex: "1 1 200px" }}>
            <p style={{
              fontSize: "0.55rem", letterSpacing: "0.3em",
              color: "rgba(201,169,110,0.4)", marginBottom: "0.5rem",
            }}>
              營業時間
            </p>
            <p style={{
              fontSize: "0.8rem", color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.05em", lineHeight: 1.7, marginBottom: "2rem",
            }}>
              週二 ─ 週日<br />10:00 ─ 20:00
            </p>
            <button
              onClick={onBuyClick}
              style={{
                padding: "0.75rem 2rem",
                border: "1px solid rgba(201,169,110,0.5)",
                background: "transparent",
                color: "rgba(201,169,110,0.9)",
                fontSize: "0.7rem", letterSpacing: "0.3em",
                textTransform: "uppercase", cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget;
                btn.style.background = "rgba(201,169,110,0.1)";
                btn.style.borderColor = "rgba(201,169,110,0.8)";
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget;
                btn.style.background = "transparent";
                btn.style.borderColor = "rgba(201,169,110,0.5)";
              }}
            >
              立即購買體驗
            </button>

            {/* Customer service email */}
            <div style={{ marginTop: "1.25rem" }}>
              <p style={{
                fontSize: "0.5rem", letterSpacing: "0.3em",
                color: "rgba(201,169,110,0.4)", marginBottom: "0.4rem",
              }}>
                客服信箱
              </p>
              <a
                href="mailto:aurum@yx209.net"
                style={{
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  transition: "color 0.25s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(201,169,110,0.8)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                aurum@yx209.net
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
