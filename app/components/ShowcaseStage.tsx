"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SHOWCASE_CARDS } from "../vsl-data";

export default function ShowcaseStage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      const p = Math.max(0, Math.min(1, -rect.top / scrollable));
      setProgress(p);
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

  // Travel from right edge across the held photograph
  const translatePercent = progress * -58;

  return (
    <section
      id="metodo"
      aria-label="Qué es Vital Fit"
      className="bg-[#d2d6d9] text-[#000000]"
    >
      {/* Desktop: Sticky scroll-driven horizontal stage (under 3 screens) */}
      <div ref={wrapperRef} className="hidden lg:block relative h-[250svh]">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-center">
          {/* Held darkened B&W gym photograph */}
          <Image
            src="/images/gym-hero-vsl.jpg"
            alt="Sala de entrenamiento Vital Fit"
            fill
            sizes="100vw"
            className="object-cover grayscale brightness-[0.55]"
            loading="lazy"
          />

          {/* Section heading positioned above the card lane so nothing overlaps it */}
          <div className="relative z-10 px-10 mb-6">
            <h2 className="text-[clamp(40px,4.4vw,68px)] font-bold uppercase leading-[0.9] tracking-[-0.03em] text-[#ffffff]">
              QUÉ ES
              <br />
              VITAL FIT.
            </h2>
          </div>

          {/* Horizontal card track */}
          <div className="relative z-10 w-full overflow-visible pl-10">
            <div
              className="flex gap-10 will-change-transform transition-transform duration-75 ease-out"
              style={{ transform: `translate3d(${translatePercent}%, 0, 0)` }}
            >
              {SHOWCASE_CARDS.map((card) => (
                <article
                  key={card.title}
                  className="group shrink-0 w-[680px] h-[490px] flex flex-col overflow-hidden"
                >
                  <div className="relative h-[66%] w-full bg-[#111111] overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      sizes="680px"
                      className="object-cover grayscale transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                  </div>
                  <div
                    className="h-[34%] w-full p-7 flex items-end justify-between gap-6"
                    style={{ backgroundColor: card.bg, color: card.ink }}
                  >
                    <h3 className="text-[clamp(28px,2.5vw,40px)] font-bold uppercase leading-[0.95] tracking-[-0.02em] max-w-[11ch]">
                      {card.title}
                    </h3>
                    <p className="text-[16px] leading-[1.4] text-right max-w-[30ch]">
                      {card.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet: Clean vertical stack, zero pinning */}
      <div className="lg:hidden">
        <div className="relative w-full aspect-[4/5]">
          <Image
            src="/images/gym-hero-vsl.jpg"
            alt="Sala de entrenamiento Vital Fit"
            fill
            sizes="100vw"
            className="object-cover grayscale brightness-[0.58]"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-end p-5">
            <h2 className="text-[9vw] font-bold uppercase leading-[0.9] tracking-[-0.03em] text-[#ffffff]">
              QUÉ ES
              <br />
              VITAL FIT.
            </h2>
          </div>
        </div>

        <div className="px-4 py-8 flex flex-col gap-6">
          {SHOWCASE_CARDS.map((card) => (
            <article key={card.title} className="w-full flex flex-col">
              <div className="relative w-full aspect-[4/3] bg-[#111111]">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover grayscale"
                  loading="lazy"
                />
              </div>
              <div
                className="p-5 flex flex-col gap-2"
                style={{ backgroundColor: card.bg, color: card.ink }}
              >
                <h3 className="text-[26px] font-bold uppercase leading-[0.95] tracking-[-0.02em]">
                  {card.title}
                </h3>
                <p className="text-[16px] leading-[1.45]">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
