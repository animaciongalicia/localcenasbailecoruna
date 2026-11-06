// Comprobaciones automáticas contra un servidor en marcha (npm run build && npm start).
// Uso: node scripts/verificar.mjs [http://localhost:3000]
import fs from "node:fs";

const BASE = process.argv[2] || "http://localhost:3000";
const PAGINAS = ["/", "/cumpleanos-coruna/", "/cenas-empresa-coruna/", "/cenas-despedidas-coruna/", "/cenas-navidad-coruna/", "/celebraciones-coruna/", "/jubilaciones-coruna/", "/eventos-privados-coruna/", "/menus-precios/", "/club-nautico-oza/", "/reservas/", "/grupo-animacion-galicia/", "/noticias/", "/noticias/organizar-cena-empresa-navidad-coruna/", "/noticias/personajes-cena-empresa-navidad/", "/noticias/celebrar-50-cumpleanos-coruna/", "/aviso-legal/", "/privacidad/", "/cookies/", "/sitemap.xml", "/robots.txt"];
// Nada de esto puede aparecer en ninguna salida pública (brief §2 y criterios de aceptación).
const PROHIBIDO = [/1\.925/, /1925\s*€/, /m[ií]nimo de (30|35)/i, /\b(30|35) personas m[ií]nimo/i, /drag/i, /puticl/i, /stripper/i, /aforo/i, /\b120 personas/i, /barra libre/i, /plazas disponibles/i, /quedan pocas/i, /diversi[oó]n garantizada/i, /todo incluido/i, /l[ií]deres/i, /TODO:/, /lorem/i, /Zenit[^<]{0,40}(sede actual)/i];

let fallos = 0;
const ok = (c, m) => { if (!c) { fallos++; console.log("✗", m); } else console.log("✓", m); };

const get = (p, redirect = "manual") => fetch(BASE + p, { redirect });

for (const p of PAGINAS) {
  const r = await get(p);
  ok(r.status === 200, `${p} → ${r.status}`);
  const html = await r.text();
  for (const re of PROHIBIDO) if (re.test(html)) ok(false, `${p} contiene texto prohibido ${re}`);
  // Los importes solo viven en Menú y precios (decisión de Pablo, nov. 2026).
  if (p !== "/menus-precios/" && p.endsWith("/")) {
    const visible = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
    if (/\d\s*€|€\s*\d/.test(visible)) ok(false, `${p} muestra un precio (solo debe aparecer en /menus-precios/)`);
  }
  if (p.endsWith("/") && !p.includes("legal") && !["/privacidad/", "/cookies/"].includes(p)) {
    ok((html.match(/<h1[\s>]/g) || []).length === 1, `${p} tiene un único H1`);
    ok(new RegExp(`<link rel="canonical" href="https://www.los7pc.com${p.replace(/\//g, "\\/")}"`).test(html), `${p} canonical correcto`);
    const hrefs = [...html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]).filter((h) => !h.startsWith("/_next") && !h.startsWith("/fotos") && !h.startsWith("/icon"));
    for (const h of new Set(hrefs)) {
      const s = (await get(h)).status;
      if (s !== 200) ok(false, `${p}: enlace interno roto ${h} → ${s}`);
    }
  }
}

// Redirecciones 301: código, destino y sin cadenas
const { REDIRECCIONES } = await import(new URL("../lib/redirecciones.mjs", import.meta.url));
for (const [src, dst] of REDIRECCIONES) {
  const r = await get(src);
  const loc = (r.headers.get("location") || "").replace(BASE, "");
  ok([301, 308].includes(r.status) && loc === dst, `301 ${src} → ${loc} (${r.status})`);
  const final = await get(dst);
  ok(final.status === 200, `   destino ${dst} responde 200 (sin cadena)`);
}

// 410
const RET = JSON.parse(fs.readFileSync(new URL("../lib/retiradas.json", import.meta.url)));
let n410 = 0;
for (const p of RET) { const r = await get(p + "/"); if (r.status === 410) n410++; else ok(false, `410 esperado en ${p}/ → ${r.status}`); }
ok(n410 === RET.length, `${n410}/${RET.length} rutas retiradas responden 410`);
for (const p of ["/wp-content/uploads/x.jpg", "/feed/", "/?p=123", "/category/despedidas/"]) ok((await get(p)).status === 410, `410 en ${p}`);
ok((await get("/no-existe-esta-url/")).status === 404, "404 en URL desconocida");

// Navidad integrada: variantes de anuncio y antiguo subdominio
for (const g of ["empresas", "amigos", "instagram"]) {
  const r = await get(`/cenas-navidad-coruna/?g=${g}`);
  const html = await r.text();
  ok(r.status === 200 && /noindex/.test(html) && html.includes('rel="canonical" href="https://www.los7pc.com/cenas-navidad-coruna/"'), `variante ?g=${g}: 200, noindex y canonical a Navidad`);
}
// El Host no se puede cambiar con fetch: se usa curl.
import { execFileSync } from "node:child_process";
for (const [ruta, esperado] of [["/?g=empresas&gclid=abc", "https://www.los7pc.com/cenas-navidad-coruna/?g=empresas&gclid=abc"], ["/", "https://www.los7pc.com/cenas-navidad-coruna/"], ["/v/amigos/", "https://www.los7pc.com/cenas-navidad-coruna/?g=amigos"], ["/privacidad/", "https://www.los7pc.com/privacidad/"]]) {
  const out = execFileSync("curl", ["-s", "-o", "/dev/null", "-w", "%{http_code} %{redirect_url}", "-H", "Host: navidad.los7pc.com", BASE + ruta]).toString();
  ok(out === `301 ${esperado}`, `navidad.los7pc.com${ruta} → ${out}`);
}
{
  const html = await (await get("/cenas-navidad-coruna/")).text();
  ok(/"@type":"Event"/.test(html), "Navidad: datos estructurados Event para noches confirmadas");
  ok(!/navidad\.los7pc\.com/.test(html), "Navidad: sin enlaces al antiguo subdominio");
}

console.log(fallos ? `\n${fallos} FALLOS` : "\nTODO OK");
process.exit(fallos ? 1 : 0);
