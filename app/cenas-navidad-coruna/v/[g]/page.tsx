import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NavidadLanding, { RUTA_NAVIDAD } from "@/components/NavidadLanding";
import { VARIANTES_URL, esVariante } from "@/lib/variantes";
import { metadata as principal } from "../../page";

// Variantes de titular para anuncios. No se enlazan: el middleware sirve aquí /cenas-navidad-coruna/?g=empresas
// (misma URL para el usuario). Canonical a la página principal y noindex: no compiten en Google.
export const revalidate = 3600;
export const dynamicParams = false;
export const generateStaticParams = () => VARIANTES_URL.map((g) => ({ g }));
export const metadata: Metadata = { ...principal, alternates: { canonical: RUTA_NAVIDAD }, robots: { index: false, follow: true } };

export default async function Variante({ params }: { params: Promise<{ g: string }> }) {
  const { g } = await params;
  if (!esVariante(g)) notFound();
  return <NavidadLanding variante={g} />;
}
