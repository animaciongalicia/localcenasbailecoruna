// Pruebas en navegador (Playwright preinstalado). Uso: node scripts/navegador.cjs http://localhost:3100 <carpeta-capturas>
const { chromium } = require("playwright");
const BASE = process.argv[2] || "http://localhost:3000";
const OUT = process.argv[3] || ".";
const PAGINAS = ["/", "/cenas-navidad-coruna/?g=empresas", "/cumpleanos-coruna/", "/cenas-empresa-coruna/", "/cenas-despedidas-coruna/", "/cenas-navidad-coruna/", "/celebraciones-coruna/", "/jubilaciones-coruna/", "/eventos-privados-coruna/", "/menus-precios/", "/club-nautico-oza/", "/reservas/", "/aviso-legal/"];
let fallos = 0;
const ok = (c, m) => { if (!c) fallos++; console.log(c ? "✓" : "✗", m); };

(async () => {
  const b = await chromium.launch();
  for (const w of [360, 390, 768, 1440]) {
    const p = await b.newPage({ viewport: { width: w, height: 800 } });
    for (const ruta of PAGINAS) {
      await p.goto(BASE + ruta, { waitUntil: "load" });
      const sobra = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      ok(sobra <= 0, `${w}px ${ruta} sin desbordamiento horizontal (${sobra})`);
    }
    await p.goto(BASE + "/", { waitUntil: "load" });
    await p.screenshot({ path: `${OUT}/home-${w}.png`, fullPage: w !== 1440 ? false : false });
    await p.close();
  }

  // Formulario: grupo de 6, tildes y caracteres especiales; no hay "reserva confirmada"
  const m = await b.newPage({ viewport: { width: 390, height: 844 } });
  await m.goto(BASE + "/reservas/", { waitUntil: "load" });
  ok(await m.locator('[role="dialog"][aria-label="Preferencias de cookies"]').isVisible(), "banner de cookies visible al entrar");
  const bannerBox = await m.locator('[role="dialog"]').boundingBox();
  const barraBox = await m.locator('a[data-ubicacion="barra-movil"]').first().boundingBox();
  ok(bannerBox.y + bannerBox.height <= barraBox.y, "el banner no tapa la barra de WhatsApp/llamada");
  await m.getByRole("button", { name: "Rechazar" }).click();
  await m.getByRole("button", { name: /Preparar mi mensaje/ }).click();
  ok(await m.getByText("Escribe tu nombre").isVisible(), "validación: pide nombre");
  ok((await m.evaluate(() => document.activeElement?.id || "")).endsWith("-nombre"), "el foco va al primer campo con error");
  ok((await m.locator("form input, form select, form textarea").count()) <= 7, "formulario corto (5 datos)");
  await m.getByLabel("Nombre").fill("José Ñúñez & Cía");
  await m.getByLabel("Personas (aprox.)").fill("6");
  await m.getByLabel("Fecha").fill("algún sábado de junio, ¿18 o 25?");
  await m.getByRole("button", { name: /Preparar mi mensaje/ }).click();
  const enlace = m.getByRole("link", { name: /Enviar por WhatsApp/ });
  ok(await enlace.isVisible(), "grupo de 6 personas: mensaje preparado sin bloqueo");
  const href = await enlace.getAttribute("href");
  const texto = decodeURIComponent(new URL(href).searchParams.get("text"));
  ok(texto.includes("José Ñúñez & Cía") && texto.includes("6 personas") && texto.includes("¿18 o 25?") && texto.includes("con otros grupos"), "mensaje con campos correctos y caracteres especiales: " + JSON.stringify(texto));
  ok(href.startsWith("https://wa.me/34678288284?text="), "enlace wa.me al número comercial");
  ok((await m.getByRole("link", { name: /Enviar por email/ }).getAttribute("href")).startsWith("mailto:info@los7pc.com"), "alternativa por email");
  ok(!(await m.content()).match(/Reserva confirmada|Mensaje enviado/), "no aparece 'Reserva confirmada' ni 'Mensaje enviado'");
  ok(m.url() === BASE + "/reservas/", "la URL de la web no contiene datos personales");
  await m.screenshot({ path: `${OUT}/reservas-390.png`, fullPage: true });
  await m.goto(BASE + "/reservas/?modalidad=medida&celebracion=navidad", { waitUntil: "load" });
  ok((await m.getByRole("radio", { name: "Solo para mi grupo" }).isChecked()) && (await m.getByLabel("¿Qué celebráis?").inputValue()) === "navidad", "los botones de otras páginas preseleccionan formato y celebración");

  // Solo hay formulario en Contacto
  for (const r of ["/", "/cumpleanos-coruna/", "/cenas-empresa-coruna/", "/eventos-privados-coruna/", "/cenas-navidad-coruna/"]) {
    await m.goto(BASE + r, { waitUntil: "load" });
    ok((await m.locator("main form").count()) === 0, `${r} sin formulario`);
  }
  await m.goto(BASE + "/cenas-navidad-coruna/", { waitUntil: "load" });
  ok(await m.locator('a[data-ubicacion="navidad-fechas"][href^="mailto:"]').isVisible(), "Navidad: contacto por email bajo las fechas");

  // Menú móvil y teclado
  await m.goto(BASE + "/", { waitUntil: "load" });
  await m.getByRole("button", { name: "Abrir menú" }).click();
  const caja = await m.locator("#menu-movil").boundingBox();
  ok(caja && caja.height > 300 && await m.locator("#menu-movil").getByRole("link", { name: "Cumpleaños" }).isVisible(), "menú móvil abre a pantalla completa y muestra celebraciones");
  await m.keyboard.press("Escape");
  ok(!(await m.locator("#menu-movil").isVisible()), "Escape cierra el menú móvil");

  const d = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await d.goto(BASE + "/", { waitUntil: "load" });
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
  for (const [pg, ancho, nombre] of [[d, 1440, "navidad-1440"], [m, 390, "navidad-390"]]) {
    await pg.goto(BASE + "/cenas-navidad-coruna/", { waitUntil: "load" });
    for (let y = 0; y < 12000; y += 600) { await pg.mouse.wheel(0, 600); await pg.waitForTimeout(60); }
    await pg.waitForTimeout(400);
    await pg.screenshot({ path: `${OUT}/${nombre}.png`, fullPage: true });
  }
  await b.close();
  console.log(fallos ? `\n${fallos} FALLOS` : "\nTODO OK");
  process.exit(fallos ? 1 : 0);
})();
