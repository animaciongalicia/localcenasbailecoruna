import { postsOrdenados } from "@/lib/noticias";
import { CELEBRACIONES_NAV } from "@/lib/paginas";
import { CONTACTO, EXCLUSIVO, MARCA, MENU, NOCHE, OFERTAS, SEDE, SITE_URL } from "@/lib/sitio";

// /llms.txt: resumen en texto plano para asistentes de IA (ChatGPT, Gemini, Perplexity…).
// Se genera desde lib/sitio.ts, así que siempre coincide con la web.
export const revalidate = 3600;

export function GET() {
  const T = OFERTAS.temporada;
  const N = OFERTAS.navidad;
  const texto = `# ${MARCA.nombre}

> Cenas baile con show cómico y DJ hasta las 3:00 en A Coruña (Galicia, España). ${MARCA.trayectoria}. Sede actual: ${SEDE.nombre}, ${SEDE.direccion}, ${SEDE.ciudad}. Los7pc organiza la noche en las instalaciones del club.

## Qué ofrece
- Cena baile con otros grupos, también llamada cena conjunta con espectáculo y fiesta (${T.temporada}): cena sentada, bebida durante la cena (${MENU.bebida.join(", ").toLowerCase()}), show cómico y DJ hasta las 3. ${T.precio} € por persona, IVA incluido (temporada ${T.anio}). Se aceptan grupos pequeños desde 6 personas; cada grupo tiene su mesa.
- Cenas de empresa de Navidad (${N.temporada}): ${N.precio} € por persona en ${N.anio}.
- Eventos en exclusiva: ${EXCLUSIVO.cuando.toLowerCase()}, en el ${SEDE.nombre}, en otro espacio o en el local del cliente. Presupuesto personalizado.
- Menú: ${[...MENU.entrantes, ...MENU.principal, ...MENU.postre].join(", ")}. ${MENU.dietas}
- ${MENU.copas}
- Horario: ${NOCHE.map((n) => `${n.hora}–${n.fin} ${n.titulo}`).join("; ")}.
- El local: ${SEDE.caracteristicas.map((c) => `${c.t}: ${c.d}`).join(" ")}

## Para qué celebraciones
${CELEBRACIONES_NAV.map((c) => `- [${c.texto}](${SITE_URL}${c.href}): ${c.descripcion}`).join("\n")}

## Páginas clave
- [Inicio](${SITE_URL}/)
- [Menús y precios](${SITE_URL}/menus-precios/)
- [El local: ${SEDE.nombre}](${SITE_URL}/club-nautico-oza/)
- [Consultar disponibilidad](${SITE_URL}/reservas/)

## Noticias y guías
${postsOrdenados().map((p) => `- [${p.titulo}](${SITE_URL}/noticias/${p.slug}/): ${p.descripcion}`).join("\n")}

## Contacto
- WhatsApp y teléfono: ${CONTACTO.telefono}
- Email: ${CONTACTO.email}
- La consulta no es una reserva: se confirma por escrito y con pago de confirmación.
`;
  return new Response(texto, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
