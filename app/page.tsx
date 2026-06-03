"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import NavDots from "@/components/NavDots";

const SectionAwaken = dynamic(() => import("@/components/SectionAwaken"), { ssr: false });
const SectionScan = dynamic(() => import("@/components/SectionScan"), { ssr: false });
const SectionEvolve = dynamic(() => import("@/components/SectionEvolve"), { ssr: false });
const SectionArrive = dynamic(() => import("@/components/SectionArrive"), { ssr: false });
const SectionCases = dynamic(() => import("@/components/SectionCases"), { ssr: false });
const SectionProduct = dynamic(() => import("@/components/SectionProduct"), { ssr: false });
const SectionContact = dynamic(() => import("@/components/SectionContact"), { ssr: false });
const SectionPurchase = dynamic(() => import("@/components/SectionPurchase"), { ssr: false });
const SectionFinal = dynamic(() => import("@/components/SectionFinal"), { ssr: false });

const SECTION_COUNT = 9;
const PURCHASE_SECTION_INDEX = 7;

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(undefined);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollTop = el.scrollTop;
    const totalHeight = el.scrollHeight - el.clientHeight;
    const pct = totalHeight > 0 ? scrollTop / totalHeight : 0;
    setProgress(pct * 100);

    const sectionIndex = Math.round(scrollTop / el.clientHeight);
    setActiveSection(Math.min(sectionIndex, SECTION_COUNT - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: index * el.clientHeight, behavior: "smooth" });
  }, []);

  const handleBuyClick = useCallback((productName?: string) => {
    if (productName) setSelectedProduct(productName);
    scrollToSection(PURCHASE_SECTION_INDEX);
  }, [scrollToSection]);

  return (
    <>
      {/* Progress bar */}
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      {/* Nav dots */}
      <NavDots
        count={SECTION_COUNT}
        active={activeSection}
        onDotClick={scrollToSection}
      />

      {/* Scroll container */}
      <div className="scroll-container" ref={scrollRef}>
        <SectionAwaken />
        <SectionScan />
        <SectionEvolve />
        <SectionArrive />
        <SectionCases />
        <SectionProduct onBuyClick={handleBuyClick} />
        <SectionContact onBuyClick={() => handleBuyClick()} />
        <SectionPurchase defaultProduct={selectedProduct} />
        <SectionFinal />
      </div>
    </>
  );
}
