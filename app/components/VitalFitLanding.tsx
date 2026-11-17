"use client";

import Image from "next/image";
import { useState } from "react";
import { FAQS, HOW_IT_WORKS_STAGES, PROOF_NAMES } from "../vsl-data";
import FounderDialog from "./FounderDialog";
import {
  AnimatedCounter,
  Reveal,
  ScrollProgressBar,
} from "./MotionPrimitives";
import ShowcaseStage from "./ShowcaseStage";
import VslPlayer from "./VslPlayer";

export default function VitalFitLanding() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [quickContact, setQuickContact] = useState("");
  const [quickSent, setQuickSent] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickContact.trim()) return;
    setQuickSent(true);
    setQuickContact("");
  };

  return (
    <div className="w-full overflow-x-clip">
      <ScrollProgressBar />
      {/* HERO — Stacked name, two inks (#000000 ground matching the VF logo) */}
      <header className="relative min-h-[100svh] bg-[#000000] text-[#ffffff] flex flex-col justify-between px-4 sm:px-10 pt-6 pb-8 sm:pb-10">
        {/* Top bar */}
        <nav
          aria-label="Navegación principal"
          className="flex items-center justify-between gap-4 text-[15px] font-medium"
        >
          <a href="#" className="flex items-center gap-3 group">
            <Image
              src="/images/vitalfit-logo.jpg"
              alt="Logo Vital Fit"
              width={44}
              height={44}
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
              priority
            />
            <span className="font-bold uppercase tracking-[-0.02em] text-[16px] text-[#ffffff] group-hover:text-[#00f0ff] transition-colors">
              VITAL FIT
            </span>
          </a>

          <div className="flex items-center gap-5 sm:gap-8">
            <a
              href="#vsl-video"
              className="hidden sm:inline hover:text-[#00f0ff] transition-colors"
            >
              El Video
            </a>
            <a
              href="#metodo"
              className="hidden sm:inline hover:text-[#00f0ff] transition-colors"
            >
              El Método
            </a>
            <a
              href="#pase-fundador"
              className="hidden sm:inline hover:text-[#00f0ff] transition-colors"
            >
              Sede Física
            </a>
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="vf-btn-pro h-11 px-5 bg-[#00f0ff] text-[#000000] font-bold uppercase text-[14px] tracking-wide hover:bg-[#ffffff] cursor-pointer"
            >
              Reservar
            </button>
          </div>
        </nav>

        {/* Stacked 2-line Hero Title */}
        <div className="my-auto pt-8 sm:pt-12 flex items-center justify-between gap-8">
          <h1 className="font-bold uppercase tracking-[-0.04em] leading-[0.82] text-[21vw] sm:text-[clamp(110px,15vw,230px)]">
            <span className="mask-line">
              <span className="text-[#00f0ff]">VITAL</span>
            </span>
            <span className="mask-line mask-line-delay">
              <span className="text-[#ffffff]">FIT.</span>
            </span>
          </h1>
        </div>

        {/* Bottom supporting sentence + action */}
        <div className="hero-fade-up flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="hidden sm:flex items-center gap-3 text-[14px] text-[#ffffff]/70">
            <span className="inline-block w-2.5 h-2.5 bg-[#00f0ff]" />
            <span>MÉTODO DE 90 DÍAS · PRÓXIMA SEDE FÍSICA</span>
          </div>
          <div className="flex flex-col sm:items-end sm:text-right gap-4 max-w-[32ch]">
            <p className="text-[16px] sm:text-[18px] leading-[1.45] text-[#ffffff]/90">
              El sistema de fuerza y nutrición que transforma tu físico en 90
              días. Mira el video antes de que abramos nuestra sede física.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:justify-end">
              <a
                href="#vsl-video"
                className="vf-btn-pro inline-flex items-center justify-center h-12 px-6 bg-[#00f0ff] text-[#000000] font-bold uppercase text-[15px] tracking-wide hover:bg-[#ffffff]"
              >
                Ver el video explicativo
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* CHAPTER 1 — Flagship VSL Video Stage (#f2f4f5 ice-white field) */}
        <section
          id="vsl-video"
          aria-label="Video explicativo de Vital Fit"
          className="min-h-[90svh] bg-[#f2f4f5] text-[#000000] px-4 sm:px-10 py-16 sm:py-24 flex flex-col justify-center"
        >
          <div className="w-full max-w-[1360px] mx-auto">
            <Reveal variant="clip">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-8 sm:mb-10">
                <div className="lg:col-span-7">
                  <h2 className="text-[clamp(36px,5.2vw,76px)] font-bold uppercase leading-[0.9] tracking-[-0.03em]">
                    MIRA ESTO
                    <br />
                    <span className="inline-block px-2 bg-[#000000] text-[#00f0ff]">
                      PRIMERO.
                    </span>
                  </h2>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-[17px] sm:text-[19px] leading-[1.5] text-[#000000]/85">
                    En 2 minutos y 40 segundos te explicamos qué es Vital Fit, por
                    qué nuestro protocolo funciona donde otros gimnasios fallan y
                    cómo asegurar tu acceso de fundador antes de la inauguración.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={120} variant="scale">
              <div className="bg-[#000000] p-3 sm:p-5">
                <VslPlayer onOpenReservation={() => setDialogOpen(true)} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* CHAPTER 2 — Showcase: Cards crossing a held photograph (#d2d6d9 field) */}
        <ShowcaseStage />

        {/* CHAPTER 3 — How It Works: Tiles that grow (#ffffff ground) */}
        <section
          id="como-funciona"
          aria-label="Por qué funciona Vital Fit"
          className="min-h-[90svh] bg-[#ffffff] text-[#000000] px-4 sm:px-10 py-16 sm:py-24 flex flex-col justify-center"
        >
          <div className="w-full max-w-[1360px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-2.5 items-end">
              {/* Heading sits in the upper space on desktop */}
              <div className="lg:col-span-7 lg:self-start mb-4 lg:mb-0">
                <h2 className="text-[32px] sm:text-[48px] font-bold uppercase leading-[0.92] tracking-[-0.03em]">
                  POR QUÉ ESTO
                  <br />
                  SÍ FUNCIONA.
                </h2>
                <p className="mt-4 text-[17px] sm:text-[19px] leading-[1.5] max-w-[44ch] text-[#000000]">
                  Cada etapa tiene una métrica exacta. No dependes de ganas ni
                  de adivinar máquinas: sigues una progresión diseñada para
                  responder en 90 días.
                </p>
              </div>

              <div className="hidden lg:block lg:col-span-5" />
            </div>

            {/* 3 Growing Tiles */}
            <div className="mt-8 lg:mt-[-8vh] grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-2.5 items-end">
              {HOW_IT_WORKS_STAGES.map((item, idx) => (
                <Reveal
                  key={item.stage}
                  delayMs={idx * 130}
                  variant="scale"
                  className={item.colSpanClass}
                >
                  <article className="group">
                    <div
                      className={`relative w-full overflow-hidden p-4 sm:p-6 flex items-center justify-center ${item.heightClass}`}
                      style={{ backgroundColor: item.tileBg }}
                    >
                      <div className="relative w-full h-full overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover grayscale contrast-125 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <h3 className="mt-4 text-[18px] sm:text-[20px] font-medium text-[#000000]">
                      {item.stage}
                    </h3>
                    <p className="mt-1.5 text-[16px] leading-[1.45] text-[#5a6065] max-w-[34ch]">
                      {item.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CHAPTER 4 — Proof: Names running off the edges (#00f0ff field) */}
        <section
          aria-label="Resultados reales de miembros"
          className="bg-[#ffffff]"
        >
          <div className="h-[22vh] sm:h-[34vh] bg-[#00f0ff] text-[#000000] flex items-center overflow-hidden">
            <div className="marquee-track">
              {[0, 1].map((dup) => (
                <div
                  key={dup}
                  aria-hidden={dup === 1}
                  className="flex items-center whitespace-nowrap text-[15vw] sm:text-[8vw] font-bold uppercase tracking-[-0.03em] leading-none"
                >
                  {PROOF_NAMES.map((entry) => (
                    <span
                      key={`${dup}-${entry}`}
                      className="inline-flex items-center"
                    >
                      <span>{entry}</span>
                      <span
                        aria-hidden="true"
                        className="inline-block w-[0.26em] h-[0.26em] rounded-full bg-[#000000] mx-[0.35em]"
                      />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="px-4 sm:px-10 py-5 bg-[#ffffff] text-[#000000]">
            <p className="text-[16px] sm:text-[18px] leading-[1.45]">
              Resultados medidos en nuestra primera cohorte piloto con 3
              sesiones semanales de 45 minutos y seguimiento nutricional cada 14
              días.
            </p>
          </div>
        </section>

        {/* CHAPTER 5 — Stats: Photograph with figure tiles (#ffffff + #00f0ff + #000000) */}
        <section
          aria-label="Cifras del método Vital Fit"
          className="bg-[#ffffff] text-[#000000] pt-10 sm:pt-16"
        >
          <div className="px-4 sm:px-10 mb-8 sm:mb-10">
            <h2 className="text-[32px] sm:text-[40px] font-bold uppercase leading-[0.95] tracking-[-0.03em]">
              LOS NÚMEROS NO MIENTEN.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
            {/* Left 2/3 photograph */}
            <div className="lg:col-span-8 relative aspect-[4/3] lg:aspect-auto lg:h-[58vw] max-h-[820px]">
              <Image
                src="/images/gym-architecture.jpg"
                alt="Próxima sede física del gimnasio Vital Fit"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover grayscale contrast-115"
                loading="lazy"
              />
            </div>

            {/* Right 1/3 stacked figure tiles */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 lg:h-[58vw] max-h-[820px]">
              <div className="bg-[#00f0ff] text-[#000000] p-5 sm:p-7 aspect-square lg:aspect-auto flex flex-col justify-start">
                <p className="text-[13vw] lg:text-[clamp(56px,5.6vw,96px)] font-bold leading-[0.9] tracking-[-0.03em] tabular-nums">
                  <AnimatedCounter target={92} suffix="%" />
                </p>
                <p className="mt-3 text-[15px] sm:text-[17px] leading-[1.4] max-w-[24ch]">
                  Adherencia real al completar los primeros 90 días frente al
                  18% del gimnasio tradicional.
                </p>
              </div>

              <div className="bg-[#000000] text-[#ffffff] p-5 sm:p-7 aspect-square lg:aspect-auto flex flex-col justify-start">
                <p className="text-[13vw] lg:text-[clamp(56px,5.6vw,96px)] font-bold leading-[0.9] tracking-[-0.03em] tabular-nums">
                  <AnimatedCounter target={45} suffix="M" />
                </p>
                <p className="mt-3 text-[15px] sm:text-[17px] leading-[1.4] max-w-[24ch]">
                  Duración exacta de cada sesión, 3 veces por semana, sin filas
                  ni tiempo perdido.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 6 — Pricing: The ticket (#d2d6d9 field) */}
        <section
          id="pase-fundador"
          aria-label="Pase Fundador Vital Fit"
          className="min-h-[90svh] bg-[#d2d6d9] text-[#000000] px-5 sm:px-10 py-20 sm:py-28 flex flex-col items-center justify-center"
        >
          <Reveal variant="scale" className="w-full max-w-[1040px]">
            <h2 className="text-[32px] sm:text-[48px] font-bold uppercase leading-[0.92] tracking-[-0.03em] mb-10 text-center">
              ASEGURA TU PASE FUNDADOR.
            </h2>

            {/* Ticket Grid: 7fr / 3fr on desktop, upright on phone */}
            <div className="relative grid grid-cols-1 lg:grid-cols-[7fr_3fr] w-full">
              {/* Main Ticket Body */}
              <div className="relative bg-[#000000] text-[#ffffff] p-7 sm:p-10 flex flex-col justify-between min-h-[260px] lg:min-h-[340px]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[9vw] sm:text-[clamp(36px,3.6vw,56px)] font-bold uppercase leading-[0.92] tracking-[-0.03em]">
                    PASE FUNDADOR
                    <br />
                    VITAL FIT
                  </h3>
                  <Image
                    src="/images/vitalfit-logo.jpg"
                    alt="Sello Vital Fit"
                    width={52}
                    height={52}
                    className="w-11 h-11 sm:w-13 sm:h-13 object-contain shrink-0"
                  />
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[16px] sm:text-[17px] leading-[1.45] text-[#ffffff]/90">
                  <div>
                    <p>· Arranque inmediato del método</p>
                    <p>· Evaluación biomecánica 1-a-1</p>
                    <p>· Nutrición ajustada cada 14 días</p>
                  </div>
                  <div>
                    <p>· Acceso prioritario a sede física</p>
                    <p>· Tarifa congelada de por vida</p>
                    <p>· Garantía total de 30 días</p>
                  </div>
                </div>

                {/* Perforation notches */}
                <span
                  aria-hidden="true"
                  className="hidden lg:block absolute -top-3.5 -right-3.5 w-7 h-7 rounded-full bg-[#d2d6d9] z-10"
                />
                <span
                  aria-hidden="true"
                  className="hidden lg:block absolute -bottom-3.5 -right-3.5 w-7 h-7 rounded-full bg-[#d2d6d9] z-10"
                />
                <span
                  aria-hidden="true"
                  className="lg:hidden absolute -bottom-3.5 -left-3.5 w-7 h-7 rounded-full bg-[#d2d6d9] z-10"
                />
                <span
                  aria-hidden="true"
                  className="lg:hidden absolute -bottom-3.5 -right-3.5 w-7 h-7 rounded-full bg-[#d2d6d9] z-10"
                />
              </div>

              {/* Ticket Stub */}
              <div className="relative bg-[#00f0ff] text-[#000000] p-7 sm:p-8 flex flex-col justify-between items-center text-center border-t-4 lg:border-t-0 lg:border-l-4 border-dotted border-[#d2d6d9]">
                <div className="my-auto py-4">
                  <p className="text-[16vw] lg:text-[clamp(52px,5.2vw,84px)] font-bold leading-[0.88] tracking-[-0.04em] tabular-nums">
                    <AnimatedCounter target={49} prefix="$" />
                  </p>
                  <p className="mt-2 text-[16px] font-bold uppercase tracking-wider">
                    POR MES · SIN MATRÍCULA
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setDialogOpen(true)}
                  className="vf-btn-pro w-full h-14 bg-[#000000] text-[#ffffff] text-[15px] font-bold uppercase tracking-wider hover:bg-[#ffffff] hover:text-[#000000] cursor-pointer"
                >
                  QUIERO MI PLAZA
                </button>
              </div>
            </div>
          </Reveal>
        </section>

        {/* CHAPTER 7 — FAQ: A band per question (no toggles, alternating flat bands) */}
        <section aria-label="Preguntas frecuentes">
          <div className="min-h-[30svh] sm:min-h-[40svh] bg-[#00f0ff] text-[#000000] px-5 sm:px-10 py-10 flex items-end">
            <h2 className="text-[13vw] sm:text-[7vw] font-bold uppercase leading-[0.88] tracking-[-0.03em]">
              PREGUNTAS
              <br />
              CLARAS.
            </h2>
          </div>

          {FAQS.map((faq, idx) => {
            const bg = idx % 2 === 0 ? "bg-[#ffffff]" : "bg-[#f2f4f5]";
            return (
              <div
                key={faq.question}
                className={`${bg} text-[#000000] px-5 sm:px-10 py-8 sm:py-14`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
                  <h3 className="lg:col-span-5 text-[22px] sm:text-[30px] font-bold leading-[1.1] tracking-[-0.02em]">
                    {faq.question}
                  </h3>
                  <p className="lg:col-start-7 lg:col-span-6 text-[17px] sm:text-[18px] leading-[1.5]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        {/* CHAPTER 8 — CTA: The action tile (#ffffff ground) */}
        <section
          aria-label="Reserva tu lugar ahora"
          className="bg-[#ffffff] text-[#000000] py-16 sm:py-24 overflow-hidden"
        >
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 px-4 sm:px-0">
            {/* Left flanking photograph tile */}
            <div className="order-2 lg:order-1 lg:col-span-2 relative h-[120px] lg:h-[360px]">
              <Image
                src="/images/gym-athlete.jpg"
                alt="Atleta preparando barra con magnesio"
                fill
                sizes="(max-width: 1024px) 50vw, 18vw"
                className="object-cover grayscale"
                loading="lazy"
              />
            </div>

            {/* Wide centre accent tile */}
            <div className="order-1 lg:order-2 col-span-2 lg:col-span-8 bg-[#00f0ff] text-[#000000] min-h-[300px] lg:h-[360px] p-6 sm:p-10 flex flex-col justify-center">
              <h2 className="text-[28px] sm:text-[40px] font-bold uppercase leading-[0.95] tracking-[-0.03em]">
                EMPIEZA HOY TU CAMBIO.
              </h2>
              <p className="mt-3 text-[17px] leading-[1.45] max-w-[46ch]">
                Déjanos tu WhatsApp o correo para enviarte el acceso al método y
                asegurar tu prioridad en nuestra nueva sede física.
              </p>

              {quickSent ? (
                <div className="mt-6 p-4 bg-[#000000] text-[#ffffff] max-w-[460px]">
                  <p className="font-bold uppercase text-[15px] text-[#00f0ff]">
                    Recibido. Ya estás en la lista prioritaria.
                  </p>
                  <p className="text-[15px] mt-1">
                    Nuestro equipo te escribirá hoy mismo con los siguientes
                    pasos.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleQuickSubmit}
                  className="mt-6 flex flex-col sm:flex-row w-full max-w-[480px] bg-[#ffffff]"
                >
                  <label htmlFor="quick-contact" className="sr-only">
                    Tu WhatsApp o correo electrónico
                  </label>
                  <input
                    id="quick-contact"
                    type="text"
                    required
                    value={quickContact}
                    onChange={(e) => setQuickContact(e.target.value)}
                    placeholder="Tu WhatsApp o correo..."
                    className="flex-1 h-14 px-4 bg-[#ffffff] text-[#000000] text-[16px] placeholder:text-[#5a6065] focus:outline-2 focus:outline-[#000000]"
                  />
                  <button
                    type="submit"
                    className="h-14 px-6 bg-[#000000] text-[#ffffff] font-bold uppercase text-[14px] tracking-wider hover:bg-[#d2d6d9] hover:text-[#000000] transition-colors cursor-pointer shrink-0"
                  >
                    Solicitar acceso
                  </button>
                </form>
              )}
            </div>

            {/* Right flanking solid colour tile */}
            <div
              aria-hidden="true"
              className="order-3 lg:col-span-2 bg-[#000000] h-[120px] lg:h-[360px] flex items-center justify-center p-6"
            >
              <Image
                src="/images/vitalfit-logo.jpg"
                alt=""
                width={120}
                height={120}
                className="w-20 h-20 lg:w-28 lg:h-28 object-contain"
              />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER — The mark, built large (#000000 field) */}
      <footer className="bg-[#000000] text-[#ffffff] px-4 sm:px-10 pt-14 pb-10">
        {/* Large Geometric Block Wordmark */}
        <div
          aria-label="Vital Fit"
          className="w-full h-[20svh] sm:h-[32svh] flex items-end gap-1"
        >
          {[
            { letter: "V", h: "92%", bg: "#00f0ff", ink: "#000000" },
            { letter: "I", h: "68%", bg: "#ffffff", ink: "#000000" },
            { letter: "T", h: "100%", bg: "#00f0ff", ink: "#000000" },
            { letter: "A", h: "80%", bg: "#d2d6d9", ink: "#000000" },
            { letter: "L", h: "64%", bg: "#00f0ff", ink: "#000000" },
            { letter: "F", h: "96%", bg: "#ffffff", ink: "#000000" },
            { letter: "I", h: "72%", bg: "#d2d6d9", ink: "#000000" },
            { letter: "T", h: "88%", bg: "#00f0ff", ink: "#000000" },
          ].map((block, i) => (
            <Reveal
              key={`${block.letter}-${i}`}
              delayMs={i * 55}
              variant="clip"
              className="flex-1 h-full flex items-end"
            >
              <div
                className="w-full flex items-center justify-center font-bold uppercase text-[9vw] sm:text-[7.5vw] leading-none tracking-[-0.04em] select-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2"
                style={{
                  height: block.h,
                  backgroundColor: block.bg,
                  color: block.ink,
                }}
              >
                {block.letter}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Links & Contact */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-12 gap-8 text-[15px]">
          <div className="lg:col-span-2 space-y-2">
            <p className="font-bold uppercase text-[#00f0ff]">Sistema</p>
            <ul className="space-y-1.5 text-[#ffffff]/80">
              <li>
                <a href="#vsl-video" className="hover:text-[#ffffff]">
                  Video VSL
                </a>
              </li>
              <li>
                <a href="#metodo" className="hover:text-[#ffffff]">
                  Qué es Vital Fit
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-[#ffffff]">
                  Por qué funciona
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-2">
            <p className="font-bold uppercase text-[#00f0ff]">Fundadores</p>
            <ul className="space-y-1.5 text-[#ffffff]/80">
              <li>
                <a href="#pase-fundador" className="hover:text-[#ffffff]">
                  Pase Fundador
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setDialogOpen(true)}
                  className="hover:text-[#ffffff] cursor-pointer text-left"
                >
                  Reservar plaza
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-2">
            <p className="font-bold uppercase text-[#00f0ff]">
              Próxima Sede Física
            </p>
            <p className="text-[#ffffff]/80 leading-relaxed">
              Apertura próximo trimestre · Aforo limitado para miembros
              fundadores con diagnóstico incluido.
            </p>
          </div>

          <div className="col-span-2 lg:col-span-4 space-y-2 lg:text-right text-[#ffffff]/80 flex flex-col lg:items-end">
            <Image
              src="/images/vitalfit-logo.jpg"
              alt="Logo Vital Fit"
              width={48}
              height={48}
              className="w-11 h-11 object-contain"
            />
            <p className="font-bold uppercase text-[#ffffff]">
              hola@vitalfit.club
            </p>
            <p>Atención directa a fundadores · Lun a Sáb</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-[14px] text-[#ffffff]/70">
          <p>© 2026 Vital Fit. Todos los derechos reservados.</p>
          <a
            href="#vsl-video"
            className="px-4 py-2 bg-[#00f0ff] text-[#000000] font-bold uppercase text-[13px] tracking-wide hover:bg-[#ffffff] transition-colors"
          >
            Subir al video ↑
          </a>
        </div>
      </footer>

      <FounderDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}
