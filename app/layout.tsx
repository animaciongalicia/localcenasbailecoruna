import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { GOOGLE_SITE_VERIFICATION, INDEXAR, MARCA, SITE_URL } from "@/lib/sitio";
import Cabecera from "@/components/Cabecera";
import Pie from "@/components/Pie";
import BarraMovil from "@/components/BarraMovil";
import AvisoNavidad from "@/components/AvisoNavidad";
import Tracking from "@/components/Tracking";
import CookieBanner from "@/components/CookieBanner";
import { JsonLdOrganizacion } from "@/components/JsonLd";

const serif = Fraunces({ subsets: ["latin"], weight: ["600"], display: "swap", variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Cenas con espectáculo y baile en A Coruña · Los7pc", template: "%s" },
  description: `${MARCA.lema}. ${MARCA.trayectoria}.`,
  robots: INDEXAR ? { index: true, follow: true } : { index: false, follow: false },
  verification: { google: GOOGLE_SITE_VERIFICATION },
  formatDetection: { telephone: false },
};

// Se regenera cada hora: así aparecen solos los artículos programados y desaparecen las noches pasadas.
export const revalidate = 3600;

export const viewport: Viewport = { themeColor: "#1C1A27", width: "device-width", initialScale: 1 };

// Consent Mode v2: todo denegado por defecto ANTES de cargar cualquier etiqueta.
const scriptInicial = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});gtag('set','ads_data_redaction',true);`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptInicial }} />
        <JsonLdOrganizacion />
      </head>
      <body>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded focus:bg-white focus:px-3 focus:py-2">
          Saltar al contenido
        </a>
        <AvisoNavidad />
        <Cabecera />
        <main id="contenido">{children}</main>
        <Pie />
        <BarraMovil />
        <Tracking />
        <CookieBanner />
      </body>
    </html>
  );
}
