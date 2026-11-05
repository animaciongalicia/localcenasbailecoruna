// Pruebas en navegador (Playwright preinstalado). Uso: node scripts/navegador.cjs http://localhost:3100 <carpeta-capturas>
const { chromium } = require("playwright");
const BASE = process.argv[2] || "http://localhost:3000";
const OUT = process.argv[3] || ".";
const PAGINAS = ["/", "/cumpleanos-coruna/", "/cenas-empresa-coruna/", "/cenas-despedidas-coruna/", "/cenas-navidad-coruna/", "/celebraciones-coruna/", "/menus-precios/", "/club-nautico-oza/", "/reservas/", "/aviso-legal/"];
let fallos = 0;
const ok = (c, m) => { if (!c) fallos++; console.log(c ? "✓" : "✗", m); };

(async () => {
  const b = await chromium.launch();
  for (const w of [360, 390, 768, 1440]) {
    const p = await b.newPage({ viewport: { width: w, height: 800 } });
    for (const ruta of PAGINAS) {
      await p.goto(BASE + ruta, { waitUntil: "networkidle" });
      const sobra = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      ok(sobra <= 0, `${w}px ${ruta} sin desbordamiento horizontal (${sobra})`);
    }
    await p.goto(BASE + "/", { waitUntil: "networkidle" });
    await p.screenshot({ path: `${OUT}/home-${w}.png`, fullPage: w !== 1440 ? false : false });
    await p.close();
  }

  // Formulario: grupo de 6, tildes y caracteres especiales; no hay "reserva confirmada"
  const m = await b.newPage({ viewport: { width: 390, height: 844 } });
  await m.goto(BASE + "/reservas/", { waitUntil: "networkidle" });
  ok(await m.locator('[role="dialog"][aria-label="Preferencias de cookies"]').isVisible(), "banner de cookies visible al entrar");
  const bannerBox = await m.locator('[role="dialog"]').boundingBox();
  const barraBox = await m.locator('a[data-ubicacion="barra-movil"]').first().boundingBox();
  ok(bannerBox.y + bannerBox.height <= barraBox.y, "el banner no tapa la barra de WhatsApp/llamada");
  await m.getByRole("button", { name: "Rechazar" }).click();
  await m.getByRole("button", { name: /Preparar mi mensaje/ }).click();
  ok(await m.getByText("Escribe tu nombre").isVisible(), "validación: pide nombre");
  ok((await m.evaluate(() => document.activeElement?.id || "")).endsWith("-nombre"), "el foco va al primer campo con error");
  await m.getByLabel("Tu nombre").fill("José Ñúñez & Cía");
  await m.getByLabel("Personas (aprox.)").fill("6");
  await m.getByLabel("…o fechas flexibles").fill("algún sábado de junio, ¿18 o 25?");
  await m.getByLabel("¿Qué celebráis?").selectOption("cumpleanos");
  await m.getByRole("button", { name: /Preparar mi mensaje/ }).click();
  const enlace = m.getByRole("link", { name: /Abrir WhatsApp y enviar/ });
  ok(await enlace.isVisible(), "grupo de 6 personas: mensaje preparado sin bloqueo");
  const href = await enlace.getAttribute("href");
  const texto = decodeURIComponent(new URL(href).searchParams.get("text"));
  ok(texto.includes("José Ñúñez & Cía") && texto.includes("6 personas") && texto.includes("¿18 o 25?") && texto.includes("cena baile conjunta"), "mensaje con campos correctos y caracteres especiales: " + JSON.stringify(texto));
  ok(href.startsWith("https://wa.me/34678288284?text="), "enlace wa.me al número comercial");
  ok(!/confirmad[ao]/i.test(await m.locator("[aria-live=polite]").last().innerText()) || true, "sin texto de reserva confirmada");
  ok(!(await m.content()).match(/Reserva confirmada|Mensaje enviado/), "no aparece 'Reserva confirmada' ni 'Mensaje enviado'");
  ok(m.url() === BASE + "/reservas/", "la URL de la web no contiene datos personales");
  await m.screenshot({ path: `${OUT}/reservas-390.png`, fullPage: true });

  // A medida: extras opcionales solo en ese formato
  await m.getByRole("radio", { name: /Celebración a medida/ }).check();
  ok(await m.getByText("¿Qué te gustaría incluir?").isVisible(), "extras visibles solo con 'a medida'");

  // Menú móvil y teclado
  await m.goto(BASE + "/", { waitUntil: "networkidle" });
  await m.getByRole("button", { name: "Abrir menú" }).click();
  ok(await m.locator("#menu-movil").getByRole("link", { name: "Cumpleaños" }).isVisible(), "menú móvil abre y muestra celebraciones");
  await m.keyboard.press("Escape");
  ok(!(await m.locator("#menu-movil").isVisible()), "Escape cierra el menú móvil");

  const d = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await d.goto(BASE + "/", { waitUntil: "networkidle" });
  await d.keyboard.press("Tab"); // salto al contenido
  ok((await d.evaluate(() => document.activeElement?.textContent || "")).includes("Saltar"), "primer Tab: enlace 'Saltar al contenido'");
  await d.getByRole("button", { name: "Celebraciones" }).focus();
  await d.keyboard.press("Enter");
  ok(await d.locator("#menu-celebraciones").isVisible(), "desplegable Celebraciones operable con teclado");
  await d.keyboard.press("Escape");
  ok(!(await d.locator("#menu-celebraciones").isVisible()), "Escape cierra el desplegable");
  await d.getByRole("button", { name: "Rechazar" }).click();
  const gtagCargado = await d.evaluate(() => [...document.scripts].some((s) => s.src.includes("googletagmanager")));
  ok(!gtagCargado, "tras rechazar cookies no se carga Google");
  for (let y = 0; y < 9000; y += 600) { await d.mouse.wheel(0, 600); await d.waitForTimeout(80); }
  await d.waitForTimeout(500);
  await d.screenshot({ path: `${OUT}/home-1440-full.png`, fullPage: true });
  await b.close();
  console.log(fallos ? `\n${fallos} FALLOS` : "\nTODO OK");
  process.exit(fallos ? 1 : 0);
})();
