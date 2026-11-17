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

export const VSL_TOTAL_SECONDS = 160;

// Local MP4 served from public/video/vitalfit-vsl.mp4
export const VSL_VIDEO_URL: string | null = "/video/vitalfit-vsl.mp4";

export const VSL_CHAPTERS: VslChapter[] = [
  {
    id: "problema",
    code: "CAPÍTULO I",
    title: "Por qué 8 de cada 10 abandonan el gimnasio",
    durationSeconds: 60,
    startSeconds: 0,
    image: "/images/gym-hero-vsl.jpg",
    imageAlt: "Sala de entrenamiento minimalista con barra olímpica bajo luz cenital",
    accentColor: "#00f0ff",
    beats: [
      {
        atSeconds: 0,
        headline: "8 DE CADA 10 ABANDONAN ANTES DE LOS 3 MESES.",
        caption: "Entran con ilusión, abandonan a la segunda o tercera semana y pierden dinero, tiempo y confianza en su palabra.",
        emphasis: "No es un problema de carácter.",
      },
      {
        atSeconds: 30,
        headline: "EL PROBLEMA ES EL MODELO DEL GIMNASIO TRADICIONAL.",
        caption: "Te prestan máquinas, te dan una rutina genérica y entrenas sin objetivos ni seguimiento real.",
        emphasis: "La receta perfecta para la frustración.",
      },
    ],
  },
  {
    id: "metodo",
    code: "CAPÍTULO II",
    title: "Vital Fit Labs: 90 días y tres pilares",
    durationSeconds: 30,
    startSeconds: 60,
    image: "/images/gym-coaching.jpg",
    imageAlt: "Entrenador corrigiendo la postura de un atleta durante levantamiento de fuerza",
    accentColor: "#00f0ff",
    beats: [
      {
        atSeconds: 60,
        headline: "UN PROGRAMA DE TRANSFORMACIÓN DE 90 DÍAS.",
        caption: "Integramos tres pilares: entrenamiento, recuperación y alimentación en un solo sistema.",
        emphasis: "Plataforma tecnológica + acompañamiento real.",
      },
      {
        atSeconds: 75,
        headline: "DECISIONES BASADAS EN TU AVANCE.",
        caption: "Nuestros entrenadores siguen tu progreso de cerca para tomar las mejores decisiones hacia tus objetivos.",
        emphasis: "Cero improvisación.",
      },
    ],
  },
  {
    id: "auditoria",
    code: "CAPÍTULO III",
    title: "3 entrenadores auditando tu proceso en 3 niveles",
    durationSeconds: 32,
    startSeconds: 90,
    image: "/images/gym-athlete.jpg",
    imageAlt: "Manos con magnesio sujetando una barra de acero moleteado",
    accentColor: "#ffffff",
    beats: [
      {
        atSeconds: 90,
        headline: "NIVEL 1: NUTRICIÓN, ENTRENO Y DESCANSO EN LA APP.",
        caption: "No tendrás un entrenador, tendrás tres auditando tu día a día desde nuestra aplicación.",
        emphasis: "Control diario de tus pilares.",
      },
      {
        atSeconds: 102,
        headline: "NIVEL 2 Y 3: BIOMETRÍA SEMANAL Y RECALIBRACIÓN.",
        caption: "Medimos tu biometría y biomecánica cada semana, y leemos tus indicadores cada mes para recalibrar tu proceso.",
        emphasis: "Para que nunca dejes de avanzar.",
      },
    ],
  },
  {
    id: "garantia",
    code: "CAPÍTULO IV",
    title: "Garantía de resultados y tu compromiso de 90 días",
    durationSeconds: 38,
    startSeconds: 122,
    image: "/images/gym-architecture.jpg",
    imageAlt: "Interior arquitectónico de gimnasio boutique con racks y luz natural",
    accentColor: "#00f0ff",
    beats: [
      {
        atSeconds: 122,
        headline: "SI CUMPLES EL 90% Y NO VES RESULTADOS, NO PAGAS.",
        caption: "Te devolvemos tu dinero y te seguimos entrenando gratis hasta que cumplas tus objetivos.",
        emphasis: "Garantía total de resultados.",
      },
      {
        atSeconds: 142,
        headline: "NOS COMPROMETEMOS 90 DÍAS CONTIGO.",
        caption: "Si estás cansado del mismo ciclo y quieres resultados reales, agenda tu llamada abajo.",
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
    text: "Transformación física visible y acceso preferente a nuestra sede física con tarifa de fundador congelada.",
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
      "Estamos ultimando obra e instalación de racks calibrados para abrir puertas en el próximo trimestre. Al reservar hoy tu Pase Fundador empiezas de inmediato con el protocolo guiado y garantizas tu cupo físico antes de que se agote el aforo inicial.",
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
    question: "¿Qué incluye exactamente el Pase Fundador de $49/mes?",
    answer:
      "Incluye tu evaluación biomecánica y metabólica 1-a-1, programación de fuerza progresiva, plan nutricional adaptable, revisión técnica con coach y tarifa congelada de por vida cuando inauguremos la sede física (sin cuota de inscripción).",
  },
  {
    question: "¿Qué pasa si en 30 días siento que no es para mí?",
    answer:
      "Tienes garantía total de 30 días. Si completas tus sesiones del primer mes y no ves progreso medible en tu fuerza, energía o medidas, nos escribes y devolvemos el 100% de tu pago sin preguntas.",
  },
];
