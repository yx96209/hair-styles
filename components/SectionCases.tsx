"use client";

import { useState, useCallback } from "react";

const CASES = [
  {
    id: "01",
    name: "顧客 Lin",
    problem: "髮量稀薄，頭頂扁塌，缺乏蓬鬆感",
    suggestion: "推薦「精品吹整中長髮」，以層次製造空氣感",
    result: "視覺蓬鬆度提升 40%",
    satisfaction: 98,
    style: "精品吹整中長髮",
  },
  {
    id: "02",
    name: "顧客 Chen",
    problem: "臉型偏圓，兩頰視覺較寬",
    suggestion: "推薦「鎖骨長鮑伯」，以長度拉伸臉型比例",
    result: "顯臉小效果顯著，已回頭預約 2 次",
    satisfaction: 96,
    style: "鎖骨長鮑伯",
  },
  {
    id: "03",
    name: "顧客 Wu",
    problem: "自然捲難打理，每日耗時 30 分鐘",
    suggestion: "推薦「雕塑感自然捲」，順應髮質減少抵抗",
    result: "日常打理時間縮短至 8 分鐘",
    satisfaction: 99,
    style: "雕塑感自然捲",
  },
];

export default function SectionCases() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const switchCase = useCallback(
    (idx: number) => {
      if (idx === active || animating) return;
      setAnimating(true);
      setTimeout(() => {
        setActive(idx);
        setAnimating(false);
      }, 300);
    },
    [active, animating]
  );

  const cur = CASES[active];

  return (
    <section className="scroll-section" style={{ background: "#040404" }}>
      <div className="noise-overlay" />

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(201,169,110,0.02) 0px, rgba(201,169,110,0.02) 1px, transparent 1px, transparent 80px)," +
            "repeating-linear-gradient(90deg, rgba(201,169,110,0.02) 0px, rgba(201,169,110,0.02) 1px, transparent 1px, transparent 80px)",
        }}
      />

      {/* Section headline */}
      <div
        style={{
          position: "absolute", top: "6%", left: "50%",
          transform: "translateX(-50%)", zIndex: 20, textAlign: "center",
        }}
      >
        <p className="sub-headline">真實案例 · CLIENT STORIES</p>
      </div>

      {/* Main layout */}
      <div
        style={{
          position: "relative", zIndex: 20,
          width: "100%", height: "100%",
          display: "flex", alignItems: "center",
          padding: "0 7%", paddingTop: "5%", gap: "6%",
        }}
      >
        {/* LEFT: case selector */}
        <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {CASES.map((c, i) => (
            <button
              key={i}
              onClick={() => switchCase(i)}
              style={{
                background: "none", border: "none", cursor: "pointer", textAlign: "left",
                padding: "1rem 1.5rem",
                borderLeft: i === active
                  ? "2px solid rgba(201,169,110,0.8)"
                  : "2px solid rgba(255,255,255,0.08)",
                transition: "all 0.3s ease",
              }}
            >
              <p style={{
                fontSize: "0.6rem", letterSpacing: "0.3em",
                color: i === active ? "rgba(201,169,110,0.8)" : "rgba(255,255,255,0.2)",
                marginBottom: "0.3rem", transition: "color 0.3s ease",
              }}>
                案例 {c.id}
              </p>
              <p style={{
                fontSize: "0.75rem", letterSpacing: "0.1em",
                color: i === active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)",
                transition: "color 0.3s ease",
              }}>
                {c.name}
              </p>
            </button>
          ))}
        </div>

        {/* Vertical divider */}
        <div style={{
          width: 1, height: "60%", flexShrink: 0,
          background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.2) 30%, rgba(201,169,110,0.2) 70%, transparent)",
        }} />

        {/* RIGHT: case content */}
        <div
          key={`case-${active}`}
          style={{
            flex: 1,
            opacity: animating ? 0 : 1,
            animation: animating ? undefined : "fade-up 0.4s ease forwards",
            transition: "opacity 0.3s ease",
          }}
        >
          <p style={{
            fontSize: "0.6rem", letterSpacing: "0.4em",
            color: "rgba(201,169,110,0.4)", marginBottom: "2rem",
            textTransform: "uppercase",
          }}>
            {cur.name} · {cur.style}
          </p>

          {/* Three columns */}
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              { label: "問題", content: cur.problem, icon: "—" },
              { label: "AI 建議", content: cur.suggestion, icon: "→" },
              { label: "結果", content: cur.result, icon: "✓" },
            ].map(({ label, content, icon }) => (
              <div key={label} style={{ flex: "1 1 180px", minWidth: 150 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <span style={{ color: "rgba(201,169,110,0.6)", fontSize: "0.65rem" }}>{icon}</span>
                  <p style={{
                    fontSize: "0.6rem", letterSpacing: "0.3em",
                    color: "rgba(201,169,110,0.6)", textTransform: "uppercase",
                  }}>
                    {label}
                  </p>
                </div>
                <p style={{
                  fontSize: "clamp(0.75rem, 1.3vw, 0.95rem)",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.8, letterSpacing: "0.06em",
                }}>
                  {content}
                </p>
              </div>
            ))}
          </div>

          {/* Satisfaction bar */}
          <div style={{ marginTop: "3rem" }}>
            <p style={{
              fontSize: "0.6rem", letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.2)", marginBottom: "0.75rem",
            }}>
              顧客滿意度
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                flex: 1, maxWidth: 280,
                height: 1, background: "rgba(255,255,255,0.08)", position: "relative",
              }}>
                <div style={{
                  position: "absolute", left: 0, top: 0, height: "100%",
                  width: `${cur.satisfaction}%`,
                  background: "linear-gradient(90deg, var(--gold), var(--gold-light))",
                  transition: "width 0.6s ease",
                }} />
              </div>
              <span style={{ fontSize: "0.8rem", color: "rgba(201,169,110,0.8)", fontWeight: 200, letterSpacing: "0.05em" }}>
                {cur.satisfaction}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{
        position: "absolute", bottom: "5%", left: "50%",
        transform: "translateX(-50%)", zIndex: 20,
        fontSize: "0.55rem", letterSpacing: "0.2em",
        color: "rgba(255,255,255,0.12)",
      }}>
        所有案例已取得當事人授權
      </div>
    </section>
  );
}
