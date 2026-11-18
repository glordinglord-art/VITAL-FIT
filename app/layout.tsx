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
  metadataBase: new URL("https://vitalfit-app.vercel.app"),
  title: "Vital Fit Labs — Transformación de 90 Días",
  description:
    "Mira el video: por qué 8 de cada 10 personas abandonan el gimnasio y cómo Vital Fit Labs te acompaña 90 días con 3 entrenadores. Agenda tu llamada gratis.",
  openGraph: {
    title: "Vital Fit Labs — Transformación de 90 Días",
    description:
      "Por qué 8 de cada 10 abandonan el gimnasio y cómo lo resolvemos. Agenda tu llamada gratis.",
    siteName: "Vital Fit",
    locale: "es_CO",
    type: "website",
  },
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
