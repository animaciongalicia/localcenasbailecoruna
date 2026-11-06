import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/sitio";
import { POSTS } from "@/lib/noticias";

// Solo URLs públicas, finales y canónicas (las legales llevan noindex y no se incluyen).
const RUTAS: [string, number][] = [
  ["/", 1],
  ["/cumpleanos-coruna/", 0.8],
  ["/cenas-empresa-coruna/", 0.8],
  ["/cenas-despedidas-coruna/", 0.8],
  ["/cenas-navidad-coruna/", 0.8],
  ["/celebraciones-coruna/", 0.8],
  ["/jubilaciones-coruna/", 0.7],
  ["/eventos-privados-coruna/", 0.8],
  ["/menus-precios/", 0.8],
  ["/club-nautico-oza/", 0.7],
  ["/reservas/", 0.6],
  ["/grupo-animacion-galicia/", 0.3],
  ["/noticias/", 0.5],
  ...POSTS.map((p): [string, number] => [`/noticias/${p.slug}/`, 0.5]),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return RUTAS.map(([r, priority]) => ({ url: `${SITE_URL}${r}`, changeFrequency: "monthly", priority }));
}
