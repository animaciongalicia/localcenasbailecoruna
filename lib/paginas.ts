import { OFERTAS } from "./sitio";

export type Enlace = { href: string; texto: string; descripcion?: string };

/** Desplegable "Celebraciones". */
export const CELEBRACIONES_NAV: Enlace[] = [
  { href: "/cumpleanos-coruna/", texto: "Cumpleaños", descripcion: "Los 30, los 50 o los que sean" },
  { href: "/cenas-empresa-coruna/", texto: "Cenas de empresa", descripcion: "Compañeros, clientes, fin de temporada" },
  { href: "/cenas-despedidas-coruna/", texto: "Despedidas", descripcion: "Cena, show y fiesta para el grupo" },
  { href: "/celebraciones-coruna/", texto: "Jubilaciones y aniversarios", descripcion: "Despedidas de trabajo, bodas de plata, reencuentros" },
  { href: "/eventos-privados-coruna/", texto: "Eventos privados", descripcion: "En exclusiva, todo el año, donde quieras" },
  { href: "/cenas-navidad-coruna/", texto: "Navidad", descripcion: "Cenas y comidas de noviembre y diciembre" },
];

export const NAV: (Enlace & { hijos?: Enlace[] })[] = [
  { href: "/#experiencia", texto: "La experiencia" },
  { href: "/celebraciones-coruna/", texto: "Celebraciones", hijos: CELEBRACIONES_NAV },
  { href: "/menus-precios/", texto: "Menú y precios" },
  { href: "/club-nautico-oza/", texto: "El espacio" },
];

/** Tarjetas "¿Qué celebráis?". Navidad primero mientras esté destacada. */
export const OCASIONES = [
  ...(OFERTAS.navidad.destacada
    ? [{ href: "/cenas-navidad-coruna/", titulo: "Navidad", texto: "Cenas y comidas de empresa o de amigos en noviembre y diciembre." }]
    : []),
  { href: "/cumpleanos-coruna/", titulo: "Cumpleaños", texto: "Cena con tu gente y fiesta hasta las tres. Sin montar nada en casa." },
  { href: "/cenas-empresa-coruna/", titulo: "Empresas", texto: "Un plan que funciona para todo el equipo, de 6 a muchos más." },
  { href: "/cenas-despedidas-coruna/", titulo: "Despedidas", texto: "Cena, show cómico y baile. La parte de la noche, resuelta." },
  { href: "/celebraciones-coruna/", titulo: "Jubilaciones", texto: "Despedir a un compañero como se merece. Y aniversarios, reencuentros…" },
  { href: "/eventos-privados-coruna/", titulo: "Evento privado", texto: "Solo tu grupo, cualquier día: en Oza, en otro espacio o en tu local." },
  ...(!OFERTAS.navidad.destacada
    ? [{ href: "/cenas-navidad-coruna/", titulo: "Navidad", texto: "Cenas y comidas de noviembre y diciembre." }]
    : []),
];

export const LEGALES: Enlace[] = [
  { href: "/aviso-legal/", texto: "Aviso legal" },
  { href: "/privacidad/", texto: "Privacidad" },
  { href: "/cookies/", texto: "Cookies" },
];
