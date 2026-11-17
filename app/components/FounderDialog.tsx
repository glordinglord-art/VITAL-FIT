"use client";

import { useEffect, useRef, useState } from "react";

interface FounderDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function FounderDialog({ open, onClose }: FounderDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [goal, setGoal] = useState("Recomposición corporal (-grasa / +músculo)");
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
    if (!name.trim() || !contact.trim()) return;
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setName("");
    setContact("");
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="founder-dialog-title"
      className="vf-dialog m-auto w-[calc(100%-2rem)] max-w-[540px] bg-[#000000] text-[#ffffff] border-2 border-[#00f0ff] p-6 sm:p-10 shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-wider text-[#00f0ff]">
            Acceso Anticipado · Cupos Limitados
          </p>
          <h2
            id="founder-dialog-title"
            className="mt-1 text-[28px] sm:text-[34px] font-bold uppercase leading-[0.95] tracking-[-0.02em]"
          >
            RESERVA TU PASE FUNDADOR
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
              PLAZA PRE-RESERVADA PARA {name.toUpperCase()}
            </p>
            <p className="mt-2 text-[16px] leading-relaxed">
              Te contactaremos por <strong>{contact}</strong> en las próximas
              horas para agendar tu diagnóstico inicial y bloquear tu tarifa de
              $49/mes antes de la apertura de la sede física.
            </p>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="w-full h-12 bg-[#ffffff] text-[#000000] font-bold uppercase tracking-wide hover:bg-[#ffffff] transition-colors cursor-pointer"
          >
            Volver a la página
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-[16px] leading-relaxed text-[#ffffff]/85">
            Empiezas el método guiado esta semana y bloqueas tu tarifa de{" "}
            <strong className="text-[#00f0ff]">$49/mes de por vida</strong>{" "}
            para cuando abramos puertas en nuestro gimnasio físico.
          </p>

          <div>
            <label
              htmlFor="vf-name"
              className="block text-[14px] font-bold uppercase tracking-wide mb-1.5"
            >
              Tu nombre completo
            </label>
            <input
              id="vf-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Andrés Morales"
              className="w-full h-12 px-4 bg-[#ffffff] text-[#000000] text-[16px] placeholder:text-[#666666] focus:outline-2 focus:outline-[#00f0ff]"
            />
          </div>

          <div>
            <label
              htmlFor="vf-contact"
              className="block text-[14px] font-bold uppercase tracking-wide mb-1.5"
            >
              WhatsApp o correo electrónico
            </label>
            <input
              id="vf-contact"
              type="text"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="+57 300 000 0000 o correo@ejemplo.com"
              className="w-full h-12 px-4 bg-[#ffffff] text-[#000000] text-[16px] placeholder:text-[#666666] focus:outline-2 focus:outline-[#00f0ff]"
            />
          </div>

          <div>
            <label
              htmlFor="vf-goal"
              className="block text-[14px] font-bold uppercase tracking-wide mb-1.5"
            >
              Objetivo principal a 90 días
            </label>
            <select
              id="vf-goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full h-12 px-4 bg-[#ffffff] text-[#000000] text-[16px] focus:outline-2 focus:outline-[#00f0ff]"
            >
              <option>Recomposición corporal (-grasa / +músculo)</option>
              <option>Ganar fuerza y masa muscular</option>
              <option>Perder peso de forma sostenible</option>
              <option>Empezar desde cero con guía profesional</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full h-14 mt-2 bg-[#00f0ff] text-[#000000] text-[16px] font-bold uppercase tracking-wide hover:bg-[#ffffff] transition-colors cursor-pointer"
          >
            Bloquear mi Pase Fundador · $49/mes
          </button>

          <p className="text-[13px] text-[#ffffff]/70 text-center">
            Sin permanencia forzosa · Garantía total de 30 días.
          </p>
        </form>
      )}
    </dialog>
  );
}
