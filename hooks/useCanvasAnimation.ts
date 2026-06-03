import { useEffect, useRef } from "react";

/**
 * Runs a canvas animation loop only while the section is visible in the viewport.
 * Pauses via IntersectionObserver when scrolled off-screen, eliminating idle CPU burn
 * from simultaneous rAF loops across all sections.
 */
export function useCanvasAnimation(
  sectionRef: React.RefObject<HTMLElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  draw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, frame: number) => void
) {
  const rafRef = useRef<number>(0);
  const frameRef = useRef(0);
  const activeRef = useRef(false);

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

    const loop = () => {
      if (!activeRef.current) return;
      frameRef.current++;
      draw(ctx, canvas, frameRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!activeRef.current) {
            activeRef.current = true;
            loop();
          }
        } else {
          activeRef.current = false;
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      activeRef.current = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
