import type { Metadata } from "next";
import { MARCA } from "./sitio";

/** Metadatos por página: título, descripción, canonical y Open Graph propios. */
export function meta({ titulo, descripcion, ruta, imagen }: { titulo: string; descripcion: string; ruta: string; imagen?: string }): Metadata {
  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: ruta },
    openGraph: {
      type: "website",
      locale: "es_ES",
      url: ruta,
      siteName: MARCA.nombreLargo,
      title: titulo,
      description: descripcion,
      ...(imagen ? { images: [{ url: imagen, width: 960, height: 640 }] } : {}),
    },
    twitter: { card: "summary_large_image", title: titulo, description: descripcion },
  };
}
