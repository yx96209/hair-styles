"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const HAIRSTYLES = [
  {
    id: 0,
    name: "液態短鮑伯",
    nameEn: "LIQUID SHORT BOB",
    desc: "流線型輪廓，如液態金屬般服貼",
    tags: ["俐落", "現代", "低維護"],
    file: "/hair-styles/液態短鮑伯.png",
    confidence: 97,
  },
  {
    id: 1,
    name: "鎖骨長鮑伯",
    nameEn: "COLLARBONE LONG BOB",
    desc: "恰到好處的長度，修飾臉型與頸線",
    tags: ["優雅", "百搭", "顯臉小"],
    file: "/hair-styles/鎖骨長鮑伯.png",
    confidence: 94,
  },
  {
    id: 2,
    name: "長層次蝴蝶剪",
    nameEn: "LONG BUTTERFLY CUT",
    desc: "層次如蝶翼展開，賦予髮絲蓬鬆感",
    tags: ["浪漫", "層次", "蓬鬆"],
    file: "/hair-styles/長層次蝴蝶剪.png",
    confidence: 91,
  },
  {
    id: 3,
    name: "雕塑感自然捲",
    nameEn: "SCULPTURED NATURAL CURL",
    desc: "保留髮絲的自然彈性，雕塑立體輪廓",
    tags: ["個性", "立體", "自然"],
    file: "/hair-styles/雕塑感自然捲.png",
    confidence: 89,
  },
  {
    id: 4,
    name: "精品吹整中長髮",
    nameEn: "PREMIUM BLOWOUT MID",
    desc: "沙龍級吹整，絲滑光澤自然垂墜",
    tags: ["光澤", "柔順", "氣質"],
    file: "/hair-styles/精品吹整中長髮.png",
    confidence: 96,
  },
];

export default function SectionEvolve() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (idx: number) => {
      if (transitioning || idx === active) return;
      setTransitioning(true);
      setPrev(active);
      setActive(idx);
      setTimeout(() => {
        setPrev(null);
        setTransitioning(false);
      }, 700);
    },
    [active, transitioning]
  );

  // Auto-advance
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((active + 1) % HAIRSTYLES.length);
    }, 4500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, goTo]);

  // Ambient canvas
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

    interface Dust {
      x: number; y: number; r: number; a: number; va: number; vy: number;
    }
    const dust: Dust[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * 9999,
      y: Math.random() * 9999,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random() * 0.35,
      va: (Math.random() - 0.5) * 0.008,
      vy: -(Math.random() * 0.4 + 0.1),
    }));

    let frame = 0;
    let raf: number;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle vignette
      const vg = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.width * 0.2,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.85
      );
      vg.addColorStop(0, "transparent");
      vg.addColorStop(1, "rgba(3,3,3,0.55)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dust motes
      dust.forEach((d) => {
        d.y = ((d.y + d.vy + canvas.height) % canvas.height);
        d.a = Math.max(0, Math.min(0.35, d.a + d.va));
        if (d.a <= 0 || d.a >= 0.35) d.va *= -1;
        ctx.beginPath();
        ctx.arc(
          (d.x % canvas.width),
          d.y,
          d.r, 0, Math.PI * 2
        );
        ctx.fillStyle = `rgba(201,169,110,${d.a})`;
        ctx.fill();
      });
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const cur = HAIRSTYLES[active];
  const prevStyle = prev !== null ? HAIRSTYLES[prev] : null;

  return (
    <section
      className="scroll-section"
      style={{ background: "#060504", overflow: "hidden" }}
    >
      {/* Ambient canvas */}
      <canvas ref={canvasRef} className="canvas-cover" style={{ zIndex: 1 }} />

      {/* Blurred BG image */}
      <div
        key={`bg-${active}`}
        style={{
          position: "absolute", inset: 0, zIndex: 2,
          animation: "evolve-bg-in 1s ease forwards",
        }}
      >
        <Image
          src={cur.file}
          alt=""
          fill
          style={{ objectFit: "cover", filter: "blur(40px) brightness(0.18) saturate(0.6)", transform: "scale(1.1)" }}
          priority={active === 0}
        />
      </div>

      {/* Gold vertical rule — left */}
      <div style={{
        position: "absolute", left: "6%", top: "10%", bottom: "10%",
        width: 1,
        background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.25) 30%, rgba(201,169,110,0.25) 70%, transparent)",
        zIndex: 10,
      }} />

      {/* ── Main layout ── */}
      <div style={{
        position: "relative", zIndex: 20,
        width: "100%", height: "100%",
        display: "flex", alignItems: "center",
        padding: "0 7%",
        gap: "5%",
      }}>

        {/* LEFT — Image frame */}
        <div style={{ flex: "0 0 auto", position: "relative" }}>
          {/* Corner brackets */}
          {[
            { top: -10, left: -10, borderTop: "1.5px solid rgba(201,169,110,0.6)", borderLeft: "1.5px solid rgba(201,169,110,0.6)" },
            { top: -10, right: -10, borderTop: "1.5px solid rgba(201,169,110,0.6)", borderRight: "1.5px solid rgba(201,169,110,0.6)" },
            { bottom: -10, left: -10, borderBottom: "1.5px solid rgba(201,169,110,0.6)", borderLeft: "1.5px solid rgba(201,169,110,0.6)" },
            { bottom: -10, right: -10, borderBottom: "1.5px solid rgba(201,169,110,0.6)", borderRight: "1.5px solid rgba(201,169,110,0.6)" },
          ].map((s, i) => (
            <div key={i} style={{ position: "absolute", width: 18, height: 18, ...s }} />
          ))}

          {/* Image container */}
          <div style={{
            position: "relative",
            width: "clamp(200px, 28vw, 380px)",
            aspectRatio: "3/4",
            overflow: "hidden",
            background: "#111",
          }}>
            {/* Outgoing image */}
            {prevStyle && (
              <div
                key={`prev-${prev}`}
                style={{
                  position: "absolute", inset: 0,
                  animation: "evolve-img-out 0.65s ease forwards",
                  zIndex: 1,
                }}
              >
                <Image src={prevStyle.file} alt={prevStyle.name} fill style={{ objectFit: "cover" }} />
              </div>
            )}
            {/* Incoming image */}
            <div
              key={`img-${active}`}
              style={{
                position: "absolute", inset: 0,
                animation: "evolve-img-in 0.7s ease forwards",
                zIndex: 2,
              }}
            >
              <Image src={cur.file} alt={cur.name} fill style={{ objectFit: "cover" }} priority={active === 0} />
            </div>

            {/* Sweep shimmer on transition */}
            {transitioning && (
              <div style={{
                position: "absolute", inset: 0, zIndex: 3,
                background: "linear-gradient(105deg, transparent 40%, rgba(201,169,110,0.12) 50%, transparent 60%)",
                animation: "evolve-sweep 0.6s ease forwards",
                pointerEvents: "none",
              }} />
            )}

            {/* Confidence badge */}
            <div style={{
              position: "absolute", bottom: 12, right: 12,
              background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(201,169,110,0.3)",
              padding: "4px 10px",
              zIndex: 5,
              backdropFilter: "blur(6px)",
            }}>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(201,169,110,0.8)" }}>
                AI 匹配 {cur.confidence}%
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — Text info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="sub-headline" style={{ marginBottom: "1.5rem" }}>
            AI 風格推薦 · STYLE ENGINE
          </p>

          {/* Style counter */}
          <p style={{
            fontSize: "0.65rem", letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.2)", marginBottom: "0.75rem",
          }}>
            0{active + 1} / 0{HAIRSTYLES.length}
          </p>

          {/* Name */}
          <div key={`name-${active}`} style={{ animation: "fade-up 0.5s ease forwards" }}>
            <h2 style={{
              fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
              fontWeight: 200,
              letterSpacing: "0.05em",
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: "0.4rem",
            }}>
              {cur.name}
            </h2>
            <p style={{
              fontSize: "clamp(0.55rem, 0.9vw, 0.72rem)",
              letterSpacing: "0.35em",
              color: "rgba(201,169,110,0.5)",
              marginBottom: "1.5rem",
            }}>
              {cur.nameEn}
            </p>

            {/* Divider */}
            <div style={{
              width: 40, height: 1,
              background: "rgba(201,169,110,0.4)",
              marginBottom: "1.5rem",
            }} />

            {/* Description */}
            <p style={{
              fontSize: "clamp(0.75rem, 1.3vw, 0.95rem)",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.06em",
              lineHeight: 1.8,
              marginBottom: "2rem",
              maxWidth: 340,
            }}>
              {cur.desc}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              {cur.tags.map((tag) => (
                <span key={tag} style={{
                  padding: "4px 14px",
                  border: "1px solid rgba(201,169,110,0.25)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.25em",
                  color: "rgba(201,169,110,0.65)",
                  background: "rgba(201,169,110,0.04)",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{
            width: "100%", maxWidth: 280,
            height: 1,
            background: "rgba(255,255,255,0.08)",
            position: "relative",
            marginBottom: "1.5rem",
          }}>
            <div
              key={`bar-${active}`}
              style={{
                position: "absolute", left: 0, top: 0, height: "100%",
                background: "linear-gradient(90deg, var(--gold), var(--gold-light))",
                animation: "evolve-progress 4.5s linear forwards",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Thumbnail strip ── */}
      <div style={{
        position: "absolute",
        bottom: "6%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 30,
        display: "flex",
        gap: "0.75rem",
        alignItems: "center",
      }}>
        {HAIRSTYLES.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              position: "relative",
              width: i === active ? 52 : 38,
              height: i === active ? 70 : 52,
              border: i === active
                ? "1.5px solid rgba(201,169,110,0.7)"
                : "1px solid rgba(255,255,255,0.1)",
              overflow: "hidden",
              cursor: "pointer",
              background: "#111",
              transition: "all 0.4s ease",
              flexShrink: 0,
              padding: 0,
            }}
            aria-label={s.name}
          >
            <Image
              src={s.file}
              alt={s.name}
              fill
              style={{
                objectFit: "cover",
                filter: i === active ? "brightness(1)" : "brightness(0.45) saturate(0.5)",
                transition: "filter 0.4s ease",
              }}
            />
            {i === active && (
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(201,169,110,0.15), transparent)",
              }} />
            )}
          </button>
        ))}
      </div>

      {/* Section headline */}
      <div style={{
        position: "absolute",
        top: "7%",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        zIndex: 20,
        whiteSpace: "nowrap",
      }}>
        <p style={{
          fontSize: "0.6rem",
          letterSpacing: "0.45em",
          color: "rgba(255,255,255,0.15)",
          textTransform: "uppercase",
        }}>
          您的下一款髮型，由演算法與美感共同定義
        </p>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes evolve-img-in {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes evolve-img-out {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.97); }
        }
        @keyframes evolve-bg-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes evolve-sweep {
          from { transform: translateX(-100%); }
          to   { transform: translateX(200%); }
        }
        @keyframes evolve-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
