"use client";

import React, { useEffect, useRef, useState } from "react";

const PRODUCT_OPTIONS = [
  "液態短鮑伯 — NT$ 2,200",
  "鎖骨長鮑伯 — NT$ 3,500",
  "精品吹整中長髮 — NT$ 2,800",
  "長層次蝴蝶剪 — NT$ 3,200",
  "雕塑感自然捲 — NT$ 4,200",
];

interface SectionPurchaseProps {
  defaultProduct?: string;
}

export default function SectionPurchase({ defaultProduct }: SectionPurchaseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    product: defaultProduct
      ? PRODUCT_OPTIONS.find((o) => o.startsWith(defaultProduct)) ?? PRODUCT_OPTIONS[0]
      : PRODUCT_OPTIONS[0],
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  useEffect(() => {
    if (defaultProduct) {
      const match = PRODUCT_OPTIONS.find((o) => o.startsWith(defaultProduct));
      if (match) setForm((f) => ({ ...f, product: match }));
    }
  }, [defaultProduct]);

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
      ctx.fillStyle = "rgba(3,3,3,0.09)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const b = 0.5 + 0.5 * Math.sin(frame * 0.016);
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 350 * b);
      grd.addColorStop(0, `rgba(201,169,110,${0.03 * b})`);
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
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

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "請輸入姓名";
    if (!form.phone.trim()) e.phone = "請輸入電話";
    else if (!/^[\d\s\-+()]{8,}$/.test(form.phone.trim())) e.phone = "請輸入有效電話號碼";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(201,169,110,0.2)",
    color: "rgba(255,255,255,0.8)",
    padding: "0.85rem 1.1rem",
    fontSize: "0.8rem",
    letterSpacing: "0.06em",
    outline: "none",
    transition: "border-color 0.25s ease",
    appearance: "none" as const,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.55rem",
    letterSpacing: "0.35em",
    color: "rgba(201,169,110,0.55)",
    marginBottom: "0.45rem",
    display: "block",
  };

  const errorStyle: React.CSSProperties = {
    fontSize: "0.55rem",
    letterSpacing: "0.15em",
    color: "rgba(255,80,80,0.75)",
    marginTop: "0.3rem",
  };

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="scroll-section" style={{ background: "#030303" }}>
      <canvas ref={canvasRef} className="canvas-cover" />
      <div className="noise-overlay" />

      <div
        style={{
          position: "relative", zIndex: 20,
          width: "100%", height: "100%",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "4% 6%",
        }}
      >
        <p className="sub-headline" style={{ marginBottom: "1.5rem" }}>
          購買體驗 · BOOKING
        </p>

        <h2
          className="headline"
          style={{
            color: "#fff",
            fontSize: "clamp(1.3rem, 2.5vw, 2.4rem)",
            marginBottom: "2.5rem",
            textAlign: "center",
          }}
        >
          填寫
          <span className="gold-text"> 購買資訊</span>
        </h2>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%", maxWidth: 480,
              display: "flex", flexDirection: "column", gap: "1.4rem",
            }}
          >
            {/* 姓名 */}
            <div>
              <label style={labelStyle} htmlFor="purchase-name">姓名 NAME</label>
              <input
                id="purchase-name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="請輸入您的姓名"
                style={{
                  ...inputStyle,
                  borderColor: errors.name
                    ? "rgba(255,80,80,0.5)"
                    : "rgba(201,169,110,0.2)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.6)")}
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = errors.name
                    ? "rgba(255,80,80,0.5)"
                    : "rgba(201,169,110,0.2)")
                }
              />
              {errors.name && <p style={errorStyle}>{errors.name}</p>}
            </div>

            {/* 電話 */}
            <div>
              <label style={labelStyle} htmlFor="purchase-phone">電話 PHONE</label>
              <input
                id="purchase-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+886 09xx-xxx-xxx"
                style={{
                  ...inputStyle,
                  borderColor: errors.phone
                    ? "rgba(255,80,80,0.5)"
                    : "rgba(201,169,110,0.2)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.6)")}
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = errors.phone
                    ? "rgba(255,80,80,0.5)"
                    : "rgba(201,169,110,0.2)")
                }
              />
              {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
            </div>

            {/* 購買商品 */}
            <div>
              <label style={labelStyle} htmlFor="purchase-product">購買商品 PRODUCT</label>
              <div style={{ position: "relative" }}>
                <select
                  id="purchase-product"
                  value={form.product}
                  onChange={(e) => setForm({ ...form, product: e.target.value })}
                  style={{
                    ...inputStyle,
                    cursor: "pointer",
                    paddingRight: "2.5rem",
                  }}
                >
                  {PRODUCT_OPTIONS.map((opt) => (
                    <option
                      key={opt}
                      value={opt}
                      style={{ background: "#0a0a0a", color: "#fff" }}
                    >
                      {opt}
                    </option>
                  ))}
                </select>
                {/* Arrow icon */}
                <svg
                  style={{
                    position: "absolute", right: "1rem", top: "50%",
                    transform: "translateY(-50%)", pointerEvents: "none",
                    width: 12, height: 12,
                  }}
                  viewBox="0 0 12 8"
                  fill="none"
                >
                  <path d="M1 1L6 7L11 1" stroke="rgba(201,169,110,0.55)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                marginTop: "0.5rem",
                padding: "0.9rem 2rem",
                border: "1px solid rgba(201,169,110,0.55)",
                background: "rgba(201,169,110,0.08)",
                color: "rgba(201,169,110,0.95)",
                fontSize: "0.7rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease",
                width: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(201,169,110,0.18)";
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(201,169,110,0.08)";
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.55)";
              }}
            >
              確認購買體驗
            </button>

            {/* Customer service email */}
            <div
              style={{
                textAlign: "center",
                paddingTop: "0.5rem",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <p
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.25em",
                  color: "rgba(255,255,255,0.2)",
                  marginBottom: "0.35rem",
                }}
              >
                客服信箱 SUPPORT
              </p>
              <a
                href="mailto:aurum@yx209.net"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  color: "rgba(201,169,110,0.6)",
                  textDecoration: "none",
                  transition: "color 0.25s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(201,169,110,0.95)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(201,169,110,0.6)")}
              >
                aurum@yx209.net
              </a>
            </div>
          </form>
        ) : (
          /* Success state */
          <div
            style={{
              textAlign: "center",
              animation: "fade-up 0.6s ease forwards",
            }}
          >
            {/* Success icon */}
            <div
              style={{
                width: 72, height: 72, margin: "0 auto 2rem",
                border: "1px solid rgba(201,169,110,0.4)",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(201,169,110,0.06)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="rgba(201,169,110,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h3
              style={{
                fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                fontWeight: 200, letterSpacing: "0.1em",
                color: "#fff", marginBottom: "1rem",
              }}
            >
              預約
              <span className="gold-text"> 成功</span>
            </h3>
            <p
              style={{
                fontSize: "0.8rem", letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.45)", lineHeight: 1.9,
                marginBottom: "0.5rem",
              }}
            >
              感謝 <span style={{ color: "rgba(201,169,110,0.8)" }}>{form.name}</span> 的購買<br />
              我們將盡快以 <span style={{ color: "rgba(201,169,110,0.8)" }}>{form.phone}</span> 與您聯繫確認
            </p>
            <p
              style={{
                fontSize: "0.65rem", letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.22)",
              }}
            >
              選購項目：{form.product}
            </p>

            {/* Customer service email in success */}
            <div style={{ marginTop: "2rem" }}>
              <p style={{ fontSize: "0.55rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.2)", marginBottom: "0.35rem" }}>
                如有疑問，歡迎聯繫客服
              </p>
              <a
                href="mailto:aurum@yx209.net"
                style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "rgba(201,169,110,0.6)", textDecoration: "none" }}
              >
                aurum@yx209.net
              </a>
            </div>

            <button
              onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", product: PRODUCT_OPTIONS[0] }); }}
              style={{
                marginTop: "2.5rem",
                padding: "0.65rem 2rem",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "transparent",
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.55rem", letterSpacing: "0.3em",
                cursor: "pointer", transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >
              再次預約
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
