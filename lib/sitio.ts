// ─────────────────────────────────────────────────────────────────────────────
// FUENTE ÚNICA DE VERDAD de la web. Cambia un dato aquí y cambia en todas las
// páginas, en los mensajes de WhatsApp y en los datos estructurados.
// Ver README.md → "Cómo editar el contenido".
// ─────────────────────────────────────────────────────────────────────────────

export const MARCA = {
  nombre: "Los7pc",
  nombreLargo: "Los7pc · Cenas baile en A Coruña",
  lema: "Cena, show cómico y baile hasta las tres",
  trayectoria: "Más de 15 años organizando cenas y celebraciones en A Coruña",
} as const;

// Dominio canónico (con www, como la web actual). Se puede sobrescribir con NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.los7pc.com").replace(/\/$/, "");

// Indexación: SÍ en producción de Vercel; NO en previews ni en local.
// Forzar: NEXT_PUBLIC_INDEXAR=true (siempre) / false (nunca).
const forzado = process.env.NEXT_PUBLIC_INDEXAR;
export const INDEXAR = forzado === "true" ? true : forzado === "false" ? false : process.env.VERCEL_ENV === "production";

export const CONTACTO = {
  telefono: "+34 678 288 284",
  telefonoHref: "tel:+34678288284",
  whatsappNumero: "34678288284",
  email: "info@los7pc.com",
} as const;

export const LEGAL = {
  titular: "Inversiones SHISO SL",
  // OJO: el CIF dictado (B70319923) no supera la comprobación del dígito de control.
  // B70319223 sí la supera y es el que figura en la web de Navidad. Confirmar con la escritura.
  nif: "B70319223",
  domicilio: "A Coruña",
  nombreComercial: "Los7pc",
} as const;

export const SEDE = {
  nombre: "Club Náutico de Oza",
  direccion: "Playa de Oza s/n",
  ciudad: "A Coruña",
  aparcamiento: "Zona de aparcamiento en el propio club.",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Club+N%C3%A1utico+de+Oza%2C+A+Coru%C3%B1a",
  desde: "Desde hace dos temporadas",
} as const;

/** Sedes anteriores: solo como trayectoria, nunca como sede actual. */
export const HISTORIA = [
  { lugar: "Hotel Zenit", detalle: "Diez años de cenas baile" },
  { lugar: "Hotel Meliá", detalle: "Varias temporadas" },
  { lugar: "Hotel NH", detalle: "Etapa anterior" },
  { lugar: "Discoteca Pirámide", detalle: "Etapa anterior" },
  { lugar: "Club Náutico de Oza", detalle: "Sede actual, desde hace dos temporadas", actual: true },
] as const;

// ── Cómo transcurre la noche ────────────────────────────────────────────────
export const NOCHE = [
  { hora: "22:00", fin: "22:30", titulo: "Llegada", texto: "Recepción de los grupos y cada uno a su mesa." },
  { hora: "22:30", fin: "00:00", titulo: "Cena con DJ", texto: "Cena sentada con la bebida incluida. El DJ ya va calentando." },
  { hora: "00:00", fin: "01:00", titulo: "Show cómico", texto: "Una hora de humor con el público. Nadie se libra del todo." },
  { hora: "01:00", fin: "03:00", titulo: "Baile y verbena", texto: "Pista, DJ y copas en barra. Se cierra entre las 2:30 y las 3:00, según la fiesta." },
] as const;

export const CIERRE = "03:00";

// ── Menú de la cena baile ───────────────────────────────────────────────────
export const MENU = {
  entrantes: ["Empanada gallega", "Croquetas caseras", "Langostinos cocidos"],
  principal: ["Carne asada con patatas"],
  postre: ["Vasito de crema de queso con frutos rojos"],
  bebida: ["Vino blanco", "Vino tinto", "Sangría", "Refrescos", "Cerveza"],
  dietas: "Hay opción vegetariana y vegana, y se adapta el menú a alergias e intolerancias. Avísalo al reservar.",
  copas: "Las copas del baile no están incluidas: se pagan en la barra.",
} as const;

// ── Ofertas por campaña. Cada una es independiente: cambiar una no toca las demás. ──
export const OFERTAS = {
  temporada: {
    id: "temporada-2027",
    nombre: "Cena baile conjunta",
    anio: 2027,
    temporada: "de abril a septiembre",
    temporadaCorta: "Abril – septiembre",
    validFrom: "2027-04-01",
    validThrough: "2027-09-30",
    precio: 55,
    moneda: "EUR",
    ivaIncluido: true,
    incluye: [
      "Cena sentada completa",
      "Bebida durante la cena: vino, sangría, refrescos y cerveza",
      "Show cómico",
      "DJ y baile hasta las 3:00",
    ],
    noIncluye: ["Copas durante el baile (barra aparte)"],
  },
  navidad: {
    id: "navidad-2026",
    nombre: "Cenas baile de Navidad",
    anio: 2026,
    temporada: "noviembre y diciembre",
    precio: 50,
    moneda: "EUR",
    /** Condiciones de la campaña de Navidad (aportadas por Pablo; publicadas en la web de Navidad 2026). */
    senal: 10,
    horasCancelacion: 48,
    /** Mientras sea true, Navidad gana visibilidad (aviso superior y primera tarjeta). */
    destacada: true,
  },
} as const;

/** Formato en exclusiva: la misma noche (o mediodía), solo para un grupo. Confirmado por Pablo (nov. 2026). */
export const EXCLUSIVO = {
  cuando: "Cualquier día del año, en comida o en cena",
  donde: [
    { valor: "oza", etiqueta: "En el Club Náutico de Oza", texto: "El mismo salón de las cenas baile, solo para tu grupo." },
    { valor: "otro", etiqueta: "En otro espacio", texto: "Restaurante, finca o sala: se busca el sitio que encaje con el grupo." },
    { valor: "propio", etiqueta: "En tu propio local", texto: "Tu restaurante, tu empresa o tu finca: se lleva el concepto completo hasta allí." },
  ],
  incluye: ["Comida o cena: menú sentado o catering de pie", "DJ propio", "Show cómico propio", "Fiesta y baile"],
  agenda: "El DJ y el show son propios, así que cada fecha en exclusiva depende de la agenda: cuanto antes preguntes, más opciones.",
} as const;

export const PRECIO_TEXTO = `${OFERTAS.temporada.precio} €`;

/** Webs del grupo para el pie. */
export const OTROS_SERVICIOS = [
  { nombre: "Despedidas Coruña", texto: "Actividades, alojamiento y packs para despedidas.", url: "https://despedidascoruna.es" },
  { nombre: "Mil Eventos Galicia", texto: "Eventos de empresa y celebraciones a medida.", url: "https://mileventosgalicia.com" },
  { nombre: "SeaGalicia", texto: "Barcos, paseos y eventos en el mar.", url: "https://seagalicia.com" },
  { nombre: "LuxeGalicia", texto: "Traslados con chófer para grupos.", url: "https://luxegalicia.com" },
  { nombre: "Suunia", texto: "Viajes y escapadas por Galicia.", url: "https://suunia.com" },
] as const;

export const GOOGLE_SITE_VERIFICATION = "bJM1pCcura3K8PKgWS-vjTgBWO3ADOEBuOryLC1OpL8";
