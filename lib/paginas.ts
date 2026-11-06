import { FOTOS, type Foto } from "./fotos";
import { OFERTAS } from "./sitio";

export type Enlace = { href: string; texto: string; descripcion?: string; foto?: Foto };

/** Todas las celebraciones: desplegable del menú, página /celebraciones-coruna/ y tarjetas. */
export const CELEBRACIONES_NAV: Enlace[] = [
  { href: "/cenas-navidad-coruna/", texto: "Cenas de empresa de Navidad", descripcion: "Noviembre y diciembre", foto: FOTOS.navidad },
  { href: "/cumpleanos-coruna/", texto: "Cumpleaños", descripcion: "Los 30, los 50 o los que sean", foto: FOTOS.cumpleanos },
  { href: "/cenas-empresa-coruna/", texto: "Cenas de empresa", descripcion: "Equipos, clientes, fin de temporada", foto: FOTOS.empresas },
  { href: "/cenas-despedidas-coruna/", texto: "Despedidas", descripcion: "Cena, show y fiesta para el grupo", foto: FOTOS.despedidas },
  { href: "/jubilaciones-coruna/", texto: "Jubilaciones y aniversarios", descripcion: "Homenajes, bodas de plata, reencuentros", foto: FOTOS.jubilaciones },
  { href: "/eventos-privados-coruna/", texto: "Eventos privados", descripcion: "En exclusiva, todo el año, donde quieras", foto: FOTOS.privados },
];

export const NAV: (Enlace & { hijos?: Enlace[]; destacado?: boolean })[] = [
  ...(OFERTAS.navidad.destacada ? [{ href: "/cenas-navidad-coruna/", texto: "Navidad", destacado: true }] : []),
  { href: "/celebraciones-coruna/", texto: "Celebraciones", hijos: CELEBRACIONES_NAV },
  { href: "/menus-precios/", texto: "Menús" },
  { href: "/club-nautico-oza/", texto: "El local" },
  { href: "/noticias/", texto: "Noticias" },
];

/** Tarjetas con foto de "¿Qué celebráis?". Navidad primero mientras esté destacada. */
export const OCASIONES = [
  { href: "/cenas-navidad-coruna/", titulo: "Navidad en la empresa", texto: "La cena de empresa de Navidad que el equipo sí quiere.", foto: FOTOS.navidad, navidad: true },
  { href: "/cumpleanos-coruna/", titulo: "Cumpleaños", texto: "Cena con tu gente y fiesta hasta las tres. Sin montar nada en casa.", foto: FOTOS.cumpleanos },
  { href: "/cenas-empresa-coruna/", titulo: "Empresas", texto: "Un plan que funciona para todo el equipo, de 6 a muchos más.", foto: FOTOS.empresas },
  { href: "/cenas-despedidas-coruna/", titulo: "Despedidas", texto: "Cena, show cómico y baile. La parte de la noche, resuelta.", foto: FOTOS.despedidas },
  { href: "/jubilaciones-coruna/", titulo: "Jubilaciones", texto: "Despedir a un compañero como se merece. Y aniversarios, reencuentros…", foto: FOTOS.jubilaciones },
  { href: "/eventos-privados-coruna/", titulo: "Evento privado", texto: "Solo tu grupo, cualquier día: en Oza, en otro espacio o en tu local.", foto: FOTOS.privados },
].sort((a, b) => (OFERTAS.navidad.destacada ? Number(!!b.navidad) - Number(!!a.navidad) : Number(!!a.navidad) - Number(!!b.navidad)));

export const LEGALES: Enlace[] = [
  { href: "/aviso-legal/", texto: "Aviso legal" },
  { href: "/privacidad/", texto: "Privacidad" },
  { href: "/cookies/", texto: "Cookies" },
  { href: "/grupo-animacion-galicia/", texto: "Grupo Animación Galicia" },
];
