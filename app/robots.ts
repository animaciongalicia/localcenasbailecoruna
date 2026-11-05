import type { MetadataRoute } from "next";
import { INDEXAR, SITE_URL } from "@/lib/sitio";

// Fuera de producción todas las páginas llevan <meta robots="noindex">. Se deja rastrear para que Google VEA ese noindex.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(INDEXAR ? { sitemap: `${SITE_URL}/sitemap.xml` } : {}),
  };
}
