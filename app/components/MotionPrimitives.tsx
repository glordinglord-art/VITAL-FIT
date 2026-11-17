"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Electric cyan scroll-progress bar pinned to the very top edge.
 */
export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      const el = barRef.current;
      if (!el) return;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
      el.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full w-full bg-[#00f0ff] origin-left will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

interface RevealProps {
  children: ReactNode;
  delayMs?: number;
  variant?: "rise" | "clip" | "scale";
  className?: string;
}

/**
 * GPU-composited scroll-triggered reveal using IntersectionObserver.
 */
export function Reveal({
  children,
  delayMs = 0,
  variant = "rise",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenClass =
    variant === "scale"
      ? "opacity-0 scale-[0.95] translate-y-4"
      : variant === "clip"
      ? "opacity-0 translate-y-10"
      : "opacity-0 translate-y-7";

  const visibleClass = "opacity-100 scale-100 translate-y-0";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-[opacity,transform] duration-[760ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] ${
        visible ? visibleClass : hiddenClass
      } ${className}`}
    >
      {children}
    </div>
  );
}

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}

/**
 * Smooth easeOutExpo number counter triggered when scrolled into view.
 */
export function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  durationMs = 1150,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(target);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const t = Math.min(1, elapsed / durationMs);
            const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            setValue(Math.round(eased * target));
            if (t < 1) {
              requestAnimationFrame(tick);
            }
          };

          setValue(0);
          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
