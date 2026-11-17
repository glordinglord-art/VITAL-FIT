import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vital Fit — El Método de 90 Días & Próxima Sede Física",
  description:
    "Mira el video que explica por qué el gimnasio tradicional falla y cómo el sistema Vital Fit transforma tu cuerpo con 3 sesiones semanales de 45 minutos. Reserva tu Pase Fundador.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${jost.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[#000000] text-[#ffffff] font-sans selection:bg-[#00f0ff] selection:text-[#000000]">
        {children}
      </body>
    </html>
  );
}
