"use client";

interface NavDotsProps {
  count: number;
  active: number;
  onDotClick: (index: number) => void;
}

const LABELS = ["覺醒", "掃描", "演化", "降臨", "品牌"];

export default function NavDots({ count, active, onDotClick }: NavDotsProps) {
  return (
    <div className="nav-dots">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          className={`nav-dot ${i === active ? "active" : ""}`}
          onClick={() => onDotClick(i)}
          title={LABELS[i]}
          aria-label={`前往 ${LABELS[i]} 章節`}
        />
      ))}
    </div>
  );
}
