import { CONTACTO } from "./sitio";

export const WA_GENERICO = "Hola, quiero consultar disponibilidad para una cena baile en el Club Náutico de Oza.";

/** Enlace a WhatsApp con mensaje editable, codificado (tildes, ñ, €, saltos de línea…). */
export function whatsappUrl(texto: string = WA_GENERICO): string {
  return `https://wa.me/${CONTACTO.whatsappNumero}?text=${encodeURIComponent(texto)}`;
}

export const CELEBRACIONES = [
  { valor: "cumpleanos", etiqueta: "Cumpleaños", enMensaje: "celebración de cumpleaños" },
  { valor: "empresa", etiqueta: "Cena o comida de empresa", enMensaje: "cena de empresa" },
  { valor: "despedida", etiqueta: "Despedida de soltero/a", enMensaje: "despedida" },
  { valor: "jubilacion", etiqueta: "Jubilación", enMensaje: "celebración de jubilación" },
  { valor: "aniversario", etiqueta: "Aniversario", enMensaje: "celebración de aniversario" },
  { valor: "navidad", etiqueta: "Cena de Navidad", enMensaje: "cena de Navidad" },
  { valor: "amigos", etiqueta: "Grupo de amigos", enMensaje: "cena con un grupo de amigos" },
  { valor: "otra", etiqueta: "Otra celebración", enMensaje: "celebración" },
] as const;

export type Celebracion = (typeof CELEBRACIONES)[number]["valor"];

export const MODALIDADES = [
  { valor: "conjunta", etiqueta: "Cena baile conjunta", detalle: "Tu grupo, su mesa, la noche compartida con otros grupos", enMensaje: "la cena baile conjunta" },
  { valor: "medida", etiqueta: "En exclusiva para mi grupo", detalle: "Cualquier día, en Oza, en otro espacio o en el vuestro", enMensaje: "un evento en exclusiva para nuestro grupo" },
  { valor: "nose", etiqueta: "Aún no lo sé", detalle: "Te cuento la idea y me aconsejas", enMensaje: "que me aconsejéis la mejor opción" },
] as const;

export type Modalidad = (typeof MODALIDADES)[number]["valor"];

export const EXTRAS_MEDIDA = [
  { valor: "menu", etiqueta: "Menú sentado" },
  { valor: "catering", etiqueta: "Catering de pie" },
  { valor: "dj", etiqueta: "DJ" },
  { valor: "show", etiqueta: "Show cómico" },
] as const;

export const LUGARES = [
  { valor: "oza", etiqueta: "Club Náutico de Oza", enMensaje: "en el Club Náutico de Oza" },
  { valor: "otro", etiqueta: "Otro espacio", enMensaje: "en otro espacio que nos propongáis" },
  { valor: "propio", etiqueta: "Nuestro propio local", enMensaje: "en nuestro propio local" },
  { valor: "nose", etiqueta: "Aconsejadme", enMensaje: "donde nos aconsejéis" },
] as const;

export const MOMENTOS = [
  { valor: "cena", etiqueta: "Cena" },
  { valor: "comida", etiqueta: "Comida (mediodía)" },
] as const;

export type Consulta = {
  nombre: string;
  celebracion: Celebracion;
  fecha: string; // yyyy-mm-dd o ""
  flexible: string; // texto libre: "cualquier sábado de junio"
  personas: number;
  modalidad: Modalidad;
  extras: string[];
  lugar?: string;
  momento?: string;
  comentario: string;
};

const fmt = new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function fechaLegible(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return fmt.format(new Date(Date.UTC(y, m - 1, d)));
}

export function mensajeConsulta(c: Consulta): string {
  const cel = CELEBRACIONES.find((x) => x.valor === c.celebracion)?.enMensaje ?? "celebración";
  const mod = MODALIDADES.find((x) => x.valor === c.modalidad)?.enMensaje ?? "";
  let cuando = "";
  if (c.fecha) cuando = ` el ${fechaLegible(c.fecha)}`;
  if (c.flexible.trim()) cuando += c.fecha ? ` (flexible: ${c.flexible.trim()})` : `, fechas flexibles: ${c.flexible.trim()}`;
  if (!cuando) cuando = ", con fecha por decidir";

  const frase = `Quiero consultar una ${cel} para ${c.personas} personas${cuando}`;
  const punto = /[.?!]$/.test(frase) ? "" : ".";
  const lineas = [`Hola, soy ${c.nombre.trim()}. ${frase}${punto} Me interesa ${mod}. ¿Tenéis disponibilidad?`];
  if (c.modalidad === "medida") {
    const lugar = LUGARES.find((l) => l.valor === c.lugar)?.enMensaje;
    const momento = c.momento === "comida" ? "como comida, al mediodía" : "como cena";
    lineas.push(`Lo querríamos ${momento}${lugar ? `, ${lugar}` : ""}.`);
  }
  if (c.modalidad === "medida" && c.extras.length) {
    const nombres = EXTRAS_MEDIDA.filter((e) => c.extras.includes(e.valor)).map((e) => e.etiqueta.toLowerCase());
    lineas.push(`Me gustaría incluir: ${nombres.join(", ")}.`);
  }
  if (c.comentario.trim()) lineas.push(c.comentario.trim());
  return lineas.join("\n");
}

export type Errores = Partial<Record<"nombre" | "personas" | "cuando", string>>;

/** Sin mínimos comerciales: cualquier grupo desde 2 personas puede consultar. */
export function validarConsulta(c: Consulta): Errores {
  const e: Errores = {};
  if (!c.nombre.trim()) e.nombre = "Escribe tu nombre para que sepamos con quién hablamos.";
  if (!Number.isFinite(c.personas) || c.personas < 2) e.personas = "Indica cuántas personas seréis, aunque sea aproximado (desde 2).";
  else if (c.personas > 999) e.personas = "Revisa el número de personas.";
  if (!c.fecha && !c.flexible.trim()) e.cuando = "Elige una fecha o indica qué fechas te encajan.";
  return e;
}
