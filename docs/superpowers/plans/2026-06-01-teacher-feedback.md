# Teacher Feedback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add case studies, booking flow template, data statistics, and contact info to the AURUM hair brand site per teacher feedback.

**Architecture:** Two new full-screen sections (SectionCases, SectionContact) are inserted between SectionArrive and SectionFinal. Two existing sections (SectionScan, SectionEvolve) get data enhancements. NavDots and page.tsx are updated to accommodate 7 sections total.

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, Canvas API

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `components/NavDots.tsx` | Modify | Add 2 new dot labels ("案例", "預約") |
| `components/SectionScan.tsx` | Modify | Add CUSTOMERS SERVED + AVG SESSION to HUD |
| `components/SectionEvolve.tsx` | Modify | Add recommendCount per style + satisfaction bar |
| `components/SectionCases.tsx` | Create | 3-case story section with left selector + right detail |
| `components/SectionContact.tsx` | Create | 4-step booking flow + contact info + CTA button |
| `app/page.tsx` | Modify | Import new sections, update SECTION_COUNT to 7 |

---

## Task 1: Update NavDots to support 7 sections

**Files:**
- Modify: `components/NavDots.tsx:9`

- [ ] **Step 1: Update LABELS array**

Replace line 9 in `components/NavDots.tsx`:

```tsx
const LABELS = ["覺醒", "掃描", "演化", "降臨", "案例", "預約", "品牌"];
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:3000 — confirm nav dots still show correctly (still 5 dots since SECTION_COUNT hasn't changed yet).

- [ ] **Step 3: Commit**

```bash
git add components/NavDots.tsx
git commit -m "feat: extend NavDots labels for 7 sections"
```

---

## Task 2: Enhance SectionScan with business statistics

**Files:**
- Modify: `components/SectionScan.tsx:198-202`

- [ ] **Step 1: Add two new HUD lines to the left panel**

In `components/SectionScan.tsx`, find the left HUD `<div>` (around line 198) that currently reads:

```tsx
<div>SCAN STATUS: ACTIVE</div>
<div>RESOLUTION: 0.01mm</div>
<div>POINTS: 247,832</div>
```

Replace with:

```tsx
<div>SCAN STATUS: ACTIVE</div>
<div>RESOLUTION: 0.01mm</div>
<div>POINTS: 247,832</div>
<div style={{ marginTop: "0.5rem", color: "rgba(201,169,110,0.7)" }}>CUSTOMERS SERVED: 12,400+</div>
<div>AVG SESSION: 4.2 min</div>
```

- [ ] **Step 2: Verify in browser**

Navigate to the Scan section (second section). Confirm the two new lines appear in the top-left HUD in slightly brighter gold for CUSTOMERS SERVED.

- [ ] **Step 3: Commit**

```bash
git add components/SectionScan.tsx
git commit -m "feat: add business stats to SectionScan HUD"
```

---

## Task 3: Enhance SectionEvolve with recommendation counts and satisfaction rate

**Files:**
- Modify: `components/SectionEvolve.tsx:6-52` (HAIRSTYLES data), `components/SectionEvolve.tsx:320-335` (tags section), `components/SectionEvolve.tsx:337-354` (progress bar area)

- [ ] **Step 1: Add recommendCount to HAIRSTYLES data**

In `components/SectionEvolve.tsx`, update the HAIRSTYLES array to add `recommendCount` to each entry:

```tsx
const HAIRSTYLES = [
  {
    id: 0,
    name: "液態短鮑伯",
    nameEn: "LIQUID SHORT BOB",
    desc: "流線型輪廓，如液態金屬般服貼",
    tags: ["俐落", "現代", "低維護"],
    file: "/hair-styles/液態短鮑伯.png",
    confidence: 97,
    recommendCount: 3210,
  },
  {
    id: 1,
    name: "鎖骨長鮑伯",
    nameEn: "COLLARBONE LONG BOB",
    desc: "恰到好處的長度，修飾臉型與頸線",
    tags: ["優雅", "百搭", "顯臉小"],
    file: "/hair-styles/鎖骨長鮑伯.png",
    confidence: 94,
    recommendCount: 2840,
  },
  {
    id: 2,
    name: "長層次蝴蝶剪",
    nameEn: "LONG BUTTERFLY CUT",
    desc: "層次如蝶翼展開，賦予髮絲蓬鬆感",
    tags: ["浪漫", "層次", "蓬鬆"],
    file: "/hair-styles/長層次蝴蝶剪.png",
    confidence: 91,
    recommendCount: 1990,
  },
  {
    id: 3,
    name: "雕塑感自然捲",
    nameEn: "SCULPTURED NATURAL CURL",
    desc: "保留髮絲的自然彈性，雕塑立體輪廓",
    tags: ["個性", "立體", "自然"],
    file: "/hair-styles/雕塑感自然捲.png",
    confidence: 89,
    recommendCount: 1560,
  },
  {
    id: 4,
    name: "精品吹整中長髮",
    nameEn: "PREMIUM BLOWOUT MID",
    desc: "沙龍級吹整，絲滑光澤自然垂墜",
    tags: ["光澤", "柔順", "氣質"],
    file: "/hair-styles/精品吹整中長髮.png",
    confidence: 96,
    recommendCount: 2800,
  },
];
```

- [ ] **Step 2: Add recommend count line after tags**

In `components/SectionEvolve.tsx`, find the tags `<div>` block (around line 321) that ends with `marginBottom: "2.5rem"`. After the closing `</div>` of the tags block, add:

```tsx
{/* Recommend count */}
<p style={{
  fontSize: "0.6rem",
  letterSpacing: "0.25em",
  color: "rgba(255,255,255,0.2)",
  marginBottom: "1.5rem",
}}>
  本款已推薦{" "}
  <span style={{ color: "rgba(201,169,110,0.6)" }}>
    {cur.recommendCount.toLocaleString()}
  </span>
  {" "}位顧客
</p>
```

- [ ] **Step 3: Replace progress bar area with satisfaction rate bar**

In `components/SectionEvolve.tsx`, find the progress bar `<div>` (around line 337) and replace it with:

```tsx
{/* Satisfaction rate */}
<p style={{
  fontSize: "0.55rem",
  letterSpacing: "0.3em",
  color: "rgba(255,255,255,0.18)",
  marginBottom: "0.6rem",
  textTransform: "uppercase",
}}>
  全體顧客滿意度 · 97.8%
</p>
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
```

- [ ] **Step 4: Verify in browser**

Navigate to the Evolve section. Confirm:
- Recommend count line appears below the tags for each style
- Satisfaction rate label appears above the progress bar
- Auto-cycling still works

- [ ] **Step 5: Commit**

```bash
git add components/SectionEvolve.tsx
git commit -m "feat: add recommend counts and satisfaction rate to SectionEvolve"
```

---

## Task 4: Create SectionCases

**Files:**
- Create: `components/SectionCases.tsx`

- [ ] **Step 1: Create the file**

Create `components/SectionCases.tsx` with the following content:

```tsx
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
```

- [ ] **Step 2: Verify the file was created**

```bash
ls components/SectionCases.tsx
```

Expected: file listed.

- [ ] **Step 3: Commit**

```bash
git add components/SectionCases.tsx
git commit -m "feat: add SectionCases with 3 client story cards"
```

---

## Task 5: Create SectionContact

**Files:**
- Create: `components/SectionContact.tsx`

- [ ] **Step 1: Create the file**

Create `components/SectionContact.tsx` with the following content:

```tsx
"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  { num: "01", icon: "◎", title: "3D 頭型掃描", sub: "約 4 分鐘" },
  { num: "02", icon: "⬡", title: "AI 深度分析", sub: "即時運算" },
  { num: "03", icon: "✦", title: "髮型方案推薦", sub: "3 款客製選擇" },
  { num: "04", icon: "✂", title: "精準剪造完成", sub: "享受專屬成果" },
];

export default function SectionContact() {
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
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="scroll-section" style={{ background: "#030303" }}>
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
              立即預約體驗
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify the file was created**

```bash
ls components/SectionContact.tsx
```

Expected: file listed.

- [ ] **Step 3: Commit**

```bash
git add components/SectionContact.tsx
git commit -m "feat: add SectionContact with booking flow and contact info"
```

---

## Task 6: Wire up new sections in page.tsx

**Files:**
- Modify: `app/page.tsx:1-12` (imports), `app/page.tsx:13` (SECTION_COUNT), `app/page.tsx:60-64` (scroll container children)

- [ ] **Step 1: Update imports and SECTION_COUNT**

In `app/page.tsx`, replace the existing dynamic imports and SECTION_COUNT with:

```tsx
const SectionAwaken = dynamic(() => import("@/components/SectionAwaken"), { ssr: false });
const SectionScan = dynamic(() => import("@/components/SectionScan"), { ssr: false });
const SectionEvolve = dynamic(() => import("@/components/SectionEvolve"), { ssr: false });
const SectionArrive = dynamic(() => import("@/components/SectionArrive"), { ssr: false });
const SectionCases = dynamic(() => import("@/components/SectionCases"), { ssr: false });
const SectionContact = dynamic(() => import("@/components/SectionContact"), { ssr: false });
const SectionFinal = dynamic(() => import("@/components/SectionFinal"), { ssr: false });

const SECTION_COUNT = 7;
```

- [ ] **Step 2: Add new sections to scroll container**

In `app/page.tsx`, find the scroll container children (around line 60) and replace with:

```tsx
<div className="scroll-container" ref={scrollRef}>
  <SectionAwaken />
  <SectionScan />
  <SectionEvolve />
  <SectionArrive />
  <SectionCases />
  <SectionContact />
  <SectionFinal />
</div>
```

- [ ] **Step 3: Verify in browser**

Open http://localhost:3000 and scroll through all sections:
1. ✓ Awaken — hero with sensor rings
2. ✓ Scan — 3D head, HUD shows CUSTOMERS SERVED: 12,400+
3. ✓ Evolve — hairstyles with recommend counts and satisfaction rate label
4. ✓ Arrive — machine illustration
5. ✓ Cases — 3 case selector with 問題/AI建議/結果 columns, clicking switches cases
6. ✓ Contact — 4-step flow icons with dashed connectors, contact info, gold CTA button
7. ✓ Final — AURUM brand close
8. ✓ NavDots shows 7 dots on the right side

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire up SectionCases and SectionContact, set section count to 7"
```
