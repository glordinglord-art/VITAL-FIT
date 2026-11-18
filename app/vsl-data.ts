export interface VslBeat {
  atSeconds: number;
  headline: string;
  caption: string;
  emphasis?: string;
}

export interface VslChapter {
  id: string;
  code: string;
  title: string;
  durationSeconds: number;
  startSeconds: number;
  image: string;
  imageAlt: string;
  accentColor: string;
  beats: VslBeat[];
}

export const VSL_TOTAL_SECONDS = 188;

// WhatsApp de Vital Fit para agendar llamadas
export const WHATSAPP_NUMBER = "573224176536";
export const WHATSAPP_DISPLAY = "+57 322 417 6536";
export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// Local MP4 served from public/video/vitalfit-vsl.mp4
export const VSL_VIDEO_URL: string | null = "/video/vitalfit-vsl.mp4";

// Capítulos sincronizados con lo que se dice en el video (transcripción real)
export const VSL_CHAPTERS: VslChapter[] = [
  {
    id: "problema",
    code: "CAPÍTULO I",
    title: "8 de cada 10 abandonan el gimnasio en 3 meses",
    durationSeconds: 61,
    startSeconds: 0,
    image: "/images/gym-hero-vsl.jpg",
    imageAlt: "Sala de entrenamiento minimalista con barra olímpica bajo luz cenital",
    accentColor: "#00f0ff",
    beats: [
      {
        atSeconds: 0,
        headline: "8 DE CADA 10 ABANDONAN ANTES DE LOS 3 MESES.",
        caption: "No lo sacamos de internet: lo hemos visto en nuestros años como entrenadores deportivos.",
        emphasis: "El ciclo de la frustración.",
      },
      {
        atSeconds: 36,
        headline: "NO SOLO PIERDES DINERO. PIERDES TIEMPO Y CONFIANZA.",
        caption: "Cada vez que te prometes cambiar y no lo haces, tu palabra pierde valor y te alejas de la persona que te prometiste ser.",
        emphasis: "Y eso golpea tu confianza.",
      },
    ],
  },
  {
    id: "modelo",
    code: "CAPÍTULO II",
    title: "No es tu carácter: es el modelo del gimnasio",
    durationSeconds: 36,
    startSeconds: 61,
    image: "/images/gym-coaching.jpg",
    imageAlt: "Entrenador corrigiendo la postura de un atleta durante levantamiento de fuerza",
    accentColor: "#00f0ff",
    beats: [
      {
        atSeconds: 61,
        headline: "MÁQUINAS PRESTADAS Y UNA RUTINA GENÉRICA.",
        caption: "Mueves peso por inercia, cargas por ego y entrenas sin objetivos.",
        emphasis: "La receta perfecta para la frustración.",
      },
      {
        atSeconds: 82,
        headline: "SIN OBJETIVO CLARO NI SEGUIMIENTO.",
        caption: "Personas entrenando sin sentido y sin un seguimiento que les permita avanzar.",
        emphasis: "Así nadie progresa.",
      },
    ],
  },
  {
    id: "sistema",
    code: "CAPÍTULO III",
    title: "Vital Fit Labs: 90 días, 3 pilares y 3 entrenadores",
    durationSeconds: 59,
    startSeconds: 97,
    image: "/images/gym-athlete.jpg",
    imageAlt: "Manos con magnesio sujetando una barra de acero moleteado",
    accentColor: "#ffffff",
    beats: [
      {
        atSeconds: 97,
        headline: "PROGRAMA DE TRANSFORMACIÓN DE 90 DÍAS.",
        caption: "Tres pilares: entrenamiento, recuperación y alimentación, con plataforma tecnológica y acompañamiento de entrenadores.",
        emphasis: "Vital Fit Labs.",
      },
      {
        atSeconds: 119,
        headline: "NO TENDRÁS UN ENTRENADOR. TENDRÁS TRES.",
        caption: "Auditamos tu proceso en 3 niveles: nutrición, entreno y descanso en la app; biometría y técnica cada semana; y recalibración mensual.",
        emphasis: "Para que nunca dejes de avanzar.",
      },
    ],
  },
  {
    id: "garantia",
    code: "CAPÍTULO IV",
    title: "Garantía de resultados: agenda tu llamada",
    durationSeconds: 32,
    startSeconds: 156,
    image: "/images/gym-architecture.jpg",
    imageAlt: "Interior arquitectónico de gimnasio boutique con racks y luz natural",
    accentColor: "#00f0ff",
    beats: [
      {
        atSeconds: 156,
        headline: "SI CUMPLES EL 90% Y NO HAY RESULTADOS, TE DEVOLVEMOS TU DINERO.",
        caption: "Y además te seguimos entrenando gratis hasta que cumplas tus objetivos.",
        emphasis: "Garantía total de resultados.",
      },
      {
        atSeconds: 173,
        headline: "NOS COMPROMETEMOS 90 DÍAS CONTIGO.",
        caption: "Buscamos personas cansadas del ciclo que quieran resultados reales. Agenda tu llamada aquí abajo.",
        emphasis: "Nos vemos adentro.",
      },
    ],
  },
];

export const SHOWCASE_CARDS = [
  {
    title: "Diagnóstico Inicial",
    description:
      "Mapeamos tu movilidad, fuerza base y composición corporal antes de asignar tu primera serie.",
    image: "/images/gym-coaching.jpg",
    imageAlt: "Evaluación biomecánica con entrenador",
    bg: "#00f0ff",
    ink: "#000000",
  },
  {
    title: "Progresión Trazada",
    description:
      "Tres sesiones de 45 minutos por semana. Cada kilo, cada repetición y cada descanso calculados.",
    image: "/images/gym-athlete.jpg",
    imageAlt: "Agarre de barra olímpica con magnesio",
    bg: "#d2d6d9",
    ink: "#000000",
  },
  {
    title: "Nutrición Real",
    description:
      "Ajustes quincenales según tu respuesta metabólica, sin eliminar tus comidas sociales.",
    image: "/images/gym-hero-vsl.jpg",
    imageAlt: "Entorno de entrenamiento de alto rendimiento",
    bg: "#ffffff",
    ink: "#000000",
  },
  {
    title: "Próxima Sede Física",
    description:
      "Acceso prioritario al gimnasio físico Vital Fit sin matrículas ni esperas frente a máquinas.",
    image: "/images/gym-architecture.jpg",
    imageAlt: "Arquitectura del próximo gimnasio Vital Fit",
    bg: "#000000",
    ink: "#ffffff",
  },
];

export const HOW_IT_WORKS_STAGES = [
  {
    stage: "Día 1 · Auditoría",
    text: "Evaluamos tu punto de partida real y fijamos cargas exactas. Cero adivinanzas desde la primera sesión.",
    image: "/images/gym-coaching.jpg",
    imageAlt: "Sesión de diagnóstico inicial",
    tileBg: "#d2d6d9",
    heightClass: "lg:h-[30vh] h-[34vw]",
    colSpanClass: "lg:col-span-3",
  },
  {
    stage: "Semana 4 · Tracción",
    text: "Tu fuerza sube cada semana, la ropa cede en cintura y el hábito ya funciona en piloto automático.",
    image: "/images/gym-athlete.jpg",
    imageAlt: "Progreso en entrenamiento de fuerza",
    tileBg: "#00f0ff",
    heightClass: "lg:h-[44vh] h-[46vw]",
    colSpanClass: "lg:col-span-4",
  },
  {
    stage: "Día 90 · Resultado",
    text: "Transformación física visible y acceso preferente a nuestra próxima sede física.",
    image: "/images/gym-architecture.jpg",
    imageAlt: "Instalación del nuevo gimnasio Vital Fit",
    tileBg: "#000000",
    heightClass: "lg:h-[60vh] h-[62vw]",
    colSpanClass: "lg:col-span-5",
  },
];

export const PROOF_NAMES = [
  "CARLOS M. −11 KG EN 90 DÍAS",
  "LAURA R. +4.2 KG MASA MAGRA",
  "DIEGO S. 3X FUERZA EN SENTADILLA",
  "SOFÍA V. CERO DOLOR LUMBAR",
  "MATEO G. −9 CM DE CINTURA",
  "VALERIA P. 94% ADHERENCIA",
];

export const FAQS = [
  {
    question: "¿Cuándo abre exactamente el gimnasio físico de Vital Fit?",
    answer:
      "Estamos ultimando obra e instalación de racks calibrados para abrir puertas en el próximo trimestre. Agenda tu llamada hoy y empieza de inmediato con el programa de 90 días; los primeros miembros tendrán prioridad cuando abramos la sede.",
  },
  {
    question: "¿Por qué debería funcionar si ya probé otros gimnasios y abandoné?",
    answer:
      "Porque los gimnasios tradicionales venden acceso a máquinas, no un sistema de adherencia. En Vital Fit no improvisas qué hacer: tienes 3 sesiones de 45 minutos diseñadas para tu nivel, seguimiento semanal y ajustes de nutrición cada 14 días.",
  },
  {
    question: "¿Necesito experiencia previa o estar en buena forma para entrar?",
    answer:
      "No. El diagnóstico inicial calibra el volumen y la técnica a tu punto de partida exacto. Tanto si llevas años sin entrenar como si buscas romper un estancamiento, la progresión se adapta a ti.",
  },
  {
    question: "¿Cómo empiezo? ¿Tengo que pagar algo ahora?",
    answer:
      "No pagas nada para empezar. Agenda una llamada gratuita con nuestro equipo: conocemos tu caso, tus objetivos y te explicamos cómo funciona el programa de 90 días con sus 3 pilares (entrenamiento, recuperación y alimentación).",
  },
  {
    question: "¿Qué pasa si sigo el programa y no tengo resultados?",
    answer:
      "Si cumples con el 90% del programa y no tienes resultados, no solo te devolvemos tu dinero: te seguimos entrenando gratis hasta que cumplas tus objetivos.",
  },
];
