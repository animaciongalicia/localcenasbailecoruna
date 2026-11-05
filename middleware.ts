import { NextResponse, type NextRequest } from "next/server";
import RETIRADAS from "@/lib/retiradas.json";
import { esVariante } from "@/lib/variantes";

// Contenido de WordPress retirado sin equivalente → 410 Gone (Google lo desindexa antes que un 404).
// Las URLs con equivalente real se redirigen con 301 en next.config.mjs (lib/redirecciones.mjs).
const SET = new Set<string>(RETIRADAS as string[]);
const PREFIJOS = ["/wp-content/", "/wp-admin", "/wp-includes/", "/wp-json", "/feed", "/comments/feed", "/category/", "/tag/", "/author/", "/xmlrpc.php", "/wp-login.php"];

const HTML = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Esta página ya no existe · Los7pc</title><style>body{font-family:system-ui,sans-serif;background:#FBF7F0;color:#231C17;display:grid;place-items:center;min-height:100vh;margin:0;padding:16px;text-align:center}a{color:#B4441F;font-weight:600}</style></head><body><main><h1>Esta página ya no existe</h1><p>Ahora todo está en un sitio: cenas con espectáculo y baile en A Coruña.</p><p><a href="/">Ir a la página principal</a></p></main></body></html>`;

const DOMINIO = "https://www.los7pc.com";
const LEGALES_NAVIDAD = new Set(["/aviso-legal", "/privacidad", "/cookies"]);

export function middleware(req: NextRequest) {
  const { pathname, searchParams, search } = req.nextUrl;

  // 1) Antiguo subdominio navidad.los7pc.com → página de Navidad de la web (301, conservando ?g, utm y gclid).
  const host = (req.headers.get("host") || "").toLowerCase();
  if (host.startsWith("navidad.")) {
    const limpio = pathname.replace(/\/+$/, "") || "/";
    const vMatch = limpio.match(/^\/v\/([a-z]+)$/);
    let destino = "/cenas-navidad-coruna/";
    const qs = new URLSearchParams(search);
    if (LEGALES_NAVIDAD.has(limpio)) destino = `${limpio}/`;
    else if (vMatch && esVariante(vMatch[1])) qs.set("g", vMatch[1]);
    const q = qs.toString();
    return NextResponse.redirect(`${DOMINIO}${destino}${q ? `?${q}` : ""}`, 301);
  }

  // 2) Variantes de titular de Navidad para anuncios: /cenas-navidad-coruna/?g=empresas → HTML estático de la variante.
  if (pathname === "/cenas-navidad-coruna/" && esVariante(searchParams.get("g"))) {
    const url = req.nextUrl.clone();
    url.pathname = `/cenas-navidad-coruna/v/${searchParams.get("g")}/`;
    return NextResponse.rewrite(url);
  }

  const p = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const retirada =
    SET.has(p) ||
    PREFIJOS.some((x) => pathname.startsWith(x)) ||
    (pathname === "/" && (searchParams.has("p") || searchParams.has("page_id") || searchParams.has("attachment_id")));
  if (retirada) {
    return new NextResponse(HTML, { status: 410, headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" } });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|fotos/|api/|icon|opengraph-image|robots.txt|sitemap.xml).*)"],
};
