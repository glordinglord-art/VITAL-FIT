"use client";

import { useEffect, useRef, useState } from "react";
import { WHATSAPP_DISPLAY, buildWhatsAppUrl } from "../vsl-data";

interface FounderDialogProps {
  open: boolean;
  onClose: () => void;
}

const GOALS = [
  "Perder grasa",
  "Ganar masa muscular",
  "Recomposición corporal (-grasa / +músculo)",
  "Empezar desde cero con guía profesional",
];

const SLOTS = ["Mañana (8am – 12pm)", "Tarde (12pm – 6pm)", "Noche (6pm – 9pm)"];

const inputClass =
  "w-full h-12 px-4 bg-[#ffffff] text-[#000000] text-[16px] placeholder:text-[#666666] focus:outline-2 focus:outline-[#00f0ff]";
const labelClass = "block text-[14px] font-bold uppercase tracking-wide mb-1.5";

export default function FounderDialog({ open, onClose }: FounderDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [goal, setGoal] = useState(GOALS[0]);
  const [slot, setSlot] = useState(SLOTS[1]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const message = [
      "Hola Vital Fit 👋 Vi el video y quiero agendar mi llamada.",
      `• Nombre: ${name.trim()}`,
      `• Teléfono: ${phone.trim()}`,
      city.trim() ? `• Ciudad: ${city.trim()}` : null,
      `• Objetivo: ${goal}`,
      `• Horario preferido: ${slot}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setName("");
    setPhone("");
    setCity("");
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="founder-dialog-title"
      className="vf-dialog m-auto w-[calc(100%-2rem)] max-w-[540px] max-h-[calc(100svh-2rem)] overflow-y-auto bg-[#000000] text-[#ffffff] border-2 border-[#00f0ff] p-6 sm:p-10 shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-wider text-[#00f0ff]">
            Llamada gratuita · Sin compromiso
          </p>
          <h2
            id="founder-dialog-title"
            className="mt-1 text-[28px] sm:text-[34px] font-bold uppercase leading-[0.95] tracking-[-0.02em]"
          >
            AGENDA TU LLAMADA
          </h2>
        </div>
        <button
          type="button"
          onClick={resetAndClose}
          aria-label="Cerrar ventana"
          className="w-10 h-10 bg-[#1a1a1a] text-[#ffffff] hover:bg-[#00f0ff] hover:text-[#000000] font-bold text-[18px] flex items-center justify-center transition-colors cursor-pointer shrink-0"
        >
          ✕
        </button>
      </div>

      {submitted ? (
        <div className="space-y-5 py-2">
          <div className="p-5 bg-[#00f0ff] text-[#000000]">
            <p className="text-[20px] font-bold uppercase leading-tight">
              ¡Listo, {name.trim().split(" ")[0]}!
            </p>
            <p className="mt-2 text-[16px] leading-relaxed">
              Se abrió WhatsApp con tus datos. Solo presiona <strong>enviar</strong> y
              nuestro equipo te confirmará el día y la hora de tu llamada.
            </p>
            <p className="mt-3 text-[15px]">
              ¿No se abrió? Escríbenos directo al <strong>{WHATSAPP_DISPLAY}</strong>.
            </p>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="w-full h-12 bg-[#ffffff] text-[#000000] font-bold uppercase tracking-wide transition-colors cursor-pointer"
          >
            Volver a la página
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-[16px] leading-relaxed text-[#ffffff]/85">
            Déjanos tus datos y uno de nuestros entrenadores te llama para conocer tu
            caso y explicarte el programa de <strong className="text-[#00f0ff]">90 días</strong>.
          </p>

          <div>
            <label htmlFor="vf-name" className={labelClass}>
              Nombre completo
            </label>
            <input
              id="vf-name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Andrés Morales"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="vf-phone" className={labelClass}>
              Teléfono / WhatsApp
            </label>
            <input
              id="vf-phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+57 300 000 0000"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="vf-city" className={labelClass}>
              Ciudad
            </label>
            <input
              id="vf-city"
              type="text"
              autoComplete="address-level2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ej. Bogotá"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="vf-goal" className={labelClass}>
                Tu objetivo
              </label>
              <select
                id="vf-goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className={inputClass}
              >
                {GOALS.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="vf-slot" className={labelClass}>
                Horario para llamarte
              </label>
              <select
                id="vf-slot"
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className={inputClass}
              >
                {SLOTS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-14 mt-2 bg-[#00f0ff] text-[#000000] text-[16px] font-bold uppercase tracking-wide hover:bg-[#ffffff] transition-colors cursor-pointer"
          >
            Agendar mi llamada
          </button>

          <p className="text-[13px] text-[#ffffff]/70 text-center">
            Sin pagos ni compromiso · O escríbenos al{" "}
            <a
              href={buildWhatsAppUrl("Hola Vital Fit, quiero agendar mi llamada.")}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[#00f0ff]"
            >
              {WHATSAPP_DISPLAY}
            </a>
          </p>
        </form>
      )}
    </dialog>
  );
}
