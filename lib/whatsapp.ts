import { CONTACTO } from "./sitio";

export const WA_GENERICO = "Hola, quiero consultar disponibilidad para una cena baile en el Club Náutico de Oza.";

/** Enlace a WhatsApp con mensaje editable, codificado (tildes, ñ, €, saltos de línea…). */
export function whatsappUrl(texto: string = WA_GENERICO): string {
  return `https://wa.me/${CONTACTO.whatsappNumero}?text=${encodeURIComponent(texto)}`;
}

export function mailUrl(asunto: string, cuerpo: string): string {
  return `mailto:${CONTACTO.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}

export const CELEBRACIONES = [
  { valor: "cumpleanos", etiqueta: "Cumpleaños", enMensaje: "celebración de cumpleaños" },
  { valor: "empresa", etiqueta: "Comida o cena de empresa", enMensaje: "comida o cena de empresa" },
  { valor: "navidad", etiqueta: "Navidad", enMensaje: "cena de Navidad" },
  { valor: "despedida", etiqueta: "Despedida", enMensaje: "despedida" },
  { valor: "jubilacion", etiqueta: "Jubilación", enMensaje: "jubilación" },
  { valor: "otra", etiqueta: "Otra celebración", enMensaje: "celebración" },
] as const;

export type Celebracion = (typeof CELEBRACIONES)[number]["valor"];

export const MODALIDADES = [
  { valor: "conjunta", etiqueta: "Con otros grupos", enMensaje: "la cena baile con otros grupos" },
  { valor: "medida", etiqueta: "Solo para mi grupo", enMensaje: "un evento en exclusiva para nuestro grupo" },
] as const;

export type Modalidad = (typeof MODALIDADES)[number]["valor"];

/** Lo justo para responder: quién, qué, cuándo, cuántos y en qué formato. */
export type Consulta = { nombre: string; celebracion: Celebracion; fecha: string; personas: number; modalidad: Modalidad };

export function mensajeConsulta(c: Consulta): string {
  const cel = CELEBRACIONES.find((x) => x.valor === c.celebracion)?.enMensaje ?? "celebración";
  const mod = MODALIDADES.find((x) => x.valor === c.modalidad)?.enMensaje ?? "";
  return `Hola, soy ${c.nombre.trim()}. Quiero consultar una ${cel} para ${c.personas} personas. Fecha: ${c.fecha.trim()}. Me interesa ${mod}. ¿Tenéis disponibilidad?`;
}

export type Errores = Partial<Record<"nombre" | "fecha" | "personas", string>>;

/** Sin mínimos comerciales: cualquier grupo desde 2 personas puede consultar. */
export function validarConsulta(c: Consulta): Errores {
  const e: Errores = {};
  if (!c.nombre.trim()) e.nombre = "Escribe tu nombre.";
  if (!c.fecha.trim()) e.fecha = "Indica una fecha o qué fechas te encajan.";
  if (!Number.isFinite(c.personas) || c.personas < 2) e.personas = "¿Cuántos seréis? (aprox., desde 2)";
  else if (c.personas > 999) e.personas = "Revisa el número de personas.";
  return e;
}
