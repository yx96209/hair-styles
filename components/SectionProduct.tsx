"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PRODUCTS = [
  {
    id: "01",
    name: "液態短鮑伯",
    nameEn: "LIQUID SHORT BOB",
    desc: "流線輪廓如液態金屬般服貼，AI 精準計算下顎黃金比例，打造最利落的都市感短髮。",
    price: "NT$ 2,200",
    image: "/products/short-bob-product.png",
    tag: "人氣首選",
  },
  {
    id: "02",
    name: "鎖骨長鮑伯",
    nameEn: "CLAVI BOB",
    desc: "AI 精準臉型分析，量身打造鎖骨長度鮑伯，修飾臉型比例，打造都市俐落美感。",
    price: "NT$ 3,500",
    image: "/products/bob-product.png",
    tag: "熱門推薦",
  },
  {
    id: "03",
    name: "精品吹整中長髮",
    nameEn: "PREMIUM BLOWOUT",
    desc: "結合 3D 掃描與 AI 蓬鬆分析，以精準層次剪法搭配吹整，實現輕盈飄逸的中長髮造型。",
    price: "NT$ 2,800",
    image: "/products/medium-product.png",
    tag: "新品體驗",
  },
  {
    id: "04",
    name: "長層次蝴蝶剪",
    nameEn: "BUTTERFLY CUT",
    desc: "層次如蝶翼展開，AI 蓬鬆感計算讓髮絲輕盈飛揚，長髮的浪漫與層次感完美並存。",
    price: "NT$ 3,200",
    image: "/products/butterfly-product.png",
    tag: "浪漫推薦",
  },
  {
    id: "05",
    name: "雕塑感自然捲",
    nameEn: "SCULPTURED CURL",
    desc: "順應天然髮質的雕塑美學，以 AI 捲度計算取代強迫改造，展現最自然的個性輪廓。",
    price: "NT$ 4,200",
    image: "/products/curl-product.png",
    tag: "頂級限定",
  },
];

interface SectionProductProps {
  onBuyClick: (productName: string) => void;
}

export default function SectionProduct({ onBuyClick }: SectionProductProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

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
      ctx.fillStyle = "rgba(3,3,3,0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const breathe = 0.5 + 0.5 * Math.sin(frame * 0.012);

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 400 * breathe);
      glow.addColorStop(0, `rgba(201,169,110,${0.025 * breathe})`);
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

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(201,169,110,0.015) 0px, rgba(201,169,110,0.015) 1px, transparent 1px, transparent 100px)," +
            "repeating-linear-gradient(90deg, rgba(201,169,110,0.015) 0px, rgba(201,169,110,0.015) 1px, transparent 1px, transparent 100px)",
        }}
      />

      <div
        style={{
          position: "relative", zIndex: 20,
          width: "100%", height: "100%",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "3% 6%",
          gap: "2rem",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <p className="sub-headline" style={{ marginBottom: "0.75rem" }}>
            服務項目 · TREATMENTS
          </p>
          <h2
            className="headline"
            style={{ color: "#fff", fontSize: "clamp(1.4rem, 3vw, 2.8rem)", marginBottom: "0.4rem" }}
          >
            選擇您的
            <span className="gold-text"> 專屬造型</span>
          </h2>
        </div>

        {/* Product cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "clamp(0.6rem, 1.2vw, 1.2rem)",
            width: "100%",
            maxWidth: 1200,
          }}
        >
          {PRODUCTS.map((product, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                border: hovered === i
                  ? "1px solid rgba(201,169,110,0.5)"
                  : "1px solid rgba(255,255,255,0.06)",
                background: hovered === i
                  ? "rgba(201,169,110,0.04)"
                  : "rgba(255,255,255,0.02)",
                transition: "all 0.35s ease",
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Tag badge */}
              <div
                style={{
                  position: "absolute", top: "1rem", left: "1rem", zIndex: 5,
                  fontSize: "0.5rem", letterSpacing: "0.3em",
                  color: "rgba(201,169,110,0.9)",
                  border: "1px solid rgba(201,169,110,0.35)",
                  padding: "0.25rem 0.6rem",
                  background: "rgba(0,0,0,0.6)",
                }}
              >
                {product.tag}
              </div>

              {/* Product image */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  position: "relative",
                  overflow: "hidden",
                  background: "#0a0a0a",
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{
                    objectFit: "cover",
                    transform: hovered === i ? "scale(1.04)" : "scale(1)",
                    transition: "transform 0.5s ease",
                    filter: "brightness(0.9)",
                  }}
                />
                {/* Scan line on hover */}
                {hovered === i && (
                  <div
                    style={{
                      position: "absolute", left: 0, right: 0,
                      height: 1,
                      background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.8), transparent)",
                      boxShadow: "0 0 8px rgba(201,169,110,0.5)",
                      animation: "scan-sweep 2s linear infinite",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </div>

              {/* Product info */}
              <div
                style={{
                  padding: "0.9rem 0.9rem 1.1rem",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  gap: "0.4rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.45rem", letterSpacing: "0.25em",
                    color: "rgba(201,169,110,0.5)",
                  }}
                >
                  {product.nameEn} · {product.id}
                </p>

                <p
                  style={{
                    fontSize: "clamp(0.8rem, 1.1vw, 1rem)",
                    fontWeight: 300, letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.88)",
                  }}
                >
                  {product.name}
                </p>

                <p
                  style={{
                    fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.38)",
                    lineHeight: 1.65,
                    letterSpacing: "0.03em",
                    flex: 1,
                  }}
                >
                  {product.desc}
                </p>

                {/* Price + CTA — stacked for narrow cards */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    marginTop: "0.4rem",
                    paddingTop: "0.6rem",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
                      fontWeight: 200,
                      letterSpacing: "0.06em",
                      color: "rgba(201,169,110,0.95)",
                    }}
                  >
                    {product.price}
                  </span>

                  <button
                    onClick={() => onBuyClick(product.name)}
                    style={{
                      padding: "0.4rem 0.6rem",
                      border: "1px solid rgba(201,169,110,0.45)",
                      background: hovered === i ? "rgba(201,169,110,0.12)" : "transparent",
                      color: "rgba(201,169,110,0.85)",
                      fontSize: "0.5rem", letterSpacing: "0.18em",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                  >
                    立即購買體驗
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p
          style={{
            fontSize: "0.55rem", letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.15)",
          }}
        >
          所有服務均含 AI 頭型分析 · 價格含稅
        </p>
      </div>
    </section>
  );
}
