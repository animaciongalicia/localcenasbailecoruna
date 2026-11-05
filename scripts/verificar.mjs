// Comprobaciones automáticas contra un servidor en marcha (npm run build && npm start).
// Uso: node scripts/verificar.mjs [http://localhost:3000]
import fs from "node:fs";

const BASE = process.argv[2] || "http://localhost:3000";
const PAGINAS = ["/", "/cumpleanos-coruna/", "/cenas-empresa-coruna/", "/cenas-despedidas-coruna/", "/cenas-navidad-coruna/", "/celebraciones-coruna/", "/menus-precios/", "/club-nautico-oza/", "/reservas/", "/aviso-legal/", "/privacidad/", "/cookies/", "/sitemap.xml", "/robots.txt"];
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

console.log(fallos ? `\n${fallos} FALLOS` : "\nTODO OK");
process.exit(fallos ? 1 : 0);
